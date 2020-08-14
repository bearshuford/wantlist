import fetch from "node-fetch";

import { endpoints } from "./utils";

const options = {
  headers: { "user-agent": "wantlist" },
};

const getRelease = async (releaseId) => {
  try {
    let request = await fetch(endpoints.release(releaseId), options);
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
      marketUrl: endpoints.marketplace(releaseId),
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
