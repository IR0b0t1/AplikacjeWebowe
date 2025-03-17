const express = require("express");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
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

    form.on("progress", (bytesReceived, bytesExpected) => {
        const progress = Math.round((bytesReceived / bytesExpected) * 100);
        console.log(`Progress: ${progress}%`);
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: "File upload failed" });
            return;
        }

        const file = files.file;
        const filePath = `/upload/${path.basename(file.path)}`;

        setTimeout(() => {
            if (filePath.endsWith(".txt")) {
                fs.readFile(file.path, "utf8", (err, data) => {
                    if (err) {
                        res.status(500).json({ error: "Failed to read text file" });
                    } else {
                        res.json({
                            message: "File uploaded successfully!",
                            filePath,
                            content: data
                        });
                    }
                });
            } else {
                res.json({
                    message: "File uploaded successfully!",
                    filePath
                });
            }
        }, 1000);
    });
});

app.listen(PORT, function () {
    console.log("Server running on port: " + PORT);
});
