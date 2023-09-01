import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ token, setIsModal, handleToken, isModal, setIsMenu }) => {
  return (
    <header className="marvel">
      <img src="/logo.svg" alt="" />
      <button
        className="mobile"
        onClick={() => {
          setIsModal(!isModal);
          setIsMenu(true);
        }}
      >
        {isModal ? (
          <FontAwesomeIcon icon="xmark" />
        ) : (
          <FontAwesomeIcon icon="bars" />
        )}
      </button>
      <nav className="desktop">
        <Link to="/characters">Characters</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/favorites">Favorites</Link>
        {token ? (
          <button onClick={handleToken}>LOG OUT</button>
        ) : (
          <button
            onClick={() => {
              setIsModal(true);
              setIsMenu(false);
            }}
          >
            SIGN UP / LOG IN
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
