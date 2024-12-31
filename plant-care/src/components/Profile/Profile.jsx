import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import NavBar from '../Navbar/NavBar';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false); // To toggle edit mode
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setFormData({
          fullName: response.data.fullName || '',
          phone: response.data.phone || '',
          address: response.data.address || '',
        });
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const response = await axios.put(
        'http://localhost:5000/api/auth/profile',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);
      setUser({ ...user, ...formData }); // Update the UI with new data
      setEditMode(false); // Exit edit mode
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    }
  };

  if (error) return <div className="error-text">{error}</div>;
  if (!user) return <div className="loading-text">Loading...</div>;

  return (
    <div>
      <NavBar />
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="avatar">
            <img src="https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp" alt="User Avatar" />
          </div>
          <div className="profile-info">
            <h1>{user.username}</h1>
            <p className="email">{user.email}</p>
            <button className="edit-btn" onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Personal Info Section */}
        <div className="personal-info">
          <h2>Personal Information</h2>
          <div className="info-grid">
            {editMode ? (
              <>
                <div>
                  <strong>Full Name:</strong>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <strong>Phone:</strong>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <strong>Address:</strong>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div >
                  <button onClick={handleSave} className='edit-btn'>Save</button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <strong>Full Name:</strong>
                  <p>{user.fullName || 'Not Provided'}</p>
                </div>
                <div>
                  <strong>Phone:</strong>
                  <p>{user.phone || 'Not Provided'}</p>
                </div>
                <div>
                  <strong>Address:</strong>
                  <p>{user.address || 'Not Provided'}</p>
                </div>
              </>
            )}
          </div>
        </div>
               {/* Recent Activities Section */}
      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          <li>Logged in on {new Date().toLocaleDateString()}</li>
          <li>Updated profile picture</li>
          <li>Changed password</li>
        </ul>
      </div>

      {/* Settings Section */}
      <div className="settings">
        <h2>Settings</h2>
        <button className="settings-btn">Account Settings</button>
        <button className="settings-btn">Privacy Settings</button>
        <Link to="/login" className="settings-btn">Logout</Link>
      </div>
      </div>
    </div>
  );
}

export default ProfilePage;
