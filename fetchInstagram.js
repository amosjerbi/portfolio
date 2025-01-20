// Instagram API configuration
const accessToken = window.INSTAGRAM_ACCESS_TOKEN;
if (!accessToken) {
    throw new Error('Instagram access token not found. Please make sure config.js is loaded and contains the token.');
}
const apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`;

async function fetchInstagramMedia() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      console.error('Error fetching Instagram media:', data.error.message);
      return;
    }

    // Instead of writing to file, we'll return the data
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Export the function to be used by other modules
export { fetchInstagramMedia };
