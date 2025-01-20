require('dotenv').config();

const fs = require('fs');

const configContent = `window.INSTAGRAM_ACCESS_TOKEN = '${process.env.INSTAGRAM_ACCESS_TOKEN}';`;

fs.writeFileSync('../config.js', configContent);
console.log('Config file generated successfully!');
