import express from "express";
import Server from "./Server.js";
import multer from "multer";
import path from "path";
import OpenAI from "openai";
import { fileURLToPath } from "url";

const OpenAiClient = new OpenAI();
// Removed the options object so that uploaded files are stored in memory instead of on disk.
// This allows us to access the file buffer directly without needing to read from the filesystem.
const upload = multer(); 
// export const OpenAiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const Filepath = path.dirname(fileURLToPath(import.meta.url));



export {express, Server, path, upload, OpenAiClient, Filepath};
