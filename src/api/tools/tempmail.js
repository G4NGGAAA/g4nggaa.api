const { createEmail } = require('@ikanngeming/blubub');

module.exports = function (app) {
  app.get('/tools/createemail', async (req, res) => {
    try {
      const email = await createEmail();
      return res.json({
        status: true,
        result: email
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        error: err?.response?.data?.error || err.message || 'Terjadi kesalahan saat memproses permintaan'
      });
    }
  });
};
