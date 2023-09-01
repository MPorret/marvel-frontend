import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import doctorStranger from "../assets/strange.webp";

const Menu = ({ token, handleToken, setIsMenu, setIsModal }) => {
  return (
    <nav className="menu">
      <Link
        to="/characters"
        onClick={() => {
          setIsModal(false);
        }}
      >
        Characters
      </Link>
      <Link
        to="/comics"
        onClick={() => {
          setIsModal(false);
        }}
      >
        Comics
      </Link>
      <Link
        to="/favorites"
        onClick={() => {
          setIsModal(false);
        }}
      >
        Favorites
      </Link>
      {token ? (
        <button
          onClick={() => {
            const id = Cookies.get("id");
            handleToken(token, id);
            setIsModal(false);
          }}
        >
          LOG OUT
        </button>
      ) : (
        <button
          onClick={() => {
            setIsModal(false);
            setIsMenu(false);
          }}
        >
          SIGN UP / LOG IN
        </button>
      )}
      <img src={doctorStranger} alt="" />
    </nav>
  );
};

export default Menu;
