// Express + port
const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path");
app.use(express.urlencoded({
    extended: true
}));

// GET-y
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/static/formularz.html"))

})

app.post("/", function (req, res) {
    let message = ""
    let wynik = 0
    let wynikTab = []
    let a = parseInt(req.body.a)
    let b = parseInt(req.body.b)
    console.log(req.body)
    if (req.body.type == "suma") {
        wynik = a + b
        message = "suma 2 elementów"
        const x = { message: message, wynik: wynik }
        wynikTab.push(x)
    }
    if (req.body.type == "różnica") {
        wynik = a - b
        message = "różnica 2 elementów"
        const x = { message: message, wynik: wynik }
        wynikTab.push(x)
    }
    if (req.body.type == "iloczyn") {
        wynik = a * b
        message = "iloczyn 2 elementów"
        const x = { message: message, wynik: wynik }
        wynikTab.push(x)
    }
    if (req.body.type == "iloraz") {
        if (b != 0) {
            wynik = a / b
        } else {
            wynik = "Nie można dzielić przez zero"
        }
        message = "iloraz 2 elementów"
        const x = { message: message, wynik: wynik }
        wynikTab.push(x)
    }
    if (req.body.type == "wszystkie") {
        wynik = a + b
        message = "suma 2 elementów"
        let eins = { message: message, wynik: wynik }
        wynik = a - b
        message = "różnica 2 elementów"
        let zwei = { message: message, wynik: wynik }
        wynik = a * b
        message = "iloczyn 2 elementów"
        let drei = { message: message, wynik: wynik }
        wynik = a / b
        message = "iloraz 2 elementów"
        let vier = { message: message, wynik: wynik }
        wynikTab.push(eins)
        wynikTab.push(zwei)
        wynikTab.push(drei)
        wynikTab.push(vier)
    }
    wynikTab = JSON.stringify(wynikTab, null, 5)
    console.log(wynikTab)
    res.send(wynikTab)
})

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})