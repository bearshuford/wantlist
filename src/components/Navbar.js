import React from "react";
import { useRouteMatch, Link } from "react-router-dom";

import styled from "styled-components";

const StyledNavBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0 44px;

  h4 {
    display: block;
    margin: 0;
    font-weight: 900;
    font-size: 24px;
  }
  a {
    font-weight: 900;
    font-size: 16px;
    color: #000;
  }

  @media (min-width: 768px) {
    h4 {
      font-size: 26px;
    }
  }

  @media (min-width: 1024px) {
    h4 {
      font-size: 36px;
    }
    a {
      font-size: 20px;
    }
  }
`;

function Navbar() {
  const match = useRouteMatch({
    path: "/:username",
    strict: true,
    sensitive: true,
  });

  const { username } = !!match ? match.params : {};

  return (
    <StyledNavBar>
      <h4>wantlist</h4>
      {!!username && <Link to="/">{username}</Link>}
    </StyledNavBar>
  );
}

export default Navbar;
