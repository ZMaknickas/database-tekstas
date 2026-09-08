import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

import { postForm } from './api/postForm.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5531;

app.use(express.json());
app.use(helmet({
    contentSecurityPolicy: false, 
}));

app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN || 'http://localhost:5530',
}));

app.post('/api/forms', postForm);

app.get('/api', (req, res) => {
    return res.json({
        status: 'success',
        message: 'server is running',
    });
});

// Patiekia sukompiliuotą client build'ą (client/dist)
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDistPath));

// SPA fallback: visi ne-API keliai grąžina index.html
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.use((err, req, res, next) => {
    console.error(err);
    return res.status(500).json({ status: 'error', msg: 'Server error' });
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});