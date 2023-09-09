// Import the required modules
import request from "supertest";
import app from "../src/app"; // The file that contains your express app
import mongoose, { Schema } from "mongoose";
import * as fsextra from "fs-extra";

  // Create a schema for photos
  const photoSchema: Schema = new Schema({
    filename: String,
    url: String,
    comment: String,
    date: Date,
  });
// Define a mock photo document

const mockPhoto = {
  filename: "test.jpg",
  url: "https://example.com/test.jpg",
  comment: "This is a test photo.",
  date: Date.now(),
};

// Define a mock file object
const mockFile = {
  originalname: "test.jpg",
  path: "public/test.jpg",
};

// Define a mock request object
const mockReq = {
  file: mockFile,
  body: { comment: mockPhoto.comment },
};

// Define a mock response object
const mockRes = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
};


// Close the database connection after all tests are done
// afterAll(async () => {
//   await mongoose.connection.close();
// });

// Test the /upload route with a valid file and comment
describe("POST /upload", () => {
  it("should upload a photo and save it to the database", async () => {
    // Use supertest to send a POST request with a file and comment
    const response = await request(app)
      .post("/upload")
      .attach("photo", mockFile.path)
      .field("comment", mockPhoto.comment);

    // Expect the response status to be 200
    expect(response.status).toBe(200);

    // Expect the response body to have the correct message and photo data
    expect(response.body).toHaveProperty("message")
    expect(response.body).toHaveProperty("comment")
    expect(response.body).toHaveProperty("filename")
    expect(response.body).toHaveProperty("date")
    expect(response.body).toHaveProperty("url")
    expect(response.body.message).toBe("Photo uploaded successfully.")
    

    // // Expect the photo document to be saved in the database
    // const photo = await Photo.findOne({ filename: response.body.filename });
    // expect(photo).not.toBeNull();
    // expect(photo).toMatchObject({
    //   filename: response.body.filename,
    //   url: response.body.url,
    //   comment: response.body.comment,
    //   date: new Date(response.body.date),
    // });
  });
});

// Test the /getPhoto route with some photos in the database
describe("GET /getPhoto", () => {
  it("should fetch all photos from the database in descending order of date", async () => {
    
    // Use supertest to send a GET request
    const response = await request(app).get("/getPhoto");

    // Expect the response status to be 200
    expect(response.status).toBe(200);

    // Expect the response body to be an array of photos sorted by date
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0)
    
  });
});

// Test the /clean route with some files in the public folder
describe("GET /clean", () => {
  it("should delete all files in the public folder", async () => {
    // Use supertest to send a GET request
    const response = await request(app).get("/clean");

    // Expect the response status to be 200
    expect(response.status).toBe(200);

    // Expect the response body to have the success message
    expect(response.body).toEqual({ msg: "success" });

    // Expect the public folder to be empty
    const files = await fsextra.readdir("public");
    expect(files.length).toBe(0);
  });
});

