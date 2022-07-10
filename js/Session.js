class Session {
    user_id = '';

    //Startanje sesije
    startSession() {
        const d = new Date();
        d.setTime(d.getTime() + (2*24*60*60*1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = "user_id=" + this.user_id + ";" + expires;
     }

     //Provjera dali postoji
     getSession() {
        let name = 'user_id=';                    //Naziv cookie-a
        let ca = document.cookie.split(';');

        //Prolaženje petljom kroz ispresjecani cookie da bi se vidjelo dali postoji 
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if(c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }

            return "";
        }
     }

     //Metoda za uništavanje cookie => Kad se netko odjavi da se uništi cookie
     destroySession() {
        let cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GTM";      //Stavlja se stari expires date => tako se uništava cookie
        }
     }
}