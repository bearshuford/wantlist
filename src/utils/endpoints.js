const endpoints = {
  release: (id) => `https://api.discogs.com/masters/${id}`,
  wantlist: (username) => `https://api.discogs.com/users/${username}/wants`,
};

export default endpoints;