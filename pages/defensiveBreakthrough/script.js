localStorage.setItem('club_name','PAL')
document.querySelector(".username").textContent = `Olá, ${localStorage.getItem("club_name")}`

var json_quebra;
let gameVideoUrl;
let params = new URLSearchParams(window.location.search)
let matchId = params.get("id")

if (!matchId) {
    toast("Id inválido", "error")
}

function selectRuptura(index) {
    let ruptura = json_quebra.rupturas[index]

    document.querySelector(".selected-ruptura-title").innerHTML = `Ruptura #${index + 1} (${ruptura.inicio_ruptura}) <span class="selected-zone">${ruptura.zona_defesa}</span>`

    let seconds = Number(ruptura.inicio_ruptura.split(":")[0]) * 60 * 60 +  Number(ruptura.inicio_ruptura.split(":")[1]) * 60 + Number(ruptura.inicio_ruptura.split(":")[2]) 

    let matchVideo = document.querySelector(".game-video")

    let videoUrl = `https://sprintgrupo6-7ec65dde579b.herokuapp.com/public/match_${matchId}_${ruptura.instante_ruptura.replaceAll(":", "_")}.mp4`

    matchVideo.src = videoUrl

    document.querySelector(".jogadores-posse-de-bola").innerHTML = `
    <div class="player">
        <i class="bi bi-person-fill player-icon"></i>
        <p>${ruptura.nome_jogador_posse_bola}</p>
    </div>
    `

    document.querySelector(".jogadores-em-ruptura").innerHTML = `
    <div class="player">
        <i class="bi bi-person-fill player-icon"></i>
        <p>${ruptura.nome_jogador_ruptura}</p>
    </div>
    `

    let linhaDefensivaContainer = document.querySelector(".jogadores-linha-defensiva")
    linhaDefensivaContainer.innerHTML = ""
    
    for (let name of ruptura.nomes_jogadores_defesa) {
        linhaDefensivaContainer.innerHTML += `
        <div class="player">
            <i class="bi bi-person-fill player-icon"></i>
            <p>${name}</p>
        </div>
        `
    }

    let outcomeColor = "182, 253, 157"

    if (ruptura.desfecho == "Foi desarmado" || ruptura.desfecho == "Forçou a saída de bola adversária") {
        outcomeColor = "248, 147, 97"
    } else if (ruptura.desfecho == "Não recebeu a bola" || ruptura.desfecho == "Passe não concluído") {
        outcomeColor = "254, 148, 181"
    }

    let outcomeElement = document.querySelector(".selected-outcome")
    outcomeElement.textContent = ruptura.desfecho
    outcomeElement.style.backgroundColor = `rgba(${outcomeColor}, 1)`


}

function logout() {
    localStorage.removeItem("token")
    window.location.href = "/pages/login/login.html"
}

function goToCrossingDashboard() {
    let params = new URLSearchParams(window.location.search)    

    window.location.href = "/pages/crossingDashboard/crossingDashboard.html?id=" + params.get("id")
}

function add10Seconds(originalTime) {
    let parts = originalTime.split(":");
    
    let hours = parseInt(parts[0], 10);
    let minutes = parseInt(parts[1], 10);
    let seconds = parseInt(parts[2], 10);

    seconds += 10;

    minutes += Math.floor(seconds / 60);
    seconds = seconds % 60;

    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;

    let formattedHours = hours.toString().padStart(2, "0");
    let formattedMinutes = minutes.toString().padStart(2, "0");
    let formattedSeconds = seconds.toString().padStart(2, "0");

    return formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
}

google.charts.load('current', {'packages':['corechart']});

function drawChart(listaDesfechos) {

    let data = google.visualization.arrayToDataTable(listaDesfechos);
  
    let options = {
    title: 'Desfechos',
    titleTextStyle: {
        fontSize: 16,
        fontWeight: 600
    }
    };
  
    let chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }


const backendURL = 'https://sprintgrupo6-7ec65dde579b.herokuapp.com/match/' + matchId;

fetch(backendURL, {
    method: 'GET',
    headers: {
        "Authorization":"Bearer " + localStorage.getItem("token")
    }
})
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Erro na requisição');
    }
})
.then(data => {
    var listaDeObjetos = Object.entries(data["match"]["json_quebra"]["time"]).map(([chave, valor]) => {
        return { chave: chave, ...valor };
      });

    if (data["match"]["club_1_name"].toUpperCase() == localStorage.getItem('club_name').toUpperCase())
        json_quebra = listaDeObjetos["0"]
    else
        json_quebra = listaDeObjetos["1"]

    /////////////
    
    let zona1b = document.getElementById('1.B');
    let zona1a = document.getElementById('1.A');
    let zona3a = document.getElementById('3.A');
    let zona3b = document.getElementById('3.B');

    zona1b.innerText = "1.B"+"\n"+~~(((json_quebra["zonas"]["Zona 1 - B"] ?? 0 )/json_quebra["rupturas"].length)*100)+"%";
    zona1a.innerText = "1.A"+"\n"+~~(((json_quebra["zonas"]["Zona 1 - A"] ?? 0) /json_quebra["rupturas"].length)*100)+"%";
    zona3a.innerText = "3.A"+"\n"+~~(((json_quebra["zonas"]["Zona 3 - A"] ?? 0 )/json_quebra["rupturas"].length)*100)+"%";
    zona3b.innerText = "3.B"+"\n"+~~(((json_quebra["zonas"]["Zona 3 - B"] ?? 0) /json_quebra["rupturas"].length)*100)+"%";
    document.querySelector(".zone-2-porcentagem").innerHTML = String(Math.ceil(((json_quebra["zonas"]["Zona 2"]??0)/json_quebra["rupturas"].length)*100))  + "%"

    let divRupturas = document.getElementById('rupturas');

    let htmlConteudo = '<p class="subtitle" style="margin-bottom: 5px !important;">Maior nº de rupturas</p>';

    for (let i = 0; i < json_quebra["top_5"].length; i++) {
        htmlConteudo += `
        <div class="player">
            <i class="bi bi-person-fill player-icon"></i>
            <p>${json_quebra["top_5"][i]["nome"]}</p>
            <span>${json_quebra["top_5"][i]["rupturas"]} </span>
        </div>`;
    }

    divRupturas.innerHTML = htmlConteudo;
    ///////////////////////////////////////////

    let htmlConteudo2 = '';

    let listaRupturas = document.getElementById('lista-rupturas');

    for (let i = 0; i < json_quebra["rupturas"].length; i++) {
        let outcomeColor = "182, 253, 157"

        if (json_quebra["rupturas"][i]["desfecho"] == "Foi desarmado" || json_quebra["rupturas"][i]["desfecho"] == "Forçou a saída de bola adversária") {
            outcomeColor = "248, 147, 97"
        } else if (json_quebra["rupturas"][i]["desfecho"] == "Não recebeu a bola" || json_quebra["rupturas"][i]["desfecho"] == "Passe não concluído") {
            outcomeColor = "254, 148, 181"
        }

        htmlConteudo2 += `<div class="item" onclick="selectRuptura(${i})">
            <p class="crossing-index">Ruptura #${i + 1}</p>
            <p class="time">${json_quebra["rupturas"][i]["inicio_ruptura"]}</p>
            <div class="zone">${json_quebra["rupturas"][i]["zona_defesa"]}</div>
            <div class="outcome" style="background: rgba(${outcomeColor}, 1)">${json_quebra["rupturas"][i]["desfecho"]}</div>
        </div>`;
    }

    listaRupturas.innerHTML = htmlConteudo2

    let listaDesfechos = []
    listaDesfechos.push(['tipo', 'quantidade'])

    for(let key in json_quebra["desfechos"]){
        listaDesfechos.push([key,json_quebra["desfechos"][key]])
    }

    drawChart(listaDesfechos)

    let gameVideo = document.querySelector(".game-video")
    gameVideoUrl = data.match.video_url
    gameVideo.src = gameVideoUrl

    console.log(json_quebra)

    selectRuptura(0)
})
.catch(error => {
    console.error('Erro:', error);
});

function renderAllFilter() {
    let container = document.querySelector(".filter-container")
    container.innerHTML = ``

    let htmlConteudo2 = '';

    let listaRupturas = document.getElementById('lista-rupturas');

    for (let i = 0; i < json_quebra["rupturas"].length; i++) {
        let outcomeColor = "182, 253, 157"

        if (json_quebra["rupturas"][i]["desfecho"] == "Foi desarmado" || json_quebra["rupturas"][i]["desfecho"] == "Forçou a saída de bola adversária") {
            outcomeColor = "248, 147, 97"
        } else if (json_quebra["rupturas"][i]["desfecho"] == "Não recebeu a bola" || json_quebra["rupturas"][i]["desfecho"] == "Passe não concluído") {
            outcomeColor = "254, 148, 181"
        }

        htmlConteudo2 += `<div class="item" onclick="selectRuptura(${i})">
            <p class="crossing-index">Ruptura #${i + 1}</p>
            <p class="time">${json_quebra["rupturas"][i]["inicio_ruptura"]}</p>
            <div class="zone">${json_quebra["rupturas"][i]["zona_defesa"]}</div>
            <div class="outcome" style="background: rgba(${outcomeColor}, 1)">${json_quebra["rupturas"][i]["desfecho"]}</div>
        </div>`;
    }

    listaRupturas.innerHTML = htmlConteudo2
}

function applyPlayerFilter(playerName) {
    let htmlConteudo2 = '';

    let listaRupturas = document.getElementById('lista-rupturas');

    for (let i = 0; i < json_quebra["rupturas"].length; i++) {
        if (json_quebra["rupturas"][i]["nome_jogador_ruptura"] == playerName){
            let outcomeColor = "182, 253, 157"

            if (json_quebra["rupturas"][i]["desfecho"] == "Foi desarmado" || json_quebra["rupturas"][i]["desfecho"] == "Forçou a saída de bola adversária") {
                outcomeColor = "248, 147, 97"
            } else if (json_quebra["rupturas"][i]["desfecho"] == "Não recebeu a bola" || json_quebra["rupturas"][i]["desfecho"] == "Passe não concluído") {
                outcomeColor = "254, 148, 181"
            }

            htmlConteudo2 += `<div class="item" onclick="selectRuptura(${i})">
                <p class="crossing-index">Ruptura #${i + 1}</p>
                <p class="time">${json_quebra["rupturas"][i]["inicio_ruptura"]}</p>
                <div class="zone">${json_quebra["rupturas"][i]["zona_defesa"]}</div>
                <div class="outcome" style="background: rgba(${outcomeColor}, 1)">${json_quebra["rupturas"][i]["desfecho"]}</div>
            </div>`;
        }
    }
    listaRupturas.innerHTML = htmlConteudo2
}

function getAllPlayers() {
    let players = [];

    for (let i = 0; i < json_quebra["rupturas"].length; i++) {
        players.push(json_quebra["rupturas"][i]["nome_jogador_ruptura"])
    }

    return players
}


function renderPlayerFilter() {
    let container = document.querySelector(".filter-container")
    container.innerHTML = ``

    let selectOptions = `
        <option disabled selected>Selecione o jogador</option>
    `

    let players = getAllPlayers()
    
    for (let name of players) {
        selectOptions += `
            <option value="${name}">${name}</option>
        `
    }

    container.innerHTML = `
    <select id="player-filter" onchange="applyPlayerFilter(event.currentTarget.value)">
        ${selectOptions}
    </select>
    `
}

function applyZoneFilter(zone) {
    let htmlConteudo2 = '';

    let listaRupturas = document.getElementById('lista-rupturas');

    for (let i = 0; i < json_quebra["rupturas"].length; i++) {
        if (json_quebra["rupturas"][i]["zona_defesa"] == zone){
            let outcomeColor = "182, 253, 157"

            if (json_quebra["rupturas"][i]["desfecho"] == "Foi desarmado" || json_quebra["rupturas"][i]["desfecho"] == "Forçou a saída de bola adversária") {
                outcomeColor = "248, 147, 97"
            } else if (json_quebra["rupturas"][i]["desfecho"] == "Não recebeu a bola" || json_quebra["rupturas"][i]["desfecho"] == "Passe não concluído") {
                outcomeColor = "254, 148, 181"
            }

            htmlConteudo2 += `<div class="item" onclick="selectRuptura(${i})">
                <p class="crossing-index">Ruptura #${i + 1}</p>
                <p class="time">${json_quebra["rupturas"][i]["inicio_ruptura"]}</p>
                <div class="zone">${json_quebra["rupturas"][i]["zona_defesa"]}</div>
                <div class="outcome" style="background: rgba(${outcomeColor}, 1)">${json_quebra["rupturas"][i]["desfecho"]}</div>
            </div>`;
        }
    }
    listaRupturas.innerHTML = htmlConteudo2
}

function renderSelectZoneFilter() {
    let container = document.querySelector(".filter-container")
    container.innerHTML = ``

    let selectOptions = `
        <option disabled selected>Selecione a zona</option>
        <option value="Zona 1 - A">Zona: 1.A</option>
        <option value="Zona 1 - B">Zona: 1.B</option>
        <option value="Zona 2">Zona: 2</option>
        <option value="Zona 3 - A">Zona: 3.A</option>
        <option value="Zona 3 - B">Zona: 3.B</option>
    `

    container.innerHTML = `
    <select id="zone-filter" onchange="applyZoneFilter(event.currentTarget.value)">
        ${selectOptions}
    </select>
    `
}

function applyOutcomeFilter(outcome) {
    let htmlConteudo2 = '';

    let listaRupturas = document.getElementById('lista-rupturas');

    for (let i = 0; i < json_quebra["rupturas"].length; i++) {
        if (json_quebra["rupturas"][i]["desfecho"] == outcome){
            let outcomeColor = "182, 253, 157"

            if (json_quebra["rupturas"][i]["desfecho"] == "Foi desarmado" || json_quebra["rupturas"][i]["desfecho"] == "Forçou a saída de bola adversária") {
                outcomeColor = "248, 147, 97"
            } else if (json_quebra["rupturas"][i]["desfecho"] == "Não recebeu a bola" || json_quebra["rupturas"][i]["desfecho"] == "Passe não concluído") {
                outcomeColor = "254, 148, 181"
            }

            htmlConteudo2 += `<div class="item" onclick="selectRuptura(${i})">
                <p class="crossing-index">Ruptura #${i + 1}</p>
                <p class="time">${json_quebra["rupturas"][i]["inicio_ruptura"]}</p>
                <div class="zone">${json_quebra["rupturas"][i]["zona_defesa"]}</div>
                <div class="outcome" style="background: rgba(${outcomeColor}, 1)">${json_quebra["rupturas"][i]["desfecho"]}</div>
            </div>`;
        }
    }
    listaRupturas.innerHTML = htmlConteudo2
}

function renderSelectOutcomeFilter() {
    let container = document.querySelector(".filter-container")
    container.innerHTML = ``

    let selectOptions = `
        <option disabled selected>Selecione o desfecho</option>
        <option value="Forçou a saída de bola adversária">Forçou a saída de bola adversária</option>
        <option value="Passe não concluído">Passe não concluído</option>
        <option value="Passou a bola">Passou a bola</option>
        <option value="Foi desarmado">Foi desarmado</option>
        <option value="Não recebeu a bola">Não recebeu a bola</option>
    `

    container.innerHTML = `
    <select id="outcome-filter" onchange="applyOutcomeFilter(event.currentTarget.value)">
        ${selectOptions}
    </select>
    `

}
