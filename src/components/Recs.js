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
  margin-top: 18px;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 400px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) {
    grid-gap: 48px;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1024px) {
    grid-gap: 32px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 1400px) {
    grid-column-gap: 42px;
  }

  @media (min-width: 1500px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (min-width: 1800px) {
    grid-template-columns: repeat(7, 1fr);
  }
`;

const StyledRecsHeader = styled.h2`
  margin-top: 40px;
  margin-bottom: 0;
`;

const parseAnchor = (anchor) => {
  return anchor.split("/release/").pop().split("?")[0];
};

const formatArtist = (artist) => {
  return Array.isArray(artist) ? artist.join(", ") : artist;
};

function Recs({ recs, username }) {
  if (!recs || recs.length < 1) return null;
  return (
    <>
      <StyledRecsHeader>recommendations</StyledRecsHeader>
      <StyledRecsWrapper>
        {recs.map(({ anchor, title, artist, thumbnail }, i) => (
          <StyledRec
            key={anchor + i}
            to={`/${username}/release/${parseAnchor(anchor)}`}
          >
            <img src={thumbnail} alt={title} />
            <h3>{title}</h3>
            <h4>{formatArtist(artist)}</h4>
          </StyledRec>
        ))}
      </StyledRecsWrapper>
    </>
  );
}

export default Recs;
