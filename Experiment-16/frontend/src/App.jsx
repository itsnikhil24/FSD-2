import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Hello {name}</p>
    </div>
  );
}

export default App;