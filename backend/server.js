// GreenCare Backend API

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

// --- MongoDB Connection ---
const MONGO_URI = 'mongodb://127.0.0.1:27017/greencare'; // Update if needed

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// --- Models ---
const volunteerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  availability: String,
});
const Volunteer = mongoose.model('Volunteer', volunteerSchema);

const adminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // personal password
});
const Admin = mongoose.model('Admin', adminSchema);

const donationSchema = new mongoose.Schema({
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer' },
  name: String,
  email: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});
const Donation = mongoose.model('Donation', donationSchema);

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer' }],
});
const Event = mongoose.model('Event', eventSchema);

// --- Admin Model ---
const adminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // personal password
});
const Admin = mongoose.model('Admin', adminSchema);

// --- App Setup ---
const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- Volunteer Registration ---
app.post('/api/volunteer/register', async (req, res) => {
  try {
    const { name, email, phone, password, skills, availability } = req.body;
    const existing = await Volunteer.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered.' });
    const volunteer = new Volunteer({ name, email, phone, password, skills, availability });
    await volunteer.save();
    res.json({ message: 'Volunteer registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// --- Volunteer Login ---
app.post('/api/volunteer/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const volunteer = await Volunteer.findOne({ email, password });
    if (!volunteer) return res.status(401).json({ message: 'Invalid credentials.' });
    res.json({ message: 'Login successful.', volunteerId: volunteer._id, name: volunteer.name });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// --- Admin Registration ---
app.post('/api/admin/register', async (req, res) => {
  try {
    const { name, email, password, adminPassword } = req.body;
    if (adminPassword !== '1234') {
      return res.status(401).json({ message: 'Invalid admin password.' });
    }
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered as admin.' });
    const admin = new Admin({ name, email, password });
    await admin.save();
    res.json({ message: 'Admin registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// --- Admin Login (DB) ---
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email, password });
    if (!admin) return res.status(401).json({ message: 'Invalid admin credentials.' });
    res.json({ message: 'Admin login successful.', adminId: admin._id, name: admin.name });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// --- Add Donation (Volunteer) ---
app.post('/api/donations', async (req, res) => {
  try {
    const { volunteerId, name, email, amount } = req.body;
    const donation = new Donation({ volunteerId, name, email, amount });
    await donation.save();
    res.json({ message: 'Donation recorded. Thank you!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// --- Get All Donations (Admin) ---
app.get('/api/admin/donations', async (req, res) => {
  try {
    const donations = await Donation.find().populate('volunteerId', 'name email');
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// --- Create Event (Admin) ---
app.post('/api/admin/events', async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const event = new Event({ title, description, date, location, attendees: [] });
    await event.save();
    res.json({ message: 'Event created.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// --- Get All Events (Volunteer & Admin) ---
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().populate('attendees', 'name email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// --- RSVP to Event (Volunteer) ---
app.post('/api/events/:id/rsvp', async (req, res) => {
  try {
    const eventId = req.params.id;
    const { volunteerId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found.' });
    if (event.attendees.includes(volunteerId)) {
      return res.status(400).json({ message: 'Already registered for this event.' });
    }
    event.attendees.push(volunteerId);
    await event.save();
    res.json({ message: 'RSVP successful.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// --- Get All Volunteers (Admin) ---
app.get('/api/admin/volunteers', async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// --- Start Server ---
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`GreenCare backend running on port ${PORT}`);
});
