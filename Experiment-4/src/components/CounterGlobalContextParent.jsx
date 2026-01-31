import { useContext } from "react";
import { CounterContext } from "./context/CounterGlobalContextAPI";
import Button from "@mui/material/Button";

export default function CounterContextParent(props) {
  const { count, setCount } = useContext(CounterContext);

  // Inline styles (inside same file)
  const containerStyle = {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#e8f5e9", // light green
    border: "2px solid #43a047",
    borderRadius: "8px",
    textAlign: "center",
  };

  const titleStyle = {
    marginBottom: "16px",
    color: "#2e7d32",
  };

  const buttonStyle = {
    margin: "0 8px",
    borderColor: "#43a047",
    color: "#2e7d32",
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>
        {props.cno} : Global State (Context API) Count:{" "}
        <span>{count}</span>
      </h3>

      <Button
        variant="outlined"
        sx={buttonStyle}
        onClick={() => setCount(count + 1)}
      >
        Increase
      </Button>

      <Button
        variant="outlined"
        sx={buttonStyle}
        onClick={() => setCount(count - 1)}
      >
        Decrease
      </Button>
    </div>
  );
}
