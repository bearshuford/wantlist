import React from "react";
import { NavLink, useParams } from "react-router-dom";
import styled, { css } from "styled-components";

const SidebarCard = css`
  @media (min-width: 1070px) {
    flex-flow: row nowrap;
    align-items: center;
    padding-right: 66px;
  }
`;

const StyledCard = styled(NavLink)`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 24px;
  text-decoration: none;
  color: #000;

  @media (min-width: 768px) {
    flex-flow: column nowrap;
    margin-bottom: 0;
  }

  ${(props) => props.sidebar && SidebarCard}

  &.active:before {
    @media (min-width: 1070px) {
      content: "\\279E";
      position: absolute;
      font-size: 28px;
      top: calc(50% - 20px);
      right: 16px;
    }
  }
`;

const SidebarMedia = css`
  @media (min-width: 1070px) {
    height: 52px;
    width: 66px;
    margin-bottom: 0;

    img {
      height: 100%;
      width: unset;
    }
  }
`;

const StyledCardMedia = styled.div`
  height: 62px;
  width: 80px;
  flex-shrink: 0;

  img {
    height: 100%;
  }

  @media (min-width: 768px) {
    height: unset;
    width: 100%;

    img {
      height: unset;
      width: 100%;
      margin-bottom: 10px;
    }
  }

  ${(props) => props.sidebar && SidebarMedia}
`;

const SidebarTitle = css`
  @media (min-width: 1070px) {
    font-size: 13px;
  }
`;

const StyledTitle = styled.h4`
  margin: 0 0 4px;
  font-weight: bold;
  font-size: 14px;
  line-height: 1.1;

  @media (min-width: 1024px) {
    font-size: 15px;
  }

  ${(props) => props.sidebar && SidebarTitle}
`;

const SidebarArtist = css`
  @media (min-width: 1070px) {
    font-size: 12px;
  }
`;

const StyledArtist = styled.div`
  font-size: 13px;

  @media (min-width: 1024px) {
    font-size: 14px;
  }
  ${(props) => props.sidebar && SidebarArtist}
`;

const commaList = (item, i, { length }) => {
  if (i + 1 < length) return <span key={`${item}-${i}`}> {`${item}, `} </span>;
  else return <span key={`${item}-${i}`}> {item} </span>;
};

function WantlistItem({ id, cover, title, artists, active }) {
  const { username, releaseId } = useParams();

  return (
    <StyledCard
      to={`/${username}/${id}`}
      active={releaseId === "" + id ? "true" : undefined}
    >
      <StyledCardMedia>
        <img src={cover} alt="want cover" />
      </StyledCardMedia>
      <div>
        <StyledTitle>{title}</StyledTitle>
        <StyledArtist>
          {artists.map(({ name }) => name).map(commaList)}
        </StyledArtist>
      </div>
    </StyledCard>
  );
}

export default WantlistItem;
