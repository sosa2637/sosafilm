import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'sosa-cine-super-secret-key-2026';

app.use(cors());
app.use(express.json());

// --- ROUTES AUTHENTIFICATION ---

// Inscription
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Un compte avec cet email existe déjà.' });
    }

    // Hacher le mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insérer l'utilisateur
    const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    const info = stmt.run(name, email, hashedPassword);

    // Créer un token
    const token = jwt.sign({ id: info.lastInsertRowid, email, name }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Inscription réussie',
      token,
      user: { id: info.lastInsertRowid, name, email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur lors de l\'inscription.' });
  }
});

// Connexion
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'L\'email et le mot de passe sont requis.' });
  }

  try {
    // Trouver l'utilisateur
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }

    // Vérifier le mot de passe
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }

    // Créer un token
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Connexion réussie',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur lors de la connexion.' });
  }
});

// --- PRODUCTION SETUP ---
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir les fichiers statiques du front-end en production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));

  // Fallback pour React Router (SPA)
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Serveur API Sosa Ciné démarré sur le port ${PORT}`);
});
