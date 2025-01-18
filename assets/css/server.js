require('dotenv').config();
const express = require('express');
const app = express();

app.get('/api/instagram', async (req, res) => {
    const token = process.env.instagramToken;
    // Make Instagram API calls here
}); 