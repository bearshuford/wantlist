const token = process.env.DISCOGS_TOKEN;

export default {
  wantlist: (username) =>
    `https://api.discogs.com/users/${username}/wants?token=${token}`,
  release: (id) =>
    `https://api.discogs.com/releases/${id}?token=${token}&curr_abbr=USD`,
  marketplace: (id, master) =>{
    if(!master) return `https://discogs.com/sell/release/${id}`;
    return `https://discogs.com/sell/list?master_id=${id}`
  },
  master: (id) => `https://api.discogs.com/masters/${id}?token=${token}`,
  versions: (id) => `https://api.discogs.com/masters/${id}/versions?token=${token}`,
  scrapeRelease: (releaseId, page) =>
    `https://www.discogs.com/release/recs/${releaseId}?type=release&page=${page}`,
    scrapeMaster: (masterId, page) =>
    `https://www.discogs.com/release/recs/${masterId}?type=master&page=${page}`,
};