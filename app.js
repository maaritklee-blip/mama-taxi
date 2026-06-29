import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
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
      createdAt: new Date()
    });

    status.textContent = "✅ Anfrage wurde in Firebase gespeichert!";
  } catch (error) {
    console.error(error);
    status.textContent = "❌ Fehler beim Speichern.";
  }
});
