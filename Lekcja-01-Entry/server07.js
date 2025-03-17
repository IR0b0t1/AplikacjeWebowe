// Express + port
const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path");

// GET-y
app.get('/', function (req, res) {
    console.log("ścieżka do katalogu głównego aplikacji: " + __dirname)
    res.sendFile(path.join(__dirname, "/static/strona.html"))
})

app.get('/koty', function (req, res) {
    res.sendFile(path.join(__dirname, "/static/koty.html"))
})

app.get('/auta', function (req, res) {
    res.sendFile(path.join(__dirname, "/static/auta.html"))
})

app.get('/drzewa', function (req, res) {
    res.sendFile(path.join(__dirname, "/static/drzewa.html"))
})

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})