class Comment{
    user_id = '';
    post_id = '';
    content = '';
    api_url = 'https://62caade81eaf3786ebaf1ba3.mockapi.io';

    

    postComment() {
        let data = {
            user_id: this.user_id,
            post_id: this.post_id,
            content: this.content
        }

        data = JSON.stringify(data);

        fetch(this.api_url + '/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {alert('Postavljen komentar')});

    }

    async get(post_id){
        let api_url = this.api_url + '/comments';    //Uzimanje svih komentara

        const response = await fetch(api_url);
        const data = await response.json();
        let post_comments = [];                     //Prazan niz komentara(Tu će ići komentari samo za ovaj post)
        
        let i = 0;
        data.forEach(item => {                      //Petlja za spajanje komentara sa postom
            if(item.post_id === post_id){             //Ako je post.id u komentaru jednak ovom postu koji je poslan preko get(post_id) => onda je to komentar od tog posta
                post_comments[i] = item;
                i++;
            }
        });

        return post_comments;
    }
}