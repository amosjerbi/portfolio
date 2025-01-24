document.addEventListener('DOMContentLoaded', function() {
    // Initialize any necessary components
    if (typeof Glide !== 'undefined') {
        const glide = new Glide('.glide', {
            type: 'carousel',
            perView: 1,
            focusAt: 'center'
        });
        glide.mount();
    }

    // Other initialization code...
});
