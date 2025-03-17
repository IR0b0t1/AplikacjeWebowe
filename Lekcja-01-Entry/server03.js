// Express + port
const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")

// GET-y
app.get("/", function (req, res) {
    console.log("ścieżka do katalogu głównego aplikacji: " + __dirname)
    res.sendFile(path.join(__dirname, "/static/strona.html"))

})

app.get("/strona", function (req, res) {
    res.sendFile(path.join(__dirname, "/static/strona.html"))
    console.log(__dirname)
})

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})