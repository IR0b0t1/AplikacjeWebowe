
// Express + port
const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")

// GET-y
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/static/formularz.html"))    
 })

app.get("/handleForm", function(req, res){
    res.send(`<body style='background: ${req.query.color}; text-align: center;'>${req.query.color}</div>`)
})

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})