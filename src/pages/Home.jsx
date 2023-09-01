import marvel from "../assets/marvel.png";

import "../assets/styles/home.scss";

const Home = () => {
  return (
    <main className="home">
      <div>
        <h1>Welcome on this marvel catalog !</h1>
        <p>Find characters and comics and add them to your favorites list.</p>
      </div>
      <img src={marvel} alt="" />
    </main>
  );
};

export default Home;
