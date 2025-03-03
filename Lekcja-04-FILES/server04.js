// Express + port
const express = require("express")
const formidable = require('formidable');
const app = express()
const PORT = 3000;
const path = require("path");
app.use(express.json());

// GET-y
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/static/formularz4.html"))
})

app.post('/handleUpload', function (req, res) {
    res.header("content-type", "application/json")

    let form = formidable({});
    let formProgress = []

    const response = {
        responseTab: "",
        time: ""
    }

    let seconds = 0;
    let miliseconds = 0;

    form.uploadDir = __dirname + '/static/upload/'

    form.on("progress", function (bytesReceived, bytesExpected) {
        console.log(form.bytesExpected, form.bytesReceived);
        const data = {
            bytesExpected: form.bytesExpected,
            bytesReceived: form.bytesReceived,
            uploadTime: `czas bierzący: ${new Date().getSeconds()} sekunda, ${new Date().getMilliseconds()} milisekunda`
        }
        console.log(data)
        formProgress.push(data)
    })

    form.on("fileBegin", function (name, value) {
        seconds = new Date().getSeconds();
        miliseconds = new Date().getMilliseconds();
    })

    form.on("end", function () {
        seconds = new Date().getSeconds() - seconds;
        miliseconds = new Date().getMilliseconds() - miliseconds;
        response.time = (`cały zapis trwał: ${seconds} sekund, ${miliseconds} milisekund`)
        response.responseTab = formProgress
    })

    form.parse(req, function (err, fields, files) {
        res.send(JSON.stringify(response, null, 5))
    });

});

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})