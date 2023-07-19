import formidable from "formidable-serverless";
import { Form } from "../model/model.js";

const uploadFormDetails = async (req, res) => {
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

    Form.create(fileDetails)
      .then((file) => {
        console.log("File saved to MongoDB:", file);
        res.status(200).json({ message: "File uploaded and saved" });
      })
      .catch((err) => {
        console.error("Error saving file to MongoDB:", err);
        res.status(500).json({ message: "Failed to save file" });
      });
  });
};

export const FormController = { uploadFormDetails };
