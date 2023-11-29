document.querySelector(".username").textContent = `Olá, ${localStorage.getItem("club_name")}`

function logout() {
    localStorage.removeItem("token")
    window.location.href = "/pages/login/login.html"
}

async function getGames() {
    let options = {
        method: "GET",
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    }

    let responseData = await (await fetch("http://127.0.0.1:5500/matches", options)).json()

    console.log(responseData)
}

getGames()