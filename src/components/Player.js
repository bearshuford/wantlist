import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";
import ReactPlayer from "react-player";

import { PlayerContext } from "../PlayerContext";

const PlayIcon = () => <>&#x25ba;&#xfe0e;</>;
const PauseIcon = () => <>&#9612;&#9612;</>;
const DownIcon = () => <>&bigtriangledown;</>;
const UpIcon = () => <>&bigtriangleup;</>;

const StyledControls = styled.div`
  display: ${(props) => (props.hasVideo ? "flex" : "none")};
  flex-flow: row nowrap;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
  height: 75px;
  align-items: center;
  background-color: white;
  padding: 0 18px;
  border-top: 4px solid violet;

  @media (min-width: 1024px) {
    left: unset;
    width: 352px;
    right: 28px;
    border: 4px solid violet;
  }

  @media (min-width: 1400px) {
    right: 76px;
    width: 360px;
  }

  @media (min-width: 1800px) {
    right: 28%;
    width: 380px;
  }
`;

const StyledCollapseButton = styled.button`
  background: transparent;
  padding: 4px;
  font-size: 20px;
  margin: 0 18px 0 0;
  border: none;
  box-shadow: none;
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
  margin-right: 24px;

  @media (min-width: 1024px) {
    margin-right: 12px;
  }

  ${(props) =>
    props.isPlaying &&
    css`
      font-size: 16px;
    `};
`;

const StyledIframeWrapper = styled.div`
  display: none;
`;

function Player() {
  const { playing, setPlaying, video } = useContext(PlayerContext);
  const [collapsed, setCollapsed] = useState(true);

  const togglePlayPause = () => {
    setPlaying(!playing);
  };

  const toggleCollpased = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <StyledControls hasVideo={!!video}>
        {/* <StyledCollapseButton onClick={toggleCollpased}>
          {collapsed ? <DownIcon /> : <UpIcon />}
        </StyledCollapseButton> */}
        <StyledTitle>{video.title}</StyledTitle>
        <StyledPlayPause onClick={togglePlayPause} isPlaying={playing}>
          {!!playing ? <PauseIcon /> : <PlayIcon />}
        </StyledPlayPause>
      </StyledControls>
      {!!video && (
        <StyledIframeWrapper>
          <ReactPlayer
            url={video.uri}
            playing={playing}
            onPlay={() => {
              setPlaying(true);
            }}
            onPause={() => {
              setPlaying(false);
            }}
          />
        </StyledIframeWrapper>
      )}
    </>
  );
}

export default Player;
