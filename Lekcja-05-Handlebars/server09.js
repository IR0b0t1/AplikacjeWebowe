// Express + port
const express = require("express")
const hbs = require('express-handlebars');
const app = express()
const PORT = 3000;
const path = require("path");
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    helpers: {
        shortTitle: function (title) {
            return title.substring(0, 10) + "...";
        },
        bigLetters: function (text) {
            return text
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        },
        dashBetweenLetters: function (text) {
            return text
                .split(" ")
                .map(word => word.split("").join("-"))
                .join(" ");
        },
    }
}));
app.set('view engine', 'hbs');
app.use(express.urlencoded({
    extended: true
}));
const context = require("./data/data09.json")
console.log(context)

// GET-y
app.get("/", function (req, res) {
    res.render('index9.hbs', context);
})

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})