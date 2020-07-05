import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledCard = styled(Link)`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 24px;
  text-decoration: none;
  color: #000;
`;

const StyledCardMedia = styled.div`
  height: 62px;
  width: 80px;
  flex-shrink: 0;

  img {
    height: 100%;
  }
`;

const StyledTitle = styled.h4`
  margin: 0 0 4px;
  font-weight: bold;
  font-size: 14px;
  line-height: 1.1;
`;

const StyledArtist = styled.div`
  font-size: 13px;
`;

const commaList = (item, i, { length }) => {
  if (i + 1 < length) return <span key={`${item}-${i}`}> {`${item}, `} </span>;
  else return <span key={`${item}-${i}`}> {item} </span>;
};

function WantlistItem({ id, cover, title, artists }) {
  return (
    <StyledCard>
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
