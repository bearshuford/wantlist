import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { Wantlist, Search } from "./components";

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

const NavBar = styled.h1`
  display: block;
  margin: 0;
`;

function App() {
  return (
    <StyledApp>
      <GlobalStyle whiteColor />
      <NavBar>wantlist</NavBar>
      <Router>
        <Route path="/" exact component={Search} />
        <Route path="/:username" component={Wantlist} />
      </Router>
    </StyledApp>
  );
}

export default App;
