import { useEffect, useState } from "react";
import { useFetch } from ".";
import { endpoints } from "../utils";

function useVideos(id) {
  const [videos, setVideos] = useState([]);
  const { get } = useFetch();

  useEffect(() => {
    const getRelease = async () => {
      try {
        let request = await get(endpoints.release(id));
        let release = await request.json();
        console.log("release", release);
        if (!!release && release.videos)
          setVideos(release.videos.map(({uri, title}) => ({uri, title})));
      } catch (error) {
        console.log("error fetching release for ", id, error);
        return videos;
      }
    };
    if (!!id) getRelease();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return videos;
}

export default useVideos;
