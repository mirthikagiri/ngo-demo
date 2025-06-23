import React from "react";

// Header Component
function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-2">
          <span className="text-3xl text-green-700 font-bold">🌱 GreenCare</span>
        </div>
        <nav className="space-x-6 font-medium text-green-800">
          <a href="#home" className="hover:text-green-500 transition">Home</a>
          <a href="#about" className="hover:text-green-500 transition">About</a>
          <a href="#donate" className="hover:text-green-500 transition">Donate</a>
          <a href="#volunteer" className="hover:text-green-500 transition">Volunteer</a>
          <a href="#events" className="hover:text-green-500 transition">Events</a>
        </nav>
      </div>
    </header>
  );
}

// Hero Section
function Hero() {
  return (
    <section
      id="home"
      className="relative bg-green-100 min-h-[60vh] flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-green-900/50" />
      <div className="relative z-10 text-center text-white py-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Together for a Greener Tomorrow
        </h1>
        <p className="text-xl md:text-2xl mb-8 drop-shadow">
          Join us in planting hope, one tree at a time
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="#donate"
            className="bg-green-600 hover:bg-green-700 transition text-white px-8 py-3 rounded-full font-semibold shadow-lg"
          >
            Donate Now
          </a>
          <a
            href="#volunteer"
            className="bg-green-300 hover:bg-green-400 transition text-green-900 px-8 py-3 rounded-full font-semibold shadow-lg"
          >
            Join as Volunteer
          </a>
        </div>
      </div>
    </section>
  );
}

// About Section
function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">About Us</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10 text-center">
          GreenCare is a youth-led NGO committed to building a sustainable and greener planet. Through community-driven environmental initiatives, tree plantations, clean-up drives, and eco-awareness campaigns, we empower individuals to be part of the solution, not the pollution.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-10">
          <div className="flex flex-col items-center">
            <span className="text-4xl text-green-600 mb-2">🌍</span>
            <span className="font-semibold text-green-800">Impact</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl text-green-600 mb-2">🙌</span>
            <span className="font-semibold text-green-800">Community</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl text-green-600 mb-2">🌱</span>
            <span className="font-semibold text-green-800">Nature</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="font-bold text-green-700 mb-2">🎯 Mission</h3>
            <p className="text-gray-700">
              To create a cleaner, greener, and more conscious world by mobilizing communities to take environmental action — one tree, one act, one life at a time.
            </p>
            <h3 className="font-bold text-green-700 mt-4 mb-2">👁️‍🗨️ Vision</h3>
            <p className="text-gray-700">
              A world where environmental responsibility is a shared way of life — where every citizen is a guardian of nature, and every action nurtures the planet.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-green-700 mb-2">💚 Core Values</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>🌍 Environmental Responsibility</li>
              <li>🙌 Community Empowerment</li>
              <li>🌱 Grassroots Action</li>
              <li>💡 Transparency & Trust</li>
            </ul>
            <h3 className="font-bold text-green-700 mt-4 mb-2">🧑‍🤝‍🧑 Who We Work With</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Schools & colleges (eco-clubs, NSS, etc.)</li>
              <li>Local governments & panchayats</li>
              <li>Corporates under CSR</li>
              <li>Independent youth and nature lovers</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-green-700">🌳 12,000+</div>
            <div className="text-gray-700">Trees Planted</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-700">🧹 40+</div>
            <div className="text-gray-700">Clean-Up Drives</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-700">👥 2,500+</div>
            <div className="text-gray-700">Active Volunteers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-700">🏫 18</div>
            <div className="text-gray-700">College Collaborations</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Project Card
function ProjectCard({ title, image, progress }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
      <img src={image} alt={title} className="rounded-lg h-40 object-cover mb-4" />
      <h4 className="font-bold text-green-700 mb-2">{title}</h4>
      <div className="w-full bg-green-100 rounded-full h-3 mb-2">
        <div
          className="bg-green-500 h-3 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <button
        className="mt-auto bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
      >
        Support
      </button>
    </div>
  );
}

// Event Card
function EventCard({ date, title, location }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
      <div className="text-green-700 font-bold mb-1">{date}</div>
      <h4 className="font-bold text-lg mb-1">{title}</h4>
      <div className="text-gray-600 mb-2">{location}</div>
      <button
        className="mt-auto bg-green-300 hover:bg-green-400 text-green-900 py-2 rounded-lg transition"
      >
        RSVP
      </button>
    </div>
  );
}

// Testimonials
function Testimonials() {
  return (
    <section className="py-16 bg-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">What Our Volunteers Say</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <blockquote className="bg-white rounded-xl shadow-md p-6 max-w-md">
            <p className="text-lg italic mb-2">"GreenCare gave me a purpose and a family. Planting trees with them changed my life!"</p>
            <footer className="text-green-700 font-bold">— Priya, Volunteer</footer>
          </blockquote>
          <blockquote className="bg-white rounded-xl shadow-md p-6 max-w-md">
            <p className="text-lg italic mb-2">"I love seeing the impact of my donations. GreenCare is transparent and inspiring!"</p>
            <footer className="text-green-700 font-bold">— Rahul, Donor</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="font-bold text-xl mb-2">GreenCare NGO</div>
          <div>Email: <a href="mailto:info@greencare.org" className="underline">info@greencare.org</a></div>
          <div>Phone: +91 98765 43210</div>
        </div>
        <div className="flex gap-4 text-2xl">
          <a href="#" className="hover:text-green-300 transition">FB</a>
          <a href="#" className="hover:text-green-300 transition">IG</a>
          <a href="#" className="hover:text-green-300 transition">TW</a>
        </div>
        <div className="text-sm mt-2 md:mt-0">
          &copy; {new Date().getFullYear()} GreenCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// Main Landing Page
export default function LandingPage() {
  const projects = [
    {
      title: "Tree Plantation Drive",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      progress: 80,
    },
    {
      title: "River Clean-Up",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
      progress: 60,
    },
    {
      title: "Eco Awareness Campaign",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      progress: 45,
    },
  ];
  const events = [
    {
      date: "Jul 10, 2025",
      title: "Monsoon Tree Planting",
      location: "City Park",
    },
    {
      date: "Aug 2, 2025",
      title: "Plastic-Free Drive",
      location: "Riverfront",
    },
  ];
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <section id="projects" className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Ongoing Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <ProjectCard key={i} {...p} />
            ))}
          </div>
        </div>
      </section>
      <section id="events" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((e, i) => (
              <EventCard key={i} {...e} />
            ))}
          </div>
        </div>
      </section>
      <Testimonials />
      <Footer />
    </div>
  );
}
