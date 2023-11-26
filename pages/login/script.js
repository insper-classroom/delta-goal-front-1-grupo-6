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

    window.location.href = "/dashboard.html"


}
