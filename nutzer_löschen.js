const axios = require('axios');

const userId = '123'; // ID des zu löschenden Nutzers

axios.delete(`http://localhost:3000/users/${userId}`)
    .then(response => {
        console.log('Nutzer erfolgreich gelöscht:', response.data);
    })
    .catch(error => {
        console.error('Fehler beim Löschen des Nutzers:', error.response.data);
});