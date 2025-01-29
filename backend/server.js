require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); 
const authRouter = require("./routes/authRoutes")

const app = express();
connectDB();

app.use(express.json());
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
