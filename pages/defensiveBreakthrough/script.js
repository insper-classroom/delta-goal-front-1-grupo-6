document.querySelector(".username").textContent = `Olá, ${localStorage.getItem("club_name")}`

function logout() {
    localStorage.removeItem("token")
    window.location.href = "/pages/login/login.html"
}

function goToCrossingDashboard() {
    let params = new URLSearchParams(window.location.search)    

    window.location.href = "/pages/crossingDashboard/crossingDashboard.html?id=" + params.get("id")
}

document.querySelector(".crossing-dash").onclick = function() {
    crossingDash() 
}