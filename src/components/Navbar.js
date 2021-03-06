import React from "react";
import { useRouteMatch, Link } from "react-router-dom";

import styled, { css } from "styled-components";

const ReleaseMixin = css`
  position: relative;
  margin-right: 18px;

  @media (min-width: 768px) {
    margin-right: 40px;
    padding-top: 14px;
  }
  @media (min-width: 1070px) {
    display: none;
  }
`;

const StyledHeaderLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const StyledNavbar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0 34px;

  h1 {
    display: block;
    margin: 0;
    font-weight: 900;
    font-size: 24px;
  }
  h1 + a {
    display: block;
    font-weight: 900;
    font-size: 16px;
    color: #000;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 26px;
    }
  }

  @media (min-width: 1024px) {
    h1 {
      font-size: 36px;
    }
    h1 + a {
      font-size: 20px;
    }
  }

  ${(props) => props.release && ReleaseMixin}
`;

function Navbar() {
  const match = useRouteMatch({
    path: "/:username",
    strict: true,
    sensitive: true,
  });

  const { username } = !!match ? match.params : {};

  return (
    <StyledNavbar>
      {!username ? (
        <h1>wantlist</h1>
      ) : (
        <h1>
          <StyledHeaderLink to="/">wantlist</StyledHeaderLink>
        </h1>
      )}
      {!!username && (
        <Link to={`/${username}`} title="back to list">
          {username}
        </Link>
      )}
    </StyledNavbar>
  );
}

export default Navbar;
