import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { Wantlist, Search } from "./components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 18px;
    padding-bottom: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

const StyledApp = styled.div`
  max-width: 2000px;
  margin: 0 auto;
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
