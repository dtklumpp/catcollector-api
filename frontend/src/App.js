import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [cats, setCats] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(function () {
    fetch("/api/cats/")
      .then((response) => response.json())
      .then((json) => {
        setCats(json.data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("==== Form Submit! ====", search);

    fetch("/api/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search }),
    })
      .then((response) => response.json())
      .then((json) => {
        setCats(json.data);
      });
  };

  useEffect(
    function () {
      if (search === "") {
        fetch("/api/cats/")
          .then((response) => response.json())
          .then((json) => {
            setCats(json.data);
          });
      } else {
        fetch("/api/search/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search }),
        })
          .then((response) => response.json())
          .then((json) => {
            setCats(json.data);
          });
      }
    },
    [search]
  );

  return (
    <div className='App'>
      <h1>Cats</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input type='submit' value='Search' />
      </form>
      {cats.map((cat) => (
        <h4 key={cat.id}>{cat.name}</h4>
      ))}
    </div>
  );
}

export default App;
