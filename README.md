Mini Udemy - Video Learning Platform
A full-stack MERN (MongoDB, Express, React, Node.js) web application designed to provide a seamless learning experience. This platform features a modern dark-themed UI, secure video streaming, and an OTP-based password recovery system.

✨ Key Features
📺 Video Streaming: Integrated YouTube player for high-quality lecture delivery.

📂 Course Curriculum: Interactive sidebar to switch between different lectures smoothly.

🔐 Secure Authentication: User registration and login with JWT-protected sessions.

🔑 OTP Password Reset: Secure password recovery system using Nodemailer and 6-digit OTP.

🎨 Premium UI: Modern Dark Mode design with Glassmorphism effects and responsive layout.

🛡️ Security: Environment variables (.env) used to protect sensitive API keys and credentials.

🛠️ Tech Stack
Frontend: React.js, Axios, React Router.

Backend: Node.js, Express.js.

Database: MongoDB (Mongoose).

Email Service: Nodemailer (via Gmail SMTP).

🚀 Getting Started
Follow these steps to run the project locally:

1. Prerequisites
Node.js installed.

MongoDB Atlas account or local MongoDB instance.

2. Backend Setup
Navigate to the server folder: cd server.

Install dependencies: npm install.

Create a .env file and add the following:

Plaintext

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
Start the server: npm start.

3. Frontend Setup
Navigate to the client folder: cd client.

Install dependencies: npm install.

Start the application: npm start.