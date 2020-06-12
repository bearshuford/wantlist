import React from "react";
import ReactPlayer from "react-player";
import styled, { css } from "styled-components";

import { Playlist } from "./";

const cardWidth = 290;
const cardMediaHeight = 300;

const StyledWantCard = styled.div`
  font-family: sans-serif;
  margin-bottom: 36px;
  border: 2px solid #333;
  width: calc(100% - 20px);
  max-width: calc(100% - 20px);
  display: flex;
  flex-flow: column;
  margin: 14px 10px;

  @media (min-width: 500px) {
    width: ${cardWidth}px;
    max-width: calc(100% - 24px);
    margin: 24px;
  }

  h4 {
    margin: 8px 0 16px;
    padding: 0 15px;
  }

  p {
    padding: 0 15px;
  }

  ${(props) =>
    props.hasPlayingVideo &&
    css`
      border-color: violet;
      /* width: 100%; */
    `};
`;

const StyledCardBody = styled.div`
  flex: 1;
`;

const StyledMarketLink = styled.a`
  display: block;
  text-align: center;
  padding-top: 18px;
  padding-bottom: 4px;
  margin-top: 24px;
`;

const StyledCardMedia = styled.div`
  @media (min-width: 500px) {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    height: ${cardMediaHeight + 20}px;
  }
`;

const StyledCommunity = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  padding: 2px 15px 6px;
  display: flex;
  justify-content: space-between;
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
  const hasPlayingVideo =
    !!videos &&
    videos.length > 0 &&
    !!video &&
    videos.filter((vid) => vid.uri === video.uri).length > 0;

  const handlePause = () => {
    setPlaying(false);
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  return (
    <StyledWantCard hasPlayingVideo={hasPlayingVideo} ref={hasPlayingVideo ? playingRef : null}>
      <StyledCardMedia>
        {!hasPlayingVideo ? (
          !!cover && (
            <img src={cover} alt="want cover" style={{ width: "100%" }} />
          )
        ) : (
          <ReactPlayer
            playing={playing}
            url={video.uri}
            onPause={handlePause}
            onPlay={handlePlay}
            width="100%"
            height={cardMediaHeight - 8}
            style={{ width: "100%", height: cardWidth }}
          />
        )}

        <StyledCommunity>
          <div>{have} have</div>
          <div>{want} want</div>
        </StyledCommunity>
      </StyledCardMedia>
      <StyledCardBody>
        <h4>
          <span>{`${title} (${year}) – `}</span>
          {artists.map(({ name }) => name).map(commaList)}
        </h4>
        {!!notes && <p> {notes} </p>}
        {!!videos && (
          <Playlist
            hasPlayingVideo={hasPlayingVideo}
            thumbnail={cover}
            videos={videos}
            playing={playing}
            video={video}
            setVideo={setVideo}
            setPlaying={setPlaying}
          />
        )}
      </StyledCardBody>
      {!!marketUrl && (
        <StyledMarketLink
          href={marketUrl}
          style={{ display: "block", margin: 12 }}
        >{`Check marketplace`}</StyledMarketLink>
      )}
    </StyledWantCard>
  );
}

export default Want;
