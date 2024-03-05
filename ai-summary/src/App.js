import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    agreement: false,
    formSubmitted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      formSubmitted: true,
    }));
  };

  return (
    <div className="container">
      {!formData.formSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Full Name:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                required
              />
              I agree to the terms and conditions
            </label>
          </div>
          {/* Default questions */}
          <div className="form-group">
            <label className="form-label">
              Question 1:
              <input
                type="text"
                name="question1"
                onChange={handleChange}
                required
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              Question 2:
              <input
                type="text"
                name="question2"
                onChange={handleChange}
                required
                className="form-input"
              />
            </label>
          </div>
          {/* End of default questions */}
          <button type="submit" className="submit-button">Submit</button>
        </form>
      ) : (
        <div>
          <h2>Thank you for submitting the form!</h2>
          <p>Here are the current YouTube terms and conditions:</p>
          {/* Display YouTube terms and conditions here */}
        </div>
      )}
    </div>
  );
};

export default App;
