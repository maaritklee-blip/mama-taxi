import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDuXjoePXrmbBWtJJkVl8T2UVshli1O3MM",
  authDomain: "mamataxi-da5aa.firebaseapp.com",
  projectId: "mamataxi-da5aa",
  storageBucket: "mamataxi-da5aa.firebasestorage.app",
  messagingSenderId: "33580844045",
  appId: "1:33580844045:web:e5baffa8c76073a7f54144"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

const button = document.getElementById("requestRide");
const status = document.getElementById("status");

button.addEventListener("click", async () => {
  const pickup = document.getElementById("pickup").value;
  const destination = document.getElementById("destination").value;

  if (!pickup || !destination) {
    alert("Bitte Abholort und Ziel eingeben.");
    return;
  }

  try {
    await addDoc(collection(db, "rides"), {
  pickup,
  destination,
  status: "Anfrage gesendet",
  price: "",
  createdAt: new Date()
});
    status.textContent = "✅ Anfrage gesendet!";
  } catch (error) {
    console.error(error);
    status.textContent = "❌ Fehler beim Speichern.";
  }
});
const latestRide = document.createElement("div");
latestRide.id = "latestRide";
document.querySelector(".container").appendChild(latestRide);

const q = query(
  collection(db, "rides"),
  orderBy("createdAt", "desc"),
  limit(1)
);

onSnapshot(q, (snapshot) => {

  if (snapshot.empty) {
    latestRide.innerHTML = "";
    return;
  }

  const ride = snapshot.docs[0].data();

  latestRide.innerHTML = `
    <hr>

    <h3>🚖 Letzte Anfrage</h3>

    <p><strong>📍 Abholung:</strong> ${ride.pickup}</p>
    <p><strong>🏁 Ziel:</strong> ${ride.destination}</p>
    <p><strong>💰 Aufgabe:</strong> ${ride.price || "Noch keine Aufgabe"}</p>
    <p><strong>📢 Status:</strong> ${ride.status}</p>
  `;
});
