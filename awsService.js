const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const ID = process.env.ACCESS_KEY_ID;
const SECRET = process.env.SECRET_ACCESS_KEY;

const BUCKET_NAME = 'test-bucket-chen';


const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});


const params = {
    Bucket: process.env.BUCKET_NAME,
    CreateBucketConfiguration: {
        LocationConstraint: "eu-west-1"
    }
};

// s3.createBucket(params, function (err, data) {
//     if (err) console.log(err, err.stack);
//     else console.log('Bucket Created Successfully', data.Location);
// });

// module.exports = AWS;