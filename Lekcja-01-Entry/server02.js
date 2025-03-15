// Express + port
const express = require("express")
const app = express()
const PORT = 3000;

// GET-y
app.get("/", function (req, res) {
    res.send("Dane HTML odesłane z serwera do przeglądarki")
})


app.get("/index01", function (req, res) {
    res.send("<div style='background: rgb(211,211,211); padding: 100px; color: red; border-bottom: 1px solid black;'><h1>strona 1</h1></div>")
})


app.get("/index02", function (req, res) {
    res.send("<div style='background: rgb(211,211,211); padding: 100px; color: green; border-bottom: 1px solid black;'><h1>strona 2</h1></div>")
})


app.get("/index03", function (req, res) {
    res.send("<div style='background: rgb(211,211,211); padding: 100px; color: blue; border-bottom: 1px solid black;'><h1>strona 3</h1></div>")
})

app.get('/test', function (req, res) {
    console.log(req.query)
    console.log(req.query.p1)
    console.log(req.query.p1)
    res.send(req.query)
});

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})