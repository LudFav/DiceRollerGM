const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('rollDice', (data) => {
        io.emit('rollResult', data);
    });

    socket.on('rollResult', (data) => {
        const rollHistoryElement = document.getElementById('rollHistory');
        const newRollElement = document.createElement('li');
        newRollElement.textContent = `The dice rolled: ${data.rollResult}`;
        rollHistoryElement.appendChild(newRollElement);
        // Mettez à jour l'élément HTML avec le résultat du roll
        const rollResultElement = document.getElementById('rollResult');
        rollResultElement.textContent = `The dice rolled: ${data.rollResult}`;

        // Ajoutez un nouvel élément à la liste d'historique des rolls


        // Ajoutez la classe CSS pour griser les anciens rolls
        const oldRolls = rollHistoryElement.getElementsByClassName('old-roll');
        Array.from(oldRolls).forEach(roll => {
            roll.classList.remove('old-roll');
        });
        newRollElement.classList.add('old-roll');
    });


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});