// Express + port
const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path");
app.use(express.urlencoded({
  extended: true
}));

let autka = ["audi", "opel", "francuz", "duży fiat", "mercedes", "małe fajne autko"]

// GET-y
app.get("/", function (req, res) {
  let expression = `<form action="/handleForm" method="POST" style="border: 1px solid gray; background: green;">`
  for (let i = 0; i < autka.length; i++) {
    expression += `<p>${autka[i]}</p><input type="radio" name="${autka[i]}" value="nowe"><input type="radio" name="${autka[i]}" value="uzywane"><input type="radio" name="${autka[i]}" value="powypadkowy">`
  }
  expression += `<button type="submit">Submit</button></form>`
  res.send(expression)
})

app.post("/handleForm", function (req, res) {
  console.log(req.body)
  const wartosci = Object.values(req.body);
  let expression = {
    nowe: 0,
    uzywane: 0,
    powypadkowy: 0,
  }
  console.log(wartosci)
  for (let i = 0; i < wartosci.length; i++) {
    if (wartosci[i] == 'nowe') {
      expression.nowe += 1
    } else if (wartosci[i] == 'uzywane') {
      expression.uzywane += 1
    } else {
      expression.powypadkowy += 1
    }
  }
  res.send(expression)
})

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
  console.log("Serwer aktywowany na porcie: " + PORT)
})