import React, { useState } from "react";

const PlayerContext = React.createContext();

export { PlayerContext };

export default ({ children }) => {
  const [playing, setPlaying] = useState(false);
  const [video, setVideo] = useState(false);
  const [videos, setVideos] = useState([]);

  return (
    <PlayerContext.Provider
      value={{ playing, setPlaying, video, setVideo, videos, setVideos }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
