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
    console.log(req.query)
    res.send(req.query)
})

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})