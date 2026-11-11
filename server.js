const http = require('http');
const fs = require('fs');
const path = require('path');
const translateHandler = require('./api/translate');

const PORT = process.env.PORT || 8099;
const PUBLIC_DIR = __dirname;
const CSV_FILE_PATH = path.join(__dirname, 'word.csv');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.csv': 'text/csv; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Handle API: GET /api/config (Automatic Supabase DB credentials from environment variables)
  if (req.url === '/api/config' && req.method === 'GET') {
    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ url, key }));
    return;
  }

  // Handle API: GET /api/translate (Server-side translation proxy)
  if (req.url.startsWith('/api/translate') && req.method === 'GET') {
    res.status = (code) => ({
      json: (obj) => {
        res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(obj));
      },
      end: () => {
        res.writeHead(code);
        res.end();
      }
    });
    translateHandler(req, res);
    return;
  }

  // Handle API: POST /api/add-word (Append to word.csv)
  if (req.url === '/api/add-word' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        const { word, meaning } = JSON.parse(body);
        if (!word || !meaning) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Missing word or meaning' }));
          return;
        }

        // Sanitize for CSV (quote if comma exists)
        const cleanWord = word.includes(',') ? `"${word.replace(/"/g, '""')}"` : word;
        const cleanMeaning = meaning.includes(',') ? `"${meaning.replace(/"/g, '""')}"` : meaning;
        const csvLine = `\n${cleanWord},${cleanMeaning}`;

        // Append to local word.csv file
        fs.appendFileSync(CSV_FILE_PATH, csvLine, 'utf8');

        console.log(`[CSV Append] Successfully appended: ${cleanWord} -> ${cleanMeaning}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, word: cleanWord, meaning: cleanMeaning }));
      } catch (err) {
        console.error('[CSV Append Error]', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Handle API: GET /api/export-csv
  if (req.url === '/api/export-csv' && req.method === 'GET') {
    if (fs.existsSync(CSV_FILE_PATH)) {
      const csvData = fs.readFileSync(CSV_FILE_PATH, 'utf8');
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="word.csv"'
      });
      res.end(csvData);
    } else {
      res.writeHead(404);
      res.end('word.csv not found');
    }
    return;
  }

  // Static File Serving
  let reqPath = req.url === '/' ? '/index.html' : req.url;
  reqPath = reqPath.split('?')[0]; // strip query string
  const filePath = path.join(PUBLIC_DIR, reqPath);

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`[VocaCards Server] Running at http://localhost:${PORT}`);
});
