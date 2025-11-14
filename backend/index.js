import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Connection from './database/db.js';
import router from './routes/api.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 9000;

// CORS configuration - Allow both localhost and production
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:4173',
    'https://v-share-ruddy.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, true); // For development, allow all. In production, restrict this
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes - MUST come before static files
app.use('/api', router);

// Root route for health check
app.get('/', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'VShare Backend API is running',
        endpoints: {
            upload: '/api/upload',
            download: '/api/files/:fileId'
        }
    });
});

// Connect to database
Connection();

// Start server only if not in serverless environment
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

// Export for Vercel serverless
export default app;