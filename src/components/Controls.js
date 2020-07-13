import React from "react";
import styled, { css } from "styled-components";

const PlayIcon = () => <>&#x25ba;&#xfe0e;</>;
const PauseIcon = () => <>&#9612;&#9612;</>;

const StyledControls = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  border-top: 2px;
  z-index: 2;
  height: 75px;
  align-items: center;
  background-color: white;
  padding: 0 18px;
  border-top: 4px solid violet;
`;

const StyledTumbnail = styled.img`
  height: 64px;
  border-radius: 2px;
  margin: 0 18px 0 0;
`;

const StyledTitle = styled.h4`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

const StyledPlayPause = styled.button`
  height: 75px;
  background: none;
  border: none;
  outline: none;
  box-shadow: none;
  font-size: 28px;
  width: 54px;
  text-align: right;
  flex: 1;
  margin-left: 18px;

  ${(props) =>
    props.isPlaying &&
    css`
      font-size: 16px;
    `};
`;

function Controls({ playing, setPlaying, video, scrollToPlaying }) {
  const togglePlayPause = () => {
    setPlaying(!playing);
  };
  return (
    <StyledControls hasVideo={!!video}>
      <StyledTumbnail src={video.thumbnail} />
      <StyledTitle onClick={scrollToPlaying}>{video.title}</StyledTitle>
      <StyledPlayPause onClick={togglePlayPause} isPlaying={playing}>
        {!!playing ? <PauseIcon /> : <PlayIcon />}
      </StyledPlayPause>
    </StyledControls>
  );
}

export default Controls;
