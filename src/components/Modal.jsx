import Connexion from "./Connexion";
import Menu from "./Menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../assets/styles/modal.scss";

const Modal = ({
  token,
  handleToken,
  isVisible,
  visible,
  setIsModal,
  isMenu,
  setIsMenu,
}) => {
  return (
    <div className="modal">
      <div>
        <div
          className="desktop"
          onClick={() => {
            setIsModal(false);
          }}
        >
          <FontAwesomeIcon icon="xmark" />
        </div>
        {isMenu ? (
          <Menu
            token={token}
            handleToken={handleToken}
            setIsModal={setIsModal}
            setIsMenu={setIsMenu}
          />
        ) : (
          <Connexion
            handleToken={handleToken}
            isVisible={isVisible}
            visible={visible}
            setIsModal={setIsModal}
          />
        )}
      </div>
    </div>
  );
};

export default Modal;
