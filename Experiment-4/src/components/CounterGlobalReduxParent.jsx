import { useDispatch, useSelector } from "react-redux";

export default function CounterReduxParent(props) {
  // Read state from Redux store
  const count = useSelector((state) => state.count);

  // Dispatch actions
  const dispatch = useDispatch();

  // Styles (inside the same file)
  const containerStyle = {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#fff3e0", // light orange
    border: "2px solid #fb8c00",
    borderRadius: "8px",
    textAlign: "center",
  };

  const titleStyle = {
    marginBottom: "16px",
    color: "#e65100",
  };

  const buttonStyle = {
    padding: "8px 16px",
    margin: "0 8px",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "none",
  };

  const increaseBtn = {
    ...buttonStyle,
    backgroundColor: "#fb8c00",
    color: "#fff",
  };

  const decreaseBtn = {
    ...buttonStyle,
    backgroundColor: "#fff",
    color: "#fb8c00",
    border: "2px solid #fb8c00",
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>
        {props.cno} : Global State (Redux) Count: <span>{count}</span>
      </h3>

      <button
        style={increaseBtn}
        onClick={() => dispatch({ type: "INCREMENT" })}
      >
        Increase
      </button>

      <button
        style={decreaseBtn}
        onClick={() => dispatch({ type: "DECREMENT" })}
      >
        Decrease
      </button>
    </div>
  );
}
