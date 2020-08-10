import React, { useContext } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { PlayerContext } from "../PlayerContext";
import { List } from "./";
import { endpoints } from "../utils";

const PLAYER_HEIGHT = 75;

const StyledWantlist = styled.div`
  padding-bottom: ${(props) => (props.player ? PLAYER_HEIGHT : 0)}px;
`;

function Wantlist() {
  const { username } = useParams();
  const { video } = useContext(PlayerContext);

  const { data: wantlist, error } = useSWR(endpoints.wantlist(username));

  return (
    <StyledWantlist player={!!video}>
      {!!wantlist && (
        <List
          wantlist={wantlist}
          error={error}
          loading={!wantlist && !error}
        />
      )}
    </StyledWantlist>
  );
}

export default Wantlist;
