const axios = require('axios');
module.exports = function(app) {
  async function cekStatus(merchant, keyorkut) {
    const apiUrl = "https://linecloud.my.id/api/orkut/cekstatus";
    const apikey = "Line";

    try {
        const response = await fetch(`${apiUrl}?apikey=${apikey}&merchant=${merchant}&keyorkut=${keyorkut}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error creating payment:", error);
        return { success: false, message: error.message };
    }
}

  app.get('/orkut/cekstatus', async (req, res) => {
  const { merchant, keyorkut } = req.query;
  if (!merchant) {
    return res.status(400).json({ status: false, error: "Tolong masukkan merchant" });
  }
  if (!keyorkut) {
    return res.status(400).json({ status: false, error: "Tolong masukkan keyorkut" });
  }

  try {
    const response = await cekStatus(merchant, keyorkut);    
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