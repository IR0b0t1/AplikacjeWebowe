// Express + port
const { count } = require("console");
const express = require("express")
const app = express()
const PORT = 3000;

// GET-y
app.get('/', function (req, res) {
    console.log(req.query)
    console.log(req.query.p1)
    res.send(req.query)
});

app.get('/user/:id', function (req, res) {
    let id = req.params.id
    if (id == 2)
        res.send("odsyłam stronę usera z id = 2")
    else
        res.send("taki user nie istnieje")
});

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})