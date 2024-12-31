import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './Login.css';

function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false); // To toggle between Login and Register forms
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const images = [
    "https://img.freepik.com/free-vector/plant-white_1308-41021.jpg?semt=ais_hybrid",
    "https://img.freepik.com/free-photo/dirt-ecology-soil-spring-ground_1172-189.jpg?semt=ais_hybrid",
    "https://img.freepik.com/free-vector/watering-ficus-realistic-illustration_1284-25540.jpg?semt=ais_hybrid"
  ];

  // Toggle between Login and Sign Up forms
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  // Cycle through the images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Perform validation for sign-up
    if (isSignUp && password !== confirmPassword) {
      setError("Passwords don't match!");
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        // Register new user
        await axios.post('http://localhost:5000/api/auth/register', {
          username,  // Include username in the request body
          email,
          password,
        });
  
        
        setIsSignUp(false); // Switch to login form after successful registration
        setLoading(false); 
      } else {
        // Login user
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email,
          password,
        });
        // Save token to localStorage
        localStorage.setItem('token', response.data.token);
        
        navigate('/'); // Navigate to home page after login
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="login-page">
      <div className="visual-section">
        <div className="slider">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Plant ${index + 1}`}
              className={`slider-image ${currentImageIndex === index ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
      <div className="form-section">
        <h1 className="form-title">{isSignUp ? 'Sign Up' : 'Log In'}</h1>
        <form className="form" onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="form-input"
              value={username}
              onChange={handleInputChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="form-input"
            value={email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={handleInputChange}
            required
          />
          {isSignUp && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="form-input"
              value={confirmPassword}
              onChange={handleInputChange}
              required
            />
          )}
          <button type="submit" className="form-btn" disabled={loading}>
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        {error && <p className="error-text">{error}</p>}
        <p className="toggle-text">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <span className="toggle-link" onClick={toggleForm}>
            {isSignUp ? 'Log In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
