const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Serve Static Files from 'public' directory
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d', // Cache static assets
  etag: true
}));

// Path for storing contact form submissions
const DATA_DIR = path.join(__dirname, 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// API Health Check Endpoint (Essential for Cloud Hosting like Render, Railway, AWS)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    owner: 'นายวีรภัทร ชื่นภิรมย์ (Veeraphat Chuenphirom)',
    major: 'Computer Science (วิทยาการคอมพิวเตอร์)',
    university: 'มหาวิทยาลัยราชภัฏเพชรบุรี (Phetchaburi Rajabhat University)'
  });
});

// API Profile Details Endpoint
app.get('/api/profile', (req, res) => {
  res.status(200).json({
    name: 'นายวีรภัทร ชื่นภิรมย์',
    nameEn: 'Veeraphat Chuenphirom',
    nickname: 'กาย (Guy)',
    title: 'Computer Science Student / Software Developer',
    education: {
      university: 'มหาวิทยาลัยราชภัฏเพชรบุรี',
      universityEn: 'Phetchaburi Rajabhat University (PBRU)',
      degree: 'วิทยาศาสตรบัณฑิต (วท.บ.) สาขาวิทยาการคอมพิวเตอร์',
      degreeEn: 'Bachelor of Science (B.Sc.) in Computer Science',
      status: 'Currently Studying / Available for Internship & Full-time'
    },
    contact: {
      email: 'veeraphat.ch@example.com',
      phone: '+66 8X-XXX-XXXX',
      github: 'https://github.com/veeraphat-ch',
      linkedin: 'https://linkedin.com/in/veeraphat-ch',
      location: 'Bangkok, Thailand'
    }
  });
});

// API Contact Endpoint (Handles contact form submission)
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'กรุณากรอกชื่อ อีเมล และข้อความให้ครบถ้วน (Please fill in all required fields)'
      });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'รูปแบบอีเมลไม่ถูกต้อง (Invalid email format)'
      });
    }

    const newMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      subject: (subject || 'No Subject').trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    };

    // Save message to local messages.json file (for local / persistent storage)
    let messages = [];
    try {
      const fileData = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      messages = JSON.parse(fileData);
    } catch {
      messages = [];
    }

    messages.unshift(newMessage);
    // Keep max 100 recent messages
    if (messages.length > 100) messages = messages.slice(0, 100);

    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');

    console.log(`[Contact Form Received] From: ${newMessage.name} <${newMessage.email}> - Subject: ${newMessage.subject}`);

    return res.status(200).json({
      success: true,
      message: 'ส่งข้อความเรียบร้อยแล้ว ขอบคุณที่ติดต่อครับ! (Message sent successfully!)',
      receivedAt: newMessage.createdAt
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการส่งข้อความ โปรดลองใหม่อีกครั้ง (Internal Server Error)'
    });
  }
});

// Fallback Route for SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Resume Server is running on port ${PORT}`);
  console.log(`🔗 Local URL: http://localhost:${PORT}`);
  console.log(`👨‍💻 Owner: นายวีรภัทร ชื่นภิรมย์ (Computer Science)`);
  console.log(`====================================================`);
});

module.exports = app;
