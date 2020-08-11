const endpoints = {
  release: (id) => `/.netlify/functions/getRelease?releaseId=${id}`,
  master: (id) => `/.netlify/functions/getRelease?masterId=${id}`,
  recs: (id) => `/.netlify/functions/getRecs?releaseId=${id}`,
  masterRecs: (id) => `/.netlify/functions/getRecs?masterId=${id}`,
  wantlist: (username) =>
    `/.netlify/functions/getWantlist?username=${username}`,
};

export default endpoints;