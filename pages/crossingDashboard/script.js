google.charts.load('current', {'packages':['corechart']});

let team1Data = undefined
let team2Data = undefined
let matchId = ""

document.querySelector(".username").textContent = `Olá, ${localStorage.getItem("club_name")}`

function getAllCrossingPlayers() {
    let players = [];

    for (let i in team1Data.rupturas) {
        for (let name of team1Data.rupturas[i].nome_jogadores_time_cruzando.split(",")) {
            if (!players.includes(name.trim()) && name.trim() != "") {
                players.push(name.trim())
            }
        }
    }
    for (let i in team2Data.rupturas) {
        for (let name of team2Data.rupturas[i].nome_jogadores_time_cruzando.split(",")) {
            if (!players.includes(name.trim()) && name.trim() != "") {
                players.push(name.trim())
            }
        }
    }

    return players
}

function applyTeamFilter(teamName) {
    let allCrossings = [...team1Data.rupturas, ...team2Data.rupturas]
    let filteredCrossings = []

    for (let crossing of allCrossings) {
        if (crossing.teamName == teamName) {
            filteredCrossings.push(crossing)
        }
    }

    renderCrossingList(filteredCrossings)
}

function applyZoneFilter(zone) {
    let allCrossings = [...team1Data.rupturas, ...team2Data.rupturas]
    let filteredCrossings = []

    for (let crossing of allCrossings) {
        if (crossing.zona == zone) {
            filteredCrossings.push(crossing)
        }
    }

    renderCrossingList(filteredCrossings)
}

function applyOutcomeFilter(outcome) {
    let allCrossings = [...team1Data.rupturas, ...team2Data.rupturas]
    let filteredCrossings = []

    for (let crossing of allCrossings) {
        if (crossing.desfecho == outcome) {
            filteredCrossings.push(crossing)
        }
    }

    renderCrossingList(filteredCrossings)
}


function renderSelectOutcomeFilter() {
    let container = document.querySelector(".filter-container")
    container.innerHTML = ``

    let selectOptions = `
        <option disabled selected>Selecione o desfecho</option>
        <option value="Bem-Sucedido">Bem-Sucedido</option>
        <option value="Perdido">Perdido</option>
        <option value="Bloqueado">Bloqueado</option>
    `

    container.innerHTML = `
    <select id="outcome-filter" onchange="applyOutcomeFilter(event.currentTarget.value)">
        ${selectOptions}
    </select>
    `

}

function renderSelectZoneFilter() {
    let container = document.querySelector(".filter-container")
    container.innerHTML = ``

    let selectOptions = `
        <option disabled selected>Selecione a zona</option>
        <option value="D2.2">Zona: D2.2</option>
        <option value="D2.1">Zona: D2.1</option>
        <option value="D1.2">Zona: D1.2</option>
        <option value="D3">Zona: D3</option>
        <option value="D1.1">Zona: D1.1</option>
        <option value="E1.1">Zona: E1.1</option>
        <option value="E3">Zona: E3</option>
        <option value="E2.2">Zona: E2.2</option>
        <option value="E2.1">Zona: E2.1</option>
        <option value="E1.2">Zona: E1.2</option>
    `

    container.innerHTML = `
    <select id="zone-filter" onchange="applyZoneFilter(event.currentTarget.value)">
        ${selectOptions}
    </select>
    `
}

function renderSelectTeamFilter() {
    let container = document.querySelector(".filter-container")
    container.innerHTML = ``

    let selectOptions = `
        <option disabled selected>Selecione o time</option>
        <option value="${team1Data.nome}">${team1Data.nome}</option>
        <option value="${team2Data.nome}">${team2Data.nome}</option>

    `

    container.innerHTML = `
    <select id="team-filter" onchange="applyTeamFilter(event.currentTarget.value)">
        ${selectOptions}
    </select>
    `
}

function applyPlayerFilter(playerName) {
    let allCrossings = [...team1Data.rupturas, ...team2Data.rupturas]
    let filteredCrossings = []

    for (let crossing of allCrossings) {
        if (crossing.nome_jogadores_time_cruzando.includes(playerName.trim())) {
            filteredCrossings.push(crossing)
        }
    }

    renderCrossingList(filteredCrossings)
}

function renderAllFilter() {
    let container = document.querySelector(".filter-container")
    container.innerHTML = ``

    let allCrossings = [...team1Data.rupturas, ...team2Data.rupturas]

    renderCrossingList(allCrossings)
}

function renderSelectPlayerFilter() {
    let container = document.querySelector(".filter-container")
    container.innerHTML = ``

    let selectOptions = `
        <option disabled selected>Selecione o jogador</option>
    `

    let players = getAllCrossingPlayers()
    
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


function logout() {
    localStorage.removeItem("token")
    window.location.href = "/pages/login/login.html"
}

function goToDefensiveDashboard() {
    // ref: https://www.sitepoint.com/get-url-parameters-with-javascript/
    let params = new URLSearchParams(window.location.search)    

    window.location.href = "/pages/defensiveBreakthrough/defensiveBreakthrough.html?id=" + params.get("id")
}

function drawChart(data, elementId) {
    var data = google.visualization.arrayToDataTable([
      ...data
    ]);

    var options = {
      title: 'My Daily Activities'
    };

    var chart = new google.visualization.PieChart(document.getElementById(elementId));

    chart.draw(data, options);
}

function getOutcomeChartData(data) {
    let stats = [
        ["Perdido", 0],
        ["Bem-Sucedido", 0],
        ["Bloqueado", 0],
    ]
    
    for (let i in data) {
        if (data[i].desfecho == "Perdido") {
            stats[0][1] = stats[0][1] + 1
        } else if (data[i].desfecho == "Bem-Sucedido") {
            stats[1][1] = stats[1][1] + 1
        } else if (data[i].desfecho == "Bloqueado") {
            stats[2][1] = stats[2][1] + 1
        }
    }
    
    return stats
}

function renderOutcomeCharts(data) {
    let team1ChartData = google.visualization.arrayToDataTable([["Desfecho", "Quantidade"], ...getOutcomeChartData(data.match.json_cruzamento.time[Object.keys(data.match.json_cruzamento.time)[0]].rupturas)])
    let chart1 = new google.visualization.PieChart(document.getElementById('team1-piechart'));
    chart1.draw(team1ChartData, {})
    
    let team2ChartData = google.visualization.arrayToDataTable([["Desfecho", "Quantidade"], ...getOutcomeChartData(data.match.json_cruzamento.time[Object.keys(data.match.json_cruzamento.time)[1]].rupturas)])
    let chart2 = new google.visualization.PieChart(document.getElementById('team2-piechart'));
    chart2.draw(team2ChartData, {})

}

function selectCrossing(crossing, cIndex) {
    let infosContainer = document.querySelector(".selected-crossing-infos")

    let outcomeColor = "182, 253, 157"

    if (crossing.desfecho == "Perdido") {
        outcomeColor = "248, 147, 97"
    } else if (crossing.desfecho == "Bloqueado") {
        outcomeColor = "254, 148, 181"
    }

    infosContainer.innerHTML = `
        <p class="team-name">${crossing.teamName.slice(0, 3).toUpperCase()}</p>
        <p class="index">Cruzamento #${Number(cIndex) + 1}</p>
        <p class="outcome" style="background-color: rgba(${outcomeColor})">${crossing.desfecho}</p>
    `

    let matchVideo = document.querySelector(".game-video")

    let videoUrl = `https://sprintgrupo6-7ec65dde579b.herokuapp.com/public/match_${matchId}_${crossing.instante_cruzamento.replaceAll(":", "_")}.mp4`

    matchVideo.src = videoUrl

    let defendingContainer = document.querySelector(".defending-players")
    defendingContainer.innerHTML = ""
    for (let name of crossing.nome_jogadores_time_defendendo.split(",")) {
        defendingContainer.innerHTML += `
            <p><i class="bi bi-person-fill"></i> ${name} </p>
        `
    }

    let attackingContainer = document.querySelector(".attacking-players")
    attackingContainer.innerHTML = ""
    for (let name of crossing.nome_jogadores_time_cruzando.split(",")) {
        attackingContainer.innerHTML += `
        <p><i class="bi bi-person-fill"></i> ${name} </p>
        `
    }

    let zone = crossing.zona.replace(".", "-")

    $(".active-zone").removeClass("active-zone")
    $("." +  zone).addClass("active-zone")
}

function applyAllFilter() {
    renderCrossingList([...team1Data.rupturas, ...team2Data.rupturas])
}

function renderCrossingList(crossings) {
    let container = document.querySelector(".crossing-list-container")
    container.innerHTML = ""

    for (let i in crossings) {
        let outcomeColor = "182, 253, 157"

        if (crossings[i].desfecho == "Perdido") {
            outcomeColor = "248, 147, 97"
        } else if (crossings[i].desfecho == "Bloqueado") {
            outcomeColor = "254, 148, 181"
        }

        let element = document.createElement("div")
        element.classList.add("item")

        element.onclick = () => {
            selectCrossing(crossings[i], i)
        }

        element.innerHTML += `
            <p class="name">${crossings[i].teamName.slice(0, 3).toUpperCase()}</p>
            <p class="crossing-index"> #${Number(i) + 1}</p>
            <p class="time">${crossings[i].instante_cruzamento}</p>
            <div class="zone">ZONA ${crossings[i].zona}</div>
            <div class="outcome" style="background-color: rgba(${outcomeColor}, 1)">${crossings[i].desfecho}</div>
        `
        container.appendChild(element)
    }


        
}

async function renderEmphasisPlayers(team) {
    let teamData;
    if (team == "team1") {
        teamData = team1Data
    } else {
        teamData = team2Data
    }

    let teamPlayers = {}

    for (cro of teamData.rupturas) {
        let players = cro.nome_jogadores_time_cruzando.split(",")

        for (pl of players) {
            if (!Object.keys(teamPlayers).includes(pl)) {
                teamPlayers[pl] = 1
            } else {
                teamPlayers[pl] += 1
            }
        }
    }

    let teamPlayersCrossAmount = Object.values(teamPlayers).sort((a, b)=>a-b).reverse()
    let teamPlayersName = []

    for (name in teamPlayers) {
        let i = teamPlayersCrossAmount.indexOf(teamPlayers[name])
        
        while (teamPlayersName[i]) {
            i += 1
        }

        teamPlayersName[i] = name
    }

    teamPlayersName = teamPlayersName.slice(0, 4)

    let container = document.querySelector(`.${team}-emphasis`)
    let playersHTML = ""

    for (name of teamPlayersName) {
        playersHTML += `
        <div class="player">
            <i class="bi bi-person-fill player-icon"></i>
            <p>${name}</p>

            <span>${teamPlayers[name]}</span>
        </div>
        `
    }

    container.innerHTML = `
        <p class="subtitle" style="margin-bottom: 5px !important;">Destaques ${teamData.nome.slice(0, 3).toUpperCase()}</p>

        ${playersHTML}    
    `
}

// ref: https://developers.google.com/chart/interactive/docs/gallery/columnchart?hl=pt-br
// ref: https://jsfiddle.net/api/post/library/pure/
// ref https://developers.google.com/chart/interactive/docs/gallery/barchart?hl=pt-br
function renderInvolvedPlayersChart(team, chartContainerId, titleElementId) {
    let teamData;
    if (team == "team1") {
        teamData = team1Data
    } else {
        teamData = team2Data
    }

    let titleElement = document.querySelector("#"+titleElementId)
    titleElement.textContent = `Jogadores envolvidos ` + teamData.nome

    let playersStats = {}

    for (let i in teamData.rupturas) {
        for (let name of teamData.rupturas[i].nome_jogadores_time_cruzando.split(",")) {
            let filteredName = name.trim()
            if (!filteredName) continue

            if (playersStats[filteredName]) {
                playersStats[filteredName] += 1
            } else {
                playersStats[filteredName] = 1
            }
        }
    }

    let chartData = [
        ["jogador", "envolvimento", { role: 'annotation' }]
    ]

    for (let i in playersStats) {
        chartData.push([i, playersStats[i], playersStats[i]])
    }

    var data = google.visualization.arrayToDataTable(chartData);

    var chart = new google.visualization.BarChart(document.getElementById(chartContainerId));

    chart.draw(data, {});

    console.log(playersStats)
}

async function getMatchDetails() {
    let params = new URLSearchParams(window.location.search)
    let id = params.get("id")

    if (!id) {
        return toast("Id inválido", "error")
    }

    matchId = id

    let options = {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    let response = await fetch("https://sprintgrupo6-7ec65dde579b.herokuapp.com/match/" + id, options)
    let responseData = await response.json()

    let team1Name = responseData.match.json_cruzamento.time[Object.keys(responseData.match.json_cruzamento.time)[0]].nome
    let team2Name = responseData.match.json_cruzamento.time[Object.keys(responseData.match.json_cruzamento.time)[1]].nome

    document.querySelector("#team1-outcome-title").textContent = `Desfechos ${team1Name}`
    document.querySelector("#team2-outcome-title").textContent = `Desfechos ${team2Name}`

    setTimeout(() => {
        renderOutcomeCharts(responseData)
        renderInvolvedPlayersChart("team1", "team1-barchart", "team1-players-title")
        renderInvolvedPlayersChart("team2", "team2-barchart", "team2-players-title")
    }, 1000)

    team1Data = responseData.match.json_cruzamento.time[Object.keys(responseData.match.json_cruzamento.time)[0]] 
    team2Data = responseData.match.json_cruzamento.time[Object.keys(responseData.match.json_cruzamento.time)[1]]
    for (let i in team1Data.rupturas) {
        team1Data.rupturas[i].teamName = team1Data.nome
    }
    for (let i in team2Data.rupturas) {
        team2Data.rupturas[i].teamName = team2Data.nome
    }

    renderCrossingList()
    selectCrossing(team1Data.rupturas[0], 0)


    renderEmphasisPlayers("team1")
    renderEmphasisPlayers("team2")

    applyAllFilter()

}

getMatchDetails()

