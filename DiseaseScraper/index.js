import './config.js';
import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import getlinks from './src/_basepage.js';
import getcontent from './src/_getpagecon.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Cache for storing scraped data
let cachedData = [];
let isScraping = false;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Scraping function
async function scrapeAll() {
    if (isScraping) {
        console.log('Scrape already in progress. Skipping...');
        return;
    }

    isScraping = true;
    console.log('Starting scheduled scrape...');

    try {
        const diseases = await getlinks();
        const results = [];

        for (const disease of diseases) {
            try {
                const content1 = await getcontent(disease.link1);
                if (content1) {
                    results.push(content1);
                    continue;
                }
            } catch (error) {
                console.log(`Failed link1 for ${disease.name}, trying link2...`);
            }

            try {
                const content2 = await getcontent(disease.link2);
                if (content2) {
                    results.push(content2);
                }
            } catch (error) {
                console.error(`Both links failed for ${disease.name}`);
            }
        }

        cachedData = results;
        console.log(`Scrape completed. Found ${results.length} items.`);
    } catch (error) {
        console.error('Scraping failed:', error.message);
    } finally {
        isScraping = false;
    }
}

// Schedule scraping every 30 minutes
cron.schedule(global.TIMEINTERVAL, () => {
    scrapeAll();
});

// Initial scrape when server starts
scrapeAll().then(() => {
    console.log('Initial scrape completed');
});

// API Endpoints
app.get('/api/diseases', (req, res) => {
    if (cachedData.length === 0) {
        return res.status(503).json({
            status: 'pending',
            message: 'Data not available yet. Please try again later.'
        });
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=900'); // 15 min cache
    res.json({
        status: 'success',
        count: cachedData.length,
        data: cachedData
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        lastUpdate: cachedData.length ? new Date().toISOString() : 'never',
        itemCount: cachedData.length
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});