import React from "react";
import { Want } from "./components";
import { useWantlist } from "./hooks";

const username = "bearshuford";

function App() {
  const wantlist = useWantlist(username);

  return (
    <div className="App">
      <h1>{username}'s Wantlist</h1>
      {wantlist.map(Want)}
    </div>
  );
}

export default App;
