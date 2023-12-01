google.charts.load('current', {'packages':['corechart']});

let team1Data = undefined
let team2Data = undefined

document.querySelector(".username").textContent = `Olá, ${localStorage.getItem("club_name")}`

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

function renderCrossingList() {
    let container = document.querySelector(".crossing-list-container")

    for (let i in team1Data.rupturas) {
        container.innerHTML += `
        <div class="item">
            <p class="name">${team1Data.nome.slice(0, 3).toUpperCase()}</p>
            <p class="crossing-index">Cruzamento #${Number(i) + 1}</p>
            <p class="time">${team1Data.rupturas[i].instante_cruzamento}</p>
            <div class="zone">ZONA ${team1Data.rupturas[i].zona}</div>
        </div>
        `
    }
    
    for (let i in team2Data.rupturas) {
        container.innerHTML += `
        <div class="item">
            <p class="name">${team2Data.nome.slice(0, 3).toUpperCase()}</p>
            <p class="crossing-index">Cruzamento #${Number(i) + 1}</p>
            <p class="time">${team2Data.rupturas[i].instante_cruzamento}</p>
            <div class="zone">ZONA ${team2Data.rupturas[i].zona}</div>
        </div>
        `
    }
}

async function getMatchDetails() {
    let params = new URLSearchParams(window.location.search)
    let id = params.get("id")

    if (!id) {
        return toast("Id inválido", "error")
    }

    let options = {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    let response = await fetch("http://127.0.0.1:5500/match/" + id, options)
    let responseData = await response.json()

    let team1Name = responseData.match.json_cruzamento.time[Object.keys(responseData.match.json_cruzamento.time)[0]].nome
    let team2Name = responseData.match.json_cruzamento.time[Object.keys(responseData.match.json_cruzamento.time)[1]].nome

    document.querySelector("#team1-outcome-title").textContent = `Desfechos ${team1Name}`
    document.querySelector("#team2-outcome-title").textContent = `Desfechos ${team2Name}`

    setTimeout(() => {
        renderOutcomeCharts(responseData)
    }, 1000)

    team1Data = responseData.match.json_cruzamento.time[Object.keys(responseData.match.json_cruzamento.time)[0]] 
    team2Data = responseData.match.json_cruzamento.time[Object.keys(responseData.match.json_cruzamento.time)[1]]
    
    let gameVideo = document.querySelector(".game-video")
    gameVideo.src = responseData.match.video_url

    renderCrossingList()
}

getMatchDetails()