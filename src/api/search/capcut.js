const axios = require('axios');

module.exports = function (app) {
  app.get('/search/capcut', async (req, res) => {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ status: false, error: "Query parameter 'q' is required" });
    }

    const capcut = async (query) => {
      const response = await axios.get(`https://api.vreden.my.id/api/search/capcut?query=${encodeURIComponent(query)}`);
      return response.data;
    };

    try {
      const data = await capcut(q);
      res.status(200).json({
        status: true,
        creator: 'ikann',
        result: data.result || data
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
