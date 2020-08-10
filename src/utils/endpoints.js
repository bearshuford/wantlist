const endpoints = {
  release: (id) => `/.netlify/functions/getRelease?releaseId=${id}`,
  recs: (id) => `/.netlify/functions/getRecs?releaseId=${id}`,
  wantlist: (username) =>
    `/.netlify/functions/getWantlist?username=${username}`,
};

export default endpoints;