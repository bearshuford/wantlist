import React from "react";

import { Playlist } from "./";

const commaList = (item, i, { length }) => {
  if (i + 1 < length) return <span key={`${item}-${i}`}> {`${item}, `} </span>;
  else return <span key={`${item}-${i}`}> {item} </span>;
};

function Want({
  videos,
  cover,
  id,
  title,
  year,
  artists,
  marketUrl,
  numberAvailable,
  notes,
  lowestPrice,
  images,
  genres,
  styles,
}) {
  return (
    <div key={id} style={{ marginBottom: 20 }}>
      {!!cover && <img src={cover} alt="want cover" style={{ width: 100 }} />}
      <div>
        <b>{`${title} (${year})`}</b>
        {" – "}
        {artists.map(({ name }) => name).map(commaList)}
      </div>
      {!!marketUrl && numberAvailable > 0 && (
        <a href={marketUrl}>{`Check marketplace`}</a>
      )}
      {!!videos && <Playlist videos={videos} />}
    </div>
  );
}

export default Want;
