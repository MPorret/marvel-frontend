import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import "../assets/styles/character.scss";

const Character = () => {
  const { characterId } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://backend--marvel--hxhcg25qdky2.code.run/character/${characterId}`
        );
        setData(response.data);
        const newComic = [...comics];
        for (let i = 0; i < response.data.comics.length; i++) {
          const getInfo = await axios.get(
            `https://backend--marvel--hxhcg25qdky2.code.run/comic/${response.data.comics[i]}`
          );
          // console.log("là", getInfo.data);
          newComic.push(getInfo.data);
        }
        setComics(newComic);
        setIsLoading(false);
        //   console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);
  //   console.log("ici", comics);

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main className="character">
      <h1>{data.name}</h1>
      <section>
        <img
          src={`${data.thumbnail.path}/standard_fantastic.${data.thumbnail.extension}`}
          alt=""
        />
        <p>{data.description}</p>
      </section>
      <h2>See me in...</h2>
      <section>
        {comics.map((comic) => {
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
    </main>
  );
};

export default Character;
