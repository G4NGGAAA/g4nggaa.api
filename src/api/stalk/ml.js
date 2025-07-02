const axios = require('axios')

async function mlstalk(id, zone) {
    try {
        const response = await axios.get(`https://api.vreden.my.id/api/mlstalk?id=${encodeURIComponent(id)}&zoneid=${encodeURIComponent(zone)}`)
            return response.data.result.data
     } catch (error) {
        console.error(error)
        throw new Error('Error wak')
    }
}

module.exports = function (app) {
  app.get('/stalk/ml', async (req, res) => {
        const { id, zone } = req.query;
    
    if (!id) {
      return res.status(400).json({ status: false, error: "Tolong masukkan id" });
    }
    if (!zone) {
      return res.status(400).json({ status: false, error: "Tolong masukkan zoneid" });
    }
    
    try {
      const response = await mlstalk(id, zone);
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
