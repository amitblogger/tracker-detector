document.getElementById('url-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Stops the page from refreshing
    const urlInput = document.getElementById('url-input').value;
    const resultsDiv = document.getElementById('results');

    // Show a loading message
    resultsDiv.innerHTML = '<p>Analyzing the website...</p>';

    try {
        // Send the URL to the backend server
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlInput })
        });

        // Check if the response is good
        if (response.ok) {
            const data = await response.json();
            showResults(data);
        } else {
            resultsDiv.innerHTML = '<p>Sorry, something went wrong. Try again!</p>';
        }
    } catch (error) {
        resultsDiv.innerHTML = '<p>Couldn’t connect. Check the URL and try again.</p>';
    }
});

function showResults(data) {
    const resultsDiv = document.getElementById('results');
    if (data.trackers.length === 0) {
        resultsDiv.innerHTML = '<p>No trackers found on this website!</p>';
    } else {
        let html = '<h2>Trackers Found:</h2><ul>';
        data.trackers.forEach(tracker => {
            html += `<li>${tracker.entity}: ${tracker.domains.join(', ')}</li>`;
        });
        html += '</ul>';
        resultsDiv.innerHTML = html;
    }
}
