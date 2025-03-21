require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const menuRoutes = require('./routes/menuRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


const frontEndPath = path.join(__dirname, '../client/dist');
app.use(express.static(frontEndPath));
app.get('/', (req, res) => {
  res.sendFile(path.join(frontEndPath, 'index.html'));
});

// Routes
app.use('/api/menus', menuRoutes);
app.use('/api/menu-items', menuItemRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 