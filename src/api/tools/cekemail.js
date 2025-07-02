const { checkEmail } = require('@ikanngeming/blubub');

module.exports = function (app) {
  app.get('/tools/checkemail', async (req, res) => {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({
        status: false,
        error: 'Masukkan emailnyoo'
      });
    }
    
    try {
      const anuzz = await checkEmail(email);
      return res.json({
        status: true,
        result: anuzz
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        error: err?.response?.data?.error || err.message || 'Terjadi kesalahan saat memproses permintaan'
      });
    }
  });
};
