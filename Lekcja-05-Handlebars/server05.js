// Express + port
const express = require("express")
const hbs = require('express-handlebars');
const app = express()
const PORT = 3000;
const path = require("path");
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');
app.use(express.urlencoded({
    extended: true
}));

const context = {
    subject: "ćwiczenie 5 - dane z tablicy, radio",
    fields: [
        { name: "title" },
        { name: "author" },
        { name: "lang" }
    ],
    books: [
        { title: "Lalka", author: "B Prus", lang: "PL" },
        { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
        { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
        { title: "Zamek", author: "F Kafka", lang: "CZ" }
    ]
}

// GET-y
app.get("/", function (req, res) {
    res.render('index5.hbs', context);
})

app.get("/handleForm", function (req, res) {
    console.log(req.query.show)
    switch (req.query.show) {
        case "title":
            res.render("handle5.hbs", { data: context.books.map(element => element.title) })
            break
        case "author":
            res.render("handle5.hbs", { data: context.books.map(element => element.author) })
            break
        case "lang":
            res.render("handle5.hbs", { data: context.books.map(element => element.lang) })
            break
        default:
            res.render("handle5.hbs", { data: ["Nie wybrano żadnej opcji"] })
            break
    }
})

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})