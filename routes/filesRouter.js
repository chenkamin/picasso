const express = require("express");
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp')
const uuid = require('uuid')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const s3Bucket = require('../utils/awsService')
const authProtection = require('../utils/routeProtection')

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
})

//1 image per request
const upload = multer({ storage }).single('image', 1)

var imageSizes = [
    { sizeName: 'large', sizeInt: 2048 },
    { sizeName: 'medium', sizeInt: 1024 },
    { sizeName: 'thumb', sizeInt: 300 },
]


router.post('/upload', authProtection.protect, upload, async (req, res, next) => {
    if (!req.file) {
        res.status(404).json({
            message: "please add file"
        })
        return
    }
    images = await resizeImages(req.file)
    const responses = await Promise.all(
        images.map(image => s3Bucket.s3.upload(image).promise())
    )
    let imageLinks = responses.map((r, i) => {
        let linksObj = {}
        linksObj[imageSizes[i]['sizeName']] = r.Location
        return linksObj;
    });
    res.status(200).send(imageLinks)
})


const resizeImages = async (image) => {
    let fileForUpload = image.originalname.split(".")
    const fileType = fileForUpload[fileForUpload.length - 1]
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
