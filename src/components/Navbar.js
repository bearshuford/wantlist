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

const StyledCloseButton = styled(Link)`
  position: fixed;
  top: 16px;
  right: 24px;
  font-size: 34px;
  font-weight: 900;
  text-decoration: none;
  color: #000;

  @media (min-width: 768px) {
    right: 42px;
    top: 32px;
    font-size: 42px;
  }
`;

const CloseButton = ({ to }) => (
  <StyledCloseButton to={to} title="close">
    &#10005;
  </StyledCloseButton>
);

function Navbar({ release }) {
  const match = useRouteMatch({
    path: "/:username",
    strict: true,
    sensitive: true,
  });

  const { username } = !!match ? match.params : {};

  return (
    <StyledNavbar release={!!release}>
      {!!release ? <CloseButton to={`/${username}`} /> : <h1>wantlist</h1>}
      {!!username && !release && (
        <Link to="/" title="back to search">
          {username}
        </Link>
      )}
    </StyledNavbar>
  );
}

export default Navbar;
