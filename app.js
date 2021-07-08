const AWS = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const app = express();
const uuid = require('uuid')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const ID = process.env.ACCESS_KEY_ID;
const SECRET = process.env.SECRET_ACCESS_KEY;
const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
})


const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const upload = multer({ storage }).single('image')
app.post('/upload', upload, (req, res) => {

    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]

    // console.log(req.file)
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer
    }

    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send(error)
        }
        res.status(200).send(data)
    })
})

app.get("/health", (req, res) => {
    res.status(200).json({
        message: "hello world"
    })
})

module.exports = app;
