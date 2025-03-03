// Express + port
const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path");
app.use(express.json());

// GET-y
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/static/fetch1.html"))
})

app.post("/test", function (req, res) {
    const data = req.body
    console.log(data)
    res.send(data)
})

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})