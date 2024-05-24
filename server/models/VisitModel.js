const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  // Basic appointment details
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

  // Additional calendar-specific properties (customize as needed)
  allDay: {
    type: Boolean,
    default: false, // Appointments are not all-day events by default
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  recurrence: { // Optional: Recurring event details (e.g., frequency, duration)
    type: String,
  },
  // ... other relevant calendar data (e.g., location, attendees, notes)
}, { timestamps: true }); // Include timestamps for creation and modification tracking

export default mongoose.model('Calendar', VisitSchema);