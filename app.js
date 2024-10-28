const apiKey = '***********************************************'; // Your RapidAPI key
const apiHost = 'chat-gpt26.p.rapidapi.com';

function fetchResponse(query) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: query
                }
            ]
        });

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                if (this.status >= 200 && this.status < 300) {
                    try {
                        const jsonResponse = JSON.parse(this.responseText);
                        // Assuming the response structure contains choices and text
                        const content = jsonResponse.choices[0].message.content.trim();
                        resolve(content);
                    } catch (error) {
                        reject('Error parsing response.');
                    }
                } else {
                    reject('Failed to fetch response. Please check your network connection and API configuration.');
                }
            }
        });

        xhr.open('POST', 'https://chat-gpt26.p.rapidapi.com/');
        xhr.setRequestHeader('x-rapidapi-key', apiKey);
        xhr.setRequestHeader('x-rapidapi-host', apiHost);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(data);
    });
}

function sendTextQuery() {
    const userInput = document.getElementById('userInput').value;
    document.getElementById('responseArea').innerText = 'Loading...';
    fetchResponse(userInput).then(response => {
        document.getElementById('responseArea').innerText = response;
    }).catch(error => {
        console.error('Error fetching response:', error);
        document.getElementById('responseArea').innerText = error;
    });
}

document.getElementById('userInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendTextQuery();
    }
});
