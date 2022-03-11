import logo from "./logo.svg";
import "./App.css";
import Homepage from "./components/Homepage";
import { HomepageData } from "./data/HomepageData";

function App() {
  return (
    <HomepageData>
      <div className="App">
        <header className="App-header">
          <h1>
            <Homepage />
          </h1>
        </header>
      </div>
    </HomepageData>
  );
}

export default App;
