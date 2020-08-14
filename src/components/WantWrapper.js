import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import { PlayerContext } from "../PlayerContext";
import { Want } from "./";
import { endpoints } from "../utils";

function WantWrapper() {
  const { releaseId, masterId, username } = useParams();
  const { playing, setPlaying, video, setVideo } = useContext(PlayerContext);
  
  const id = !!releaseId ? releaseId : masterId;
  const endpoint = !!masterId ? endpoints.master(id) : endpoints.release(id);
  const { data: release, error } = useSWR(endpoint);

  if (!!error || !release) return null;

  const props = {
    ...release,
    error,
    releaseId,
    master: !releaseId && masterId,
    loading: !release && !error,
    playing,
    setPlaying,
    video,
    setVideo,
    username,
  };

  return <Want {...props} />;
}

export default WantWrapper;
