// Express + port
const express = require("express")
const formidable = require('formidable');
const app = express()
const PORT = 3000;
const path = require("path");
app.use(express.json());

// GET-y
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/static/formularz.html"))
})

app.post('/handleUpload', function (req, res) {

    let form = formidable({});
    let dane = [];

    form.uploadDir = __dirname + '/static/upload/'

    form.parse(req, function (err, fields, files) {
        dane.push(fields)
        dane.push(files)
        console.log(dane)
        res.send(dane)
    });
});


// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})