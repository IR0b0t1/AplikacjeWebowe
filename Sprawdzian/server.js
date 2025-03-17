const express = require("express")
const hbs = require('express-handlebars');
const app = express()
const PORT = 3000;
const path = require("path");

const context = require("./data/data.json")
console.log(context)

app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    helpers: {
        Year: function (year) {
            if (year < 2000) {
                return "Stare";
            }
            else {
                return "Nowe";
            }
        },
        Damaged: function (damage) {
            if (damage) {
                return "Tak";
            } else {
                return "Nie";
            }
        },
        Color: function (color) {
            let hex = "#" + color;
            return hex
        },
        isEqual: function (value, equal) {
            if (value[0] == equal) {
                return true;
            } else {
                return false
            }
        }
    }
}));

let lettersBefore = []
for (let i = 0; i < context.cars.length; i++) {
    lettersBefore.push(context.cars[i].car_name[0])
}
lettersBefore.sort()
let letters = new Set(lettersBefore)
console.log(letters)

context.letters = letters
console.log(context)

let carsBefore = []
for (let i = 0; i < context.cars.length; i++) {
    carsBefore.push(context.cars[i].car_name)
}
carsBefore.sort()
let carsData = new Set(carsBefore)
console.log(carsData)

context.carsData = carsData
console.log(context)

app.set('view engine', 'hbs');
app.use(express.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.render('index.hbs', context);
})

app.get("/handleForm", function (req, res) {
    console.log(req.query)
    let filtered = {
        cars: [
        ]
    }
    let cars = []
    for (let i = 0; i < context.cars.length; i++) {
        if (context.cars[i].car_name[0] == req.query.carsL) {
            let car = {
                car_name_f: context.cars[i].car_name,
                car_type_f: context.cars[i].car_type,
                hex: context.cars[i].hex_color,
            }
            cars.push(car)
        }
    }
    console.log(cars)
    context.filtered = cars
    console.log(context)
    res.render('filter.hbs', context)
})

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})