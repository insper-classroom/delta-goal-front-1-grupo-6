let errorToast = 
async function login() {
    let password = document.querySelector("#password").value
    let email = document.querySelector("#email").value

    if (!password || !email) {
        return 
    }

    let responseData = await (await fetch(config.serverUrl + "/email/validate", {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: this.state.infos.email, token: code})
    })).json()
    
    errorToast.showToast()

    Toastify({
        text: "dsa",
        style: {
            borderRadius: "5px",
            background: "rgba(214, 83, 65, 1)"
        }
    }).showToast()
    

    if (responseData.status != "success") return
}


