async function login() {
    let password = document.querySelector("#password").value
    let email = document.querySelector("#email").value

    if (!password || !email) {
        return toast("Preencha todas as informações", "error")
    }

    let responseData = await (await fetch("http://127.0.0.1:5500/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email, password: password})
    })).json()
    
    
    toast(responseData.message, responseData.status)
    if (responseData.status != "success") return

    localStorage.setItem("token", responseData.jwt_token)
    localStorage.setItem("club_name", responseData.club_name)

    window.location.href = "/pages/selectGame/selectGame.html"
}

async function forgotPwd() {
    let email = document.querySelector("#email").value

    if (!email) {
        return toast("Preencha seu email", "error")
    }

    let responseData = await (await fetch("http://127.0.0.1:5500/email/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email})
    })).json()

    toast(responseData.message, responseData.status)
    


}