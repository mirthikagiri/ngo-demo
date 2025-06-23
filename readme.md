// Create a simple full-stack web application for an NGO called "GreenCare".
// The app should have the following features:

// 1. A Home page:
//    - Brief intro about the NGO (mission, vision)
//    - Section to show ongoing projects (with title, image, and short description)

// 2. Donation Page:
//    - A form to accept donations (name, email, amount)
//    - Integrate with a dummy payment handler or Razorpay (test mode)
//    - After successful donation, display a thank-you message
//    - Show progress bar for fundraising goals per project

// 3. Volunteer Sign-Up:
//    - A form to collect name, email, contact number, skills, and availability
//    - Submit button should store data in a MongoDB collection called 'volunteers'
//    - On submit, send a confirmation email using NodeMailer

// 4. Event Page:
//    - List of upcoming events with RSVP buttons for volunteers
//    - Store RSVPs in MongoDB and prevent duplicate submissions

// 5. Admin Dashboard (basic):
//    - Simple login form for admin (hardcoded credentials is fine)
//    - View all donations and volunteer signups in a table format

// Frontend:
//    - Use React with Tailwind CSS
//    - Use Postman for API requests

// Backend:
//    - Node.js + Express
//    - MongoDB (Mongoose models for volunteers, donations, events)
//    - Routes for /donate, /volunteer, /events, /admin

// Optional:
//    - Add Toasts for form submissions
//    - Add a loading spinner when forms are being submitted

// Keep code modular and clean, and write comments for clarity.
