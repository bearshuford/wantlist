import { useEffect, useState } from "react";
import { useFetch } from "./";
import { endpoints } from "../utils";

function useWantlist(username) {
  const [wantlist, setWantlist] = useState([]);
  const { get } = useFetch();

  useEffect(() => {
    const parseWants = async (item) => {
      const getVideos = async (id) => {
        try {
          let request = await get(endpoints.release(id));
          let release = await request.json();
          if (!!release && release.videos)
            return release.videos.map(({ uri, title }) => ({ uri, title }));
        } catch (error) {
          throw error;
        }
      };

      const parsed = { ...item.basic_information };
      const want = {
        videos: [],
        id: item.id,
        masterId: parsed.master_id,
        title: parsed.title,
        dateAdded: item.date_added,
        discogsUrl: item.resource_url,
        genres: parsed.genres,
        styles: parsed.styles,
        year: parsed.year,
        formats: parsed.formats.map((format) => format.name),
        artists: parsed.artists.map((artist) => {
          return {
            id: artist.id,
            name: artist.name,
          };
        }),
      };

      try {
        if (!parsed.master_id) {
          return want;
        }
        const videos = await getVideos(parsed.master_id);
        return {
          ...want,
          videos,
        };
      } catch (error) {
        //TODO: error handling
        console.log(error);
        return want;
      }
    };

    const getWantlist = async () => {
      try {
        let response = await get(endpoints.wantlist(username));
        let want = await response.json();
        let wants = await Promise.all(want.wants.map(parseWants));
        setWantlist(wants);
      } catch (error) {}
    };
    getWantlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return wantlist;
}

export default useWantlist;
