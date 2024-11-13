import React, { useState } from 'react';
import './RegistrationForm.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = '';

    switch (name) {
      case 'email':
        errorMsg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Email tidak valid';
        break;
      case 'password':
        errorMsg = value.length >= 6 ? '' : 'Password minimal 6 karakter';
        break;
      case 'confirmPassword':
        errorMsg = value === formData.password ? '' : 'Password tidak sesuai';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.keys(formData).forEach((field) => validateField(field, formData[field]));
    if (Object.values(errors).every((msg) => msg === '')) {
      console.log('Data terkirim:', formData);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }
  };

  return (
    <div className="registration-form">
      <h2>Formulir Registrasi</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nama:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>Konfirmasi Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>

        <button type="submit" className="submit-button">Daftar</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
