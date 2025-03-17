const express = require("express");
const fs = require("fs");
const path = require("path");
const hbs = require("express-handlebars");
const app = express();
const PORT = 3000;
const DATA_PATH = path.join(__dirname, "data/data10.json");
app.set("views", path.join(__dirname, "views"));
app.engine('hbs', hbs({
    extname: '.hbs',
    partialsDir: "views/partials",
}));
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));

const context = require("./data/data12.json")
console.log(context)

app.get("/", function (req, res) {
    res.render("index12.hbs", context);
});

app.use(express.static("static"));

app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT);
});
