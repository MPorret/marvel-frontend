import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Character from "./pages/Character";
import Comic from "./pages/Comic";
import Favorites from "./pages/Favorites";
import Page404 from "./pages/Page404";

library.add(faXmark, faBars, faHeart);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [visible, setVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  // Add cookie if user log in & remove cookie when user disconnect
  const handleToken = ({ token, id }) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 15 });
    } else {
      Cookies.remove("token");
      setToken(null);
    }

    if (id) {
      Cookies.set("id", id, { expires: 15 });
    } else {
      Cookies.remove("id");
    }
  };

  // Hide/show modal signup/login
  const isVisible = () => {
    setVisible(!visible);
  };

  return (
    <Router>
      <Header
        token={token}
        handleToken={handleToken}
        setIsModal={setIsModal}
        isModal={isModal}
        setIsMenu={setIsMenu}
      />
      <Routes>
        <Route path="/characters" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/character/:characterId" element={<Character />} />
        <Route path="/comic/:comicId" element={<Comic />} />
        {/* <Route path="/signup" element={<SignUp handleToken={handleToken} />} />
        <Route path="/login" element={<LogIn handleToken={handleToken} />} /> */}
        <Route
          path="/favorites"
          element={
            <Favorites
              token={token}
              handleToken={handleToken}
              isVisible={isVisible}
              visible={visible}
            />
          }
        />
        <Route path="/*" element={<Page404 />} />
      </Routes>
      <Footer />
      {isModal && (
        <Modal
          token={token}
          handleToken={handleToken}
          isVisible={isVisible}
          visible={visible}
          setIsModal={setIsModal}
          isMenu={isMenu}
          setIsMenu={{ setIsMenu }}
        />
      )}
    </Router>
  );
}

export default App;
