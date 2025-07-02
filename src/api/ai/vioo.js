const axios  = require('axios')

function viooai(content, user, prompt, imageBuffer) {
    return new Promise(async (resolve, reject) => {
      const payload = {
        content,
        user,
        prompt
      }
      if (imageBuffer) {
        payload.imageBuffer = Array.from(imageBuffer)
      }
      try {
        const response = await axios.post('https://luminai.my.id/', payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        resolve(response.data.result)
      } catch (error) {
        reject(error.response ? error.response.data : error.message)
      }
    })
  }
  
module.exports = function(app) {
  app.get('/ai/viooai', async (req, res) => {
    const { text } = req.query;

    if (!text) {
      return res.status(400).json({ status: false, error: "Tolong masukkan prompt" });
    }

    try {
      const response = await viooai(text);
      res.status(200).json({
        status: true,
        creator: 'g4nggaa',
        result: response.result || response
      });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  });
}