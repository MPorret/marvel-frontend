import axios from "axios"; // Request at the server
import { useEffect, useState } from "react"; // React Hooks
import { Link } from "react-router-dom"; // Navigate in react site
import Cookies from "js-cookie"; // Set, get and remove cookies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";

import Search from "../components/Search";

import "../assets/styles/characters.scss";

const Characters = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const userId = Cookies.get("id");
  // const userId = "64ef60606342c2bf53f6bf22";

  const fetchData = async () => {
    try {
      const nameToSearch = search.replaceAll(" ", "+");
      const response = await axios.get(
        `https://backend--marvel--hxhcg25qdky2.code.run/characters?name=${nameToSearch}&page=${
          page || 1
        }&userId=${userId}`
      );
      setData(response.data);
      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
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
      fetchData();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <main className="characters">
      <h1>Characters</h1>
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <Helmet>
            <title>Marvel characters</title>
          </Helmet>
          <Search search={data.search} setSearch={setSearch} />
          <section>
            {data.results.map((character) => {
              return (
                <article key={character._id}>
                  <button
                    className={`heart ${character.favorite && "fav"}`}
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
          <div className="page">
            Page{" "}
            {page > 1 && (
              <button
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                <FontAwesomeIcon icon="chevron-left" />
              </button>
            )}
            <input
              type="number"
              name="page"
              id="page"
              value={page}
              max={Math.ceil(data.count / data.limit)}
              min="1"
              onChange={(event) => {
                let newValue = event.target.value;
                if (newValue > Math.ceil(data.count / data.limit)) {
                  newValue = Math.ceil(data.count / data.limit);
                }
                setPage(newValue);
              }}
            />
            {page < Math.ceil(data.count / data.limit) && (
              <button
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                <FontAwesomeIcon icon="chevron-right" />
              </button>
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default Characters;
