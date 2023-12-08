async function resetPwd() {
    let password = document.querySelector("#password").value

    if (!password) {
        return toast("Preencha sua nova senha", "error")
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log(token)

    let responseData = await (await fetch("https://sprintgrupo6-7ec65dde579b.herokuapp.com/password/reset", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({token, password})
    })).json()

    toast(responseData.message, responseData.status)
}