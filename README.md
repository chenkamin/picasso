# picasso

picasso is a nodejs app that convert resolutions and upload images to aws s3 service.

technologies : Nodejs, mongo, docker.

# to run the project


app:
- clone the project
- npm i
- create config.env and store the following variables
- ACCESS_KEY_ID= type=string
- SECRET_ACCESS_KEY= type=string
- BUCKET_NAME= type=string
- JWT_SECRET= type=string
- JWT_EXPIRES_IN= type=int+d  for example:10d
- JWT_COOKIE_EXPIRES_IN=int
- run node server.js


db:
there is 2 options running the db.
if you have docker-compose installed in your computer
1. run the command docker-compose up -d
if you have docker installed
1.docker pull mongo:4.0.4
2.docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:4.0.4




endpoints:
- POST api/v1/signup
- POST api/v1/login
- POST api/v1/upload
-if you are using postman:
-you can view postman collection int he project and import it to postman if needed
if you are not using postman here are some Curl examples:

POST -signup: curl --location --request POST 'localhost:3000/api/v1/signup' \
--header 'Content-Type: application/json' \
--header 'Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWJlZTAyNTc2MDcxNTBjM2FjM2NlOSIsImlhdCI6MTYyNjA3NDY0OSwiZXhwIjoxNjMzODUwNjQ5fQ.dkhCqlG1ywAWryMGiRsO2Yh34QwzKgvf_mGN2OO91Bc' \
--data-raw '{
"name":"ringo star",
"email":"ringo@gmail.com",
"password":"pass12345",
"passwordConfirm":"pass12345"
}'

POST -login: curl --location --request POST 'localhost:3000/api/v1/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWJlZTAyNTc2MDcxNTBjM2FjM2NlOSIsImlhdCI6MTYyNjA3NDY0OSwiZXhwIjoxNjMzODUwNjQ5fQ.dkhCqlG1ywAWryMGiRsO2Yh34QwzKgvf_mGN2OO91Bc' \
--data-raw '{
"email":"ringo@gmail.com",
"password":"pass12345"

POST -upload: curl --location --request POST 'localhost:3000/api/v1/upload' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWJlZTAyNTc2MDcxNTBjM2FjM2NlOSIsImlhdCI6MTYyNjA3NDY0OSwiZXhwIjoxNjMzODUwNjQ5fQ.dkhCqlG1ywAWryMGiRsO2Yh34QwzKgvf_mGN2OO91Bc' \
--header 'Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWJlZTAyNTc2MDcxNTBjM2FjM2NlOSIsImlhdCI6MTYyNjA3NDY0OSwiZXhwIjoxNjMzODUwNjQ5fQ.dkhCqlG1ywAWryMGiRsO2Yh34QwzKgvf_mGN2OO91Bc' \
--form 'image=@"/dir/file.img"'
}'
