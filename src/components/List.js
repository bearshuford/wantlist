import React from "react";
import styled from "styled-components";

import { WantlistItem, Loading, Error } from "./";

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
`;

function List({ releaseId, wantlist, loading, error }) {
  if (!!error) return <Error />;
  if (!!loading) return <Loading />;

  return (
    <StyledList>
      {wantlist.map((item) => (
        <WantlistItem
          {...item}
          key={item.id}
          active={releaseId === "" + item.id ? "true" : undefined}
        />
      ))}
    </StyledList>
  );
}

export default List;
