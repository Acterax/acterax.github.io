function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

const api = new API(getCookie('token'))

if(api.token == null) {
    document.location = 'http://localhost:63343/HBoost/src/login/login.html?_ijt=8tn8hdt734nf8lplunq50khjig#'
}

api.fetchWhitelist((var1) => {
    console.log(var1.length)
    for(let i = 0; i < var1.length; i++) {
        let a = document.getElementById("ip" + (i + 1));
        console.log(a === null)
        a.value = var1[i]
    }
})
setTimeout(function() {
    api.fetchLicences()
}, 200);
