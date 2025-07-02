const axios = require('axios')

async function npm(name) {
    try {
        const response = await axios.get(`https://registry.npmjs.org/${encodeURIComponent(name)}`)
            return response.data
     } catch (error) {
        console.error(error)
        throw new Error('Error wak')
    }
}

module.exports = function (app) {
  app.get('/stalk/npm', async (req, res) => {
        const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({ status: false, error: "Tolong masukkan nama package npm nya" });
    }
    
    try {
      const response = await npm(name);
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