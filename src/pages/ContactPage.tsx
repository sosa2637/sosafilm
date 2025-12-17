
export default function ContactPage() {
  return (
    <>  
    <div className="contact">

      <h1>Contactez nous</h1>
	
    <div className="form-div">

       <p id="email">Email : infoLB@gmail.com</p>
       <p id="phone">Téléphone : +1 (418) 323- 2342</p>

       <form>
        <input type="text" id="fname" name="fname" placeholder="Nom complet"></input>
        <input type="text" id="mail" name="mail" placeholder="Email"></input><br/><br/>
        <input type="text" id="sujet" name="sujet" placeholder="Sujet"></input><br/><br/>
        <textarea name="message" placeholder="Message" rows={7} cols={60}>
        
        </textarea><br/><br/>

        <input type="submit" id="submit" value="Envoyer"/>
      
       </form>
    </div>


    </div>
    </>
  );
}