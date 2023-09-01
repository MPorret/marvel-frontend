import loading from "../assets/loader.gif";

const Loading = () => {
  return (
    <div>
      <p style={{ color: "#d9d9d9" }}>Downloading...</p>
      <img src={loading} alt="" style={{ width: "200px" }} />
    </div>
  );
};

export default Loading;
