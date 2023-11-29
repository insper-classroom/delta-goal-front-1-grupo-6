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

    let matches = responseData.matches
    console.log(matches)

    let container = document.querySelector(".games-units-wrapper")


    // https://olhardigital.com.br/2023/06/09/internet-e-redes-sociais/selecoes-de-futebol-mais-populares-nas-redes-sociais/ ref foto de fundo
    for (let i in matches) {
        container.innerHTML += `
        <div class="game-unit" data-id="${matches[i]._id}">
            <img src="../../assets/futebol.jpg" alt="">
            <div class="info">
                <p class="name">${matches[i].match_name}</p>
                <p class="date">${matches[i].date}</p>
            </div>
            <button class="ui button primary" onclick="dash()">Analisar</button>
        </div>
        `
    }
}

getGames()

function dash() {
    window.location.href = "/pages/crossingDashboard/crossingDashboard.html"
}