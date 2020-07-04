import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const defaultUsername = "bearshuford";

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

  @media (min-width: 1078px) {
    margin-top: 36px;
    width: 284px;
    margin-left: auto;
  }
`;

const StyledInput = styled.input`
  display: block;
  box-shadow: none;
  outline: none;
  width: 100%;
  border-radius: 0;
  border: 2px solid #000;
  font-size: 18px;
  height: 50px;
  padding-left: 8px;

  @media (min-width: 768px) {
    height: 55px;
    font-size: 20px;
  }

  @media (min-width: 1078px) {
    height: 60px;
    font-size: 22px;
  }
`;

const StyledLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 900;
  margin-bottom: 7px;

  @media (min-width: 768px) {
    font-size: 18px;
  }

  @media (min-width: 1078px) {
    font-size: 22px;
    margin-bottom: 10px;
  }
`;

const StyledSearch = styled.div`
  margin: 60px auto 0;
  max-width: 368px;

  @media (min-width: 768px) {
    margin-top: 102px;
  }

  @media (min-width: 1078px) {
    margin-top: 132px;
    max-width: 466px;
  }
`;

function Search() {
  const [username, setUsername] = useState(null);

  return (
    <StyledSearch>
      <StyledLabel htmlFor="discogsUsername">discogs username</StyledLabel>
      <StyledInput
        autoFocus
        placeholder="bearshuford"
        id="discogsUsername"
        onChange={({ target }) => setUsername(target.value)}
        value={username}
      />
      <StyledLink to={`/${!!username ? username : defaultUsername}`}>
        wantlist
      </StyledLink>
    </StyledSearch>
  );
}

export default Search;
