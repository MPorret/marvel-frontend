import magneto from "../assets/magneto.webp";

const Crash = () => {
  return (
    <div>
      <p style={{ color: "#d9d9d9", fontSize: "24px", margin: "20px 0" }}>
        Oops, Magneto is here, the server crashed. Retry later.
      </p>
      <img src={magneto} alt="" />
    </div>
  );
};

export default Crash;
