async function resetPwd() {
    let password = document.querySelector("#password").value

    if (!password) {
        return toast("Preencha sua nova senha", "error")
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log(token)

    let responseData = await (await fetch("http://127.0.0.1:5500/password/reset", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({token, password})
    })).json()

    toast(responseData.message, responseData.status)
}