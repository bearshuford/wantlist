import React, { useState, useRef } from "react";
import styled from "styled-components";

import { Want, Controls } from "./";

const StyledWantlist = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

function Wantlist({ list }) {
  const [playing, setPlaying] = useState(true);
  const [video, setVideo] = useState(null);

  const playingRef = useRef(null);

  const scrollToPlaying = () => {
    if(!!video) {
      window.scrollTo({ behavior: "smooth", top: playingRef.current.offsetTop - 12 });
    }
  };

  return (
    <>
      <StyledWantlist style={{}}>
        {list
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
      {!!video && <Controls {...{ playing, setPlaying, video, scrollToPlaying }} />}
    </>
  );
}

export default Wantlist;
