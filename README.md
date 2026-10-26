# 🌐 เว็บไซต์เรซูเม่ & พอร์ตโฟลิโอ: นายวีรภัทร ชื่นภิรมย์
### สาขาวิทยาการคอมพิวเตอร์ (Computer Science Resume & Portfolio)
> พัฒนาด้วย **HTML5, CSS3, Modern JavaScript (ES6+), Node.js และ Express.js** พร้อมโครงสร้างมาตรฐานสำหรับขึ้นโฮสต์ (Production Deployment Ready)

---

## 🌟 ฟีเจอร์เด่นของเว็บไซต์ (Features)

1. **ดีไซน์ระดับพรีเมียม สไตล์วิทยาการคอมพิวเตอร์ (Computer Science Theme)**
   - **Dark Mode / Light Mode**: มีปุ่มสลับธีมพร้อมบันทึกสถานะไว้ใน `localStorage`
   - **Interactive Terminal Widget**: กล่องคำสั่ง Linux Terminal จำลองใน Hero Section สามารถพิมพ์คำสั่งเล่นได้จริง เช่น `help`, `skills`, `projects`, `contact`, `clear`
   - **Typing Animation Effect**: ข้อความพิมพ์ดีดอัตโนมัติแสดงบทบาท เช่น `Full-Stack Developer`, `Computer Science Student`, `Software Engineer`
   - **Modern Glassmorphism & Micro-animations**: เอฟเฟกต์เบลอ การไล่สี การตอบสนองต่อการเลื่อนหน้าจอ (Smooth Scrolling & Active Link)

2. **เนื้อหาและข้อมูลครบถ้วนสำหรับสายงานซอฟต์แวร์**
   - **Hero Section**: สถานะเปิดรับโอกาสฝึกงาน/สหกิจ/งานแรก, ลิงก์ Social (GitHub, LinkedIn, Email), ปุ่มดาวน์โหลดเรซูเม่
   - **About Me**: ประวัติการศึกษา เป้าหมายในวิชาชีพ และสถิติสำคัญ (GPA, จำนวนโปรเจกต์, ข้อโจทย์อัลกอริทึม)
   - **Skills & Tech Stack**: แบ่งหมวดหมู่ชัดเจน ทั้ง Languages, Frontend, Backend & API, Database, DevOps, Tools และ Core CS Fundamentals
   - **Education & Experience**: ประวัติการศึกษาปริญญาตรีวิทยาการคอมพิวเตอร์ รายวิชาสำคัญ และประสบการณ์เป็น TA / ผู้เข้าแข่งขัน Hackathon
   - **Projects Showcase**: มีระบบ Filter กรองผลงานตามหมวดหมู่ (All, Full-Stack, Backend, Algorithms) พร้อมรูปภาพประกอบ SVG สวยงาม และปุ่มลิงก์ Source Code / Live Demo
   - **Contact Form**: ฟอร์มติดต่อแบบส่ง AJAX ไปยัง Express Backend (`/api/contact`) โดยไม่ต้องรีเฟรชหน้าเว็บ พร้อมระบบ Toast Notification

3. **Backend Node.js & Express API**
   - รองรับ `process.env.PORT` สำหรับโฮสติ้งทุกค่าย (Render, Railway, Heroku, Vercel)
   - **Static File Serving**: เสิร์ฟหน้าเว็บความเร็วสูงพร้อมตั้งค่า HTTP Caching และ Security Headers
   - **RESTful Endpoints**:
     - `GET /api/health` : ตรวจสอบสถานะการทำงานของเซิร์ฟเวอร์ (Health Check)
     - `GET /api/profile` : ข้อมูลโปรไฟล์ JSON ของนายวีรภัทร
     - `POST /api/contact` : รับข้อความจากฟอร์มติดต่อ พร้อมบันทึกลงในไฟล์ `data/messages.json`
   - **Print-to-PDF Ready**: รองรับการกดพิมพ์หน้าเว็บเป็นเอกสารเรซูเม่ A4 สวยงาม ผ่าน `@media print`

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
c:\gg/
├── public/                       # ไฟล์ Static หน้าบ้าน (Frontend)
│   ├── index.html                # โค้ด HTML5 หลัก โครงสร้าง Semantic และ SEO Meta
│   ├── css/
│   │   └── style.css             # สไตล์ชีท CSS3, ตัวแปรสี, Responsive, Print Mode
│   ├── js/
│   │   └── main.js               # JavaScript ควบคุมการทำงาน UI และการเชื่อมต่อ API
│   └── assets/
│       └── images/               # รูปภาพ SVG โปรไฟล์, ไอคอน Favicon, และภาพโปรเจกต์
│           ├── avatar.svg        # รูปโปรไฟล์นักพัฒนาคอมพิวเตอร์
│           ├── favicon.svg       # Favicon
│           ├── project1.svg      # กราฟิกโปรเจกต์ DevHub Platform
│           ├── project2.svg      # กราฟิกโปรเจกต์ Algorithm Visualizer
│           ├── project3.svg      # กราฟิกโปรเจกต์ E-Commerce REST API
│           └── project4.svg      # กราฟิกโปรเจกต์ Campus Grade Analytics
├── data/
│   └── messages.json             # บันทึกประวัติข้อความที่มีผู้ติดต่อเข้ามา
├── server.js                     # Express.js Server และ API Endpoints
├── package.json                  # การจัดการ Dependencies และ Scripts
├── .env.example                  # ตัวอย่างการตั้งค่า Environment Variables
├── .env                          # การตั้งค่าพอร์ตและสภาพแวดล้อม
├── .gitignore                    # ละเว้นโฟลเดอร์ที่ไม่ต้องอัปโหลดขึ้น Git
├── Procfile                      # การตั้งค่าสำหรับ Heroku / Railway
├── render.yaml                   # การตั้งค่าอัตโนมัติสำหรับ Render.com
├── vercel.json                   # การตั้งค่าสำหรับ Vercel Serverless
└── README.md                     # คู่มือการใช้งานและการขึ้นโฮสต์
```

---

## 💻 วิธีการรันในเครื่อง (Local Development)

### 1. ติดตั้ง Dependencies
เปิด Terminal หรือ PowerShell ในโฟลเดอร์โปรเจกต์ แล้วรันคำสั่ง:
```bash
npm install
```

### 2. รันเซิร์ฟเวอร์
**สำหรับเปิดใช้งานทั่วไป:**
```bash
npm start
```

**สำหรับโหมด Development (รีโหลดอัตโนมัติเมื่อแก้โค้ด):**
```bash
npm run dev
```

### 3. เปิดเว็บไซต์ในบราวเซอร์
เปิดเว็บเบราว์เซอร์ไปที่:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🚀 คู่มือการขึ้นโฮสต์ (Deployment Guide)

โปรเจกต์นี้ได้รับการออกแบบและจัดเตรียมไฟล์การตั้งค่าให้พร้อมขึ้นโฮสต์ยอดนิยมฟรีได้ทันที:

### ตัวเลือกที่ 1: ขึ้นโฮสต์ฟรีผ่าน Render.com (แนะนำที่สุด ⭐)
Render เหมาะสำหรับ Node.js & Express Server อย่างยิ่ง:
1. นำโค้ดโปรเจกต์ขึ้น **GitHub Repository** ของคุณ (เช่น `https://github.com/veeraphat-ch/resume`)
2. สมัครและเข้าสู่ระบบที่ [Render.com](https://render.com)
3. กดปุ่ม **"New +"** แล้วเลือก **"Web Service"**
4. เชื่อมต่อกับ GitHub Repository ของคุณ
5. ตั้งค่าดังนี้:
   - **Name**: `veeraphat-resume`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
6. กดปุ่ม **"Deploy Web Service"** แล้วรอระบบสร้างเว็บให้ จะได้รับโดเมน เช่น `https://veeraphat-resume.onrender.com`

---

### ตัวเลือกที่ 2: ขึ้นโฮสต์ผ่าน Railway.app
1. สมัครใช้งานที่ [Railway.app](https://railway.app)
2. กด **"New Project"** -> **"Deploy from GitHub repo"**
3. เลือก Repository ของคุณ
4. Railway จะตรวจจับ `Procfile` และ `package.json` ให้โดยอัตโนมัติและสร้าง URL ให้ทันที

---

### ตัวเลือกที่ 3: ขึ้นโฮสต์ผ่าน Vercel
โปรเจกต์มีไฟล์ `vercel.json` รองรับ Serverless Express ไว้อยู่แล้ว:
1. ติดตั้ง Vercel CLI (ถ้าต้องการ): `npm i -g vercel`
2. หรือไปที่ [Vercel Dashboard](https://vercel.com) แล้วนำเข้า Repository จาก GitHub
3. กด **Deploy** ได้ทันที

---

### ตัวเลือกที่ 4: ขึ้นโฮสต์บน Cloud VPS (Ubuntu / Nginx / PM2)
หากต้องการรันบน VPS ส่วนตัว (เช่น DigitalOcean, AWS EC2, Linode):
1. ติดตั้ง Node.js และ PM2:
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm
   sudo npm install -g pm2
   ```
2. Clone โค้ดและติดตั้ง:
   ```bash
   git clone <YOUR_GIT_REPO>
   cd <REPO_FOLDER>
   npm install --production
   ```
3. สั่งรันด้วย PM2 เพื่อให้เซิร์ฟเวอร์ทำงานตลอด 24 ชั่วโมง และรีสตาร์ทเองหากเครื่องดับ:
   ```bash
   pm2 start server.js --name "veeraphat-resume"
   pm2 startup
   pm2 save
   ```
4. ตั้งค่า Reverse Proxy ด้วย Nginx ชี้พอร์ต 80/443 มาที่ `http://127.0.0.1:3000`

---

## ⚙️ การปรับแต่งข้อมูลของคุณ (Customization)

- **ข้อมูลส่วนตัวและลิงก์ติดต่อ**: แก้ไขที่ไฟล์ `public/index.html` และ `server.js` (ตรง API `/api/profile`)
- **รูปภาพและกราฟิก**: สามารถนำรูปโปรไฟล์จริงมาวางแทนที่ `public/assets/images/avatar.svg` ได้เลย
- **ผลงานและโปรเจกต์**: สามารถแก้ไขข้อความ รูปภาพ และลิงก์ GitHub / Demo ในส่วน `<section id="projects">` ใน `public/index.html`
- **สีและธีม**: สามารถปรับเปลี่ยนโทนสีหลัก (Accent Color) ได้ที่ตัวแปร CSS `:root` ใน `public/css/style.css`
