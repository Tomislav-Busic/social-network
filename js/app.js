//Zabrana vračanja na početnu stranicu korisniku koji ima cookie
let session = new Session();                //Kreiramo objekat
session = session.getSession();             //Uzimamo cookie

if(session !== ""){                         //Ako nije prazan cookie / ako postoji cookie                
    window.location.href = "account.html";   //Onda ćemo ga preusmjeriti na account.html
}


//Otvaranje forme za registraciju korisnika
document.querySelector('#open-register').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'block';
})

//Zatvaranje forme za registraciju korisnika
document.querySelector('#closeModal').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
})



//Vrijednosti za ispravnu validaciju
let config = {
    'user_name': {
        required: true,
        minlength: 5,
        maxlength: 50
    },

    'register_email': {
        required: true,
        email: true,
        minlength: 5,
        maxlength: 50
    },

    'register_password': {
        required: true,
        minlength: 5,
        maxlength: 50,
        matching: 'repeat_password'
    },

    'repeat_password': {
        required: true,
        minlength: 5,
        maxlength: 50,
        matching: 'register_password'
    }
}

//Proslijeđivanje podataka iz forme u Validate.je(class)
let validator = new Validator(config, '#registrationForm');

//Uzimanje podataka iz forme za registraciju korisnika i slanje na server
document.querySelector('#registrationForm').addEventListener('submit', e => {
    //Da se nebi reloadala stranica
    e.preventDefault();

    if(validator.validationPassed()){
        
        let user = new User();

        //Uzimanje vrijednosti iz registracije i slanje sa metodom create(); => iz klase User()
        user.username = document.querySelector('#user_name').value;
        user.email = document.querySelector('#email').value;
        user.password = document.querySelector('#password').value;
        user.create();

    } else {
        alert('The fields are not filled in correctly!')
    }
});


//Uzimanje podataka iz login forme i slanje u User() klasu preko login metode da se usporedi sa podatcima na serveru i dozvoli pristup
document.querySelector('#loginForm').addEventListener('submit', e => {
    e.preventDefault();

    let email = document.querySelector('#login_email').value;
    let password = document.querySelector('#login_pasword').value;

    let user = new User();
    user.email = email;    
    user.password = password;
    user.loginUser();

})