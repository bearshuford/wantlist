import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";

import { PlayerContext } from "../PlayerContext";
import { List, Want } from "./";
import { useWantlist } from "../hooks";

const PLAYER_HEIGHT = 96;

const SidebarWantlist = css`
  @media (min-width: 1070px) {
    display: flex;
    flex-flow: row nowrap;
    height: calc(
      100% - ${(props) => (props.player ? 81 + PLAYER_HEIGHT : 81)}px
    );
  }
`;

const StyledWantlist = styled.div`
  ${(props) => props.sidebar && SidebarWantlist}
`;

function Wantlist() {
  const { username, releaseId } = useParams();
  const { video } = useContext(PlayerContext);
  const {
    wantlist,
    status: { loading, error },
  } = useWantlist(username);


  const release =
    !!wantlist &&
    wantlist.length > 0 &&
    wantlist.find((want) => "" + want.id === releaseId);

  return (
    <StyledWantlist sidebar={!!release} player={!!video}>
      <List
        wantlist={wantlist}
        releaseId={releaseId}
        error={error}
        loading={loading}
      />
      {!!release && <Want {...release} />}
    </StyledWantlist>
  );
}

export default Wantlist;
