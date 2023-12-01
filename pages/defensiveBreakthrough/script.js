document.querySelector(".username").textContent = `Olá, ${localStorage.getItem("club_name")}`

function logout() {
    localStorage.removeItem("token")
    window.location.href = "/pages/login/login.html"
}

function goToCrossingDashboard() {
    let params = new URLSearchParams(window.location.search)    

    window.location.href = "/pages/crossingDashboard/crossingDashboard.html?id=" + params.get("id")
}

// document.querySelector(".crossing-dash").onclick = function() {
//     crossingDash() 
// }

const backendURL = 'http://127.0.0.1:5501/match/6564f369f82e76ba950789ab';

fetch(backendURL, {
    method: 'GET',
    headers: {
        "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbHViX25hbWUiOiJQQUwifQ._ehML_PlPQmypG9fe0YV7V7AIdtzbwDO9eP2HY-HW2Q"
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
    var json_quebra = data["match"]["json_quebra"]
    console.log(json_quebra)
})
.catch(error => {
    console.error('Erro:', error);
});