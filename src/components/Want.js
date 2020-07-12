import React from "react";
import styled from "styled-components";

import Navbar from "./Navbar";

const IMAGE_HEIGHT = {
  sm: 134,
  md: 192,
  lg: 168,
};
const MARGIN_BOTTOM = {
  sm: 20,
  md: 48,
  lg: 32,
};
const MARGIN_RIGHT = {
  sm: 15,
  md: 22,
  lg: 20,
};


const StyledWantCard = styled.div`
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 18px 0 18px 18px;
  overflow-y: auto;

  @media (min-width: 768px) {
    padding: 20px 0 18px 40px;
  }
  
  @media (min-width: 1070px) {
    position: relative;
    padding: 0;
    width: 100%;
  }
`;

const StyledCardMedia = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: ${MARGIN_BOTTOM.sm}px;
  overflow-x: auto;

  img {
    height: ${IMAGE_HEIGHT.sm}px;
    margin-right: ${MARGIN_RIGHT.sm}px;
  }

  @media (min-width: 768px) {
    margin-bottom: ${MARGIN_BOTTOM.md}px;

    img {
      height: ${IMAGE_HEIGHT.md}px;
      margin-right: ${MARGIN_RIGHT.md}px;
    }
  }


  @media (min-width: 1200px) {
    margin-bottom: ${MARGIN_BOTTOM.lg}px;

    img {
      height: ${IMAGE_HEIGHT.lg}px;
      margin-right: ${MARGIN_RIGHT.lg}px;
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
    line-height: 1.1;
  }
  h4 {
    font-size: 22px;
    font-weight: normal;
    margin: 0;
    margin-bottom: 26px;
  }

  padding-bottom: 48px;

  @media (min-width: 768px) {
    padding-bottom: 44px;

    h3 {
      font-size: 38px;
      margin-bottom: 2px;
    }
    h4 {
      font-size: 24px;
      margin-bottom: 23px;
    }
  }

  @media (min-width: 1070px) {
    max-width: 600px;
    margin-bottom: 3px;
  }

  @media (min-width: 1400px) {
    padding-bottom: 42px;

    h3 {
      font-size: 38px;
    }
    h4 {
      font-size: 24px;
      margin-bottom: 23px;
    }
  }

`;

const StyledMarketLink = styled.a``;


const StyledNavbar = styled.div`
  @media (min-width: 1070px) {
    display: none;
  }
`;

const Info = styled.div`
  font-size: 18px;
  margin-bottom: 4px;
`;

const commaList = (item, i, { length }) => {
  if (i + 1 < length) return <span key={`${item}-${i}`}> {`${item}, `} </span>;
  else return <span key={`${item}-${i}`}> {item} </span>;
};

const InfoItem = ({ label, value }) =>
  !!value && (
    <Info>
      {label}: {value}
    </Info>
  );

function Want({
  country,
  formats,
  title,
  year,
  artists,
  marketUrl,
  images,
  playing,
  setPlaying,
  video,
  setVideo,
  videos,
  cover,
  notes,
  have,
  want,
  playingRef,
  id,
  numberAvailable,
  lowestPrice,
  genres,
  styles,
}) {
  const firstFormat = !!formats && formats.length > 0 && formats[0];
  console.log(firstFormat.name, firstFormat.descriptions);
  const genresList =
    !!genres &&
    genres.length > 0 &&
    genres.map((genre) => genre).map(commaList);
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

        <InfoItem label="Country" value={country} />
        <InfoItem label="Year" value={year} />
        <InfoItem label="Genres" value={genresList} />
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
