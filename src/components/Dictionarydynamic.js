import { faBroom, faSearchDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useCallback } from "react";
import useFetchnew from "./useFetchnew";

function Dictionarydynamic({ theme }) {
  const [inputword, setinputword] = useState("");

  const [input, setInput] = useState("");

  const [search, setSearch] = useState(false);
  const handleChange = useCallback((e) => {
    setInput(e.target.value);
  });

  const handleSearch = () => {
    if (input) {
      setinputword(input);
      setSearch(true);
    } else {
      alert("Please enter a word in the search box ");
    }
  };
  const handleKeyPress = (event) => {
    if (input) {
      if (event.key === "Enter") {
        console.log("Enter key pressed");
        setinputword(input);
        setInput("");
        setSearch(true);
      }
    }
  };
  const handleClear = () => {
    setinputword("");
  };
  const { data, isPending, error } = useFetchnew(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${inputword}`,
    0
  );
  console.log(data);

  useEffect(() => {
    // Create a new div element for the cursor circle
    const hoverMouse = document.createElement("div");
    hoverMouse.classList.add("hoverMouse");
    document.body.appendChild(hoverMouse);

    // Add event listener for mousemove on the window object
    const handleMouseMove = (event) => {
      // Get mouse coordinates
      let cursorX = event.clientX;
      let cursorY = event.clientY;

      // Update position of cursor circle
      hoverMouse.style.left = `${cursorX}px`;
      hoverMouse.style.top = `${cursorY}px`;

      // Show the cursor circle
      hoverMouse.style.display = "block";
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener and the hoverMouse element on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeChild(hoverMouse);
    };
  }, []);

  console.log(" Dictionary main rendered");
  return (
    <>
      <div className="inputArea">
        <textarea
          placeholder=" Enter a word here "
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        ></textarea>
        <p className="btns">
          <span className="btn" onClick={handleSearch}>
            Search <FontAwesomeIcon icon={faSearchDollar} />
          </span>
          <span className="btn" onClick={handleClear}>
            Clear <FontAwesomeIcon icon={faBroom} />
          </span>
        </p>
      </div>
      <div className="outputArea">
        {search ? (
          <>
            <section className="meaningCard">
              {data &&
                data.map((groups, gI) =>
                  groups.meanings.map((group, ggI) =>
                    group.definitions.map((defs, dI) => (
                      <div className="card" key={dI}>
                        <section className="cardTop">
                          {groups.partOfSpeech}
                          {defs.definition}
                        </section>
                        <section className="cardEnd">
                          {defs.example && "Example :" + defs.example}
                        </section>
                      </div>
                    ))
                  )
                )}
            </section>
            <section className="othersCard">
              <section className="ocardtop">
                <span>Antonyms :</span>
                {data && data.map((groups) =>
                  groups.meanings.map((group, ggI) =>
                    group.antonyms.map((antonyms, aI) => (
                      <span key={aI}>{antonyms}</span>
                    ))
                  )
                )}
              </section>
              <section className="ocardend">
                <span>Synonyms :</span>
                {data && data.map((groups) =>
                  groups.meanings.map((group, ggI) =>
                    group.synonyms.map((synonyms, aI) => (
                      <span key={aI}>{synonyms}</span>
                    ))
                  )
                )}
              </section>
            </section>
          </>
        ) : (
          <h1
            style={{
              width: "100%",
              height: "50%",
              fontSize: "3vmax",
              textWrap: "balance",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Your Results are Gonna Be Displayed Here Once You Hit Search
          </h1>
        )}
      </div>
    </>
  );
}

export default Dictionarydynamic;
