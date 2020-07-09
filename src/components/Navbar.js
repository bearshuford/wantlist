import React from "react";
import { useRouteMatch, Link } from "react-router-dom";

import styled from "styled-components";

const StyledNavBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0 44px;

  a {
    display: block;
    margin: 0;
    font-weight: 900;
    font-size: 24px;
    text-decoration: none;
    color: #000;
  }
  a + a {
    font-size: 16px;
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    a {
      font-size: 26px;
    }
  }

  @media (min-width: 1024px) {
    a {
      font-size: 36px;
    }
    a + a {
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
      <Link to={!!username ? `/${username}` : "/"}>
        wantlist
      </Link>
      {!!username && <Link to="/">{username}</Link>}
    </StyledNavBar>
  );
}

export default Navbar;
