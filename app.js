// ✅ Basic setup:
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const roleRoutes = require('./routes/role');
const jobRoutes = require("./routes/jobRoutes");
const employerRoutes = require("./routes/employer");
const userRoutes = require('./routes/userRoutes'); // your custom routes
const candidateRoutes = require("./routes/candidate");
const resultRoutes = require("./routes/resultRoutes");
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
  credentials: true
}));

// ✅ Add the routes:
app.use("/api", employerRoutes);
app.use("/api", candidateRoutes);
app.use('/api/users', userRoutes);
app.use('/api/role', roleRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/results", resultRoutes);
app.use("/uploads", express.static("uploads"));
// ✅ Other routes (optional)
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// ✅ DB connect + listen
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
console.log('JWT_SECRET at startup:', process.env.JWT_SECRET);
