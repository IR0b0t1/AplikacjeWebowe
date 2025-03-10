// Express + port
const express = require("express")
const hbs = require('express-handlebars');
const app = express()
const PORT = 3000;
const path = require("path");
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');

// GET-y
app.get("/", function (req, res) {
    res.render('main.hbs');
})

app.get("/index1", function (req, res) {
    res.render('index1.hbs');
})

app.get("/login", function (req, res) {
    res.render('login.hbs');
})

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})