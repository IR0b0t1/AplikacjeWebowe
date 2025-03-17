const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static("static"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/static/fetch3.html"));
});

app.post("/api", function (req, res) {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, "/static/upload");
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: "File upload failed" });
            return;
        }

        const file = files.file;
        const fileExtension = path.extname(file.name).toLowerCase();
        const filePath = `/upload/${path.basename(file.path)}`;

        if (fileExtension === ".txt") {
            fs.readFile(file.path, "utf8", function (err, data) {
                if (err) {
                    return res.status(500).json({ error: "Error reading text file" });
                }
                res.json({
                    type: "text",
                    content: data,
                });
            });
        } else if ([".jpg", ".jpeg", ".png", ".gif"].includes(fileExtension)) {
            res.json({
                type: "image",
                filePath: filePath,
            });
        } else {
            res.status(400).json({ error: "Unsupported file type" });
        }
    });
});

app.listen(PORT, function () {
    console.log("Server running on port: " + PORT);
});
