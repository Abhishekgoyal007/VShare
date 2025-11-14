# 🚀 VShare - Modern File Sharing Platform

<div align="center">

![VShare Logo](https://img.shields.io/badge/VShare-File%20Sharing-blueviolet?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

**A full-stack, real-time file sharing application built with modern web technologies**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Deployment](#-deployment)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**VShare** is a high-performance, scalable file sharing platform that enables users to upload, store, and share files seamlessly. Built with a modern tech stack, it features a React-based frontend with a responsive UI and an Express.js backend powered by MongoDB for robust data persistence.

### Key Highlights

- 🎨 **Modern UI/UX** - Built with React 19 and styled with TailwindCSS v4
- ⚡ **Lightning Fast** - Powered by Vite for instant HMR and optimized builds
- 🔒 **Secure** - Environment-based configuration with CORS protection
- 📦 **Scalable** - MongoDB Atlas for distributed database management
- 🚀 **Production Ready** - Optimized for deployment on modern cloud platforms
- 📱 **Responsive** - Mobile-first design approach

---

## ✨ Features

### Core Functionality
- ✅ **File Upload** - Drag-and-drop or click-to-upload with real-time feedback
- ✅ **File Storage** - Secure server-side storage with unique file identifiers
- ✅ **File Download** - Direct download via shareable links
- ✅ **File Metadata** - Track filename, size, and upload timestamp
- ✅ **RESTful API** - Clean API architecture with `/api` prefix

### Technical Features
- 🔄 **Automatic Retries** - Robust error handling with client-side retry logic
- 📊 **File Validation** - Size limits and type checking (configurable up to 100MB)
- 🎯 **Unique Filenames** - Timestamp-based naming to prevent conflicts
- 🔐 **Environment Variables** - Secure configuration management
- 🌐 **CORS Enabled** - Cross-origin resource sharing for frontend-backend communication
- 📝 **MongoDB Integration** - Mongoose ODM for schema-based data modeling

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.0 | UI Framework - Modern component-based architecture |
| **Vite** | 7.2.2 | Build Tool - Next-generation frontend tooling |
| **TailwindCSS** | 4.1.17 | Styling - Utility-first CSS framework |
| **Lucide React** | 0.553.0 | Icons - Beautiful, consistent icon set |
| **PostCSS** | 8.5.6 | CSS Processing - Autoprefixer & transformations |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 20+ | Runtime - JavaScript server environment |
| **Express.js** | 4.18.2 | Framework - Minimal and flexible web application framework |
| **MongoDB** | 8.0+ | Database - NoSQL document database |
| **Mongoose** | 8.0.0 | ODM - Elegant MongoDB object modeling |
| **Multer** | 1.4.5 | Middleware - Multipart/form-data handling for file uploads |
| **CORS** | 2.8.5 | Middleware - Cross-Origin Resource Sharing |
| **Dotenv** | 16.4.5 | Configuration - Environment variable management |

### DevOps & Tools
- **Nodemon** - Auto-restart server during development
- **ESLint** - Code quality and consistency
- **Git** - Version control
- **npm** - Package management

---

## 🏗️ Architecture

### System Design

```
┌─────────────────┐         HTTPS          ┌─────────────────┐
│                 │◄──────────────────────►│                 │
│   React SPA     │      API Requests      │  Express API    │
│  (Port: 5173)   │                        │  (Port: 9000)   │
│                 │                        │                 │
└────────┬────────┘                        └────────┬────────┘
         │                                          │
         │  Vite Dev Server                        │  REST API
         │  TailwindCSS Build                      │  /api/*
         │                                          │
         │                                          ▼
         │                                 ┌─────────────────┐
         │                                 │   MongoDB       │
         │                                 │   Atlas         │
         │                                 │                 │
         │                                 │  - File Metadata│
         └─────────────────────────────────┤  - Uploads Info │
                                           └─────────────────┘
```

### Data Flow

1. **Upload Flow**
   ```
   User → Select File → FormData → POST /api/upload → Multer → Disk Storage → MongoDB Record → Response with File ID
   ```

2. **Download Flow**
   ```
   User → Click Link → GET /api/files/:id → MongoDB Lookup → File Stream → Download
   ```

### API Architecture

```
backend/
├── index.js              # Application entry point, middleware setup
├── routes/
│   └── api.js           # API route definitions
├── controller/
│   └── uploadController.js  # Business logic for upload/download
├── middleware/
│   └── upload.js        # Multer configuration
├── model/
│   └── fileModel.js     # Mongoose schema definition
└── database/
    └── db.js            # MongoDB connection handler
```

---

## 📦 Installation

### Prerequisites

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **MongoDB Atlas account** (or local MongoDB instance)
- **Git**

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhishekgoyal007/VShare.git
   cd VShare
   ```

2. **Install dependencies**
   ```bash
   # Backend dependencies
   cd backend
   npm install

   # Frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB URI and other settings

   # Frontend
   cd ../frontend
   cp .env.example .env
   # Edit .env with your backend URL
   ```

4. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:9000`
   - API Health: `http://localhost:9000/api`

---

## ⚙️ Configuration

### Backend Environment Variables

Create `backend/.env` file:

```env
# Server Configuration
PORT=9000

# Database Configuration
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/vshare?retryWrites=true&w=majority

# Application URLs
BACKEND_URL=http://localhost:9000
FRONTEND_URL=http://localhost:5173

# Optional: Production Settings
NODE_ENV=development
```

### Frontend Environment Variables

Create `frontend/.env` file:

```env
# API Configuration
VITE_BACKEND_URL=http://localhost:9000
```

### Multer Configuration

File upload settings in `backend/middleware/upload.js`:

```javascript
// Maximum file size: 100MB
fileSize: 100 * 1024 * 1024

// Allowed destinations: backend/uploads/
destination: ./uploads

// Filename format: timestamp-originalname
filename: Date.now()-originalname
```

---

## 📚 API Documentation

### Base URL
```
Development: http://localhost:9000/api
Production: https://your-domain.com/api
```

### Endpoints

#### 1. Upload File
**POST** `/api/upload`

Upload a file to the server.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  ```
  file: <binary>
  ```

**Response:**
```json
{
  "path": "http://localhost:9000/api/files/507f1f77bcf86cd799439011"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:9000/api/upload \
  -F "file=@/path/to/file.pdf"
```

**JavaScript Example:**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('http://localhost:9000/api/upload', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data.path); // File download URL
```

---

#### 2. Download File
**GET** `/api/files/:fileId`

Download a previously uploaded file.

**Request:**
- Method: `GET`
- URL Parameter: `fileId` (MongoDB ObjectId)

**Response:**
- Content-Type: `application/octet-stream`
- Content-Disposition: `attachment; filename="original-filename"`

**cURL Example:**
```bash
curl -O http://localhost:9000/api/files/507f1f77bcf86cd799439011
```

**Browser Example:**
```
http://localhost:9000/api/files/507f1f77bcf86cd799439011
```

---

### Error Responses

#### 400 Bad Request
```json
{
  "error": "No file uploaded"
}
```

#### 404 Not Found
```json
{
  "error": "File not found"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Error while uploading file"
}
```

---

## 📁 Project Structure

```
VShare/
│
├── backend/                    # Backend application
│   ├── controller/
│   │   └── uploadController.js # Upload/Download logic
│   ├── database/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── upload.js          # Multer configuration
│   ├── model/
│   │   └── fileModel.js       # File schema
│   ├── routes/
│   │   └── api.js             # API routes
│   ├── uploads/               # File storage directory
│   ├── .env.example           # Environment template
│   ├── .gitignore
│   ├── index.js               # Entry point
│   └── package.json
│
├── frontend/                   # Frontend application
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── lib/               # Utility functions
│   │   ├── service/
│   │   │   └── api.js         # API client
│   │   ├── App.css
│   │   ├── App.jsx            # Main component
│   │   ├── index.css          # Global styles
│   │   └── main.jsx           # Entry point
│   ├── .env.example
│   ├── .gitignore
│   ├── components.json        # shadcn/ui config
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js     # TailwindCSS config
│   ├── tsconfig.json
│   └── vite.config.js         # Vite config
│
├── .gitignore                 # Root gitignore
├── DEPLOYMENT.md              # Deployment guide
├── PRE_DEPLOYMENT_CHECKLIST.md
└── README.md                  # This file
```

---

## 🚀 Deployment

### Backend Deployment (Render/Railway/Heroku)

**Environment Variables:**
```env
PORT=9000
DATABASE_URL=<your_mongodb_atlas_uri>
BACKEND_URL=https://your-backend.render.com
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
```

**Build Settings:**
- Build Command: `npm install`
- Start Command: `npm start`
- Root Directory: `backend`

---

### Frontend Deployment (Vercel/Netlify)

**Environment Variables:**
```env
VITE_BACKEND_URL=https://your-backend.render.com
```

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: `frontend`
- Node Version: 20.x

---

### Docker Deployment (Optional)

**Backend Dockerfile:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./
EXPOSE 9000
CMD ["npm", "start"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

---

## 🔒 Security

### Best Practices Implemented

- ✅ **Environment Variables** - All sensitive data in `.env` files
- ✅ **CORS Protection** - Whitelist specific origins
- ✅ **File Size Limits** - Prevent DoS via large uploads
- ✅ **Input Validation** - Server-side validation for all uploads
- ✅ **Secure Headers** - Express.js security middleware
- ✅ **MongoDB Injection Prevention** - Mongoose sanitization

### Security Checklist

- [ ] Rotate MongoDB credentials regularly
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Add authentication/authorization (future enhancement)
- [ ] Enable MongoDB encryption at rest
- [ ] Regular dependency updates (`npm audit`)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow ESLint rules
- Write clean, self-documenting code
- Add comments for complex logic
- Update documentation for API changes

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Abhishek Goyal**
- GitHub: [@Abhishekgoyal007](https://github.com/Abhishekgoyal007)
- Repository: [VShare](https://github.com/Abhishekgoyal007/VShare)

---

## 🙏 Acknowledgments

- React Team for the amazing framework
- Vite Team for the blazing-fast build tool
- TailwindCSS for the utility-first CSS framework
- MongoDB for the flexible NoSQL database
- Express.js community for the minimal web framework

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Abhishek Goyal](https://github.com/Abhishekgoyal007)

</div>
