//file_upload_example
// Import required modules
import express from "express";
import mongoose from "mongoose";
import formidable from "formidable-serverless";
import cors from "cors";

// Create an Express application
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/file_upload_example", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect To MongoDB Database");
  })
  .catch((err) => console.log(err));

// Define the File model

const File = mongoose.model(
  "File",
  new mongoose.Schema({
    filename: String,
    originalname: String,
    mimetype: String,
    size: Number,
    path: String,
  })
);

// Define a route to handle file uploads
app.post("/upload", (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error parsing form:", err);
      return res.status(500).json({ message: "Failed to process file upload" });
    }

    const file = files.file;
    if (!file) {
      return res.status(400).json({ message: "No file received" });
    }

    // Save the file details in MongoDB
    const fileDetails = {
      filename: file.name,
      originalname: file.name,
      mimetype: file.type,
      size: file.size,
      path: file.path,
    };

    // Save the file details to the MongoDB collection
    const newFile = new File(fileDetails);
    newFile
      .save()
      .then((file) => {
        console.log("File saved to MongoDB:", file);
        res.status(200).json({ message: "File uploaded and saved" });
      })
      .catch((err) => {
        console.error("Error saving file to MongoDB:", err);
        res.status(500).json({ message: "Failed to save file" });
      });
  });
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
