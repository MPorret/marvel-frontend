import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";

import Search from "../components/Search";

import "../assets/styles/comics.scss";

const Comics = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const userId = Cookies.get("id");

  const fetchData = async () => {
    try {
      const titleToSearch = search.replaceAll(" ", "+");
      const response = await axios.get(
        `https://backend--marvel--hxhcg25qdky2.code.run/comics?title=${titleToSearch}&page=${
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

  const handleFavorites = async (comicId) => {
    try {
      const userId = Cookies.get("id");
      const userData = { comicId, userId };
      // console.log(userData);
      const response = await axios.post(
        "https://backend--marvel--hxhcg25qdky2.code.run/addcomic",
        userData
      );
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <main className="comics">
      <h1>Comics</h1>
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <Helmet>
            <title>Marvel comics</title>
          </Helmet>
          <Search search={data.search} setSearch={setSearch} />
          <section>
            {data.results.map((comic) => {
              return (
                <article key={comic._id}>
                  <Link to={`/comic/${comic._id}`}>
                    <h2>{comic.title}</h2>
                    <img
                      src={`${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}`}
                      alt=""
                    />

                    {comic.description && <p>{comic.description}</p>}
                  </Link>
                  <button
                    onClick={() => {
                      handleFavorites(comic._id);
                    }}
                    className={`heart ${comic.favorite && "fav"}`}
                  >
                    <FontAwesomeIcon icon="heart" />
                  </button>
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

export default Comics;
