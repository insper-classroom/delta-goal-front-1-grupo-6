document.querySelector(".username").textContent = `Olá, ${localStorage.getItem("club_name")}`

function logout() {
    localStorage.removeItem("token")
    window.location.href = "/pages/login/login.html"
}

function crossingDash(id) {
    window.location.href = "/pages/crossingDashboard/crossingDashboard.html?id=" + id
}

document.querySelector(".crossing-dash").onclick = function() {
    crossingDash() 
}