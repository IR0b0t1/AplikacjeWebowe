// Express + port
const { count } = require("console");
const express = require("express")
const app = express()
const PORT = 3000;

// GET-y
app.get('/', function (req, res) {
    res.status(404).send("brak strony takiego produktu")
})

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})