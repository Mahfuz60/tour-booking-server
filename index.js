import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoute from './routes/authRoute.js';
import usersRoute from './routes/usersRoute.js';
import hotelsRoute from './routes/hotelsRoute.js';
import hotelRoomRoute from './routes/hotelRoomRoute.js';
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

//Basic Setup Mongoose
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
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
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/hotelRoom', hotelRoomRoute);

app.listen(PORT, () => {
  connect();
  console.log(`Server is running at ${PORT}`);
});
