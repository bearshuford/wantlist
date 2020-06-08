import fetch from "node-fetch";

const token = process.env.DISCOGS_TOKEN;

const endpoints = {
  master: (id) => `https://api.discogs.com/masters/${id}?token=${token}`,
  release: (id) => `https://api.discogs.com/releases/${id}?token=${token}`,
  wantlist: (username) =>
    `https://api.discogs.com/users/${username}/wants?token=${token}`,
  marketplace: (id) => `https://discogs.com/sell/release/${id}`,
};

const options = {
  headers: { "user-agent": "wantlist" },
};

const parseWants = async (item) => {
  const getMedia = async (id) => {
    try {
      let request = await fetch(endpoints.master(id), options);
      let release = await request.json();
      let videos = [];
      if (!!release && release.videos)
        videos = release.videos.map(({ uri, title }) => ({ uri, title }));

      return videos;
    } catch (error) {
      throw error;
    }
  };
  const getRelease = async (id) => {
    try {
      let request = await fetch(endpoints.release(id), options);
      let release = await request.json();
      const { have, want } = release.community || {};
      const info = {
        numberAvailable: release.num_for_sale,
        images: release.images,
        notes: release.notes,
        have,
        want,
      };
      return info;
    } catch (error) {
      throw error;
    }
  };

  const info = item.basic_information;
  const want = {
    videos: [],
    id: item.id,
    marketUrl: endpoints.marketplace(item.id),
    masterId: info.master_id,
    title: info.title,
    dateAdded: item.date_added,
    genres: info.genres,
    styles: info.styles,
    year: info.year,
    cover: info.cover_image,
    formats: info.formats.map((format) => format.name),
    artists: info.artists.map((artist) => {
      return {
        id: artist.id,
        name: artist.name,
      };
    }),
  };

  try {
    if (!info.master_id) {
      return want;
    }
    const videos = await getMedia(info.master_id);
    const releaseInfo = await getRelease(info.master_id);

    return {
      ...want,
      ...releaseInfo,
      videos,
    };
  } catch (error) {
    //TODO: error handling
    console.log("error getting master", error);
    return want;
  }
};

exports.handler = async (event) => {
  if (event.httpMethod !== "GET")
    return { statusCode: 405, body: "Method Not Allowed" };

  const { username } = event.queryStringParameters;

  try {
    let response = await fetch(endpoints.wantlist(username), options);
    let want = await response.json();
    let wants = await Promise.all(want.wants.map(parseWants));
    return { statusCode: 200, body: JSON.stringify(wants) };
  } catch (error) {
    console.log("getWantlist error", error);
    return { statusCode: 404, body: "error getting wantlist" };
  }
};
