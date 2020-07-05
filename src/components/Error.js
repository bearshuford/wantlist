import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledError = styled.div`
  margin: 36px auto 0;
  max-width: 368px;

  @media (min-width: 768px) {
    margin-top: 58px;
  }

  @media (min-width: 1024px) {
    margin-top: 88px;
    max-width: 466px;
  }

  h2 {
    height: 75px;
    margin: 0;
    display: flex;
    align-items: flex-end;
    font-size: 30px;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  width: 100%;
  color: #fff;
  background-color: #222;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 900;
  text-decoration: none;
  margin-top: 22px;
  height: 55px;

  @media (min-width: 768px) {
    margin-top: 27px;
  }

  @media (min-width: 1024px) {
    margin-top: 36px;
    width: 284px;
    margin-left: auto;
  }
`;
const Error = () => (
  <StyledError>
    <h2>User not found</h2>
    <StyledLink to="/">Please try again</StyledLink>
  </StyledError>
);

export default Error;
