// imports and initialization
import {
  Filepath,
  OpenAiClient,
  express,
  Server,
  path,
  upload,
} from "./config.js";
const server = new Server(express(), process.env.PORT, Filepath);

// middleware setup
server.use(express.json());

// routes and their logic
server.static(path.join(Filepath, "../prod"), { index: "index.html" });
server.post("/upload", upload.single("file_image"), (req, res) => {
  const request = req.body;
  const file = req.file;
  res
  .status(200)
  .json({ message: "Request received", request: request, file: file });
});

// start the server
  server.start();
