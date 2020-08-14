import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import { PlayerContext } from "../PlayerContext";
import { Master } from "./";
import { endpoints } from "../utils";

function MasterWrapper() {
  const { masterId, username } = useParams();
  const { playing, setPlaying, video, setVideo } = useContext(PlayerContext);
  const { data: master, error } = useSWR(endpoints.master(masterId));

  if (!!error || !master) return null;

  const props = {
    ...master,
    error,
    loading: !master && !error,
    username,
    masterId,
    playing,
    setPlaying,
    video,
    setVideo,
  };

  return <Master {...props} />;
}

export default MasterWrapper;
