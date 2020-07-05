import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { WantlistItem, Loading, Error } from "./";
import { useWantlist } from "../hooks";

const StyledWantlist = styled.div`
  display: flex;
  flex-flow: column nowrap;

  @media (min-width: 768px) {
    display: grid;
    grid-gap: 52px 57px;
    grid-template-columns: repeat(3, 1fr);
    /* grid-template-columns: repeat(auto-fit, minmax(186px, 1fr)); */
  }

  @media (min-width: 1070px) {
    display: grid;
    grid-gap: 52px;
    margin: 0 auto;
    max-width: calc(100% - 80px);
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    /* grid-template-columns: repeat(auto-fit, minmax(186px, 1fr)); */
  }

  @media (min-width: 1400px) {
    grid-column-gap: 62px;
    max-width: calc(100% - 176px);
    /* grid-template-columns: repeat(auto-fit, minmax(186px, 1fr)); */
  }
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
