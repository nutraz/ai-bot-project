const http = require('http');

// Simple development server for Motoko backend development
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Simple API endpoint for development
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      message: 'Backend development server running',
      note: 'This is a development placeholder. Real backend is Motoko-based on Internet Computer.'
    }));
    return;
  }

  // Default response
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    message: 'Motoko Backend Development Server',
    endpoints: ['/api/health'],
    note: 'For full functionality, use dfx for Internet Computer development'
  }));
});

const PORT = process.env.PORT || 3001;

function startServer(port, retries = 3) {
  server.listen(port, () => {
    console.log(`🚀 Backend development server running on http://localhost:${port}`);
    console.log(`📝 This is a development placeholder for the Motoko backend`);
    console.log(`🔧 For full IC development, use: dfx start --background && dfx deploy`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && retries > 0) {
      console.log(`❌ Port ${port} is busy, trying port ${port + 1}...`);
      server.removeAllListeners('error');
      startServer(port + 1, retries - 1);
    } else if (err.code === 'EADDRINUSE') {
      console.error(`❌ Unable to find available port after multiple attempts. Please stop other services or set PORT environment variable.`);
      process.exit(1);
    } else {
      console.error('❌ Backend server error:', err);
      process.exit(1);
    }
  });
}

startServer(PORT);