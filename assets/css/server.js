require('dotenv').config();
const express = require('express');
const app = express();

app.get('/api/instagram', async (req, res) => {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;
    // Make Instagram API calls here
}); 