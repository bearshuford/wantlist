import fetch from "node-fetch";
import cheerio from "cheerio";

const endpoints = {
  release: (releaseId, page) =>
    `https://www.discogs.com/release/recs/${releaseId}?type=release&page=${page}`,
  master: (masterId, page) =>
    `https://www.discogs.com/release/recs/${masterId}?type=master&page=${page}`,
};

const options = {
  headers: {
    accept: "application/json",
    "accept-encoding": "text/html",
    "content-type": "application/json",
    "user-agent": "NodeDiscogs/0.1",
  },
};

const parseAnchor = (anchor) => {
  return anchor.split("/release/").pop().split("?")[0];
};

const parseRec = (rec, $, usedRecs) => {
  const anchor = rec.find(".thumbnail_link").attr("href");
  const releaseId = parseAnchor(anchor);
  const title = rec.find("h4 a").text().toString();
  let artist = rec.find("h5 a");
  if (artist.length > 1)
    artist = artist.map((i, item) => $(item).text().toString()).get().join(", ");
  else artist = artist.text().toString();

  const thumbnail = rec.find(".thumbnail_center img").attr("src");
  return { releaseId, title, artist, thumbnail };
};

exports.handler = async (event) => {
  if (event.httpMethod !== "GET")
    return { statusCode: 405, body: "Method Not Allowed" };

  const { releaseId, masterId } = event.queryStringParameters;
  const id = !!releaseId ? releaseId : masterId;
  const endpoint = !!masterId
    ? (page) => endpoints.master(id, page)
    : (page) => endpoints.release(id, page);

  try {
    let fetches = [...Array(5)].map((_, i) =>
      fetch(endpoint(i + 1), options).then((res) => res.text())
    );
    const allRecs = await Promise.all(fetches);

    const $ = cheerio.load(allRecs.join(""), {
      normalizeWhitespace: true,
    });
    const recsArray = $(".card")
      .map((i, item) => parseRec($(item), $))
      .get();

    return { statusCode: 200, body: JSON.stringify(recsArray) };
  } catch (error) {
    console.log("error", error);
    return { statusCode: 404, body: "error getting wantlist" };
  }
};
