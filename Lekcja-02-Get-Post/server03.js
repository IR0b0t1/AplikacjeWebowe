// Express + port
const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path");
app.use(express.urlencoded({
  extended: true
}));

// GET-y
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/static/formularz2.html"))
       
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