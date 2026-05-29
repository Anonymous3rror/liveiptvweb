document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('channel-container');

    // JSON ফাইল থেকে চ্যানেল লোড করা
    fetch('playlist.json')
        .then(response => response.json())
        .then(data => {
            // JSON এর সঠিক অবজেক্ট (live_matches) লুপ করা হচ্ছে
            data.live_matches.forEach(channel => {
                const li = document.createElement('li');
                
                // URL এনকোড করে channel.html-এ প্যারামিটার হিসেবে পাঠানো হচ্ছে
                const encodedUrl = encodeURIComponent(channel.stream_url);
                const playerUrl = `channel.html?url=${encodedUrl}`;

                // সঠিক JSON Key (image_thumbnail, match_title) ব্যবহার করা হয়েছে
                li.innerHTML = `
                    <a href="javascript:void(0);" onclick="document.getElementById('tvPlayer').src='${playerUrl}'">
                        <img src="${channel.image_thumbnail}" alt="${channel.match_title}" title="${channel.match_title}">
                    </a>
                `;
                container.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error loading playlist:', error);
            container.innerHTML = '<p style="color:red; font-size:12px; text-align:center;">Failed to load channels!</p>';
        });
});

// রাইট ক্লিক বন্ধ করার ফাংশন
function disableClick() {
    document.oncontextmenu = function() { return false; };
}
disableClick(); // ফাংশনটি কল করা হলো
