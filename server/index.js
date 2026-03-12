import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { postForm } from './api/postForm.js';

const app= express();

app.use(express.json());
app.use(helmet());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5530',
}));

app.get('/', (req, res) => {
    return res.json({
        status: 'success',
        message: 'server is running',
    });
});

app.post('/api/forms', postForm);

app.use((err, req, res, next) => {
    console.error(err);
    return res.status(500).json({ status: 'error', msg: 'Server error' });

});

app.get('*error', (req, res) => {
    return res.status(404).json({
        status: 'error',
        message: 'No such route',
    });
});

app.listen(5531, () => {
    console.log('server running: http://localhost:5531');
    console.log('web site: http://localhost:5530');
});