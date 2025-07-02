const axios = require('axios');
const typecard = ["visa", "americanexpress", "mastercard", "jcb"];

module.exports = function (app) {
  app.get('/tools/vccgen', async (req, res) => {
    let { type, count = "5" } = req.query;

    if (!typecard.includes(type)) {
      return res.status(400).json({
        status: false,
        message: "Type is invalid!",
        available_types: typecard
      });
    }

    let typeds;
    switch (type) {
      case 'visa': typeds = "Visa"; break;
      case 'mastercard': typeds = "Mastercard"; break;
      case 'americanexpress': typeds = "American%20Express"; break;
      case 'jcb': typeds = "JCB"; break;
      default: return res.status(400).json({ status: false, message: "Invalid card type" });
    }

    try {
      const response = await axios.get('https://backend.lambdatest.com/api/dev-tools/credit-card-generator', {
        params: { type: typeds, 'no-of-cards': count }
      });

      res.json({
        status: true,
        creator: 'ikann',
        count: count,
        result: response.data
      });

    } catch (err) {
      res.status(500).json({
        status: false,
        message: "Error fetching data",
        error: err.message
      });
    }
  });
};