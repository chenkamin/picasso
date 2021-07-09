const AWS = require('aws-sdk');
const s3Bucket = require('./awsService')
const express = require('express');
const multer = require('multer');
const app = express();
const uuid = require('uuid')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({ storage }).single('image', 1)
app.post('/upload', upload, async (req, res) => {
    console.log(req.file)
    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]

    // console.log(req.file)
    const params = [
        {
            Bucket: process.env.BUCKET_NAME,
            Key: `${uuid()}.${fileType}`,
            Body: req.file.buffer
        },
        {
            Bucket: process.env.BUCKET_NAME,
            Key: `${uuid()}111.${fileType}`,
            Body: req.file.buffer
        },
        {
            Bucket: process.env.BUCKET_NAME,
            Key: `${uuid()}222.${fileType}`,
            Body: req.file.buffer
        }
    ]

    const responses = await Promise.all(
        params.map(param => s3Bucket.s3.upload(param).promise())
    )

    res.status(200).send(responses)
    // s3Bucket.s3.upload(params, (error, data) => {
    //     if (error) {
    //         res.status(500).send(error)
    //     }
    //     res.status(200).send(data)
    // })
})

app.get("/health", (req, res) => {
    res.status(200).json({
        message: "hello world"
    })
})

module.exports = app;
