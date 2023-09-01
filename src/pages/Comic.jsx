import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const Comic = () => {
  const { comicId } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://backend--marvel--hxhcg25qdky2.code.run/comic/${comicId}`
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [comicId]);

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main>
      <Helmet>
        <title>{data.title}</title>
      </Helmet>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <img src="" alt="" />
    </main>
  );
};

export default Comic;
