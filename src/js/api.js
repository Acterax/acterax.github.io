class API {

    static API_URL = "https://api.hboost.fr/web/";
    //static API_URL = "http://localhost/web/";

    constructor(token) {
        this.token = token;
    }

    fetchWhitelist(callback) {
        let form = new FormData()
        form.append('connectionId', this.token)

        fetch(API.API_URL + "get/whitelist", {
            method: "POST",
            body: form,
        }).then(function (response) {
            if(response.status === 200) {
                response.json().then(function (json) {
                    callback(json["ips"])
                })
            } else {
                console.log("An error has occurred while fetching whitelisted ips ")
            }
        })
    }

    fetchLicences() {
        let form = new FormData()
        form.append('connectionId', this.token)

        fetch(API.API_URL + "get/licence/", {
            method: "POST",
            body: form,
        }).then(function (response) {
            if(response.status === 200) {
                response.text().then(function (text) {
                    console.log(text)
                })
            } else {
                console.log("An error has occurred while fetching user licences ")
            }
        })
    }

    login() {
        let form = new FormData()
        form.append('mail', document.getElementById('mail').value)
        form.append('password', document.getElementById('password').value)
        form.append('recaptcha', grecaptcha.getResponse())

        fetch(API.API_URL + "auth/", {
            method: "POST",
            body: form,
        }).then(function (response) {
            let message = document.getElementById('message')
            if(response.status === 200) {
                message.textContent = 'Redirection ...';
                message.style.color = 'green';
                response.text().then(function (text) {
                    document.cookie = 'token=' + text + ";path=/";
                    document.location = 'https://hboost.fr/src/panel/home.html';
                })
            } else {
                message.textContent = 'Une erreur est survenu veuillez ré-essayer';
                message.style.color = 'red';
            }
            message.style.opacity = '1';
        })


    }

    register() {
        let form = new FormData()
        form.append('mail', document.getElementById('mail').value)
        form.append('password', document.getElementById('password').value)
        form.append('recaptcha', grecaptcha.getResponse())

        fetch(API.API_URL + "register/", {
            method: "POST",
            body: form,
        }).then(function (response) {
            let message = document.getElementById('message')
            if(response.status === 200) {
                message.textContent = 'Redirection ...';
                message.style.color = 'green';
                response.json().then(function (text) {
                    document.cookie = 'token=' + text['connectionToken'] + ";path=/";
                    document.location = 'http://localhost:63343/HBoost/src/panel/home.html?_ijt=8tn8hdt734nf8lplunq50khjig';
                })
            } else {
                message.textContent = 'Une erreur est survenu veuillez ré-essayer';
                message.style.color = 'red';
            }
            message.style.opacity = '1';
        })
    }

    updateWhitelist() {
        let ips = {'ips': []}
        for(let i = 1; i < 6; i++) {
            let val = document.getElementById("ip" + i).value
            if(!val) continue
            ips['ips'].push(val)
        }

        let form = new FormData()
        form.append('connectionId', this.token)
        form.append('data', JSON.stringify(ips))

        console.log(JSON.stringify(ips))

        fetch(API.API_URL + "update/whitelist", {
            method: "POST",
            body: form,
        }).then((response) => {
            if(response.status === 200) {
                console.log("OK")
            } else {
                response.text().then((var1) => {
                    console.log(response.status + ": " +var1)
                })
            }
        })
    }
}
