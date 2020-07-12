import React from "react";
import styled, { css } from "styled-components";

import { WantlistItem, Loading, Error } from "./";

const SidebarMixin = css`
  @media (min-width: 1070px) {
    display: flex;
    width: 325px;
    border-right: 1px solid #949494;
    margin: 0;
    margin-right: 24px;
    flex-shrink: 0;
    overflow-y: auto;
    height: calc(100vh - 143px);
  }

  @media (min-width: 1400px) {
    margin-right: 84px;
  }
`;

const StyledList = styled.div`
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
  }

  @media (min-width: 1800px) {
    grid-column-gap: 62px;
    max-width: calc(100% - 200px);
    grid-template-columns: repeat(5, 1fr);
  }

  ${(props) => props.sidebar && SidebarMixin};
`;

function List({ releaseId, wantlist, loading, error }) {
  if (!!error) return <Error />;
  if (!!loading) return <Loading />;

  return (
    <StyledList sidebar={!!releaseId}>
      {wantlist.map((item) => (
        <WantlistItem {...item} key={item.id} hasSeletion={!!releaseId} />
      ))}
    </StyledList>
  );
}

export default List;
