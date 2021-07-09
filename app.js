const AWS = require('aws-sdk');
const s3Bucket = require('./awsService')
const express = require('express');
const multer = require('multer');
const app = express();
const uuid = require('uuid')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const sharp = require('sharp')


const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
})

const upload = multer({ storage }).single('image', 1)
app.post('/upload', upload, async (req, res) => {
    // console.log(req.file)
    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]
    const scaleByHalf = await sharp(req.file.buffer)
        .metadata()
        .then(() => sharp(req.file.buffer)
            .resize({
                width: 300,
                height: 300,
            })
            .toBuffer()
        );
    console.log(scaleByHalf);

    const params = [
        {
            Bucket: process.env.BUCKET_NAME,
            Key: `${uuid()}.${fileType}`,
            Body: scaleByHalf
        }
    ]

    const responses = await Promise.all(
        params.map(param => s3Bucket.s3.upload(param).promise())
    )

    res.status(200).send(responses)
})

app.get("/health", (req, res) => {
    res.status(200).json({
        message: "hello world"
    })
})

module.exports = app;
