import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import { PlayerContext } from "../PlayerContext";
import { Want } from "./";
import { endpoints } from "../utils";

function WantWrapper() {
  const { releaseId, username } = useParams();
  const { playing, setPlaying, video, setVideo } = useContext(PlayerContext);
  const { data: release, error } = useSWR(endpoints.release(releaseId));

  if (!!error || !release) return null;

  const props = {
    ...release,
    error,
    loading: !release && !error,
    playing,
    setPlaying,
    video,
    setVideo,
    releaseId,
    username,
  };

  return <Want {...props} />;
}

export default WantWrapper;
