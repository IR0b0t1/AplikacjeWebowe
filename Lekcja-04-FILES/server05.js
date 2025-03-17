const express = require("express");
const formidable = require('formidable');
const app = express();
const PORT = 3000;
const path = require("path");
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/static/fetch01.html"));
});

app.post("/api", function (req, res) {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: "File upload failed" });
            return;
        }

        const file = files.file;
        const responseData = {
            message: "file uploaded!",
            data: {
                name: file.name,
                size: file.size,
                date: new Date().toISOString()
            }
        };

        res.json(responseData);
    });
});

app.use(express.static('static'));

app.listen(PORT, function () {
    console.log("Serwer aktywowany na porcie: " + PORT);
});
