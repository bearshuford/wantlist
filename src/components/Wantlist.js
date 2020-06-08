import React, { useState } from "react";
import styled from "styled-components";

import { Want } from "./";

const StyledWantlist = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

function Wantlist({ list }) {
  const [playing, setPlaying] = useState(null);

  return (
    <StyledWantlist style={{}}>
      {list
        .sort((a, b) => {
          const aHasVids = !!a.videos && a.videos.length > 0;
          const bHasVids = !!b.videos && b.videos.length > 0;
          if ((bHasVids && !aHasVids)) return 1;
          else if(!bHasVids && aHasVids) return -1;
          else return 0;
        })
        .map((item) => (
          <Want {...item} {...{ playing, setPlaying }} key={item.id} />
        ))}
    </StyledWantlist>
  );
}

export default Wantlist;
