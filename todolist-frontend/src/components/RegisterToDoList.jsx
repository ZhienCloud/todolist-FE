import { useState } from "react";
import * as yup from "yup";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import "./CSS/Register.css"
export default function Register() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleFormChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm(formData);
  
    if (Object.keys(validationErrors).length === 0) {
      // form is valid, proceed with submission
      axios
        .post('http://localhost:3000/api/users/register', formData)
        .then((response) => {
          navigate('/login');
          // perform further actions after successful registration
        })
        .catch((error) => {
          console.log(error);
          // handle the error
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const schema = yup.object().shape({
      username: yup.string().min(3).max(100).required().label("Name"),
      email: yup.string().min(3).required().email().label("Email"),
      password: yup.string().required().min(6).label("Password"),
    });

    try {
      schema.validateSync(data, { abortEarly: false });
      return {};
    } catch (error) {
      const errors = {};
      error.inner.forEach((detail) => {
        errors[detail.path] = detail.message;
      });
      return errors;
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={(e) => {
              handleFormChange(e, "username");
            }}
          />
          {errors.username && <div className="error">{errors.username}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={(e) => {
              handleFormChange(e, "email");
            }}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={(e) => {
              handleFormChange(e, "password");
            }}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
