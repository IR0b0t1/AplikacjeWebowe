// Express + port
const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path");
app.use(express.urlencoded({
  extended: true
}));

let autka = ["audi", "opel", "francuz", "duży fiat", "mercedes", "małe fajne autko"]

// GET-y
app.get("/", function(req, res){
 })

app.post("/handleForm", function(req, res){
    console.log(req.body)
    res.send(req.body)
})

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})