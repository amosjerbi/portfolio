import config from './config.js';

let posts = []; // Global variable to store posts
let currentPostIndex = 0;
let currentPage = 1;

function initTouchGestures() {
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modallic-content');
    const hammer = new Hammer(modalContent);
    
    // Configure horizontal swipe
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
    
    hammer.on('swipeleft', function() {
        if (currentPostIndex < posts.length - 1) {
            nextPost();
        }
    });
    
    hammer.on('swiperight', function() {
        if (currentPostIndex > 0) {
            prevPost();
        }
    });
}

function showMorePosts() {
    const startIndex = (currentPage - 1) * config.postsPerPage;
    const endIndex = startIndex + config.postsPerPage;
    const postsToShow = posts.slice(startIndex, endIndex);
    
    postsToShow.forEach((post, index) => {
        const div = document.createElement('div');
        div.className = 'flow';

        const img = document.createElement('img');
        img.className = 'img';
        img.src = post.media_url;
        img.alt = post.caption || 'Instagram post';
        img.loading = 'lazy';
        
        // Add click event listener to show the modal
        div.addEventListener('click', () => {
            showPost(startIndex + index);
            document.getElementById('modal').style.display = 'block';
        });

        div.appendChild(img);
        document.getElementById('gallery').appendChild(div);
    });
    
    // Show/hide load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (endIndex >= posts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

function showPost(index) {
    if (index >= 0 && index < posts.length) {
        currentPostIndex = index;
        const post = posts[index];
        const modalImg = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');
        const modalLink = document.getElementById('modalLink');
        
        modalImg.src = post.media_url;
        modalCaption.textContent = ''; 
        modalLink.href = post.permalink;
        
        // Update navigation buttons visibility
        document.querySelector('.prev-btn').style.display = index === 0 ? 'none' : 'block';
        document.querySelector('.next-btn').style.display = index === posts.length - 1 ? 'none' : 'block';
    }
}

function nextPost() {
    if (currentPostIndex < posts.length - 1) {
        showPost(currentPostIndex + 1);
    }
}

function prevPost() {
    if (currentPostIndex > 0) {
        showPost(currentPostIndex - 1);
    }
}

async function loadInstagramPosts() {
    const gallery = document.getElementById('gallery');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const modal = document.getElementById('modal');
    
    // Validate essential DOM elements
    if (!gallery) {
        console.error('Gallery element not found. Cannot load Instagram posts.');
        return;
    }
    
    // Clear gallery and show loading state
    gallery.innerHTML = '<div class="loading">Loading Instagram posts...</div>';
    
    try {
        // Determine the base path dynamically
        const basePath = new URL(import.meta.url).pathname.replace(/\/[^/]+$/, '');
        const jsonPath = `${basePath}/../data/instagram-posts.json`;
        
        console.log('Attempting to fetch Instagram posts from:', jsonPath);
        
        // Detailed fetch configuration
        const fetchOptions = {
            method: 'GET',
            cache: 'no-cache', // Ensure fresh fetch
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const response = await fetch(jsonPath, fetchOptions);
        
        // Detailed response logging
        console.log('Fetch response details:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries())
        });
        
        // Check for HTTP errors
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }
        
        // Parse JSON with error handling
        let data;
        try {
            data = await response.json();
        } catch (parseError) {
            console.error('JSON parsing error:', parseError);
            throw new Error('Failed to parse Instagram posts JSON');
        }
        
        // Validate parsed data
        if (!data || !data.data || !Array.isArray(data.data)) {
            console.warn('Invalid data structure in Instagram posts JSON');
            gallery.innerHTML = '<div class="error">No Instagram posts found</div>';
            return;
        }
        
        // Log metadata
        console.log('Instagram posts metadata:', data.metadata || 'No metadata available');
        
        // Filter posts based on allowed media types
        posts = data.data.filter(post => {
            const isAllowedType = config.allowedMediaTypes.includes(post.media_type);
            console.log(`Post ${post.id}: type ${post.media_type}, allowed: ${isAllowedType}`);
            return isAllowedType;
        });
        
        console.log(`Filtered posts count: ${posts.length}`);
        
        // Clear loading state
        gallery.innerHTML = '';
        
        // Handle empty posts scenario
        if (posts.length === 0) {
            gallery.innerHTML = '<div class="error">No Instagram posts available</div>';
            return;
        }
        
        // Ensure load more button exists
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                currentPage++;
                showMorePosts();
            });
        } else {
            console.warn('Load more button not found');
        }
        
        // Load initial posts
        showMorePosts();
        
        // Initialize touch gestures
        initTouchGestures();
        
        // Modal functionality
        if (modal) {
            const closeBtn = modal.querySelector('.close');
            const prevBtn = modal.querySelector('.prev-btn');
            const nextBtn = modal.querySelector('.next-btn');
            
            // Close button
            if (closeBtn) {
                closeBtn.onclick = () => modal.style.display = 'none';
            } else {
                console.warn('Close button not found in modal');
            }
            
            // Navigation buttons
            if (prevBtn) prevBtn.addEventListener('click', prevPost);
            if (nextBtn) nextBtn.addEventListener('click', nextPost);
            
            // Click outside to close
            window.onclick = (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            };
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (modal.style.display === 'block') {
                    if (e.key === 'ArrowLeft') prevPost();
                    if (e.key === 'ArrowRight') nextPost();
                    if (e.key === 'Escape') modal.style.display = 'none';
                }
            });
        } else {
            console.warn('Modal element not found');
        }
    } catch (error) {
        console.error('Detailed error loading Instagram posts:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });
        
        // Fallback error display
        gallery.innerHTML = `
            <div class="error">
                <h3>Error Loading Instagram Posts</h3>
                <p>${error.message}</p>
                <small>Please try refreshing the page or check your internet connection.</small>
            </div>
        `;
        
        // Optional: Attempt to log raw file contents
        try {
            const rawResponse = await fetch(jsonPath);
            const rawText = await rawResponse.text();
            console.error('Raw file contents:', rawText);
        } catch (rawFetchError) {
            console.error('Could not fetch raw file:', rawFetchError);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', loadInstagramPosts);
