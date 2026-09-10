import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../prod/frontend')));

app.post("/submit", (req, res) => {
  console.log("Form submitted");
  if (req.body) {console.log("Request body:", req.body);} else {console.log("No request body received.");}
  // res.json({ status: 'success', request: req.body });
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../prod/frontend/index.html'));
});
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
app.get("/upload", (req, res) => {
  return
})
app.get("/generate_ics", (req, res) => {
  return
})
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
