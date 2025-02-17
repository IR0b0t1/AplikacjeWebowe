// Express + port
const { count } = require("console");
const express = require("express")
const app = express()
const PORT = 3000;

// GET-y
app.get('/', function (req, res) {
    console.log(req.query)
    console.log(req.query.count)
    console.log(req.query.bg)
    let count = req.query.count
    let bg = req.query.bg
    let k="<div style='display: flex; flex-wrap: wrap;'>"
    for(let i=0;i<count;i++){
        k+=`<div style="background: ${bg}; margin: 5px; width: 100px; height: 100px; display: flex; justify-content: center; align-items: center;"><p>${i+1}</p></div>`
    }
    k+="</div>"
    res.send(k)
});

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})