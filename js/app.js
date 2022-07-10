//Otvaranje forme za registraciju korisnika
document.querySelector('#open-register').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'block';
})

//Zatvaranje forme za registraciju korisnika
document.querySelector('#closeModal').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
})


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

let validator = new Validator(config, '#registrationForm');

document.querySelector('#registrationForm').addEventListener('submit', e => {
    //Da se nebi reloadala stranica
    e.preventDefault();

    if(validator.validationPassed()){
        alert('sve ok')
    } else {
        alert('The fields are not filled in correctly!')
    }
})