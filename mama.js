import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc 
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

const ridesDiv = document.getElementById("rides");
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  onSnapshot(collection(db, "rides"), (snapshot) => {

    ridesDiv.innerHTML = "";

    snapshot.forEach((doc) => {
      const ride = doc.data();

     ridesDiv.innerHTML += `
    <div class="ride">
        <h3>🚖 Neue Anfrage</h3>

        <p><strong>📍 Abholung:</strong> ${ride.pickup}</p>

        <p><strong>🏁 Ziel:</strong> ${ride.destination}</p>

<p><strong>⏰ Uhrzeit:</strong> ${ride.time}</p>
 
        <p><strong>💰 Aufgabe:</strong> ${ride.price || "Noch keine Aufgabe festgelegt"}</p>

<button onclick="setPrice('${doc.id}')">
    💰 Aufgabe festlegen
</button>

<button onclick="startRide('${doc.id}')">
    🚗 Unterwegs
</button>

<button onclick="arriveRide('${doc.id}')">
    📍 Angekommen
</button>

<button onclick="finishRide('${doc.id}')">
    ✅ Erledigt
</button>
        <hr>
    </div>
`;
    });

  });
});
window.setPrice = async function(id) {

  const price = prompt("Welche Aufgabe soll erledigt werden?");

  if (!price) return;

  await updateDoc(doc(db, "rides", id), {
  price: price,
  status: "💰 Aufgabe festgelegt"
});

  alert("✅ Aufgabe gespeichert!");
};
window.startRide = async function(id) {

  await updateDoc(doc(db, "rides", id), {
    status: "🚗 Mama ist unterwegs"
  });

};
window.arriveRide = async function(id) {

  await updateDoc(doc(db, "rides", id), {
    status: "📍 Mama ist angekommen"
  });

};
window.finishRide = async function(id) {

  if (!confirm("Fahrt wirklich als erledigt markieren?")) return;

 await updateDoc(doc(db, "rides", id), {
  status: "Keine aktive Anfrage",
  price: ""
});

alert("🎉 Fahrt erledigt!");
};
