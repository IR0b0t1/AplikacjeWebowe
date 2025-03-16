const express = require("express");
const formidable = require("formidable");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static("static"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/static/fetch6.html"));
});

app.post("/api", function (req, res) {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, "/static/upload");
    form.keepExtensions = true;

    let filePaths = [];

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: "File upload failed" });
            return;
        }

        const file = files.file;
        filePaths.push(`/upload/${path.basename(file.path)}`);

        setTimeout(() => {
            res.json({
                message: "File uploaded successfully!",
                filePath: filePaths[0],
            });
        }, 1000);
    });
});

app.listen(PORT, function () {
    console.log("Server running on port: " + PORT);
});
