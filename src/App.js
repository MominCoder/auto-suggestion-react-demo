import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { getSuggestions } from "./helper";

export default function App() {
  const inputRef = useRef();
  const suggestionAreaRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [list, updateList] = useState([]);
  const [showSuggesions, setShowSuggesions] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    makeApiCall(value);
  };

  const makeApiCall = async (query) => {
    try {
      let resp = await getSuggestions(query);
      updateList(resp);
    } catch (e) {
      updateList([]);
      console.error("Error while getting suggestons list ", e);
    }
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        e.target !== inputRef.current &&
        e.target !== suggestionAreaRef.current
      ) {
        setShowSuggesions(false);
      }
    });

    return () => {
      window.removeEventListener("click", () => {});
    };
  });

  return (
    <main className="App">
      <input
        type="text"
        name="search"
        placeholder="search"
        id="search"
        autoComplete="off"
        onFocus={() => setShowSuggesions(true)}
        onChange={handleChange}
        value={searchQuery}
        ref={inputRef}
      />
      {showSuggesions && (
        <ul id="suggestion-area" ref={suggestionAreaRef}>
          {list.map((e, i) => (
            <li key={i} onClick={() => setSearchQuery(e)}>
              {e}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
