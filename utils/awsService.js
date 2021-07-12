const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});



module.exports = { s3 }