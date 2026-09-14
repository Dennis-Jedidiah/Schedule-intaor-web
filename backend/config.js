import express from "express";
import Server from "./Server.js";
import multer from "multer";
import path from "path";
import OpenAI from "openai";
import { z } from "zod";
import { fileURLToPath } from "url";
import { zodTextFormat } from "openai/helpers/zod";
import ical, { ICalCalendarMethod } from "ical-generator";

const OpenAiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// Removed the options object so that uploaded files are stored in memory instead of on disk.
// This allows us to access the file buffer directly without needing to read from the filesystem.
const upload = multer();
// export const OpenAiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const Filepath = path.dirname(fileURLToPath(import.meta.url));

const CalendarEventSchema = z.object({
  name: z.string(),
  location: z.string().optional().default(""),
  instructor: z.string().optional().default(""),
  days: z.array(z.enum(["MO", "TU", "WE", "TH", "FR", "SA", "SU"])),
  start_time: z.string().optional().default(""),
  end_time: z.string().optional().default(""),
  start_date: z.string().optional().default(""),
  end_date: z.string().optional().default(""),
  notes: z.string().max(200).optional().default(""),
});

const CalendarScheduleSchema = z.object({
  events: z.array(CalendarEventSchema),
});

function parseDateTime(yyyymmdd, hhmm) {
  const year = yyyymmdd.slice(0, 4);
  const month = yyyymmdd.slice(4, 6);
  const day = yyyymmdd.slice(6, 8);
  return new Date(`${year}-${month}-${day}T${hhmm}:00`);
}

function TurnThatBitchIntoACalendar(calendar_event_array) {
  const calendar = ical({ name: "Your Schedule, Calendarfied" });

  calendar_event_array.forEach((calendar_event) => {
    calendar.createEvent({
      start: parseDateTime(calendar_event.start_date, calendar_event.start_time),
      end: parseDateTime(calendar_event.start_date, calendar_event.end_time),
      summary: calendar_event.name,
      description: calendar_event.notes,
      location: calendar_event.location,
      repeating: {
        freq: "WEEKLY",
        byDay: calendar_event.days,
        until: parseDateTime(calendar_event.end_date, calendar_event.end_time),
      },
    });
  });

  return calendar;
}

export {
  express,
  Server,
  path,
  ical,
  ICalCalendarMethod,
  upload,
  OpenAiClient,
  Filepath,
  CalendarEventSchema,
  CalendarScheduleSchema,
  zodTextFormat,
  TurnThatBitchIntoACalendar,
};
