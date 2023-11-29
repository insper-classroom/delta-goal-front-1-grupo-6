document.querySelector(".username").textContent = `Olá, ${localStorage.getItem("club_name")}`

function logout() {
    localStorage.removeItem("token")
    window.location.href = "/pages/login/login.html"
}

function defensiveDash(id) {
    window.location.href = "/pages/defensiveBreakthrough/defensiveBreakthrough.html?id=" + id
}

document.querySelector(".defensive-dash").onclick = function() {
    defensiveDash() 
}