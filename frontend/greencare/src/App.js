import React, { useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState('login');
  const [userType, setUserType] = useState('volunteer'); // 'admin' or 'volunteer'
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error' | 'info', text: string }

  // Login handler with backend integration
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (userType === 'volunteer') {
      const email = e.target[0].value;
      const password = e.target[1].value;
      try {
        const res = await fetch('http://localhost:5000/api/volunteer/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const result = await res.json();
        if (res.ok) {
          setUser({ name: result.name, type: 'volunteer', volunteerId: result.volunteerId });
          setPage('home');
        } else {
          if (result.message === 'Invalid credentials.' || result.message === 'Email already registered.') {
            setMessage({ type: 'error', text: 'No account found. Please register as a volunteer.' });
            setTimeout(() => setPage('register'), 1500);
          } else {
            setMessage({ type: 'error', text: result.message || 'Login failed.' });
          }
        }
      } catch (error) {
        setMessage({ type: 'error', text: 'Server error.' });
      }
    } else if (userType === 'admin') {
      const email = e.target[0].value;
      const password = e.target[1].value;
      try {
        const res = await fetch('http://localhost:5000/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const result = await res.json();
        if (res.ok) {
          setUser({ name: result.name, type: 'admin', adminId: result.adminId });
          setPage('home');
        } else {
          setMessage({ type: 'error', text: result.message || 'Login failed.' });
        }
      } catch (err) {
        setMessage({ type: 'error', text: 'Server error.' });
      }
    }
  };

  // Register handler with backend integration
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
      skills: form.skills.value,
      availability: form.availability.value,
    };
    try {
      const res = await fetch('http://localhost:5000/api/volunteer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Registration successful! Please login.' });
        setTimeout(() => setPage('login'), 1500);
      } else {
        setMessage({ type: 'error', text: result.message || 'Registration failed.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Server error.' });
    }
  };

  // Admin registration handler
  const handleAdminRegister = async (e) => {
    e.preventDefault();
    setMessage(null);
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      adminPassword: form.adminPassword.value,
    };
    try {
      const res = await fetch('http://localhost:5000/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Admin registered! Please login.' });
        setTimeout(() => setPage('login'), 1500);
      } else {
        setMessage({ type: 'error', text: result.message || 'Registration failed.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Server error.' });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
  };

  // Navigation bar
  const NavBar = () => (
    <nav className="navbar">
      <div className="navbar-logo">
        <span style={{ fontWeight: 'bold', fontSize: 24, fontFamily: 'Poppins, Arial, sans-serif', color: '#256029' }}>🌱 GreenCare</span>
      </div>
      {user && (
        <div className="navbar-links" style={{ display: 'flex', alignItems: 'center' }}>
          {(page === 'donations' || page === 'events' || page === 'profile') && (
            <button onClick={() => setPage('home')} style={{ marginRight: 16, background: '#e6ffe6', color: '#256029', border: '2px solid #256029' }}>
              ← Home
            </button>
          )}
          <button onClick={() => setPage('donations')}>Donations</button>
          <button onClick={() => setPage('events')}>Events</button>
          <button onClick={() => setPage('profile')}>Profile</button>
          <button onClick={handleLogout} style={{ marginLeft: 16 }}>Logout</button>
        </div>
      )}
    </nav>
  );

  // Login Page
  const LoginPage = () => {
    const [showAdminRegister, setShowAdminRegister] = useState(false);
    const [adminRegMsg, setAdminRegMsg] = useState(null);
    const [adminRegForm, setAdminRegForm] = useState({ name: '', email: '', password: '', adminPassword: '' });

    // Admin registration handler
    const handleAdminRegister = async (e) => {
      e.preventDefault();
      setAdminRegMsg(null);
      try {
        const res = await fetch('http://localhost:5000/api/admin/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(adminRegForm),
        });
        const result = await res.json();
        if (res.ok) {
          setAdminRegMsg({ type: 'success', text: 'Admin registered! Please login.' });
          setTimeout(() => setShowAdminRegister(false), 1500);
        } else {
          setAdminRegMsg({ type: 'error', text: result.message || 'Registration failed.' });
        }
      } catch {
        setAdminRegMsg({ type: 'error', text: 'Server error.' });
      }
    };

    return (
      <div className="login-container">
        <h2>Login</h2>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button
            onClick={() => { setUserType('volunteer'); setShowAdminRegister(false); }}
            className={userType === 'volunteer' ? 'active usertype-btn' : 'usertype-btn'}
            type="button"
          >
            Volunteer
          </button>
          <button
            onClick={() => setUserType('admin')}
            className={userType === 'admin' ? 'active usertype-btn' : 'usertype-btn'}
            type="button"
          >
            Admin
          </button>
        </div>
        {userType === 'volunteer' && (
          <form onSubmit={handleLogin} className="login-form">
            <input type="email" placeholder="Email" required className="input-field" />
            <input type="password" placeholder="Password" required className="input-field" />
            <button type="submit" className="main-btn">Login</button>
          </form>
        )}
        {userType === 'admin' && !showAdminRegister && (
          <>
            <form onSubmit={handleLogin} className="login-form">
              <input type="email" placeholder="Email" required className="input-field" />
              <input type="password" placeholder="Password" required className="input-field" />
              <button type="submit" className="main-btn">Login</button>
            </form>
            <p>Not registered as admin? <span className="link" onClick={() => setShowAdminRegister(true)}>Register here</span></p>
          </>
        )}
        {userType === 'admin' && showAdminRegister && (
          <>

            <input type="email" placeholder="Email" required className="input-field" />
            <input type="password" placeholder="Password" required className="input-field" />
          </>
        )}
        <button type="submit" className="main-btn">Login</button>
      </form>
      {userType === 'volunteer' && (
        <p>Not registered? <span className="link" onClick={() => setPage('register')}>Register here</span></p>
      )}
      {userType === 'admin' && (
        <p>Not registered as admin? <span className="link" onClick={() => setPage('admin-register')}>Register here</span></p>
      )}
    </div>
  );
=======
            <form onSubmit={handleAdminRegister} className="login-form">
              <input type="text" placeholder="Name" required className="input-field" value={adminRegForm.name} onChange={e => setAdminRegForm(f => ({ ...f, name: e.target.value }))} />
              <input type="email" placeholder="Email" required className="input-field" value={adminRegForm.email} onChange={e => setAdminRegForm(f => ({ ...f, email: e.target.value }))} />
              <input type="password" placeholder="Personal Password" required className="input-field" value={adminRegForm.password} onChange={e => setAdminRegForm(f => ({ ...f, password: e.target.value }))} />
              <input type="password" placeholder="Admin Password (1234)" required className="input-field" value={adminRegForm.adminPassword} onChange={e => setAdminRegForm(f => ({ ...f, adminPassword: e.target.value }))} />
              <button type="submit" className="main-btn">Register as Admin</button>
            </form>
            {adminRegMsg && <div className={`message ${adminRegMsg.type}`}>{adminRegMsg.text}</div>}
            <p>Already registered? <span className="link" onClick={() => setShowAdminRegister(false)}>Login here</span></p>
          </>
        )}
        {userType === 'volunteer' && (
          <p>Not registered? <span className="link" onClick={() => setPage('register')}>Register here</span></p>
        )}
      </d

  // Register Page (Volunteer)
  const RegisterPage = () => (
    <div className="register-container">
      <h2>Volunteer Registration</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input type="text" placeholder="Name" required className="input-field" name="name" />
        <input type="email" placeholder="Email" required className="input-field" name="email" />
        <input type="text" placeholder="Phone" required className="input-field" name="phone" />
        <input type="password" placeholder="Password" required className="input-field" name="password" />
        <input type="text" placeholder="Skills (comma separated)" className="input-field" name="skills" />
        <input type="text" placeholder="Availability" className="input-field" name="availability" />
        <button type="submit" className="main-btn">Register</button>
      </form>
      <p>Already registered? <span className="link" onClick={() => setPage('login')}>Login here</span></p>
    </div>
  );

  // Admin Register Page
  const AdminRegisterPage = () => (
    <div className="register-container">
      <h2>Admin Registration</h2>
      <form onSubmit={handleAdminRegister} className="register-form">
        <input type="text" placeholder="Name" required className="input-field" name="name" />
        <input type="email" placeholder="Email" required className="input-field" name="email" />
        <input type="password" placeholder="Personal Password" required className="input-field" name="password" />
        <input type="password" placeholder="Admin Password (1234)" required className="input-field" name="adminPassword" />
        <button type="submit" className="main-btn">Register as Admin</button>
      </form>
      <p>Already registered? <span className="link" onClick={() => setPage('login')}>Login here</span></p>
    </div>
  );

  // Home Page
  const HomePage = () => (
    <div
      className="home-container"
      style={{
        maxWidth: 900,
        minHeight: 600,
        margin: '40px auto',
        background: '#fff',
        borderRadius: 32,
        boxShadow: '0 8px 32px rgba(44, 94, 60, 0.12)',
        padding: '48px 40px 40px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 700, fontSize: '2.5rem', color: '#256029', marginBottom: 12, letterSpacing: 1 }}>Welcome to GreenCare</h1>
      <section className="mission-vision">
        <h2 style={{ fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '2rem', color: '#256029', marginBottom: 8 }}>About Us</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#234', marginBottom: 8 }}>GreenCare is a youth-led NGO committed to building a sustainable and greener planet. Through community-driven environmental initiatives, tree plantations, clean-up drives, and eco-awareness campaigns, we empower individuals to be part of the solution, not the pollution.</p>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#234', marginBottom: 16 }}>Our work is rooted in care — for the earth, for the future, and for the generations yet to come.</p>
        <h3 style={{ fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1.3rem', color: '#1b4d2b', marginTop: 18 }}>🎯 Mission</h3>
        <p style={{ fontSize: '1.08rem', lineHeight: 1.6, color: '#234', marginBottom: 12 }}>To create a cleaner, greener, and more conscious world by mobilizing communities to take environmental action — one tree, one act, one life at a time.</p>
        <h3 style={{ fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1.3rem', color: '#1b4d2b', marginTop: 18 }}>👁️‍🗨️ Vision</h3>
        <p style={{ fontSize: '1.08rem', lineHeight: 1.6, color: '#234', marginBottom: 12 }}>A world where environmental responsibility is a shared way of life — where every citizen is a guardian of nature, and every action nurtures the planet.</p>
        <h3 style={{ fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1.3rem', color: '#1b4d2b', marginTop: 18 }}>💚 Core Values</h3>
        <ul style={{ fontSize: '1.08rem', lineHeight: 1.7, color: '#234', marginBottom: 12, paddingLeft: 24 }}>
          <li style={{ marginBottom: 4 }}>🌍 <b style={{ fontWeight: 600 }}>Environmental Responsibility</b>: We believe protecting the planet is a collective duty — not a choice.</li>
          <li style={{ marginBottom: 4 }}>🙌 <b style={{ fontWeight: 600 }}>Community Empowerment</b>: We collaborate with individuals, students, and volunteers to drive sustainable change.</li>
          <li style={{ marginBottom: 4 }}>🌱 <b style={{ fontWeight: 600 }}>Grassroots Action</b>: We believe big change starts small — with every tree planted and every habit changed.</li>
          <li style={{ marginBottom: 4 }}>💡 <b style={{ fontWeight: 600 }}>Transparency & Trust</b>: We commit to clarity in our impact, funds, and goals — every rupee and every root counts.</li>
        </ul>
        <h3 style={{ fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1.3rem', color: '#1b4d2b', marginTop: 18 }}>🧑‍🤝‍🧑 Who We Work With</h3>
        <ul style={{ fontSize: '1.08rem', lineHeight: 1.7, color: '#234', marginBottom: 12, paddingLeft: 24 }}>
          <li>Schools & colleges (eco-clubs, NSS, etc.)</li>
          <li>Local governments & panchayats</li>
          <li>Corporates under CSR</li>
          <li>Independent youth and nature lovers</li>
        </ul>
        <h3 style={{ fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1.3rem', color: '#1b4d2b', marginTop: 18 }}>📈 Our Impact So Far</h3>
        <ul style={{ fontSize: '1.08rem', lineHeight: 1.7, color: '#234', marginBottom: 12, paddingLeft: 24 }}>
          <li>🌳 12,000+ Trees Planted</li>
          <li>🧹 40+ Clean-Up Drives</li>
          <li>👥 2,500+ Active Volunteers</li>
          <li>🏫 18 College Collaborations</li>
        </ul>
      </section>
      <section className="stats" style={{ display: 'flex', gap: 32, margin: '24px 0', fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 500, fontSize: '1.1rem', color: '#256029' }}>
        <div><strong>Volunteers:</strong> 120</div>
        <div><strong>Total Donations:</strong> $15,000</div>
        <div><strong>Events Conducted:</strong> 25</div>
      </section>
      <section className="events-summary">
        <h3 style={{ fontFamily: 'Poppins, Arial, sans-serif', fontWeight: 600, fontSize: '1.2rem', color: '#1b4d2b', marginBottom: 8 }}>Recent Events</h3>
        <ul style={{ fontSize: '1.05rem', color: '#234', paddingLeft: 24 }}>
          <li>Tree Plantation Drive - June 2025</li>
          <li>Beach Cleanup - May 2025</li>
          <li>Eco Awareness Workshop - April 2025</li>
        </ul>
      </section>
    </div>
  );

  // Donations Page
  const DonationsPage = () => {
    const [donationMsg, setDonationMsg] = useState(null);
    const [form, setForm] = useState({ name: user?.name || '', email: '', amount: '', date: '' });
    const handleDonationChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleDonation = async (e) => {
      e.preventDefault();
      setDonationMsg(null);
      // Get volunteerId by email
      try {
        const resVolunteer = await fetch('http://localhost:5000/api/admin/volunteers');
        const volunteers = await resVolunteer.json();
        const volunteer = volunteers.find(v => v.email === form.email);
        if (!volunteer) {
          setDonationMsg({ type: 'error', text: 'No volunteer found with this email.' });
          return;
        }
        const donationData = {
          volunteerId: volunteer._id,
          name: form.name,
          email: form.email,
          amount: Number(form.amount),
          date: form.date || undefined,
        };
        const res = await fetch('http://localhost:5000/api/donations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(donationData),
        });
        const result = await res.json();
        if (res.ok) {
          setDonationMsg({ type: 'success', text: 'Donation added successfully!' });
          setForm({ name: user?.name || '', email: '', amount: '', date: '' });
        } else {
          setDonationMsg({ type: 'error', text: result.message || 'Failed to add donation.' });
        }
      } catch (err) {
        setDonationMsg({ type: 'error', text: 'Server error.' });
      }
    };
    return (
      <div className="donations-container">
        {user?.type === 'admin' ? (
          <>
            <h2>All Donations</h2>
            {/* TODO: Fetch and display all donations from backend */}
            <ul>
              <li>John Doe - $100 - 2025-06-01</li>
              <li>Jane Smith - $50 - 2025-05-20</li>
            </ul>
          </>
        ) : (
          <>
            <h2>Add Donation</h2>
            {donationMsg && <div className={`message ${donationMsg.type}`}>{donationMsg.text}</div>}
            <form className="donation-form" onSubmit={handleDonation} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleDonationChange} required className="input-field" style={{ maxWidth: 320 }} />
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleDonationChange} required className="input-field" style={{ maxWidth: 320 }} />
              <input type="number" name="amount" placeholder="Amount (USD)" value={form.amount} onChange={handleDonationChange} required className="input-field" style={{ maxWidth: 320 }} />
              <input type="date" name="date" placeholder="Date" value={form.date} onChange={handleDonationChange} className="input-field" style={{ maxWidth: 320 }} />
              <button type="submit" className="main-btn" style={{ maxWidth: 320 }}>Donate</button>
            </form>
          </>
        )}
      </div>
    );
  };

  // Events Page
  const EventsPage = () => {
    const [eventForm, setEventForm] = useState({ title: '', description: '', date: '', location: '' });
    const [eventMsg, setEventMsg] = useState(null);
    const handleEventChange = (e) => {
      setEventForm({ ...eventForm, [e.target.name]: e.target.value });
    };
    const handleAddEvent = async (e) => {
      e.preventDefault();
      setEventMsg(null);
      try {
        const res = await fetch('http://localhost:5000/api/admin/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventForm),
        });
        const result = await res.json();
        if (res.ok) {
          setEventMsg({ type: 'success', text: 'Event added successfully!' });
          setEventForm({ title: '', description: '', date: '', location: '' });
        } else {
          setEventMsg({ type: 'error', text: result.message || 'Failed to add event.' });
        }
      } catch {
        setEventMsg({ type: 'error', text: 'Server error.' });
      }
    };
    return (
      <div className="events-container">
        {user?.type === 'admin' ? (
          <>
            <h2>Add Event</h2>
            {eventMsg && <div className={`message ${eventMsg.type}`}>{eventMsg.text}</div>}
            <form className="event-form" onSubmit={handleAddEvent}>
              <input type="text" name="title" placeholder="Title" required className="input-field" value={eventForm.title} onChange={handleEventChange} />
              <input type="text" name="description" placeholder="Description" required className="input-field" value={eventForm.description} onChange={handleEventChange} />
              <input type="date" name="date" required className="input-field" value={eventForm.date} onChange={handleEventChange} />
              <input type="text" name="location" placeholder="Location" required className="input-field" value={eventForm.location} onChange={handleEventChange} />
              <button type="submit" className="main-btn">Add Event</button>
            </form>
          </>
        ) : null}
        <h2>All Events</h2>
        {/* TODO: Fetch and display all events from backend */}
        <ul>
          <li>
            Tree Plantation Drive - June 2025
            {user?.type === 'volunteer' && <button style={{ marginLeft: 8 }} className="main-btn">RSVP</button>}
          </li>
          <li>
            Beach Cleanup - May 2025
            {user?.type === 'volunteer' && <button style={{ marginLeft: 8 }} className="main-btn">RSVP</button>}
          </li>
        </ul>
      </div>
    );
  };

  // Profile Page
  const ProfilePage = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    React.useEffect(() => {
      async function fetchDonations() {
        if (user?.type === 'volunteer' && user?.volunteerId) {
          try {
            const res = await fetch('http://localhost:5000/api/admin/donations');
            const allDonations = await res.json();
            const myDonations = allDonations.filter(d => d.volunteerId?._id === user.volunteerId);
            setDonations(myDonations);
          } catch {
            setDonations([]);
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      }
      fetchDonations();
    }, [user]);
    return (
      <div className="profile-container">
        <h2>Profile</h2>
        <div><strong>Name:</strong> {user?.name}</div>
        <div><strong>Role:</strong> {user?.type}</div>
        {user?.type === 'volunteer' && (
          <>
            <h3>Your Donations</h3>
            {loading ? <div>Loading...</div> : (
              <ul>
                {donations.length === 0 && <li>No donations yet.</li>}
                {donations.map((d, i) => (
                  <li key={i}>${d.amount} - {d.date ? new Date(d.date).toLocaleDateString() : ''}</li>
                ))}
              </ul>
            )}
          </>
        )}
        {user?.type === 'admin' && (
          <>
            <h3>Admin view</h3>
            {/* Optionally show admin stats here */}
          </>
        )}
      </div>
    );
  };

  // Message component
  const Message = () => message ? (
    <div className={`message ${message.type}`}>{message.text}</div>
  ) : null;

  return (
    <div className="App" style={{ background: '#e6ffe6', minHeight: '100vh', fontFamily: 'Poppins, Arial, sans-serif' }}>
      <NavBar />
      <main>
        <Message />
        {page === 'login' && <LoginPage />}
        {page === 'register' && <RegisterPage />}
        {page === 'admin-register' && <AdminRegisterPage />}
        {page === 'home' && <HomePage />}
        {page === 'donations' && <DonationsPage />}
        {page === 'events' && <EventsPage />}
        {page === 'profile' && <ProfilePage />}
      </main>
    </div>
  );
}

export default App;