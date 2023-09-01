import axios from "axios"; // Request at the server
import { useEffect, useState } from "react"; // React Hooks
import { Link } from "react-router-dom"; // Navigate in react site
import Cookies from "js-cookie"; // Set, get and remove cookies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Search from "../components/Search";

import "../assets/styles/characters.scss";

const Characters = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nameToSearch = search.replaceAll(" ", "+");
        const response = await axios.get(
          `https://backend--marvel--hxhcg25qdky2.code.run/characters?name=${nameToSearch}&page=${
            page || 1
          }`
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [search, page]);

  const handleFavorites = async (characterId) => {
    try {
      const userId = Cookies.get("id");
      const userData = { characterId, userId };
      // console.log(userData);
      const response = await axios.post(
        "https://backend--marvel--hxhcg25qdky2.code.run/addcharacter",
        userData
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <main className="characters">
      <h1>Characters</h1>
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <Search search={data.search} setSearch={setSearch} />
          <section>
            {data.results.map((character) => {
              return (
                <article key={character._id}>
                  <button
                    onClick={() => {
                      handleFavorites(character._id);
                    }}
                  >
                    <FontAwesomeIcon icon="heart" />
                  </button>
                  <Link to={`/character/${character._id}`}>
                    <img
                      src={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`}
                      alt=""
                    />{" "}
                    <h2>{character.name}</h2>
                    {character.description && <p>{character.description}</p>}
                  </Link>
                </article>
              );
            })}
          </section>
          <label htmlFor="page">Page</label>
          <input
            type="number"
            name="page"
            id="page"
            value={page}
            max={Math.ceil(data.count / data.limit)}
            min="1"
            onChange={(event) => {
              const newValue = event.target.value;
              setPage(newValue);
            }}
          />{" "}
          / {Math.ceil(data.count / data.limit)}
        </>
      )}
    </main>
  );
};

export default Characters;