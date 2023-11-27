async function resetPwd() {
    let password = document.querySelector("#password").value

    if (!password) {
        return toast("Preencha sua nova senha", "error")
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