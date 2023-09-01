import { useState } from "react";
// import Cookies from "js-cookie";
import axios from "axios";

const SignUp = ({ handleToken, isVisible, setIsModal }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [file, setFile] = useState({});

  const [errorMessage, setErrorMessage] = useState();

  const handleChange = (event, { action }) => {
    const newData = { ...data };
    switch (action) {
      case "password":
        newData.password = event.target.value;
        break;
      case "username":
        newData.username = event.target.value;
        break;
      case "email":
        newData.email = event.target.value;
        break;
      case "newsletter":
        newData.newsletter = !data.newsletter;
        break;
      default:
        break;
    }

    setData(newData);
  };

  const signUp = async () => {
    try {
      const response = await axios.post(
        "https://backend--marvel--hxhcg25qdky2.code.run/signup",
        data
      );
      handleToken({ token: response.data.token, id: response.data._id });
      isVisible("0");
      setIsModal(false);
    } catch (error) {
      // console.log(error.response.data);
      if (error.response.data.message === "Email already existing") {
        // Je met à jour mon state errorMessage
        setErrorMessage(
          "Ce mail est déjà utilisé, veuillez en choisir un autre :)"
        );
      } else if (error.response.data.message === "Please, complete the form") {
        setErrorMessage("Veuillez remplir tous les champs :)");
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
      <h3>Sign up</h3>

      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        value={data.username}
        onChange={(event) => {
          handleChange(event, { action: "username" });
        }}
      />
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
          signUp();
        }}
      >
        Sign up
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button
        onClick={() => {
          isVisible("0");
        }}
      >
        Already registered ? Log in !
      </button>
    </form>
  );
};

export default SignUp;
