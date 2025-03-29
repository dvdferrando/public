
// Carreguem la configuració de Firebase
fetch("/__/config.json")
  .then(response => response.json())
  .then(config => {
    firebase.initializeApp(config);
    console.log("Firebase inicialitzat", config);

    const db = firebase.firestore(); // Inicialitza Firestore

    // Escoltem el formulari per guardar dades
    document.getElementById("formulari").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el refresc de la pàgina

        const nom = document.getElementById("nom").value;
        const email = document.getElementById("email").value;

        db.collection("usuaris").add({
            nom: nom,
            email: email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            alert("Dades enviades correctament!");
            document.getElementById("formulari").reset();
        })
        .catch(error => {
            console.error("Error afegint document:", error);
            alert("Error en enviar les dades.");
        });
    });
  })
  .catch(error => console.error("Error carregant config:", error));
