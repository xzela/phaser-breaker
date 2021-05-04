const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
// const phaser = require('phaser');
// sendFile will go here
// console.log(phaser);
app.use('/assets', express.static('public/assets'));
app.use('/js', express.static('public/js'));

// app.use('/phaser.js', phaser);
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/part1', (req, res) => {
	res.sendFile(path.join(__dirname, '/part1.html'));
});

app.get('/break', (req, res) => {
	res.sendFile(path.join(__dirname, '/break.html'));
});

app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);
});
