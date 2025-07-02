const axios = require('axios')

async function mediafire(url) {
    try {
        const response = await axios.get(`https://vapis.my.id/api/mfdl?url=${encodeURIComponent(url)}`)
            return response.data.data.result
     } catch (error) {
        console.error(error)
        throw new Error('Error wak')
    }
}

module.exports = function (app) {
  app.get('/download/mediafire', async (req, res) => {

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ status: false, error: "Query parameter 'url' is required" });
  }
  try {
    const response = await mediafire(url);
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