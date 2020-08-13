import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";

import { endpoints } from "../utils";

const StyledRec = styled(Link)`
  display: flex;
  flex-flow: column nowrap;
  text-decoration: none;

  h3,
  h4 {
    padding: 0;
    margin: 0;
    margin-top: 3px;
    color: #000;
    text-decoration: none;
    font-size: 13px;
  }

  h4 {
    font-size: 11px;
    font-weight: normal;
  }

  img {
    margin-bottom: 2px;
    max-width: 100%;
  }
`;

const StyledRecsWrapper = styled.div`
  margin-top: 18px;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 400px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 660px) {
    grid-gap: 32px;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 1400px) {
    grid-column-gap: 40px;
  }

  @media (min-width: 1500px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (min-width: 1700px) {
    grid-template-columns: repeat(7, 1fr);
  }
`;

const StyledRecsHeader = styled.h2`
  margin-top: 40px;
  margin-bottom: 0;
`;


const Rec = ({ releaseId, title, artist, thumbnail, username, index }) => (
  <StyledRec to={`/${username}/release/${releaseId}`}>
    <img src={thumbnail} alt={title} />
    <h3>{title}</h3>
    <h4>{artist}</h4>
  </StyledRec>
);

function Recs({ releaseId, master: masterId, username }) {
  const recsEndpoint = !!masterId
    ? endpoints.masterRecs(masterId)
    : endpoints.recs(releaseId);
  const { data: recs, error } = useSWR(recsEndpoint);

  if (!!error || !recs || recs.length < 1) return null;

  return (
    <>
      <StyledRecsHeader>recommendations</StyledRecsHeader>
      <StyledRecsWrapper>
        {recs.map((rec, i) => (
          <Rec key={i + rec.anchor} username={username} {...rec} />
        ))}
      </StyledRecsWrapper>
    </>
  );
}

export default Recs;
