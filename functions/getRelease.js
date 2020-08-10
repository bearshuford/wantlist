import fetch from "node-fetch";

const token = process.env.DISCOGS_TOKEN;

const endpoints = {
  master: (id) => `https://api.discogs.com/masters/${id}?token=${token}`,
  release: (id) =>
    `https://api.discogs.com/releases/${id}?token=${token}&curr_abbr=USD`,
  marketplace: (id) => `https://discogs.com/sell/release/${id}`,
  wantlist: (username) =>
    `https://api.discogs.com/users/${username}/wants?token=${token}`,
};

const options = {
  headers: { "user-agent": "wantlist" },
};

const getRelease = async (id) => {
  try {
    let request = await fetch(endpoints.release(id), options);
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
      formats: release.formats.map((format) => format.name),
      images: release.images,
      videos: release.videos,
      cover: release.thumb,
      masterId: release.master_id,
      marketUrl: endpoints.marketplace(id),
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

  const { releaseId } = event.queryStringParameters;

  try {
    let release = await getRelease(releaseId);
    return { statusCode: 200, body: JSON.stringify(release) };
  } catch (error) {
    console.log("getRelease error", error);
    return { statusCode: 404, body: "error getting release" };
  }
};
