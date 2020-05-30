import React from "react";

const commaList = (item, i, { length }) => {
  if (i + 1 < length) return <span key={`${item}-${i}`}> {`${item}, `} </span>;
  else return <span key={`${item}-${i}`}> {item} </span>;
};

function Want({ id, title, year, artists, genres, styles }) {
  return (
    <div key={id} style={{ marginBottom: 20 }}>
      <div>{`${title} (${year})`}</div>
      <div>{artists.map(({ name }) => name).map(commaList)}</div>
      <div>{genres.map(commaList)}</div>
      <div>{styles.map(commaList)}</div>
    </div>
  );
}

export default Want;
