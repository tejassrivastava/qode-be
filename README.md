# Qode API

This contains all the API implementation

# About the project implementation

## Tech Stack

- Backend Framework: Express.js
- Database: Mongodb
- Upload Library: Multer
- Test: Jest & Supertest

## Run Locally

Clone the project

```bash
 git clone <Repo URL>
```

Go to the project directory

```bash
  cd qode-be
```

Install dependencies

```bash
  npm install
```

Start the server:

this command will automatically start both the frontend as well as express server.

```bash
  npm run dev
```

API server

```bash
http://localhost:3000/
```


## API Reference

#### Upload Images

```http
  POST /upload
```


#### Uploads the image & returns the upload object


```
{
  filename: '1694268576749.png',
  url: 'http://localhost:3000/1694268576749.png',
  comment: 'MyImage',
  _id: new ObjectId("64fc7ca0fb1d02fcbad4710c"),
  __v: 0
}
```

```http
  GET /getPhoto
```


#### Returns All Photos

```
{
  filename: '1694271453827.jpg',
  url: 'http://localhost:3000/1694271453827.jpg',
  comment: 'asd',
  date: 2023-09-09T14:57:33.833Z,
  _id: new ObjectId("64fc87dd22b0eaf40836fd35"),
  __v: 0
}
```

## Authors

- [@tejassrivastava](https://www.github.com/tejassrivastava)
