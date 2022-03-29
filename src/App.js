import "./App.css";
import Homepage from "./components/Homepage";
import UserProfile from "./components/UserProfile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { HomepageData } from "./data/HomepageData";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <HomepageData>
      <Header />
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route exact path="/user/:id" element={<UserProfile />}></Route>
        </Routes>
      </Router>
      <Footer />
    </HomepageData>
  );
}

export default App;
