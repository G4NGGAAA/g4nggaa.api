const axios = require('axios')

async function capcut(url) {
    try {
        const response = await axios.get(`https://api.vreden.my.id/api/capcutdl?url=${encodeURIComponent(url)}`)
            return response.data.result
     } catch (error) {
        console.error(error)
        throw new Error('Error wak')
    }
}

module.exports = function (app) {
  app.get('/download/capcut', async (req, res) => {
      const { url } = req.query
      
      if (!url) {
          return res.status(400).json({
              status: false, error: "tolong tambahkan url capcut" 
          });
      }
      
      try {
      const response = await capcut(url);
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