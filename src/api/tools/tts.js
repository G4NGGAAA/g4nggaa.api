const { tts } = require('@ikanngeming/blubub');

module.exports = function (app) {
  app.get('/tools/tts', async (req, res) => {
    const { text } = req.query;
    
    if (!text) {
      return res.status(400).json({
        status: false,
        error: 'Masukkan textnyooo'
      });
    }
    
    try {
      const hasil = await tts(text);
      return res.json({
        status: true,
        result: hasil
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        error: err?.response?.data?.error || err.message || 'Terjadi kesalahan saat memproses permintaan'
      });
    }
  });
};