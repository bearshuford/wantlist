import fetch from "node-fetch";
import cheerio from "cheerio";

import { endpoints } from "./utils";

const PAGES_DEFAULT = 2;
const OFFSET_DEFAULT = 0;

const options = {
  headers: {
    accept: "application/json",
    "accept-encoding": "text/html",
    "content-type": "application/json",
    "user-agent": "Wantlist/0.1",
  },
};


const parseAnchor = (anchor) => {
  return anchor.split("/release/").pop().split("?")[0];
};

const parseRec = (rec, $, usedRecs) => {
  const anchor = rec.find(".thumbnail_link").attr("href");
  const releaseId = parseAnchor(anchor);

  // check for duplication
  if (usedRecs.includes(releaseId)) return null;
  else usedRecs.push(releaseId);

  const title = rec.find("h4 a").text().toString();
  const thumbnail = rec.find(".thumbnail_center img").attr("src");

  let artists = rec.find("h5 a");
  const artist =
    artists.length < 2
      ? artists.text().toString()
      : artists
          .map((i, item) => $(item).text().toString())
          .get()
          .join(", ");

  return { releaseId, title, artist, thumbnail };
};

exports.handler = async (event) => {
  if (event.httpMethod !== "GET")
    return { statusCode: 405, body: "Method Not Allowed" };

  const {
    releaseId,
    masterId,
    pages,
    offset,
  } = event.queryStringParameters;
  const id = !!releaseId ? releaseId : masterId;

  const endpoint = !!masterId
    ? (page) => endpoints.scrapeMaster(id, page)
    : (page) => endpoints.scrapeRelease(id, page);

  let pageCount = pages || PAGES_DEFAULT;
  let current = (offset || OFFSET_DEFAULT) * pageCount;

  try {
    const fetches = [...Array(pageCount)].map((_, i) =>
      fetch(endpoint(i + current + 1), options).then((res) => res.text())
    );
    const allRecs = await Promise.all(fetches);
    const $ = cheerio.load(allRecs.join(""), {
      normalizeWhitespace: true,
    });

    const idList = [];
    const recsArray = $(".card")
      .map((i, item) => parseRec($(item), $, idList))
      .get();

    return { statusCode: 200, body: JSON.stringify(recsArray) };
  } catch (error) {
    console.log("error", error);
    return { statusCode: 404, body: "error getting wantlist" };
  }
};
