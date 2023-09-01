import SignUp from "./SignUp";
import LogIn from "./LogIn";

const Connexion = ({ isVisible, handleToken, visible, setIsModal }) => {
  return (
    <>
      <section className="form">
        <button
          onClick={() => {
            isVisible();
          }}
          disabled={visible}
        >
          Sign up
        </button>
        <button
          onClick={() => {
            isVisible();
          }}
          disabled={!visible}
        >
          Log in
        </button>
      </section>
      {visible ? (
        <SignUp
          handleToken={handleToken}
          isVisible={isVisible}
          setIsModal={setIsModal}
        />
      ) : (
        <LogIn
          handleToken={handleToken}
          isVisible={isVisible}
          setIsModal={setIsModal}
        />
      )}
    </>
  );
};

export default Connexion;
