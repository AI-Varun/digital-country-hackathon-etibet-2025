// server/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorMiddleware = require('./middleware/error');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Add both localhost and IP
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/wallet', require('./routes/wallet'));
app.use('/api/passport', require('./routes/passport'));
app.use('/api/reputation', require('./routes/reputation'));

// Error Handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));