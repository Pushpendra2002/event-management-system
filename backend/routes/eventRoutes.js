const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Registration = require("../models/Registration");


// CREATE EVENT
router.post("/create", async (req, res) => {
  try {
    const { title, description, date, location, createdBy } = req.body;

    const event = new Event({
      title,
      description,
      date,
      location,
      createdBy
    });

    await event.save();

    res.status(201).json({
      message: "Event created successfully",
      event
    });
  } catch (error) {
    res.status(500).json({ message: "Event creation failed", error });
  }
});

module.exports = router;

// JOIN / REGISTER FOR EVENT
router.post("/register", async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    // Check if already registered
    const existingRegistration = await Registration.findOne({
      userId,
      eventId
    });

    if (existingRegistration) {
      return res.status(400).json({ message: "Already registered for this event" });
    }

    const registration = new Registration({ userId, eventId });
    await registration.save();

    res.status(201).json({ message: "Successfully registered for event" });
  } catch (error) {
    res.status(500).json({ message: "Event registration failed", error });
  }
});


// VIEW ALL EVENTS
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events", error });
  }
});