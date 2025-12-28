import { createServer } from 'node:http';
const hostname = '127.0.0.1';
const port = 3000;

const server = createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.end(JSON.stringify({ status: 'ok' }));
  }
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  }
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});