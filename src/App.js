import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import PlayerContext from "./PlayerContext";
import { Wantlist, Search, Navbar, Player } from "./components";

const GlobalStyle = createGlobalStyle`
  html, body, #root {height:100%;}

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

const StyledApp = styled.div`
  max-width: 2000px;
  margin: 0 auto;
  padding: 18px;
  padding-bottom: 0;
  height: 100%;

  @media (min-width: 768px) {
    padding: 32px 40px 0;
  }

  @media (min-width: 1024px) {
    padding: 32px 76px 0;
  }
`;

function App() {
  return (
    <PlayerContext>
      <StyledApp>
        <GlobalStyle />
        <Router>
          <Player />
          <Navbar />
          <Switch>
            <Route path="/" exact component={Search} />
            <Route path="/:username/:releaseId" component={Wantlist} exact />
            <Route path="/:username" component={Wantlist} exact />
          </Switch>
        </Router>
      </StyledApp>
    </PlayerContext>
  );
}

export default App;
