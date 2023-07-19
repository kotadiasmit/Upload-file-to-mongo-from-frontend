import mongoose from "mongoose";

const Schema = mongoose.Schema;
const FormSchema = new Schema({
  filename: String,
  originalname: String,
  mimetype: String,
  size: Number,
  path: String,
});
export const Form = mongoose.model("form", FormSchema);
