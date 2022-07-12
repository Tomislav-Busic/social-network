class User{
    user_id = '';
    username = '';
    email = '';
    password = '';
    api_url = 'https://62caade81eaf3786ebaf1ba3.mockapi.io';

    //Kreiranje korisnika i slanje podataka pomoću metode 'POST' u bazu(mockapi)
    create() {
        let data = {
            username: this.username,       //Kreiranje objekta za prijenos podataka 
            email: this.email,
            password: this.password
        }
        //console.log(data);
        data = JSON.stringify(data);      //Pretvaranje podataka u JSON format
 
        fetch(this.api_url + '/users', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            let session = new Session();
            session.user_id = data.id;              //Uzimanje id-a koji je vraćen => I čuvanje u sesiji
            session.startSession();                 //Startanje sesije  

            window.location.href = 'account.html';
        })
    }

    //Asinhrona metoda za dohvaćanje kprisnika
    async get(user_id) {                             //Asinhrona funkcija, da nam se nebi učitali prazni podatci ako se funkcija nije jop izvršila
        let api_url = this.api_url + '/users/' + user_id;

        let response = await fetch(api_url);
        let user = await response.json();

        return user;
    }

    edit(){
        let  data = {
            username: this.username,
            email: this.email
        }

        data = JSON.stringify(data);

        let session = new Session();
        session_id = session.getSession();

        fetch(this.api_url + '/users/' + session_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = 'account.html';
        })
    }

    //Metoda za logiranje
    loginUser() {
        fetch(this.api_url + '/users')
        .then(response => response.json())
        .then(data => {
            
            data.forEach(db_user => {

                let login_successful = 0;
                if(db_user.email === this.email && db_user.password === this.password){
                    let session = new Session();
                    session.user_id = db_user.id;
                    session.startSession();
                    login_successful = 1;
                    window.location.href = 'account.html';
                } 

                if(login_successful === 0){
                    document.querySelector('#loginForm h2').innerText = 'Incorrect email or password! Please try again.';
                }
            })
        })
    }

    //Metoda za brisanje profila
    delete(){
        let session = new Session();
        session_id = session.getSession();

        fetch(this.api_url + '/users/' + session_id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            let session = new Session();
            session.destroySession();

            window.location.href = "/";
        })
    }
}