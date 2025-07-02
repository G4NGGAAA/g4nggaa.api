const axios = require("axios");
const cheerio = require("cheerio");

async function animeUpdate() {
  try {
    const url = `https://animexin.dev/`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const update = [];
    $('article.bs.styleegg').each((i, el) => {
    const title = $(el).find("div.eggtitle").text().trim();
    const link = $(el).find("a.tip").attr("href");
    const image = $(el).find('img[itemprop="image"]').attr('src');
    const episode = $(el).find('.eggepisode').text();
    const type = $(el).find('.eggtype').text();
       update.push({
         title,
         link,
         image,
         episode,
         type
       });
    });
    
  return update
  } catch (err) {
    console.log(err)
  }
}

module.exports = function (app) {
  app.get('/random/animexin', async (req, res) => {

    try {
      const response = await animeUpdate();
      res.status(200).json({
        status: true,
        creator: 'ikann',
        result: response.result || response
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
}