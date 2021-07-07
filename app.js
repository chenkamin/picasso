const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({ storage }).single('image')
app.post('/upload', upload, (req, res) => {
    console.log(req.file)
})
app.

    app.get("/health", (req, res) => {
        res.status(200).json({
            message: "hello world"
        })
    })

module.exports = app;
