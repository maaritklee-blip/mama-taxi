const button = document.getElementById("requestRide");
const status = document.getElementById("status");

button.addEventListener("click", () => {
    const pickup = document.getElementById("pickup").value;
    const destination = document.getElementById("destination").value;

    if (pickup === "" || destination === "") {
        alert("Bitte Abholort und Ziel eingeben.");
        return;
    }

    status.textContent =
        `🚖 Anfrage gesendet!\n📍 ${pickup}\n🏁 ${destination}`;
});
