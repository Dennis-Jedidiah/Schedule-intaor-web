import express from "express";
import Server from "./Server.js";
import multer from "multer";
import path from "path";
import OpenAI from "openai";
import { fileURLToPath } from "url";


export const OpenAiClient = new OpenAI();
const upload = multer({dest:"uploads/"});
// export const OpenAiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const Filepath = path.dirname(fileURLToPath(import.meta.url));
export {express, Server, path, upload};


// const response = await OpenAiClient.responses.create({
//   model: "gpt-4o-mini",
//   input: "Write a one-sentence bedtime story about a unicorn.",
// });
// console.log(response.output_text)