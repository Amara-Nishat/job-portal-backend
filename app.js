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

// 🔴 UPDATED CORS FOR VERCEL (Live + Local dono chalenge)
app.use(cors({
  origin: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
  credentials: true
}));
// 🔴 Vercel Preflight Requests (OPTIONS) ko handle karne ke liye yeh lazmi add karein
app.options('*', cors());
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
  res.send('Server is running seamlessly on Vercel! 🚀');
});

// ✅ DB connect (Aapke database variable ka naam MONGODB_URI hai, .env mein bhi yahi hona chahiye)
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 🔴 LOCAL DEVELOPMENT CONTROL (Live par app.listen nahi chalta)
// ✅ RAILWAY & LOCAL BOTH SUPPORTED (Ab yeh live par bhi listen karega)
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));

console.log('JWT_SECRET at startup:', process.env.JWT_SECRET);

// Isay aap bhale aise hi rehne dein, koi masla nahi hai
module.exports = app;
console.log('JWT_SECRET at startup:', process.env.JWT_SECRET);

// 🔴 VERCEL REQUIRED EXPORT: Is file ke bilkul end par yeh hona lazmi hai
module.exports = app;