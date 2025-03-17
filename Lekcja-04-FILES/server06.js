const express = require("express");
const formidable = require('formidable');
const path = require("path");
const app = express();
const PORT = 3000;
app.use(express.static('static'));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/static/fetch2.html"));
});

app.post("/api", function (req, res) {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '/static/upload');
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: "File upload failed" });
            return;
        }

        const file = files.file;
        const filePath = `/upload/${path.basename(file.path)}`;

        const responseData = {
            message: "File uploaded!",
            filePath: filePath,
        };

        res.json(responseData);
    });
});

app.listen(PORT, function () {
    console.log("Server running on port: " + PORT);
});
