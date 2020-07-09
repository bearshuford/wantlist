import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { Wantlist, Search, Navbar } from "./components";

const GlobalStyle = createGlobalStyle`
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

  @media (min-width: 768px) {
    padding: 32px 40px 0;
  }

  @media (min-width: 1024px) {
    padding: 42px 76px 0;
  }
`;

function App() {
  return (
    <StyledApp>
      <GlobalStyle />
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Search} />
          <Route path="/:username/:releaseId" component={Wantlist} exact />
          <Route path="/:username" component={Wantlist} exact />
        </Switch>
      </Router>
    </StyledApp>
  );
}

export default App;
