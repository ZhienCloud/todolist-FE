import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/auth/AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const { loginSuccess } = useContext(AuthContext);

  // create state to store form data
  const [formData, setFormData] = useState({});

  const handleFormChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/login',
        formData
      );
      const token = response.data.token;
      localStorage.setItem('token', token); // Save the token to localStorage
      loginSuccess(token);
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={(e) => { handleFormChange(e, 'email') }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={(e) => { handleFormChange(e, 'password') }}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
