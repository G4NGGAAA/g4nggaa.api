const { pastebin } = require('@ikanngeming/blubub');

module.exports = function (app) {
  app.get('/download/pastebin', async (req, res) => {
    const { url } = req.query;
    
    if (!url) {
      return res.status(400).json({
        status: false,
        error: 'Masukkan url pastebinnya'
      });
    }
    
    try {
      const hasil = await pastebin(url);
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