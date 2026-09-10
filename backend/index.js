import express from "express";
import Server from "./Server.js";
import path from 'path';
import { fileURLToPath } from 'url';

const filepath = path.dirname(fileURLToPath(import.meta.url))
const server = new Server(express(), process.env.PORT || 3000, filepath);

server.use(express.json());
server.static(path.join(server.path, '../prod/frontend'));

server.post("/submit", (req, res) => {
  res.send("Yeah I got your message")
})
server.get('/', (req, res) => {
  res.sendFile(path.join(server.path, '../prod/frontend/index.html'));
});



server.start();