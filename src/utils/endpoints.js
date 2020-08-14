const BASE = "/.netlify/functions/";

const pageQuery = (offset) => (!!offset ? `&offset=${offset}` : "");

const endpoints = {
  release: (id) => `${BASE}getRelease?releaseId=${id}`,
  master: (id) => `${BASE}getRelease?masterId=${id}`,
  wantlist: (username) => `${BASE}getWantlist?username=${username}`,
  recs: (id, offset) => `${BASE}getRecs?releaseId=${id}${pageQuery(offset)}`,
  masterRecs: (id, offset) =>
    `${BASE}getRecs?masterId=${id}${pageQuery(offset)}`,
};

export default endpoints;
