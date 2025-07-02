const axios = require('axios')

async function ssweb(link) {
   let { data } = await axios.get(`https://api.pikwy.com/?tkn=125&d=3000&u=${link}&fs=0&w=1280&h=1200&s=100&z=100&f=jpg&rt=jweb`)
   return data
}

module.exports = function (app) {
  app.get('/tools/ssweb', async (req, res) => {

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ status: false, error: "Query parameter 'url' is required" });
  }
  try {
    const response = await ssweb(url);
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