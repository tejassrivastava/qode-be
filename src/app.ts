// Import the required modules
import express, { Request, Response } from "express";
import mongoose, { Schema, Model, Document } from "mongoose";
import multer from "multer";
import path from "path";
import cors from "cors";
import * as fsextra from "fs-extra";
// Create an express app
const app: express.Application = express();
app.use(cors());
app.use(express.static("public"));

// Connect to MongoDB using mongoose
mongoose.connect(
  "mongodb+srv://kogoh87581:1jaOgwB8DSYY45u0@cluster0.lspzhku.mongodb.net/qode?retryWrites=true&w=majority",
  { autoCreate: true}
);

// Define an interface for photo documents
interface IPhoto extends Document {
  filename: string;
  url: string;
  comment: string;
  date: { type: Date; required: true; default: Date};
}

// Create a schema for photos
const photoSchema: Schema = new Schema({
  filename: String,
  url: String,
  comment: String,
  date: Date,
});

// Create a model for photos
const Photo = mongoose.model("Photo", photoSchema);

// Define a destination and filename for multer disk storage
const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "public");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create a multer instance with the disk storage
const upload: multer.Multer = multer({ storage });

// Define the /upload route to handle POST requests with a single file
app.post(
  "/upload",
  upload.single("photo"),
  async (req: Request, res: Response) => {
    
    // Create a new photo document with the uploaded file and comments
    const photo = new Photo({
      filename: req?.file?.filename,
      url: `https://${req.hostname}/` + req?.file?.filename,
      comment: req.body.comment,
      date: Date.now(),
    });

    // Save the photo document to the database
    try {
      const response = await photo.save();
      console.log(response);
      if (response) {
        res
          .status(200)
          .send({
            message: "Photo uploaded successfully.",
            comment: response._doc.comment,
            filename: response._doc.filename,
            url: response._doc.url,
            date: response._doc.date,
          });
      } else {
        res
          .status(500)
          .send({ error: "An error occurred while saving the photo." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error });
    }
  }
);

// Define the /getPhoto route to handle GET requests
app.get("/getPhoto", async (req: Request, res: Response) => {
  // Find all photos in the database
  try {
    const response = await Photo.find().sort({ date: -1 });
    if (response) {
      res.status(200).send(response);
    } else {
      // Send the photos array as the response
      res
        .status(500)
        .send({ error: "An error occurred while fetching the photos." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }
});

app.get("/clean", async (req: Request, res: Response) => {
  try {
    await fsextra.emptyDir("public");
    console.log("success!");
    res.send({ msg: "success" });
  } catch (err) {
    console.error(err);
    res.send({ error: "Clean Failed" });
  }
});
// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server started on port 3000.");
});
