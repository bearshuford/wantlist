import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSWRInfinite } from "swr";

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
    margin-bottom: 6px;
    width: 100%;
  }
`;

const ShowMoreButton = styled.button`
  display: flex;
  margin-top: 32px;
  width: 200px;
  color: #fff;
  background-color: #222;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  margin-top: 22px;
  height: 45px;
`;

const StyledRecsWrapper = styled.div`
  margin-top: 18px;
  display: grid;
  grid-gap: 20px 24px;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 400px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 660px) {
    grid-gap: 24px 32px;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 900px) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 1400px) {
    grid-column-gap: 32px 36px;
  }

  @media (min-width: 1500px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (min-width: 1700px) {
    grid-template-columns: repeat(7, 1fr);
  }
`;

const StyledRecsHeader = styled.h2`
  margin-top: 54px;
  margin-bottom: 22px;
  font-size: 24px;
  text-transform: uppercase;

  @media (min-width: 660px) {
    margin-top: 64px;
  }
`;

const getKey = (endpoint) => (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return endpoint(pageIndex); // SWR key
};

const recsEndpoint = (masterId, releaseId) => (offset) =>
  !!masterId
    ? endpoints.masterRecs(masterId, offset)
    : endpoints.recs(releaseId, offset);

const Rec = ({ releaseId, title, artist, thumbnail, username, index }) => (
  <StyledRec to={`/${username}/release/${releaseId}`}>
    <img src={thumbnail} alt={title} />
    <h3>{title}</h3>
    <h4>{artist}</h4>
  </StyledRec>
);

function Recs({ releaseId, master, username }) {
  const keyGetter = getKey(recsEndpoint(master, releaseId));
  const { data: pages, size, setSize } = useSWRInfinite(keyGetter);

  if (!pages)
    return <StyledRecsHeader>loading recommendations</StyledRecsHeader>;
  if (pages.length < 1) return null;

  let idList = [];
  const recs = pages.map((recs, i) =>
    recs.map((rec, j) => {
      if(idList.includes(rec.releaseId)) return null;
      else idList.push(rec.releaseId);
      return <Rec key={i + rec.releaseId} username={username} {...rec} />;
    })
  );

  return (
    <>
      <StyledRecsHeader>recommendations</StyledRecsHeader>
      <StyledRecsWrapper>{recs}</StyledRecsWrapper>
      <ShowMoreButton onClick={() => setSize(size + 1)}> more</ShowMoreButton>
    </>
  );
}

export default Recs;
