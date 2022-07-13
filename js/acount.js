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

});

//Stavljanje objave / prosljeđivanje podataka u klasu Post()
document.querySelector('#postForm').addEventListener('submit', e => {
    e.preventDefault();

    async function createPost() {                                   //Asinhrona funkcija iz razloga što se upravlja DOM elementima
        let content = document.querySelector('#postContent').value;
        document.querySelector('#postContent').value = '';          //Da se sadržaj odmah izbriše iz forme
        let post = new Post();
        post.post_content = content;
        post = await post.create();

        let current_user = new User();                              //Treba nam trenutni korisnik tj. username da bi smo znali tko je ispisao taj post
        current_user = await current_user.get(session_id);          //Zatim ga uzimamo pomoću metode get() preko sessije

        let postWrapper = document.querySelector('#allPostsWrapper');

        postWrapper.innerHTML = `<div class="post" data-post_id="${post.post_id}">
                                    <div class="post-content">${post.content}</div>  
                                    
                                    <div class="post-comments">
                                        <form>
                                            <input placeholder="Write comment..." type="text">
                                            <button onclick="commentPostSubmit(event)">Comment</button>
                                        </form>
                                    </div>
                                </div>
                                
                               
                                `
    }
    createPost();
})

const commentPostSubmit = event => {

}