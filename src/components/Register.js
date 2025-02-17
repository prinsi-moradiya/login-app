import React, { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Form Updated:", { name, email, password });
  }, [name, email, password]);

  const isFormValid = useMemo(() => {
    return name.trim() !== "" && email.trim() !== "" && password.trim() !== "";
  }, [name, email, password]);

  const handleRegister = useCallback(
    (e) => {
      e.preventDefault();
      if (!isFormValid) {
        alert("Please fill in all fields!");
        return;
      }

      // Retrieve existing users from localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if email is already registered
      if (users.some((user) => user.email === email)) {
        alert("This email is already registered. Please login!");
        return;
      }

      // Add new user to localStorage
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      setUser({ name, email });
      navigate("/login");
    },
    [name, email, password, isFormValid, setUser, navigate]
  );

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "100%", maxWidth: "400px", padding: "20px" }}>
        <Card.Body>
          <h3 className="text-center fw-bold mb-4">Register</h3>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={!isFormValid}>Register</Button>
          </Form>
          <div className="text-center mt-3">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
