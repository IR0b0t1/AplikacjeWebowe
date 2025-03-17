const express = require("express");
const formidable = require("formidable");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static("static"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/static/fetch5.html"));
});

app.post("/api", function (req, res) {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, "/static/upload");
    form.keepExtensions = true;

    let filePaths = [];

    form.on("progress", (bytesReceived, bytesExpected) => {
        const progress = (bytesReceived / bytesExpected) * 100;
        console.log(`Progress: ${progress}%`);
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: "File upload failed" });
            return;
        }

        for (const fileKey in files) {
            const file = files[fileKey];
            filePaths.push(`/upload/${path.basename(file.path)}`);
        }

        res.json({
            message: "Files uploaded successfully!",
            filePaths: filePaths,
        });
    });
});

app.listen(PORT, function () {
    console.log("Server running on port: " + PORT);
});
