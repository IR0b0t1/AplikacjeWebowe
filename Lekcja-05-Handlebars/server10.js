const express = require("express");
const fs = require("fs");
const path = require("path");
const hbs = require("express-handlebars");

const app = express();
const PORT = 3000;
const DATA_PATH = path.join(__dirname, "data/data10.json");

app.set("views", path.join(__dirname, "views"));

app.engine(
    "hbs",
    hbs({
        defaultLayout: "main.hbs",
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
        },
    })
);

app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));

function getData() {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
}

app.get("/", function (req, res) {
    const context = getData();
    res.render("index10.hbs", context);
});

app.post("/update-title", function (req, res) {
    const newTitle = req.body.title;
    if (!newTitle.trim()) {
        return res.redirect("/");
    }

    const data = getData();
    data.title = newTitle;

    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf8");

    res.redirect("/");
});

app.use(express.static("static"));

app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT);
});
