import React from "react";
import { useVideos } from "../hooks";

const commaList = (item, i, { length }) => {
  if (i + 1 < length) return <span key={`${item}-${i}`}> {`${item}, `} </span>;
  else return <span key={`${item}-${i}`}> {item} </span>;
};

function Want({ id, masterId, title, year, artists, genres, styles }) {
  const videos = useVideos(masterId);

  return (
    <div key={id} style={{ marginBottom: 20 }}>
      <div>{`${title} (${year})`}</div>
      <div>{artists.map(({ name }) => name).map(commaList)}</div>
      <div>{genres.map(commaList)}</div>
      <div>{styles.map(commaList)}</div>
      {videos.length > 0 && (
        <ul style={{ marginTop: 0, marginBottom: 20 }}>
          {videos.slice(0, 4).map(({ uri, title }) => (
            <li>
              <a href={uri}>{title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Want;
