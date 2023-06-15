const axios = require('axios');

const userData = {
    id: '123',
    firstName: 'John',
    lastName: 'wick',
    birthDate: '1999-01-01'
};

axios.post('http://localhost:3000/users', userData)
    .then(response => {
        console.log('Nutzer erfolgreich angelegt:', response.data);
    })
    .catch(error => {
        console.error('Fehler beim Anlegen des Nutzers:', error.response.data);
});



const userData2 = {
    id: '454',
    firstName: 'Arya',
    lastName: 'Stark',
    birthDate: '1993-03-05'
};

axios.post('http://localhost:3000/users', userData2)
    .then(response => {
        console.log('Nutzer erfolgreich angelegt:', response.data);
    })
    .catch(error => {
        console.error('Fehler beim Anlegen des Nutzers:', error.response.data);
});


const userData3 = {
    id: '222',
    firstName: 'Harry',
    lastName: 'Potter',
    birthDate: '2000-03-05'
};

axios.post('http://localhost:3000/users', userData3)
    .then(response => {
        console.log('Nutzer erfolgreich angelegt:', response.data);
    })
    .catch(error => {
        console.error('Fehler beim Anlegen des Nutzers:', error.response.data);
});