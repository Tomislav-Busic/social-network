//Kad se izlogiramo ne možemo više pristupiti stranici acount.html
let session = new Session();
session_id = session.getSession();

 
if(session_id !== ""){
    
    async function populateUserData(){
        let user = new User();
        user = await user.get(session_id);

        document.querySelector('#username').innerText = user.username;
        document.querySelector('#email').innerText = user.email;

        document.querySelector('#user_name').value = user.username;
        document.querySelector('#edit_email').value = user.email;
    }
    populateUserData();
} else {
    window.location.href = '/';               //Ako ne postoji, vraćanje na početnu
}

//Izlaz iz accounta / logout
document.querySelector('#logout').addEventListener('click', e => {
    e.preventDefault();

    session.destroySession();
    window.location.href = '/';
});


//Ulaz i izlaz iz edit account
document.querySelector('#editAccount').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'block';
});

document.querySelector('#closeModal').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
});

//Šaljemo podatke iz edit forme u klasu User gdje će se dalje slati na server
document.querySelector('#editForm').addEventListener('submit', e => {
    e.preventDefault();

    let user = new User();
    user.username = document.querySelector('#user_name').value;
    user.email = document.querySelector('#edit_email').value;
    user.edit();
});

//Brisanje korisnika
document.querySelector('#deleteProfile').addEventListener('click', e => {
    e.preventDefault();

    let text = 'Are you sure you want to delete your profile?';

    if(confirm(text) === true){
        let user = new User();
        user.delete();
    }

})