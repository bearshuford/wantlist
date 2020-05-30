import React from "react";
import { Wantlist } from "./components";
import { useWantlist } from "./hooks";

const username = "bearshuford";

function App() {
  const wantlist = useWantlist(username);

  return (
    <div className="App">
      <h1>{username}'s Wantlist</h1>
      <Wantlist list={wantlist} />
    </div>
  );
}

export default App;
