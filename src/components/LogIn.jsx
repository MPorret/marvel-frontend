import { useState } from "react";
// import Cookies from "js-cookie";
import axios from "axios";

const LogIn = ({ handleToken, isVisible, setIsModal }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState();

  const handleChange = (event, { action }) => {
    const newData = { ...data };
    switch (action) {
      case "password":
        newData.password = event.target.value;
        break;
      case "email":
        newData.email = event.target.value;
        break;
      default:
        break;
    }

    setData(newData);
  };

  const logIn = async () => {
    try {
      const response = await axios.post(
        "https://backend--marvel--hxhcg25qdky2.code.run/login",
        data
      );
      handleToken({ token: response.data.token, id: response.data._id });
      isVisible("1");
      setIsModal(false);
    } catch (error) {
      // console.log(error.response.data);

      switch (error.response.data.message) {
        case "Please, complete email and password fields":
          setErrorMessage("Veuillez remplir tous les champs :)");
          break;
        case "Incorrect password or email":
          setErrorMessage("Email ou mot de passe incorrect");
          break;
        case "Incorrect email or password":
          setErrorMessage("Email ou mot de passe incorrect");
          break;
        default:
          break;
      }
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className="connexion"
    >
      <h3>Log in</h3>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={data.email}
        onChange={(event) => {
          handleChange(event, { action: "email" });
        }}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={data.password}
        onChange={(event) => {
          handleChange(event, { action: "password" });
        }}
      />
      <button
        onClick={() => {
          logIn();
        }}
      >
        Log in
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button
        onClick={() => {
          isVisible("1");
        }}
      >
        Need to create an account ? Click here !
      </button>
    </form>
  );
};

export default LogIn;
