import fetch from "node-fetch";

import { endpoints } from "./utils";

const options = {
  headers: { "user-agent": "wantlist" },
};

const parseVersion = (version) => ({
  releaseId: version.id,
  format: version.format,
  country: version.country,
  formats: version.major_formats,
  catno: version.catno,
  label: version.label,
  released: version.released,
  want: version?.stats?.community?.in_wantlist,
  have: version?.stats?.community?.in_collection,
  thumb: version.thumb,
  title: version.title,
});

const getMaster = async (masterId) => {
  try {
    let request = await fetch(endpoints.master(masterId), options);
    let master = await request.json();

    const info = {
      title: master.title,
      artists: !!master.artists && master.artists.map((artist) => {
        return {
          id: artist.id,
          name: artist.name,
        };
      }),
      genres: master.genres,
      formats: !!master.formats && master.formats.map((format) => format.name),
      images: master.images,
      videos: master.videos,
      tracklist: master.tracklist,
      marketUrl: endpoints.marketplace(masterId, true),
      numberAvailable: master.num_for_sale,
      lowestPrice: master.lowest_price,
      country: master.country,
      year: master.year,
      mostRecentRelease: master.most_recent_release,
      mainRelease: master.main_release,
    };

    let request2 = await fetch(endpoints.versions(masterId), options);
    let versionsResponse = await request2.json();
    const { versions } = versionsResponse || {};

    console.log(endpoints.versions(masterId), versions);
    if (!!versions && versions.length > 0)
      return { ...info, versions: versions.map(parseVersion) };
    else return info;
  } catch (error) {
    throw error;
  }
};

exports.handler = async (event) => {
  if (event.httpMethod !== "GET")
    return { statusCode: 405, body: "Method Not Allowed" };

  const { masterId } = event.queryStringParameters;

  try {
    let release = await getMaster(masterId);
    return { statusCode: 200, body: JSON.stringify(release) };
  } catch (error) {
    console.log("getMaster error", error);
    return { statusCode: 404, body: "error getting master" };
  }
};
