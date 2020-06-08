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
`;

const StyledPlayButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 24px;
  border: none;
  background: none;
  padding: 0;
  padding-top: 10px;
  box-sizing: border-box; /*TODO: Global style */
`;

const PlayButton = ({ onClick }) => (
  <StyledPlayButton onClick={onClick}>&#9654;&#65038;</StyledPlayButton>
);

function Playlist({ videos = [], playing, setPlaying }) {
  return (
    <>
      {videos.length > 0 &&
        videos.slice(0, 3).map(({ uri, title }) => (
          <StyledTrack
            key={uri}
            onClick={() => {
              setPlaying({ uri, title });
            }}
            tabIndex="0"
          >
            {title}
            <PlayButton/>
          </StyledTrack>
        ))}
    </>
  );
}

export default Playlist;
