const axios = require('axios');

module.exports = function(app) {
  app.get('/stalk/genshin', async (req, res) => {
    try {
      const { uid } = req.query;

      // Validasi parameter UID
      if (!uid) {
        return res.status(400).json({ 
          status: false, 
          error: 'Parameter "uid" diperlukan' 
        });
      }

      // Validasi format UID (contoh: minimal 6 digit angka)
      if (!/^\d{6,}$/.test(uid)) {
        return res.status(400).json({ 
          status: false, 
          error: 'UID harus berupa angka minimal 6 digit' 
        });
      }

      // Request ke API eksternal
      const apiUrl = `https://api.siputzx.my.id/api/check/genshin?uid=${encodeURIComponent(uid)}`;
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
          uid: response.data.data.uid || uid,
          nickname: response.data.data.nickname || 'Unknown',
          level: response.data.data.level || 0,
          signature: response.data.data.signature || '',
          world_level: response.data.data.world_level || 0,
          achievements: response.data.data.achievements || 0,
          characters: response.data.data.characters || [],
          spiral_abyss: response.data.data.spiral_abyss || '',
          last_online: response.data.data.last_online || 'Unknown',
          profile_picture: response.data.data.profile_picture || null
        }
      });

    } catch (error) {
      console.error('Error checking Genshin Impact account:', error);
      
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