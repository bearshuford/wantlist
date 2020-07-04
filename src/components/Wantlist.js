import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";

import { Want, Controls } from "./";
import { useWantlist } from "../hooks";

const StyledWantlist = styled.div`
  display: flex;
  flex-flow: row wrap;

  ${(props) =>
    props.hasVideo &&
    css`
      padding-bottom: 96px;
    `};
`;

function Wantlist() {
  const [playing, setPlaying] = useState(true);
  const [video, setVideo] = useState(null);

  const { username } = useParams();
  const { wantlist, status } = useWantlist(username);
  const { loading, error } = status;

  const playingRef = useRef(null);

  const scrollToPlaying = () => {
    if (!!video) {
      window.scrollTo({
        behavior: "smooth",
        top: playingRef.current.offsetTop - 12,
      });
    }
  };

  if (!!error) return <h2>error</h2>;
  if (!!loading) return <h2>loading</h2>;

  return (
    <>
      <StyledWantlist hasVideo={!!video}>
        {wantlist
          .sort((a, b) => {
            const aHasVids = !!a.videos && a.videos.length > 0;
            const bHasVids = !!b.videos && b.videos.length > 0;
            if (bHasVids && !aHasVids) return 1;
            else if (!bHasVids && aHasVids) return -1;
            else return 0;
          })
          .map((item) => (
            <Want
              {...item}
              {...{ playing, setPlaying, video, setVideo, playingRef }}
              key={item.id}
            />
          ))}
      </StyledWantlist>
      {!!video && (
        <Controls {...{ playing, setPlaying, video, scrollToPlaying }} />
      )}
    </>
  );
}

export default Wantlist;
