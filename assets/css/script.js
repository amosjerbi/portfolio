const instagramToken = config.instagramToken;
const galleryElement = document.getElementById('gallery');
const modalElement = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalLink = document.getElementById('modalLink');
const closeButton = document.getElementsByClassName('close')[0];

let currentImageIndex = 0;

async function fetchImages() {
    const response = await fetch('/api/instagram');
    const data = await response.json();
    // Handle the response
}

async function fetchInstagramPosts(token) {
    try {
        console.log('Fetching posts with token:', token);
        const response = await fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${token}&limit=80`
        );
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data.error) {
            throw new Error(data.error.message);
        }
        
        const validPosts = data.data.filter(post => {
            const hasMediaUrl = !!post.media_url;
            const validMediaType = ['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM'].includes(post.media_type);
            return hasMediaUrl && validMediaType;
        });

        console.log('Valid posts:', validPosts.length);
        return validPosts;
    } catch (error) {
        console.error('Error in fetchInstagramPosts:', error);
        throw error;
    }
}

function createGalleryItem(post) {
    console.log('Creating gallery item for post:', post);
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-link', post.permalink);
    item.setAttribute('data-caption', post.caption || '');
    
    const img = document.createElement('img');
    img.src = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
    img.alt = post.caption || 'Instagram post';
    
    img.onerror = function() {
        console.error('Error loading image:', img.src);
        this.parentElement.style.display = 'none';
    };
    
    img.addEventListener('click', () => openModal(post));
    item.appendChild(img);
    return item;
}

function openModal(post) {
    modalImage.src = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
    modalCaption.textContent = post.caption || 'No caption';
    modalLink.href = post.permalink;
    modalElement.style.display = 'block';
}

closeButton.onclick = function() {
    modalElement.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modalElement) {
        modalElement.style.display = 'none';
    }
}

async function initGallery() {
    try {
        console.log('Initializing gallery...');
        const posts = await fetchInstagramPosts(instagramToken);
        
        if (!posts || posts.length === 0) {
            throw new Error('No posts received from Instagram API');
        }
        
        posts.forEach(post => {
            const galleryItem = createGalleryItem(post);
            galleryElement.appendChild(galleryItem);
        });
    } catch (error) {
        console.error('Error in initGallery:', error);
        galleryElement.innerHTML = `<p>Error loading Instagram posts: ${error.message}</p>`;
    }
}

function showImage(index) {
    const posts = document.querySelectorAll('.gallery-item');
    currentImageIndex = index;
    
    const currentPost = posts[index];
    const image = currentPost.querySelector('img');
    const link = currentPost.getAttribute('data-link');
    const caption = currentPost.getAttribute('data-caption');
    
    document.getElementById('modalImage').src = image.src;
    document.getElementById('modalCaption').textContent = caption || '';
    document.getElementById('modalLink').href = link;
}

// Add event listeners for navigation buttons
document.querySelector('.prev-btn').addEventListener('click', () => {
    const posts = document.querySelectorAll('.gallery-item');
    currentImageIndex = (currentImageIndex - 1 + posts.length) % posts.length;
    showImage(currentImageIndex);
});

document.querySelector('.next-btn').addEventListener('click', () => {
    const posts = document.querySelectorAll('.gallery-item');
    currentImageIndex = (currentImageIndex + 1) % posts.length;
    showImage(currentImageIndex);
});

// Modify your existing modal opening code to include the index
document.getElementById('gallery').addEventListener('click', (e) => {
    const galleryItem = e.target.closest('.gallery-item');
    if (galleryItem) {
        const posts = document.querySelectorAll('.gallery-item');
        const index = Array.from(posts).indexOf(galleryItem);
        currentImageIndex = index;
        showImage(index);
        modal.style.display = 'block';
    }
});

initGallery();

