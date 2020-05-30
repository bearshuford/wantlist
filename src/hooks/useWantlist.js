import { useEffect, useState } from "react";
import { useFetch } from "./";

const endpoints = {
  wantlist: (username) => `https://api.discogs.com/users/${username}/wants`,
};

const parseWants = (item) => {
  const parsed = { ...item.basic_information };
  return {
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
};

function useWantlist(username) {
  const [wantlist, setWantlist] = useState([]);
  const { get } = useFetch();

  useEffect(() => {
    const getWantlist = async () => {
      try {
        let response = await get(endpoints.wantlist(username));
        let want = await response.json();
        let wants = want.wants.map(parseWants);
        setWantlist(wants);
      } catch (error) {
        console.log("error fetching wantlist for ", username, error);
      }
    };
    getWantlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return wantlist;
}

export default useWantlist;
