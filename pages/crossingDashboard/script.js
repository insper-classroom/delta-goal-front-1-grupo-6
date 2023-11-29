document.querySelector(".username").textContent = `Olá, ${localStorage.getItem("club_name")}`

function logout() {
    localStorage.removeItem("token")
    window.location.href = "/pages/login/login.html"
}

function defensiveDash() {
    window.location.href = "/pages/defensiveBreakthrough/defensiveBreakthrough.html"
}