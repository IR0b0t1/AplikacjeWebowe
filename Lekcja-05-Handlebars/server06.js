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
    res.render('index6.hbs', context);
})

app.get("/handleForm", function (req, res) {
    let newContext = {}
    newContext.title = []
    newContext.author = []
    newContext.lang = []
    console.log(newContext)
    console.log("Req: " + req.query.show)
    console.log(req.query)
    req.query.show.forEach(element => {
        console.log(element)
        if (element == "title") {
            newContext.title = context.books.map(element => element.title)
        }
        if (element == "author") {
            newContext.author = context.books.map(element => element.author)
        }
        if (element == "lang") {
            newContext.lang = context.books.map(element => element.lang)
        }
    });
    switch (req.query.show) {
        case "title" || "author" || "lang":
            res.render("handle6.hbs", { data: newContext })
            break;
        default:
            res.render("handle6.hbs", { data: ["Nie wybrano żadnej opcji"] })
            break
    }
})

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})