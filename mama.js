import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDuXjoePXrmbBWtJJkVl8T2UVshli1O3MM",
  authDomain: "mamataxi-da5aa.firebaseapp.com",
  projectId: "mamataxi-da5aa",
  storageBucket: "mamataxi-da5aa.firebasestorage.app",
  messagingSenderId: "33580844045",
  appId: "1:33580844045:web:e5baffa8c76073a7f54144"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ridesDiv = document.getElementById("rides");

onSnapshot(
  collection(db, "rides"),
  (snapshot) => {
    ridesDiv.innerHTML = "";

    snapshot.forEach((doc) => {
      const ride = doc.data();

      ridesDiv.innerHTML += `
        <div class="ride">
          <h3>🚖 Neue Anfrage</h3>
          <p><strong>📍 Abholung:</strong> ${ride.pickup}</p>
          <p><strong>🏁 Ziel:</strong> ${ride.destination}</p>
          <hr>
        </div>
      `;
    });
  },
  (error) => {
    ridesDiv.innerHTML = "❌ Fehler: " + error.message;
    console.error(error);
  }
);
