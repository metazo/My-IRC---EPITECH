import React, { useContext, useState } from "react";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import { useLoginUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { AppContext } from "../context/appContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { socket } = useContext(AppContext);
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    function handleLogin(e) {
        e.preventDefault();
        // login logic
        loginUser({ email, password }).then(({ data }) => {
            if (data) {
                // socket work
                socket.emit("new-user");
                // navigate to the chat
                navigate("/chat");
            }
        });
    }

    return (
      <Container>
        <Row>
          <Col md={5} className="login__bg"></Col>
          <Col
            md={7}
            className="d-flex align-items-center justify-content-center flex-direction-column"
          >
            <Form
              style={{ width: "80%", maxWidth: 500 }}
              onSubmit={handleLogin}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {error && <p className="alert alert-danger">{error.data}</p>}
                <Form.Label>Adresse email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <Form.Text className="text-muted">
                  Nous ne partagerons jamais votre e-mail avec quelqu'un
                  d'autre.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {isLoading ? <Spinner animation="grow" /> : "Login"}
              </Button>
              <div className="py-4">
                <p className="text-center">
                  Pas encore de compte ? <Link to="/signup">M'inscrire</Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
}

export default Login;
