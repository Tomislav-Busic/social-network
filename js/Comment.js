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
}