import React, { useContext } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/register");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "100%", maxWidth: "400px", padding: "20px", textAlign: "center" }}>
        <Card.Body>
          <h3 className="fw-bold">Welcome, {user ? user.name : "Guest"}!</h3>
          <Button variant="danger" className="w-100 mt-3" onClick={handleLogout}>Logout</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
