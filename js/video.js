function loadVideos() {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    displayVideos(videos);
}

function displayVideos(videos) {
    const gallery = document.getElementById('videoGallery');
    gallery.innerHTML = '';
    videos.forEach((video, index) => {
        const videoElement = document.createElement('div');
        videoElement.className = 'video-container';
        videoElement.innerHTML = `
            <h3>${video.title}</h3>  <!-- Video title -->
            <iframe width="100%" height="100%" src="${video.url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p>Category: ${video.category}</p>
            <button onclick="editVideo(${index})">Edit</button>
            <button onclick="deleteVideo(${index})">Delete</button>
        `;
        gallery.appendChild(videoElement);
    });
}

function searchVideos() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('categorySelect').value;
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    const filteredVideos = videos.filter(video => {
        const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
        // Check if the title contains the searchText or if searchText is empty
        const matchesSearch = searchText === '' || video.title.toLowerCase().includes(searchText);
        return matchesCategory && matchesSearch;
    });

    displayVideos(filteredVideos);
}




function addVideo() {
    const titleInput = document.getElementById('videoTitle'); // Assuming you add this input in HTML
    const urlInput = document.getElementById('videoUrl');
    const categorySelect = document.getElementById('videoCategory');
    const title = titleInput.value.trim();
    let url = urlInput.value;
    const category = categorySelect.value;

    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (videoIdMatch) {
        url = `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    } else {
        alert('Invalid YouTube URL.');
        return;
    }

    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos.push({ title, url, category });  // Include title when adding videos
    localStorage.setItem('videos', JSON.stringify(videos));
    displayVideos(videos);

    titleInput.value = ''; // Clear the title input after adding
    urlInput.value = ''; // Clear the URL input after adding
}

function editVideo(index) {
    let videos = JSON.parse(localStorage.getItem('videos')) || [];
    let video = videos[index];
    let newTitle = prompt("Enter new video title:", video.title); // Edit title
    let newUrl = prompt("Enter new YouTube URL:", video.url);
    let newCategory = prompt("Enter new category (english, filipino, math, etc.):", video.category);

    if (newTitle && newUrl && newCategory) {
        const videoIdMatch = newUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
        if (videoIdMatch) {
            video.title = newTitle;  // Update title
            video.url = `https://www.youtube.com/embed/${videoIdMatch[1]}`;
            video.category = newCategory;
            localStorage.setItem('videos', JSON.stringify(videos));
            displayVideos(videos);
        } else {
            alert('Invalid YouTube URL.');
        }
    } else {
        alert('Edit cancelled or invalid input.');
    }
}

function deleteVideo(index) {
    let videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos.splice(index, 1);
    localStorage.setItem('videos', JSON.stringify(videos));
    displayVideos(videos);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('uploadForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addVideo();
    });

    loadVideos();
});
