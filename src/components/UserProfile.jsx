import React, { useEffect, useState } from "react";
import {FetchUserData} from "../data/HomepageData";
import { useParams } from "react-router-dom";
import { Form, Modal, Button } from "react-bootstrap";
import Logout from "./Logout";

// const proxy = `https://gourav-node-server.herokuapp.com`;
const proxy = `http://localhost:8080`;

const UserModal = ({ user, closeModal }) => {
  const [selectedImage, setSelectedImage] = useState();
  const [name, setName] = useState(user.name ? user.name : "");
  const [currentOrganization, setCurrentOrganization] = useState(
    user.currentOrganization ? user.currentOrganization : ""
  );
  const [email, setEmail] = useState(user.email ? user.email : "");
  const [contact, setContact] = useState(user.contact ? user.contact : "");
  const [location, setLocation] = useState(user.location ? user.location : "");
  const [linkedinURL, setLinkedinURL] = useState(
    user.linkedinURL ? user.linkedinURL : ""
  );
  const handleImageChange = (e) => setSelectedImage(e.target.files[0]);
  const handleNameChange = (e) => setName(e.target.value);
  const handleCurrentOrganizationChange = (e) =>
    setCurrentOrganization(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleContactChange = (e) => setContact(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleLinkedinURLChange = (e) => setLinkedinURL(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tokenString = sessionStorage.getItem("token");
    await fetch(`${proxy}/user/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", authorization: `Bearer ${JSON.parse(tokenString)}` },
      body: JSON.stringify({
        name,
        currentOrganization,
        email,
        contact,
        location,
        linkedinURL,
      }),
    });

    const formData = new FormData();
    formData.append("uploaded_file", selectedImage);
    await fetch(`${proxy}/user/upload`, {
      method: "POST",
      headers: { enctype: "multipart/form-data", authorization: `Bearer ${JSON.parse(tokenString)}` },
      body: formData,
    });

    await FetchUserData(user._id);
    closeModal();
  };
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={handleNameChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Current Organization</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter current organization"
          value={currentOrganization}
          onChange={handleCurrentOrganizationChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control
          type="file"
          className="form-control-file"
          name="uploaded_file"
          onChange={handleImageChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Contact</Form.Label>
        <Form.Control
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={handleContactChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter base location"
          value={location}
          onChange={handleLocationChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>LinkedIn URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter LinkedIn URL"
          value={linkedinURL}
          onChange={handleLinkedinURLChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit} block>
        Update
      </Button>
    </Form>
  );
};

function UserProfile() {
  const [userData,setUserData] = useState({});
  useEffect(()=> {
    FetchUserData(id).then(userData=> {
      setUserData(userData);
    })
  },[])
  const [showModal, setModal] = useState(false);
  const { id } = useParams();
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const imageURL = "/images/";
  return (
    <div>
      {userData &&
        userData.length > 0 &&
        userData.map((user) => (
          <>
            <Logout/>
            <div className="Container">
              <div className="Product">
                <h2>{user.name}</h2>
                <img width={300} src={imageURL + user.image} alt="" />
              </div>
              <div className="Description" key={user._id}>
                <h3>
                  {user.currentOrganization &&
                    "Software Engineer | " + user.currentOrganization}
                </h3>
                <p>{user.email && "Email: " + user.email}</p>
                <p>{user.contact && "Contact: +91 " + user.contact}</p>
                <p>{user.location && "Location: " + user.location}</p>
                <p>
                  {user.linkedinURL && "LinkedIn: "}{" "}
                  <a
                    href={user.linkedinURL}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="stringURL"
                  >
                    {user.linkedinURL}
                  </a>
                </p>
              </div>
              <div>
                <Button onClick={openModal}>Edit</Button>
              </div>
            </div>
            <Modal show={showModal} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <UserModal user={user} closeModal={closeModal} />
              </Modal.Body>
              {/* <Modal.Footer>Footer</Modal.Footer> */}
            </Modal>
            {user.summary && (
              <div className="Container">
                <div className="title">Summary</div>
                <div className="Description">Details</div>
              </div>
            )}
            {((user.skills && user.skills.length > 0) ||
              (user.achievement && user.achievement.length > 0)) && (
              <div className="Container">
                {user.skills && user.skills.length > 0 && (
                  <div className="Product">Skills</div>
                )}
                {user.achievement && user.achievement.length > 0 && (
                  <div className="Description">Achievements</div>
                )}
              </div>
            )}
          </>
        ))}
    </div>
  );
}

export default UserProfile;

