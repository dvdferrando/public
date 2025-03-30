// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";


const firebaseConfig = {
    apiKey: "AIzaSyCFX4SPjRAtrNbpoC90JGjMwtjKBUidNiw",
    authDomain: "dividimweb.firebaseapp.com",
    projectId: "dividimweb",
    storageBucket: "dividimweb.firebasestorage.app",
    messagingSenderId: "74888121358",
    appId: "1:74888121358:web:4af2798edcc95aac63c05f",
    measurementId: "G-6K5N82G2YL"
};

// Inicialitza Firebase
const app = initializeApp(firebaseConfig);

// Inicialitza Firestore
const db = getFirestore(app);

// Escoltem el formulari per guardar dades
document.getElementById("formulari").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita el refresc de la pàgina

    const nom = document.getElementById("nom").value;
    const email = document.getElementById("email").value;

    let formValid = true; // Variable per controlar si el formulari és vàlid

    // Restableix els missatges d'error i el borde dels inputs
    document.getElementById("error-nom").textContent = "";
    document.getElementById("error-email").textContent = "";
    document.getElementById("nom").style.borderColor = ''; // Reset de l'estil del border
    document.getElementById("email").style.borderColor = ''; // Reset de l'estil del border

    // Validació per al camp nom
    if (!nom) {
        document.getElementById("error-nom").textContent = "El nom és obligatori.";
        document.getElementById("nom").style.borderColor = 'red'; // Border vermell per error
        formValid = false;
        afegirLog("Error: El nom és obligatori.");
    }

    // Validació per al camp email
    if (!email) {
        document.getElementById("error-email").textContent = "L'email és obligatori.";
        document.getElementById("email").style.borderColor = 'red'; // Border vermell per error
        formValid = false;
        afegirLog("Error: L'email és obligatori.");
    } else if (!validateEmail(email)) {
        document.getElementById("error-email").textContent = "L'email no és vàlid.";
        document.getElementById("email").style.borderColor = 'red'; // Border vermell per error
        formValid = false;
        afegirLog("Error: L'email no és vàlid.");
    }

    // Si el formulari és vàlid, enviem les dades a Firebase
    if (formValid) {
        try {
            // Enviar les dades a Firestore
            await addDoc(collection(db, "usuaris"), {
                nom: nom,
                email: email,
                timestamp: serverTimestamp()
            });
            alert("Dades enviades correctament!");
            afegirLog(`Dades enviades: Nom: ${nom}, Email: ${email}`);
            document.getElementById("formulari").reset();
        } catch (error) {
            console.error("Error afegint document:", error);
            afegirLog(`Error afegint document: ${error}`);
            alert("Error en enviar les dades.");
        }
    }
});

// Funció per validar el correu electrònic
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

function afegirLog(missatge) {
    const logDiv = document.getElementById("log");
    logDiv.innerHTML += `<p>${new Date().toLocaleTimeString()}: ${ "Log: " + missatge}</p>`;
}