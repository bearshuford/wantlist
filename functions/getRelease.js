import fetch from "node-fetch";

const token = process.env.DISCOGS_TOKEN;

const endpoints = {
  wantlist: (username) =>
    `https://api.discogs.com/users/${username}/wants?token=${token}`,
  release: (id) =>
    `https://api.discogs.com/releases/${id}?token=${token}&curr_abbr=USD`,
  marketplace: (id, master) =>{
    if(!master) return `https://discogs.com/sell/release/${id}`;
    return `https://discogs.com/sell/list?master_id=${id}`
  },
  master: (id) => `https://api.discogs.com/masters/${id}?token=${token}`,
};

const options = {
  headers: { "user-agent": "wantlist" },
};

const getRelease = async (releaseId, masterId) => {
  const id = !!releaseId ? releaseId : masterId;
  const endpoint = !!masterId ? endpoints.master(id) : endpoints.release(id);
  try {
    let request = await fetch(endpoint, options);
    let release = await request.json();

    const { have, want } = release.community || {};
    const info = {
      title: release.title,
      artists: release.artists.map((artist) => {
        return {
          id: artist.id,
          name: artist.name,
        };
      }),
      artistsSort: release.artists_sort,
      genres: release.genres,
      formats: release.formats && release.formats.map((format) => format.name),
      images: release.images,
      videos: release.videos,
      cover: release.thumb,
      masterId: release.master_id,
      marketUrl: endpoints.marketplace(id, !!masterId),
      numberAvailable: release.num_for_sale,
      lowestPrice: release.lowest_price,
      notes: release.notes,
      country: release.country,
      released: release.released,
      releasedFormatted: release.released_formatted,
      year: release.year,
      have,
      want,
    };
    return info;
  } catch (error) {
    throw error;
  }
};

exports.handler = async (event) => {
  if (event.httpMethod !== "GET")
    return { statusCode: 405, body: "Method Not Allowed" };

  const { releaseId, masterId } = event.queryStringParameters;

  try {
    let release = await getRelease(releaseId, masterId);
    return { statusCode: 200, body: JSON.stringify(release) };
  } catch (error) {
    console.log("getRelease error", error);
    return { statusCode: 404, body: "error getting release" };
  }
};
