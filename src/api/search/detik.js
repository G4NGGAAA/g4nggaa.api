const axios = require("axios");
const cheerio = require("cheerio");

async function detik(q) {
  try {
    const url = `https://www.detik.com/search/searchall?query=${q}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const detikNews = [];

    $("article.list-content__item").each((_, el) => {
      const title = $(el).find("a.media__link").text().trim();
      const subtitle = $(el).find("h2.media__subtitle").text().trim();
      const date = $(el).find("span").text().trim();
      const link = $(el).find("a.media__link").attr("href");
      const image = ($(el).find("img").attr("src") || "");
       detikNews.push({ title, subtitle, date, link, image });
    });

    //console.log(detikNews)
return detikNews
  } catch (err) {
    return { error: "Capek gw cok", detail: err.message };
  }
}

module.exports = function (app) {
  app.get('/search/detik', async (req, res) => {

  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ status: false, error: "Query parameter 'q' is required" });
  }

  try {
    const response = await detik(q);
    res.status(200).json({
      status: true,
      creator: 'ikann',
      result: response
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});
}