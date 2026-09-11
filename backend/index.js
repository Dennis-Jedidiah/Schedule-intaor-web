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

server.post("/upload", upload.single("file_image"), async (req, res) => {
  const file = req.file;
  const base64 = file.buffer.toString("base64");
  const dataUrl = `data:${file.mimetype};base64,${base64}`;

  const response = await OpenAiClient.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: "Describe this image." },
          { type: "input_image", image_url: dataUrl },
        ],
      },
    ],
  });
  res.status(200).json({ server_message: response.output_text });
});
// start the server
server.start();
