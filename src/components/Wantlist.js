import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { WantlistItem, Loading, Error } from "./";
import { useWantlist } from "../hooks";

const StyledWantlist = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

function Wantlist() {
  const { username } = useParams();
  const {
    wantlist,
    status: { loading, error },
  } = useWantlist(username);

  if (!!error) return <Error />;
  if (!!loading) return <Loading />;

  return (
    <>
      <StyledWantlist>
        {wantlist.map((item) => (
          <WantlistItem {...item} key={item.id} />
        ))}
      </StyledWantlist>
    </>
  );
}

export default Wantlist;
