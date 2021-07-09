const express = require("express");
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp')
const uuid = require('uuid')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const s3Bucket = require('../utils/awsService')


const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
})
const upload = multer({ storage }).single('image', 1)

router.post('/upload', upload, async (req, res) => {
    if (!req.file) {
        res.status(404).json({
            message: "please add file to response"
        })
        return
    }
    images = await resizeImages(req.file)
    const responses = await Promise.all(
        images.map(param => s3Bucket.s3.upload(param).promise())
    )


    res.status(200).send(responses)
})


const resizeImages = async (image) => {
    let myFile = image.originalname.split(".")
    const fileType = myFile[myFile.length - 1]
    const imageSizes = [
        { sizeName: 'large', sizeInt: 2048 },
        { sizeName: 'medium', sizeInt: 1024 },
        { sizeName: 'thumb', sizeInt: 300 },
    ]
    const params = [];
    for (s of imageSizes) {

        const manipulatedImage = await sharp(image.buffer)
            .metadata()
            .then(() => sharp(image.buffer)
                .resize({
                    width: s['sizeInt'],
                    height: s['sizeInt'],
                })
                .toBuffer()
            );
        params.push({
            Bucket: process.env.BUCKET_NAME,
            name: s['sizeName'],
            Key: `${uuid()}.${s['sizeName']}.${fileType}`,
            Body: manipulatedImage
        })
    }
    return params;

}


module.exports = router;
