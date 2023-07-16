import "./App.css";
import Homepage from "./components/Homepage";
import LoginRegister from "./components/LoginRegister";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginRegister />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/home" element={<Homepage />}></Route>
          <Route exact path="/user/:id" element={<UserProfile />}></Route>
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
