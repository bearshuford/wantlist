import fetch from "node-fetch";
import cheerio from "cheerio";

const endpoints = {
  release: (releaseId) => `https://www.discogs.com/release/${releaseId}`,
  master: (masterId) => `https://www.discogs.com/master/view/${masterId}`,
};

const options = {
  headers: {
    accept: "application/json",
    "accept-encoding": "text/html",
    "content-type": "application/json",
    "user-agent": "NodeDiscogs/0.1",
  },
};

exports.handler = async (event) => {
  if (event.httpMethod !== "GET")
    return { statusCode: 405, body: "Method Not Allowed" };

  const { releaseId, masterId } = event.queryStringParameters;

  const id = !!releaseId ? releaseId : masterId;
  const endpoint = !!masterId ? endpoints.master(id) : endpoints.release(id);

  try {
    let response = await fetch(endpoint, options);
    let res = await response.text();
    const $ = cheerio.load(res);
    
    let recommendations = $("#recs_slider").html().toString();
    recommendations = recommendations
      .replace("<!--lazy", "")
      .replace("lazy-->", "");
    const rec$ = cheerio.load(recommendations, {
      normalizeWhitespace: true,
    });
    const recs = rec$(".card");

    const recsArray = recs
      .map((i, item) => {
        const rec = $(item);
        const anchor = rec.find(".thumbnail_link").attr("href");
        const title = rec.find("h4 a").text().toString();
        const artist = rec.find("h5 a").text().toString();
        const thumbnail = rec.find(".thumbnail_center img").attr("src");
        return { anchor, title, artist, thumbnail };
      })
      .get();
    return { statusCode: 200, body: JSON.stringify(recsArray) };
  } catch (error) {
    console.log("error", error);
    return { statusCode: 404, body: "error getting wantlist" };
  }
};
