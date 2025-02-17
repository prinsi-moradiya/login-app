import React, { useState, useContext } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    // Retrieve stored users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      setUser({ name: user.name, email: user.email });
      navigate("/dashboard");
    } else {
      const isEmailRegistered = users.some((u) => u.email === email);

      if (isEmailRegistered) {
        alert("Incorrect password. Please try again.");
      } else {
        // Show confirmation alert and redirect to Register page
        const confirmRegister = window.confirm("You are not registered! Click OK to Register.");
        if (confirmRegister) {
          navigate("/register");
        }
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "100%", maxWidth: "400px", padding: "20px" }}>
        <Card.Body>
          <h3 className="text-center fw-bold mb-4">Login</h3>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">Login</Button>
          </Form>
          <div className="text-center mt-3">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
