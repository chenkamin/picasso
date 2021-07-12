# picasso

Picasso is a nodejs app that converts resolutions and uploads images to aws s3 service.


Technologies : Nodejs, Mongo, Docker.

# To run the project


App:
- Clone the project.
- npm i.
- Create config.env and store the following variables:
- ACCESS_KEY_ID= type:string:aws-credentials
- SECRET_ACCESS_KEY= type:string:aws-credentials
- BUCKET_NAME= type:string
- JWT_SECRET= type:string

- Run node server.js


DB:
- There are 2 options running the db.
- If you have docker-compose installed in your computer
- 1. run the command
- ``` docker-compose up -d```
- If you have only docker installed
1.
- ```docker pull mongo:4.0.4```
2.
- ```docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:4.0.4```



# endpoints:
- POST api/v1/signup
- POST api/v1/login
- POST api/v1/upload
- upload route is protected by a middleware and allows only login users to use it . 

- if you are using postman:
- you can view postman collection in the project and import it to postman if needed
- remember to use the bearer token from login payload in /upload POST request.
- if you are not using postman here are some Curl examples:

# signup
```
 curl --location --request POST 'localhost:3000/api/v1/signup' \
--header 'Content-Type: application/json' \
--header 'Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWJlZTAyNTc2MDcxNTBjM2FjM2NlOSIsImlhdCI6MTYyNjA3NDY0OSwiZXhwIjoxNjMzODUwNjQ5fQ.dkhCqlG1ywAWryMGiRsO2Yh34QwzKgvf_mGN2OO91Bc' \
--data-raw '{
"name":"ringo star",
"email":"ringo@gmail.com",
"password":"pass12345",
"passwordConfirm":"pass12345"
}'
```
# login
```
 curl --location --request POST 'localhost:3000/api/v1/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWJlZTAyNTc2MDcxNTBjM2FjM2NlOSIsImlhdCI6MTYyNjA3NDY0OSwiZXhwIjoxNjMzODUwNjQ5fQ.dkhCqlG1ywAWryMGiRsO2Yh34QwzKgvf_mGN2OO91Bc' \
--data-raw '{
"email":"ringo@gmail.com",
"password":"pass12345"
```
# upload
```
POST -upload: curl --location --request POST 'localhost:3000/api/v1/upload' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWJlZTAyNTc2MDcxNTBjM2FjM2NlOSIsImlhdCI6MTYyNjA3NDY0OSwiZXhwIjoxNjMzODUwNjQ5fQ.dkhCqlG1ywAWryMGiRsO2Yh34QwzKgvf_mGN2OO91Bc' \
--header 'Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWJlZTAyNTc2MDcxNTBjM2FjM2NlOSIsImlhdCI6MTYyNjA3NDY0OSwiZXhwIjoxNjMzODUwNjQ5fQ.dkhCqlG1ywAWryMGiRsO2Yh34QwzKgvf_mGN2OO91Bc' \
--form 'image=@"/dir/file.img"'
}'
```
