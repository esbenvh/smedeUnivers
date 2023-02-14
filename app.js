const express = require("express");
const bodyParser = require("body-parser");
const upload = require("express-fileupload");
const app = express();
const port = 3000;
const date = require(__dirname + "/date.js");
const fs = require("fs");

app.use(upload());

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("list");
});

app.post("/", (req, res) => {
    if (req.files) {
        console.log(req.files);
        var file = req.files.file;
        var filename = file.name;
        console.log(filename);
        file.mv("./public/uploads/" + filename, function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send("File Uploaded");
            }
        });
    }
});

app.post("/deleteFile", (req, res) => {
    img = req.body.fileImg;
    console.log(img);
    deleteFile();
    res.redirect("/");
});

let fileName = "cat-2083492__340.jpg";
const path = "./public/uploads/";
let fullPath = path + fileName;

function deleteFile() {
    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(fileName + " er blevet slettet.");
    });
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
