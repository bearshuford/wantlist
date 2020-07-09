import React from "react";
import styled from "styled-components";

import Navbar from "./Navbar";

const StyledWantCard = styled.div`
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 18px;
  overflow-y: auto;

  @media (min-width: 1070px) {
    position: relative;
    padding: 0;
  }
`;

const StyledCardMedia = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 20px;
  overflow-x: auto;

  img {
    height: 134px;
    margin-right: 15px;
  }

  @media (min-width: 768px) {
    margin-bottom: 48px;

    img {
      height: 192px;
      margin-right: 22px;
    }
  }

  @media (min-width: 1400px) {
    margin-bottom: 32px;

    img {
      height: 168px;
      margin-right: 20px;
    }
  }

  @media (min-width: 1800px) {
  }
`;

const StyledCardBody = styled.div`
  h3 {
    font-size: 30px;
    font-weight: bold;
    margin: 0;
  }
  h4 {
    font-size: 22px;
    font-weight: normal;
    margin: 0;
    margin-bottom: 26px;
  }
`;

const StyledMarketLink = styled.a``;

const StyledCommunity = styled.div``;

const StyledNavbar = styled.div`
    @media (min-width: 1070px) {
      display: none;
    }
`;

const commaList = (item, i, { length }) => {
  if (i + 1 < length) return <span key={`${item}-${i}`}> {`${item}, `} </span>;
  else return <span key={`${item}-${i}`}> {item} </span>;
};



function Want({
  playing,
  setPlaying,
  video,
  setVideo,
  videos,
  cover,
  country,
  title,
  year,
  artists,
  marketUrl,
  notes,
  have,
  want,
  playingRef,
  id,
  images,
  numberAvailable,
  lowestPrice,
  genres,
  styles,
}) {
  return (
    <StyledWantCard>
      <StyledNavbar>
        <Navbar />
      </StyledNavbar>
      <StyledCardMedia>
        {!!images &&
          images.length > 0 &&
          images.map(({ uri }) => <img key={uri} src={uri} alt="want cover" />)}
      </StyledCardMedia>
      <StyledCardBody>
        <h3>
          <span>{`${title}`}</span>
        </h3>
        <h4>{artists.map(({ name }) => name).map(commaList)}</h4>
        <StyledCommunity>
          <div>{have} have</div>
          <div>{want} want</div>
        </StyledCommunity>
      </StyledCardBody>
      {!!marketUrl && (
        <StyledMarketLink
          href={marketUrl}
        >{`Check marketplace`}</StyledMarketLink>
      )}
    </StyledWantCard>
  );
}

export default Want;
