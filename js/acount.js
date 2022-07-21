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

        let deletePost = '';

        if(session_id === post.user_id){                             //Brisanje samo komentara - korisnika koji je u sesiji-tj autora posta
            deletePost = '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>'
        }

        postWrapper.innerHTML += `<div class="post" data-post_id="${post.id}">
                                    <div class="post-content">${post.content}</div>  

                                    <div class="post-actions">
                                        <p><b>Author: </b>${current_user.username}</p>
                                        <div>
                                            <button onclick="likePost(this)"><span>${post.likes}</span> likes</button>
                                            <button onclick="commentPost(this)">Comments</button>
                                            ${deletePost}
                                        </div>    
                                    </div>
                                    
                                    <div class="post-comments">
                                        <form>
                                            <input placeholder="Write comment..." type="text">
                                            <button onclick="commentPostSubmit(event)">Comment</button>
                                        </form>
                                    </div>
                                </div>`
                                
    }
    createPost();
})

//Funkcija za učitavanje svih postova(isto asinhrona iz razloga da nam ne baca grešku dok se ne povuku podatci iz baze)
async function getPosts() {
    let all_posts = new Post();
    all_posts = await all_posts.getAllPosts();

    all_posts.forEach(post => {
        async function getPostUser(){
            let user = new User();
            user = await user.get(post.user_id);                        //Trebamo usera koji je postavio post
            
            //Učitavanje komentara u postovima
            let comments = new Comment();
            comments = await comments.get(post.id);  
            
            let html_comments = '';                                     //Prazana varijabla koje će biti popunjena ako postoji komentar u postu                         
            if(comments.length > 0){
                comments.forEach(comment => {
                    html_comments += `<div class="single-comment">${comment.content}</div>`;
                })
            }
            
            let deletePost = '';                                                    

            if(session_id === post.user_id){
                deletePost = '<button class="remove-btn" onclick="removeMyPost(this)">Remove</button>'
            }
                                                                                   //Kopiramo kod jedino što moramo promjeniti je koji korisnik je objavio komentar user.username a ne current.username.. 
            document.querySelector('#allPostsWrapper').innerHTML += `<div class="post" data-post_id="${post.id}">
                                                                        <div class="post-content">${post.content}</div>  

                                                                        <div class="post-actions">
                                                                            <p><b>Author: </b>${user.username}</p>                                                                
                                                                            <div>
                                                                                <button onclick="likePost(this)"><span>${post.likes}</span> likes</button>
                                                                                <button onclick="commentPost(this)">Comments</button>
                                                                                ${deletePost}
                                                                            </div>    
                                                                        </div>

                                                                        <div class="post-comments">
                                                                            <form>
                                                                                <input placeholder="Write comment..." type="text">
                                                                                <button onclick="commentPostSubmit(event)">Comment</button>
                                                                            </form>
                                                                            ${html_comments}
                                                                        </div>
                                                                    </div>`
        }
        getPostUser();
    })
}

getPosts();

//Funkcija za ispis i slanje komentara u bazu podataka
const commentPostSubmit = event => {
    event.preventDefault();

    let btn = event.target;
    btn.setAttribute('disabled', 'true');

    let main_el = btn.closest('.post');
    let post_id = main_el.getAttribute('data-post_id');

    let data_value = main_el.querySelector('input').value;

    main_el.querySelector('input').value = '';

    main_el.querySelector('.post-comments').innerHTML += `<div class="single-comment">${data_value}</div>`

    let comment = new Comment();
    comment.content = data_value;
    comment.user_id = session_id;
    comment.post_id = post_id;
    comment.postComment();
}

//Funkcija za brisanje objave
const removeMyPost = element => {
    let post_id = element.closest('.post').getAttribute('data-post_id');
    element.closest('.post').remove();

    let post = new Post();
    post = post.delete(post_id);
}

//Funkcija za lajkove
const likePost = element => {

}

//Funkcija za otvaranje inputa za komentare na svakoj objavi zasebno
const commentPost = btn => {
    let main_post = btn.closest('.post');

    main_post.querySelector('.post-comments').style.display = 'block';
}