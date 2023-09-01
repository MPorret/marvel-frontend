import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import deadpool from "../assets/deadpool.png";

import Connexion from "../components/Connexion";
import Loading from "../components/Loading";
import Crash from "../components/Crash";

import "../assets/styles/favorites.scss";

const Favorites = ({ token, handleToken, isVisible, visible }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCrash, setIsCrash] = useState(false);

  const fetchData = async () => {
    try {
      const id = Cookies.get("id");
      if (id) {
        console.log(id);
        const response = await axios.get(
          `https://backend--marvel--hxhcg25qdky2.code.run/user?id=${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <main className="user">
      <Helmet>
        <title>My Favorites</title>
      </Helmet>
      {token ? (
        isCrash ? (
          <Crash />
        ) : isLoading ? (
          <Loading />
        ) : (
          <>
            <h1>{data.account.username}</h1>
            <section>
              {data.favorites.comics.length === 0 &&
              data.favorites.characters.length === 0 ? (
                <>
                  <p>You don't have favorite.</p>
                  <img src={deadpool} alt="" className="deadpool" />
                </>
              ) : (
                <>
                  <h2>My favorites comics</h2>
                  {data.favorites.comics.length > 0 && (
                    <section className="comics">
                      {data.favorites.comics.map((comic) => {
                        return (
                          <Link to={`/comic/${comic._id}`} key={comic._id}>
                            <article>
                              <h3>{comic.title}</h3>
                              <img
                                src={`${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}`}
                                alt=""
                              />
                              <p>{comic.description}</p>
                            </article>
                          </Link>
                        );
                      })}
                    </section>
                  )}
                  <h2>My favorites characters</h2>
                  {data.favorites.characters.length > 0 && (
                    <section className="characters">
                      {data.favorites.characters.map((character) => {
                        return (
                          <article key={character._id}>
                            <Link to={`/character/${character._id}`}>
                              <img
                                src={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`}
                                alt=""
                              />{" "}
                              <h3>{character.name}</h3>
                              {character.description && (
                                <p>{character.description}</p>
                              )}
                            </Link>
                          </article>
                        );
                      })}
                    </section>
                  )}
                </>
              )}
            </section>
          </>
        )
      ) : (
        <div>
          <h1>You must be connected to see your favorites</h1>
          <Connexion
            handleToken={handleToken}
            isVisible={isVisible}
            visible={visible}
          />
        </div>
      )}
    </main>
  );
};

export default Favorites;
