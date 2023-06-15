const axios = require('axios');

const userId = '454'; // ID des zu aktualisierenden Nutzers

const updatedUserData = {
    firstName: 'Arya',
    lastName: 'Stark',
    birthDate: '2010-05-15'
};

axios.put(`http://localhost:3000/users/${userId}`, updatedUserData)
    .then(response => {
        console.log('Nutzer erfolgreich aktualisiert:', response.data);
    })
    .catch(error => {
        console.error('Fehler beim Aktualisieren des Nutzers:', error.response.data);
});