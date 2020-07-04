import { useEffect, useState } from "react";
import { useFetch } from "./";


const useWantlist = (username) => {
  const [wantlist, setWantlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { get } = useFetch();

  useEffect(() => {
    const { origin } = window.location;
    let fetchWantlist = async () => {
      setLoading(true);
      setError(null);
      const apiUrl = `${origin}/.netlify/functions/getWantlist?username=${username}`;
      const headers = {
        "Content-Type": "application/json",
      };

      try {
        let res = await get(apiUrl, { headers, mode: "CORS" });
        let wantlist = await res.json();
        setLoading(false);
        setWantlist(wantlist);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchWantlist();
  }, [username, get]);

  return { wantlist, status: { loading, error } };
};

export default useWantlist;
