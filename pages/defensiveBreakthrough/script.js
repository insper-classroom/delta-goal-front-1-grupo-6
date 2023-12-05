localStorage.setItem('club_name','PAL')
document.querySelector(".username").textContent = `Olá, ${localStorage.getItem("club_name")}`

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

let params = new URLSearchParams(window.location.search)
let id = params.get("id")

if (!id) {
    toast("Id inválido", "error")
}
const backendURL = 'http://127.0.0.1:5500/match/' + id;

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
        var json_quebra = listaDeObjetos["0"]
    else
        var json_quebra = listaDeObjetos["1"]

    /////////////
    
    let zona1b = document.getElementById('1.B');
    let zona1a = document.getElementById('1.A');
    let zona3a = document.getElementById('3.A');
    let zona3b = document.getElementById('3.B');

    zona1b.innerText = "1.B"+"\n"+~~(json_quebra["zonas"]["Zona 1 - B"]/json_quebra["rupturas"].length*100)+"%";
    zona1a.innerText = "1.A"+"\n"+~~(json_quebra["zonas"]["Zona 1 - A"]/json_quebra["rupturas"].length*100)+"%";
    zona3a.innerText = "3.A"+"\n"+~~(json_quebra["zonas"]["Zona 3 - A"]/json_quebra["rupturas"].length*100)+"%";
    zona3b.innerText = "3.B"+"\n"+~~(json_quebra["zonas"]["Zona 3 - B"]/json_quebra["rupturas"].length*100)+"%";

    let divRupturas = document.getElementById('rupturas');

    let htmlConteudo = '<p class="subtitle" style="margin-bottom: 5px !important;">Maior nº de rupturas</p>';

    for (let i = 0; i < json_quebra["top_5"].length; i++) {
        htmlConteudo += `
        <div class="player">
            <i class="bi bi-person-fill player-icon"></i>
            <p>${json_quebra["top_5"][i]["nome"]}</p>
            <span>${json_quebra["top_5"][i]["rupturas"]} <i class="bi bi-caret-up-fill"></i></span>
        </div>`;
    }

    divRupturas.innerHTML = htmlConteudo;

    let htmlConteudo2 = '';

    let listaRupturas = document.getElementById('lista-rupturas');

    for (let i = 0; i < json_quebra["rupturas"].length; i++) {
        htmlConteudo2 += `<div class="item">
            <p class="name">${localStorage.getItem("club_name")}</p>
            <p class="crossing-index">${json_quebra["rupturas"][i]["nome_jogador_ruptura"]}</p>
            <p class="time">${json_quebra["rupturas"][i]["inicio_ruptura"]} - ${add10Seconds(json_quebra["rupturas"][i]["inicio_ruptura"])}</p>
            <div class="zone">${json_quebra["rupturas"][i]["zona_defesa"]}</div>
        </div>`;
    }

    listaRupturas.innerHTML = htmlConteudo2

    let listaDesfechos = []
    listaDesfechos.push(['tipo', 'quantidade'])

    for(let key in json_quebra["desfechos"]){
        listaDesfechos.push([key,json_quebra["desfechos"][key]])
    }

    drawChart(listaDesfechos)
})
.catch(error => {
    console.error('Erro:', error);
});