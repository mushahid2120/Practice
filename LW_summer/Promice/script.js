// Function to check connection speed
function checkConnectionSpeed() {
    if (navigator.connection) {
        // If the connection is slow, show the image and hide the video
        if (navigator.connection.effectiveType === '2g' || navigator.connection.effectiveType === 'slow-2g') {
            document.getElementById('bg-video').classList.add('hidden');
            document.getElementById('bg-image').classList.remove('hidden');
        } else {
            // Show the video and hide the image on faster connections
            document.getElementById('bg-video').classList.remove('hidden');
            document.getElementById('bg-image').classList.add('hidden');
        }
    }
}

// Run the function to check connection speed on page load
window.addEventListener('load', checkConnectionSpeed);


document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    items.forEach(item => {
        observer.observe(item);
    });
});


