
const fetch = require('node-fetch');
const fs = require('fs');

const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`;

async function fetchInstagramMedia() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      console.error('Error fetching Instagram media:', data.error.message);
      process.exit(1);
    }

    fs.writeFileSync('instagramMedia.json', JSON.stringify(data, null, 2));
    console.log('Instagram media fetched successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchInstagramMedia();
