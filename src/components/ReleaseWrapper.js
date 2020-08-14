import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import { PlayerContext } from "../PlayerContext";
import { Release } from ".";
import { endpoints } from "../utils";

function ReleaseWrapper() {
  const { releaseId, username } = useParams();
  const { playing, setPlaying, video, setVideo } = useContext(PlayerContext);
  const { data: release, error } = useSWR(endpoints.release(releaseId));

  if (!!error || !release) return null;

  const props = {
    ...release,
    loading: !release && !error,
    error,
    releaseId,
    username,
    playing,
    setPlaying,
    video,
    setVideo,
  };

  return <Release {...props} />;
}

export default ReleaseWrapper;
