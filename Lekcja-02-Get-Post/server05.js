// Express + port
const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path");
app.use(express.urlencoded({
    extended: true
}));

let users = [
    { nick: "111", email: "111@w.pl" },
    { nick: "222", email: "222@w.pl" },
    { nick: "333", email: "333@w.pl" }
]

// GET-y
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/static/formularz4.html"))
})

app.post("/handleForm", function (req, res) {
    const input = req.body
    let exists = users.some(user => user.email === input.email);
    if (exists) {
        expression = '<p>Taki email już istnieje</p><form action="/" method="GET"><button type="submit">Powrót</button></form>'
    } else {
        users.push(input)
        console.log(users)
        expression = '<p>Dodano email do bazy</p><form action="/" method="GET"><button type="submit">Powrót</button></form>'
    }
    res.send(expression)
})

app.post("/removeUserBySelect", function (req, res) {
    let expression = `<form action="/deleteUser" method="POST" style="border: 1px solid gray; background: green;"><select name="email">`
    for (let i = 0; i < users.length; i++) {
        expression += `<option value='${users[i].email}'>${users[i].email}</option>`
    }
    expression += `</select><button type="submit">Submit</button></form>`
    res.send(expression)
})

app.post("/removeUserByRadio", function (req, res) {
    let expression = `<form action="/deleteUser" method="POST" style="border: 1px solid gray; background: green;">`
    for (let i = 0; i < users.length; i++) {
        expression += `<input type="radio" name="email" value='${users[i].email}'>${users[i].email}</input>`
    }
    expression += `<button type="submit">Submit</button></form>`
    res.send(expression)
})

app.post("/removeUserByCheckboxes", function (req, res) {
    let expression = `<form action="/deleteUser" method="POST" style="border: 1px solid gray; background: green;">`
    for (let i = 0; i < users.length; i++) {
        expression += `<input type="checkbox" name="email" value='${users[i].email}'>${users[i].email}</input>`
    }
    expression += `<button type="submit">Submit</button></form>`
    res.send(expression)
})

app.post("/deleteUser", function (req, res) {
    const input = req.body;
    console.log(input.email);

    if (Array.isArray(input.email)) {
        users = users.filter(user => !input.email.includes(user.email));
    } else {
        users = users.filter(user => user.email !== input.email);
    }

    res.send(`<p>Usunięto: ${input.email}</p><form action="/" method="GET"><button type="submit">Powrót</button></form>`);
});

// Static
app.use(express.static('static'))

// Listening
app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT)
})