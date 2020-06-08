import React from "react";
import styled from "styled-components";

import { Wantlist } from "./components";
import { useWantlist } from "./hooks";

const username = "bearshuford";

const StyledApp = styled.div`
  max-width: 2000px;
  margin: 0 auto;
  box-sizing: border-box;
`;

function App() {
  const { wantlist } = useWantlist(username);

  return (
    <StyledApp>
      <h1>{username}'s Wantlist</h1>
      <Wantlist list={wantlist} />
    </StyledApp>
  );
}

export default App;
