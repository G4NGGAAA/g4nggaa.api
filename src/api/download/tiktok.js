const axios = require('axios');

module.exports = function(app) {
  app.get('/download/tiktok', async (req, res) => {
    try {
      const { url } = req.query;

      // Validasi parameter URL
      if (!url) {
        return res.status(400).json({ 
          status: false, 
          error: 'Parameter "url" diperlukan' 
        });
      }

      // Validasi format URL TikTok
      if (!url.includes('tiktok.com')) {
        return res.status(400).json({ 
          status: false, 
          error: 'URL harus berupa link TikTok yang valid' 
        });
      }

      // Request ke API eksternal
      const apiUrl = `https://api.siputzx.my.id/api/tiktok/v2?url=${encodeURIComponent(url)}`;
      const response = await axios.get(apiUrl, {
        timeout: 10000 // Timeout 10 detik
      });

      // Validasi response API
      if (!response.data || !response.data.status || !response.data.data) {
        return res.status(502).json({ 
          status: false, 
          error: 'Respon tidak valid dari API eksternal' 
        });
      }

      // Format response sukses
      return res.json({
        status: true,
        creator: 'ikann',
        result: {
          title: response.data.data.title || 'No title',
          download_url: response.data.data.dl,
          duration: response.data.data.duration || null,
          thumbnail: response.data.data.cover || null
        }
      });

    } catch (error) {
      console.error('Error downloading TikTok:', error);
      
      // Handle error khusus
      if (error.code === 'ECONNABORTED') {
        return res.status(504).json({ 
          status: false, 
          error: 'Timeout saat menghubungi server' 
        });
      }
      
      if (!error.response) {
        return res.status(500).json({ 
          status: false, 
          error: 'Terjadi kesalahan internal server' 
        });
      }

      // Forward error dari API eksternal jika ada
      const errorMessage = error.response.data.error || error.message;
      return res.status(error.response.status || 500).json({ 
        status: false, 
        error: errorMessage 
      });
    }
  });
};