import React from "react";

const commaList = (item, i, { length }) => {
  if (i + 1 < length) return <span key={`${item}-${i}`}> {`${item}, `} </span>;
  else return <span key={`${item}-${i}`}> {item} </span>;
};

function Want({ videos, id, title, year, artists, genres, styles }) {

  return (
    <div key={id} style={{ marginBottom: 20 }}>
      <div>{`${title} (${year})`}</div>
      <div>{artists.map(({ name }) => name).map(commaList)}</div>
      <div>{genres.map(commaList)}</div>
      <div>{styles.map(commaList)}</div>
      {!!videos && videos.length > 0 && (
        <ul style={{ marginTop: 0, marginBottom: 20 }}>
          {videos.slice(0, 4).map(({ uri, title }) => (
            <li key={uri}>
              <a href={uri}>{title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Want;
