import "./App.css";
import Homepage from "./components/Homepage";
import UserProfile from "./components/UserProfile";
import { HomepageData } from "./data/HomepageData";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <HomepageData>
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route exact path="/user/:id" element={<UserProfile />}></Route>
        </Routes>
      </Router>
    </HomepageData>
  );
}

export default App;
