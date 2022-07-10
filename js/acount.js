//Kad se izlogiramo ne možemo više pristupiti stranici acount.html
let session = new Session();
session = session.getSession();

if(session !== ""){
    alert('You are already logged in!');
} else {
    window.location.href = "/";               //Ako ne postoji, vraćanje na početnu
}

