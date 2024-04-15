const express = require('express');
const app = express();
const port = 3000;

// Enhanced route with better HTML structure and styling
app.get('/', (req, res) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>DevOps Project</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f9;
          margin: 40px;
          color: #333;
        }
        h1 {
          color: #5a5a5a;
        }
        .content {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        p {
          line-height: 1.6;
        }
      </style>
    </head>
    <body>
      <div class="content">
        <h1>Welcome to Our DevOps Project</h1>
        <p>This project is done as a group by:</p>
        <ul>
          <li>Bhavani</li>
          <li>Shravya</li>
          <li>Vakula</li>
          <li>Deepak C0904124</li>
        </ul>
      </div>
    </body>
    </html>
  `;
  res.send(htmlContent);
});

// Health check route
app.get("/health", (_req, res) => {
  res.send("Everything's good!");
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = server;
