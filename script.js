document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('channel-container');

    // playlist.json theke channel load kora
    fetch('playlist.json')
        .then(response => response.json())
        .then(data => {
            // playlist.json er accurate hierarchy object (live_matches) loop chalanor jonno
            data.live_matches.forEach(channel => {
                const li = document.createElement('li');
                
                // Stream URL dynamic query parameter generate kora holo channel.html er jonno
                const encodedUrl = encodeURIComponent(channel.stream_url);
                const playerUrl = `channel.html?url=${encodedUrl}`;

                // HTML Structure design format dynamic event handler mapping wrapper shorthand:
                // Iframe content source update ebong manual remote sync mapping structure update
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

// Right click disable function mapping logic
function disableClick() {
    document.oncontextmenu = function() { return false; };
}
disableClick();
