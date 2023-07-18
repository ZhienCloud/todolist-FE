import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/auth/AuthProvider";
import Modal from "react-modal";
import "./CSS/LoginCSS.css";

Modal.setAppElement("#root");

export default function Login() {
  const navigate = useNavigate();
  const { loginSuccess } = useContext(AuthContext);

  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false); // State to control the popup modal

  const handleFormChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        formData
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      loginSuccess(token);
      navigate("/todolist/new");
    } catch (error) {
      console.log(error);
      setShowModal(true); // Set showModal state to true to show the popup modal
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the popup modal
  };

  return (
    <div className="container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <Modal isOpen={showModal} onRequestClose={closeModal} className="modal-container">
  <div className="modal-content">
    <h2 className="modal-title">Login Failed</h2>
    <p className="modal-message">Please check your email and password.</p>
    <button className="modal-close-button" onClick={closeModal}>Close</button>
  </div>
</Modal>
    </div>
  );
}
