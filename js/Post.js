class Post{
    post_id = '';
    post_content = '';
    user_id = '';
    likes = '';
    api_url = 'https://62ea716a3a5f1572e87bbe00.mockapi.io';

    async create(){
        let session = new Session();                 //Uzimamo trenutnu sesiju da vidimo koji je korisnik napravio post
        session_id = session.getSession();

         let data = {                               //Objekat šta se šalje tamo
            user_id: session_id,                    //User id je trenutno user koji je u sesiji
            content: this.post_content,             //content je proslijeđeni this.post_content
            likes: 0                                //Lajkova je u početku nula kad kreiramo objavu
         }

         data = JSON.stringify(data);               //Sada te podatke pretvaramo u JSON format

         let response = await fetch(this.api_url + '/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
         });

         data = await response.json();

         return data;
    }

    //Asinhrona metoda za dohvaćanje svih postova
    async getAllPosts(){
        let response = await fetch(this.api_url + '/posts');
        let data = await response.json();
        return data;
    }

    //Metoda za lajkove
    like(post_id, likes){
        let data = {
            likes: likes
        }

        data = JSON.stringify(data);

        fetch(this.api_url + '/posts/' + post_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => (alert('Lajkali ste objavu!')));
    }

    //Metoda za brisanje posta od strane kreatora istog
    delete(post_id){
        fetch(this.api_url + '/posts/' + post_id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {alert('Post je obrisan')});
    }
}