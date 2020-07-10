import React from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";

import { List, Want } from "./";
import { useWantlist } from "../hooks";

const SidebarWantlist = css`
  @media (min-width: 1070px) {
    display: flex;
    flex-flow: row nowrap;
  }
`;

const StyledWantlist = styled.div`
  ${(props) => props.sidebar && SidebarWantlist}
`;

function Wantlist() {
  const { username, releaseId } = useParams();
  const {
    wantlist,
    status: { loading, error },
  } = useWantlist(username);

  const release =
    !!wantlist &&
    wantlist.length > 0 &&
    wantlist.find((want) => "" + want.id === releaseId);

  return (
    <StyledWantlist sidebar={!!release}>
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
