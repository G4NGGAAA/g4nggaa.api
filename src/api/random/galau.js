const axios = require('axios');

module.exports = function (app) {
  app.get('/search/xnxx', async (req, res) => {
    try {
      // Ambil data dari API
      const api = await axios.get('https://api.vreden.my.id/api/galau');
      const videoUrl = api.data.result;

      if (!videoUrl) {
        return res.status(500).json({ status: false, error: 'No video URL found.' });
      }

      // Download video sebagai buffer
      const videoResponse = await axios.get(videoUrl, {
        responseType: 'arraybuffer'
      });

      const buffer = Buffer.from(videoResponse.data);

      res.writeHead(200, {
        'Content-Type': 'video/mp4',
        'Content-Length': buffer.length,
      });

      res.end(buffer);

    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
