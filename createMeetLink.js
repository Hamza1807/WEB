const { google } = require("googleapis");
const calendar = google.calendar("v3");

async function createMeetLink(req, res) {
  const { doctor } = req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "path-to-service-account.json", // Update with the path to your Google service account JSON key
    scopes: ["https://www.googleapis.com/auth/calendar.events"],
  });

  const authClient = await auth.getClient();

  google.options({ auth: authClient });

  try {
    const event = {
      summary: `Consultation with ${doctor}`,
      description: "Online consultation via Google Meet",
      start: {
        dateTime: new Date().toISOString(),
        timeZone: "America/New_York",
      },
      end: {
        dateTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        timeZone: "America/New_York",
      },
      conferenceData: {
        createRequest: {
          requestId: `consult-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
    });

    res.json({ meetLink: response.data.hangoutLink });
  } catch (error) {
    console.error("Error creating Meet link:", error);
    res.status(500).json({ message: "Failed to create Meet link" });
  }
}

module.exports = createMeetLink;
