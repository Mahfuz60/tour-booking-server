import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
// Connection URI
const url = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.udmgcdk.mongodb.net/?retryWrites=true&w=majority`;

//Basic Setup Mongoose
const connect = async () => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!');
});

//middleware
app.use(express.json());
app.use(cors());
app.use('/auth', authRoute);

app.listen(PORT, () => {
  connect();
  console.log(`Server is running at ${PORT}`);
});
