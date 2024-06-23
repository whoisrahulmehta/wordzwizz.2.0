import {
  faBookAtlas,
  faCommenting,
  faFileWord,
  faSearch,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Dictionarydynamic from "./components/Dictionarydynamic";

function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    }
    if (theme === "light") {
      setTheme("dark");
    }
  };

  return (
    <div className={`App ${theme}`}>
      <header>
        <p className="brand">
          WORD<b>Z</b>WI<b>ZZ</b>
          <b style={{ fontSize: "2.3rem", color: "gold" }}>
            <FontAwesomeIcon icon={faFileWord} />
          </b>
        </p>
        <p className="switch">
          <span onClick={toggleTheme}>
            {theme === "dark" ? (
              <span className={`logo-${theme === "dark" ? "light" : "dark"}`}>
                <FontAwesomeIcon icon={faToggleOn} />
              </span>
            ) : (
              <span
                className={`logo-${theme === "dark" ? "light" : "dark"}  icon`}
              >
                <FontAwesomeIcon icon={faToggleOff} />
              </span>
            )}
          </span>
        </p>
      </header>
      <main>
        <Dictionarydynamic theme={theme} />
      </main>
      <footer>
        <p className="fBtn">
          Find meanings !
          <span className="gold">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </p>
        <p className="fBtn">
          Translate (coming soon)
          <span className="gold">
            <FontAwesomeIcon icon={faCommenting} />
          </span>
        </p>
      </footer>
    </div>
  );
}

export default App;
