const axios = require('axios');

module.exports = function(app) {
  async function createPayment(amount, codeqr) {
    const apiUrl = "https://linecloud.my.id/api/orkut/createpayment";
    const apikey = "Line";

    try {
      const response = await axios.get(apiUrl, {
        params: {
          apikey: apikey,
          amount: amount,
          codeqr: codeqr
        }
      });

      return response.data;
    } catch (error) {
      console.error("Error creating payment:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data || error.message
      };
    }
  }

  app.get('/orkut/create', async (req, res) => {
    const { amount, codeqr } = req.query;

    if (!amount) {
      return res.status(400).json({ status: false, error: "Tolong masukkan harganya" });
    }
    if (!codeqr) {
      return res.status(400).json({ status: false, error: "Tolong masukkan codeqr" });
    }

    try {
      const response = await createPayment(amount, codeqr);
      res.status(200).json({
        status: true,
        creator: 'ikann',
        result: response.result || response
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
};
