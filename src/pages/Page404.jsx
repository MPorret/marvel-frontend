import thanosSnap from "../assets/thanos-snap.png";
import "../assets/styles/page404.scss";

const Page404 = () => {
  return (
    <main className="page404">
      <h1>Page not found</h1>
      <section>
        <p>Seems like this page got dusted in the snap...</p>
        <img src={thanosSnap} alt="thanos snap" />
      </section>
    </main>
  );
};

export default Page404;
