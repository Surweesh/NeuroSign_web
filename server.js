const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to read HTML files
const getHtmlFile = (filePath, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>404 Not Found</h1>');
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
};

const server = http.createServer((req, res) => {
    // Determine the file to serve based on the URL
    let filePath = '';

    switch (req.url) {
        case '/':
            filePath = path.join(__dirname, 'registration.html'); // Home page
            break;
        case '/signin':
            filePath = path.join(__dirname, 'sign in.html'); // About page
            break;
        case '/homepage':
            filePath = path.join(__dirname, 'homepage.html'); // Contact page
            break;
        case '/chatgpt':
            filePath = path.join(__dirname, 'chatgpt.html'); // Contact page
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>404 Not Found</h1>');
            return;
    }

    // Serve the requested HTML file
    getHtmlFile(filePath, res);
});

// Start the server
server.listen(10002, () => {
    console.log('Server is listening on port 101');
});
