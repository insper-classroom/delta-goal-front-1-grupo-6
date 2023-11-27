async function resetPwd() {
    let password = document.querySelector("#password").value

    if (!password) {
        return toast("Preencha sua nova senha", "error")
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');


    let responseData = await (await fetch("http://127.0.0.1:5500/password/reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email, token})
    })).json()

    toast(responseData.message, responseData.status)
}