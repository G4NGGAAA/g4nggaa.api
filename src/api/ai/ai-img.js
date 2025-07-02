const axios = require('axios');

module.exports = function (app) {
  app.get('/ai/ai-img', async (req, res) => {
    const { prompt } = req.query;
    if (!prompt) return res.status(400).json({ status: false, error: 'Prompt wajib diisi.' });

    try {
      const imageRes = await axios.get('https://fastrestapis.fasturl.cloud/aiimage/flux/schnell', {
        params: { prompt, size: '1_1_HD' },
        responseType: 'arraybuffer'
      });

      res.setHeader('Content-Type', 'image/png');
      res.send(imageRes.data);
    } catch (err) {
      res.status(500).json({ status: false, error: 'Gagal mengambil gambar dari API.' });
    }
  });
};