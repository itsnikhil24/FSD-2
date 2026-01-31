import { useState } from "react";

export default function LocalStateCounter({ cno }) {
  const [count, setCount] = useState(0);

  const increaseCount = () => setCount(count + 1);
  const decreaseCount = () => setCount(count - 1);

  // Styles (Local State → Blue theme)
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    margin: "30px 0"
  };

  const boxStyle = {
    width: "600px",
    padding: "20px",
    backgroundColor: "#e3f2fd",
    border: "2px solid #1e88e5",
    borderRadius: "8px",
    textAlign: "center"
  };

  const headingStyle = {
    color: "#0d47a1",
    marginBottom: "15px"
  };

  const countStyle = {
    color: "#1565c0",
    fontWeight: "bold"
  };

  const buttonGroupStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "12px"
  };

  const primaryBtn = {
    padding: "8px 14px",
    backgroundColor: "#1e88e5",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  };

  const outlineBtn = {
    padding: "8px 14px",
    backgroundColor: "transparent",
    color: "#1e88e5",
    border: "2px solid #1e88e5",
    borderRadius: "5px",
    cursor: "pointer"
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h3 style={headingStyle}>
          {cno} : Local State Count: <span style={countStyle}>{count}</span>
        </h3>

        <div style={buttonGroupStyle}>
          <button style={primaryBtn} onClick={increaseCount}>
            Increase
          </button>

          <button style={outlineBtn} onClick={decreaseCount}>
            Decrease
          </button>
        </div>
      </div>
    </div>
  );
}
