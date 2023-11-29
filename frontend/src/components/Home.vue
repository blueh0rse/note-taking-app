<template>
    <div class="regis">
     <h1>Hello User, Welcome on NoteApp</h1>
     
    </div>
    
<div class="reg">
    <img class="logo" src="../assets/logo.png"/>
    <p>
        <router-link to="/login" class="link">Login</router-link>
    </p>
    <p>
        <router-link to="/signup" class="link">Sign Up</router-link>
    </p>
</div>
</template>

<script>
export default {
    name: 'Home-Page'
}
</script>

<style>

.regis {
    text-align: center; /* Centra il testo orizzontalmente */
    background-color: #f0f0f0; /* Aggiunge un colore di sfondo */
    padding: 20px; /* Aggiunge spazio interno al contenitore */
    border-radius: 10px; /* Aggiunge angoli arrotondati per un aspetto più elegante */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Aggiunge una leggera ombra */
}

.regis h1 {
    font-size: 24px; /* Imposta la dimensione del carattere desiderata */
    color: #333; /* Imposta il colore del testo */
    margin: 0; /* Rimuove il margine predefinito del titolo */
}


.reg {
    display: flex;
    flex-direction: column;
    justify-content: center; /* Centra verticalmente */
    align-items: center; /* Centra orizzontalmente */
    height: 60vh; /* Imposta l'altezza al 100% della viewport */
}

.link {
    text-decoration: none; /* Rimuove la sottolineatura del link */
    background-color: #007bff; /* Colore di sfondo per il link */
    color: #fff; /* Colore del testo per il link */
    padding: 10px 20px; /* Aggiunge spazio intorno al testo del link */
    border-radius: 5px; /* Aggiunge angoli arrotondati per un aspetto più elegante */
    display: inline-block; /* Imposta il display a "inline-block" per adattarsi al contenuto */
}

.link:hover {
    background-color: #0056b3; /* Cambia il colore di sfondo quando il mouse passa sopra al link */
}

.logo {
    display: block; /* Imposta l'immagine come elemento di blocco per poter applicare margin:auto */
    margin: 0 auto; /* Centra l'immagine orizzontalmente utilizzando margin:auto */
    max-width: 100%; /* Imposta la larghezza massima dell'immagine al 100% del contenitore padre */
    height: auto; /* Mantieni l'aspetto proporzionale durante il ridimensionamento */
}


</style>