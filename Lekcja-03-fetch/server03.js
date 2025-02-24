// Express + port
const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path");
app.use(express.json());

// GET-y
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/static/formularz3.html"))
})

app.post("/test", function (req, res) {
    const data = req.body
    const rgba = `${data.r}, ${data.g}, ${data.b}, ${data.a}`
    console.log(rgba)
    res.send(rgba)
})

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})