import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledRec = styled(Link)`
  display: flex;
  flex-flow: column nowrap;
  text-decoration: none;

  h3,
  h4 {
    padding: 0;
    margin: 0;
    margin-top: 3px;
    color: #000;
    text-decoration: none;
    font-size: 13px;
  }

  h4 {
    font-size: 11px;
    font-weight: normal;
  }

  img {
    margin-bottom: 2px;
    max-width: 100%;
  }
`;

const StyledRecsWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: 12px;

  @media (min-width: 768px) {
    margin-top: 18px;
    display: grid;
    grid-gap: 48px;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1070px) {
    grid-gap: 32px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 1400px) {
    grid-column-gap: 42px;
  }
`;

const StyledRecsHeader = styled.h2`
  margin-top: 40px;
  margin-bottom: 0;
`;

const parseAnchor = (anchor) => {
  return anchor.split("/release/").pop().split("?")[0];
};

function Recs({ recs }) {
  if (!recs) return null;
  return (
    <>
      <StyledRecsHeader>recommendations</StyledRecsHeader>
      <StyledRecsWrapper>
        {recs.map(({ anchor, title, artist, thumbnail }) => (
          <StyledRec key={anchor} to={`/release/${parseAnchor(anchor)}`}>
            <img src={thumbnail} alt={title} />
            <h3>{title}</h3>
            <h4>{artist}</h4>
          </StyledRec>
        ))}
      </StyledRecsWrapper>
    </>
  );
}

export default Recs;
