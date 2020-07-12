import React from "react";
import styled, { css } from "styled-components";

import { WantlistItem, Loading, Error } from "./";

const SidebarMixin = css`
  @media (min-width: 1070px) {
    display: flex;
    width: 325px;
    margin: 0;
    max-width: unset;
  }
`;

const StyledListWrapper = styled.div`
  ${(props) =>
    props.sidebar &&
    css`
      overflow-y: auto;
      overflow-x: hidden;
      margin-right: 24px;
      border-right: 1px solid #949494;
      flex-shrink: 0;

      @media (min-width: 1400px) {
        margin-right: 84px;
      }
    `}
`;

const StyledList = styled.div`
  display: flex;
  flex-flow: column nowrap;

  @media (min-width: 768px) {
    display: grid;
    grid-gap: 52px 57px;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1070px) {
    display: grid;
    grid-gap: 52px;
    margin: 0 auto;
    max-width: calc(100% - 80px);
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
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
    <StyledListWrapper sidebar={!!releaseId}>
      <StyledList sidebar={!!releaseId}>
        {wantlist.map((item) => (
          <WantlistItem
            {...item}
            key={item.id}
            active={(releaseId === "" + item.id) ? "true" : undefined}
          />
        ))}
      </StyledList>
    </StyledListWrapper>
  );
}

export default List;
