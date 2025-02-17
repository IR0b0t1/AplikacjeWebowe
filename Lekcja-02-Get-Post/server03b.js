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
    res.sendFile(path.join(__dirname, "/static/fromularz3b.html"))
       
 })

app.post("/handleForm", function(req, res){
    let size = req.body.size
    if(req.body.amount!=""&&req.body.kolor!=""&&size!=undefined){
        console.log(req.body)
        let lenght = req.body.amount
        console.log(lenght)
        let k = ""
        for(let i=0;i<lenght;i++){
            k+=`<div style="background: ${req.body.kolor}; border-radius: 50%; width: ${req.body.size}; height: ${req.body.size}; text-align: center;">${i}</div>`
        }
        res.send(k)
    }
    else{
        res.send("<p>Podaj wszystkie dane</p>")
    }
})

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})