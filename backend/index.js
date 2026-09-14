// imports and initialization
import {
  Filepath,
  OpenAiClient,
  express,
  Server,
  path,
  zodTextFormat,
  upload,
  CalendarScheduleSchema,
  TurnThatBitchIntoACalendar,
} from "./config.js";
const server = new Server(express(), process.env.PORT, Filepath);

// middleware setup
server.use(express.json());

// routes and their logic
server.static(path.join(Filepath, "../prod"), { index: "index.html" });

server.post("/upload", upload.array("file_image"), async (req, res) => {
  const term_start_date = req.body.term_start_date;
  const term_end_date = req.body.term_end_date;
  const files = req.files;
  const imageInputs = files.map((file) => {
    const base64 = file.buffer.toString("base64");
    const dataUrl = `data:${file.mimetype};base64,${base64}`;
    return { type: "input_image", image_url: dataUrl };
  });

  const response = await OpenAiClient.responses.parse({
    model: "gpt-5-mini",
    // reasoning: { effort: "medium" },
    input: [
      {
        role: "developer",
        content:
          "You are an assistant that reads screenshots of a class schedule (a table, list, or calendar grid) and extracts every class meeting as structured data. " +
          "Each screenshot may show a different day or week of the same schedule — merge everything into one list of unique classes, one entry per course. " +
          "If the same course name+time appears on multiple days, that is ONE event with multiple entries in `days`, not multiple separate events. " +
          "If a field isn't visible in the image, leave it empty rather than guessing — never invent locations, instructors, or dates. " +
          "Always report start_time and end_time in 24-hour HH:MM format (e.g. '14:10', not '2:10 pm')." +
          "The user message will provide a term start date and a term end date that apply to the whole schedule. " +
          "Use those as the `start_date` and `end_date` for every event, unless a screenshot shows a different date range for that specific class. " +
          "Always report `start_date` and `end_date` in ISO 8601-based YYYYMMDD format (e.g '20260908', not '08/09/2026'). " +
          "Determine each event's day-of-week ONLY from an explicit label: the column header it sits under in a grid layout, or the day heading it's listed beneath in a list layout. " +
          "Do not infer the day from vertical position, visual proximity, or which column an event's box appears to overlap — event cards can be tall and visually spill into a neighboring day's column while still belonging to their labeled day. " +
          "Before finalizing, double check every event against its column header or day heading text.",
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text:
              "Extract every class from these schedule screenshots into the structured format." +
              "The term start and end dates are not in the screenshots but have been provided explicitly.",
          },
          ...imageInputs,
          {
            type: "input_text",
            text: `Term start date: ${term_start_date}. Term end date: ${term_end_date}.`,
          },
        ],
      },
    ],
    text: {
      format: zodTextFormat(CalendarScheduleSchema, "schedule"),
    },
  });

  const calendar = TurnThatBitchIntoACalendar(response.output_parsed.events);
  res.setHeader("Content-Type", "text/calendar; charset=utf-8");
  res.setHeader("Content-Disposition", 'attachment; filename="schedule.ics"');
  res.status(200).send(calendar.toString());
});
// start the server
server.start();
