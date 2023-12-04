// server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080; // Sostituisci con la porta del tuo server
const fs = require('fs');

app.use(bodyParser.json());

// Carica gli account utente da un file JSON (semplificato)
let userAccounts = [];
try {
  userAccounts = JSON.parse(fs.readFileSync('userAccounts.json'));
} catch (error) {
  console.error('Errore nella lettura dei dati degli utenti:', error);
}

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;

  // Verifica se l'utente esiste già
  if (userAccounts.some(user => user.email === email)) {
    res.status(400).json({ message: 'Utente già registrato' });
  } else {
    // Aggiungi il nuovo utente alla lista e salvalo nel file JSON
    userAccounts.push({ email, name, password });
    fs.writeFileSync('userAccounts.json', JSON.stringify(userAccounts));

    res.status(201).json({ message: 'Registrazione riuscita' });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Cerca l'utente corrispondente nell'elenco
  const user = userAccounts.find(user => user.email === email);

  if (!user || user.password !== password) {
    res.status(401).json({ message: 'Accesso non autorizzato' });
  } else {
    res.status(200).json({ message: 'Accesso riuscito' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
