import React, { useEffect, useState } from "react";
import { Collection } from "./Collection";
import "./index.scss";

const cats = [
  { name: "Все" },
  { name: "Море" },
  { name: "Гори" },
  { name: "Архітектура" },
  { name: "Міста" },
];

function App() {
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const category = categoryId ? `category=${categoryId}` : "";

  const pages = `page=${page}`;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(
        `https://62ffa31f34344b6431fe21db.mockapi.io/photos?${pages}&limit=3&${category}`
      );
      const data = await response.json();
      setCollections(data);
      setIsLoading(false);
    };
    fetchData();
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя колекція фотографій</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((item, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={`${categoryId === i ? "active" : ""}`}
              key={item.name}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          className="search-input"
          placeholder="Пошук по назві"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading ...</h2>
        ) : (
          collections
            .filter((text) =>
              text.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
            )
            .map((item, index) => (
              <Collection key={index} name={item.name} images={item.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(3)].map((item, i) => (
          <li
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
