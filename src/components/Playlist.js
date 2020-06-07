import React, { useState } from "react";
import ReactPlayer from "react-player";

const PlayButton = ({ onClick }) => (
  <button onClick={onClick}>&#9654;&#65038;</button>
);

function Playlist({ videos = [] }) {
  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <>
      {!!currentTrack && <ReactPlayer url={currentTrack} />}
      {videos.length > 0 &&
        videos.slice(0, 4).map(({ uri, title }) => (
          <div key={uri}>
            {title}
            <PlayButton
              onClick={() => {
                setCurrentTrack(uri);
              }}
            />
          </div>
        ))}
    </>
  );
}

export default Playlist;
