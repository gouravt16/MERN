import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default class LoginRegister extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoggedIn: false,
    };
  }
  handleEmailChange = (e) => this.setState({ email: e.target.value });
  handlePasswordChange = (e) => this.setState({ password: e.target.value });
  handleSubmit = async (e) => {
    console.log(this.state.email, this.state.password);
    e.preventDefault();
    const res = await axios({
      method: "get",
      url: `http://localhost:8080/login`,
      data: {
        email: this.state.email,
        password: this.state.password,
      },
    }).then((response) => {
      this.setState({ isLoggedIn: true });
      console.log(response.data.message);
      sessionStorage.setItem('token', JSON.stringify(response.data.accessToken))
    }).catch((err) => {
      console.error(err)
    })
  };
  componentDidMount() {
    console.log("Loading...");
  }
  render() {
    if (this.state.isLoggedIn) {
      return <Navigate replace to="/home" />
    } else {
      return (
        <Form className="loginForm">
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ width: "100%" }}
            onClick={this.handleSubmit}
          >
            Login
          </Button>

          <div>
            <hr />
            <p style={{ textAlign: "center" }}>New to Professional?</p>
            <Link
              to="/register"
              className="btn btn-secondary"
              style={{ width: "100%" }}
            >
              Register
            </Link>
          </div>
        </Form>
      );
    }
  }
}
