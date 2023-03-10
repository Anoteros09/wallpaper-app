import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { InputGroup, FormControl, Button, Card } from "react-bootstrap";
import axios from "axios";
import "./Wallpaper.css";

const Wallpaper = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchImages = async () => {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos/?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&query=${query}`
    );
    setResults(response.data.results);
  };

  return (
    <div className="container my-5">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search for wallpapers"
          aria-label="Search for wallpapers"
          aria-describedby="basic-addon2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-3 py-2 px-4 search-input"
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={searchImages}
          className="rounded-3 py-2 px-3 search-button"
        >
          <FaSearch />
        </Button>
      </InputGroup>
      <div className="row">
        {results.map((result) => (
          <div className="col-md-4 my-3" key={result.id}>
            <Card className="border-0 shadow-sm h-100 wallpaper-card">
              <Card.Img
                variant="top"
                src={result.urls.regular}
                className="card-image"
              />
              <Card.Body>
                <Card.Title>{result.alt_description}</Card.Title>
                <Button
                  variant="primary"
                  href={result.links.download}
                  className="rounded-3 px-4 py-2 float-end download-button"
                >
                  Download
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wallpaper;
