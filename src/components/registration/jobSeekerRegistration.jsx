import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default class JobSeekerRegistration extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      contact: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: {
        firstname: false,
        lastname: false,
        contact: false,
        email: false,
        password: false,
      },
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value.length === 0) {
      this.setState({ error: { [e.target.name]: true } });
    }
  };

  handleContact = (e) => {
    const rules = /^[6-9]{1}[0-9]{9}$/;
    if (e.target.value.match(rules)) {
      this.setState({ error: { contact: false } });
    } else {
      this.setState({ error: { contact: true } });
    }
    this.handleChange(e);
  };

  handleEmail = (e) => {
    const rules = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (e.target.value.match(rules)) {
      this.setState({ error: { email: false } });
    } else {
      this.setState({ error: { email: true } });
    }
    this.handleChange(e);
  };

  handleConfirmPassword = (e) => {
    if (e.target.value === this.state.password) {
      this.setState({ error: { password: false } });
    } else {
      this.setState({ error: { password: true } });
    }
    this.handleChange(e);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.firstname === "") {
      alert(`Firstname can't be null`);
    } else if (this.state.lastname === "") {
      alert(`Lastname can't be null`);
    } else if (!this.state.contact.match(/^[6-9]{1}[0-9]{9}$/)) {
      alert(`Please use valid contact number`);
    } else if (
      !this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      alert(`Please use valid email id`);
    } else if (this.state.password === "") {
      alert(`Password can't be null`);
    } else if (this.state.password !== this.state.confirmPassword) {
      alert(`Password and confirm password not matching`);
    } else {
      const res = await axios({
        method: "post",
        url: `http://localhost:8080/register`,
        data: {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          contact: this.state.contact,
          email: this.state.email,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        },
      });
    }
  };
  componentDidMount() {
    console.log("Loading...");
  }
  render() {
    return (
      <Form className="loginForm">
        <Form.Group>
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            type="text"
            className={this.state.error.firstname ? "border-danger" : ""}
            name="firstname"
            placeholder="Enter firstname"
            value={this.state.firstname}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="text"
            className={this.state.error.lastname ? "border-danger" : ""}
            name="lastname"
            placeholder="Enter lastname"
            value={this.state.lastname}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="text"
            className={this.state.error.contact ? "border-danger" : ""}
            name="contact"
            placeholder="Enter 10 digit contact number (Without Country code)"
            value={this.state.contact}
            onChange={this.handleContact}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            className={this.state.error.email ? "border-danger" : ""}
            name="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleEmail}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            className={this.state.error.password ? "border-danger" : ""}
            name="confirmPassword"
            placeholder="Confirm password"
            value={this.state.confirmPassword}
            onChange={this.handleConfirmPassword}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ width: "100%" }}
          onClick={this.handleSubmit}
        >
          Register
        </Button>

        <div>
          <hr />
          <p style={{ textAlign: "center" }}>Already Registered?</p>
          <Link to="/" className="btn btn-secondary" style={{ width: "100%" }}>
            Login
          </Link>
        </div>
      </Form>
    );
  }
}
