import React from "react";
import styled, { css } from "styled-components";

const cardWidth = 290;
// const cardMediaHeight = 300;

const StyledTrack = styled.div`
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px 34px 10px 12px;
  border-top: 1px solid;
  border-color: #333;
  cursor: pointer;
  box-sizing: border-box;
  width: ${cardWidth}px;
  max-width: 100%;

  &:hover {
    text-decoration: underline;
  }

  ${(props) =>
    props.hasPlayingVideo &&
    css`
      border-color: violet;
    `};

  ${(props) =>
    props.isPlaying &&
    css`
      outline: none;
      background-color: papayawhip;
    `};
`;

const StyledPlayButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  right: 0;
  top: 0;
  height: 100%;
  width: 24px;
  box-sizing: border-box; /*TODO: Global style */
  font-size: 14px;
`;

const PauseIcon = () => <>&#9208;&#65039;</>;
const PlayIcon = () => <>&#9654;&#65039;</>;

const PlayButton = ({ playing }) => (
  <StyledPlayButton>{!playing ? <PlayIcon /> : <PauseIcon />}</StyledPlayButton>
);

function Playlist({
  videos = [],
  playing,
  video,
  setVideo,
  setPlaying,
  hasPlayingVideo,
}) {
  return (
    <>
      {videos.length > 0 &&
        videos.slice(0, 3).map(({ uri, title }) => {
          const isPlaying = !!video && uri === video.uri;

          const handleVideo = () => {
            if (isPlaying) {
              setPlaying(!playing);
            } else {
              setVideo({ uri, title });
              setPlaying(true);
            }
          };

          return (
            <StyledTrack
              key={uri}
              hasPlayingVideo={hasPlayingVideo}
              isPlaying={isPlaying}
              onClick={() => handleVideo()}
              tabIndex="0"
            >
              {title}
              <PlayButton playing={isPlaying && playing} />
            </StyledTrack>
          );
        })}
    </>
  );
}

export default Playlist;
