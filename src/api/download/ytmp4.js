const axios = require('axios');

module.exports = function (app) {
  app.get('/download/ytmp4', async (req, res) => {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        error: 'Parameter "url" tidak ditemukan'
      });
    }

    try {
      const response = await axios.get('https://api.vreden.my.id/api/ytmp4', {
        params: { url }
      });

      const data = response.data;

      if (
        !data?.result?.status ||
        !data.result.download?.url ||
        !data.result.metadata
      ) {
        return res.status(502).json({
          status: false,
          error: 'Data dari API tidak valid atau tidak lengkap'
        });
      }

      return res.json({
        status: true,
        creator: 'ikann',
        result: {
          title: data.result.metadata.title,
          video_url: data.result.metadata.url,
          thumbnail: data.result.metadata.thumbnail,
          duration: data.result.metadata.duration.timestamp,
          author: data.result.metadata.author?.name || 'Tidak diketahui',
          download_url: data.result.download.url,
          quality: data.result.download.quality,
          available_quality: data.result.download.availableQuality,
          filename: data.result.download.filename
        }
      });

    } catch (err) {
      return res.status(500).json({
        status: false,
        error: err?.response?.data?.error || err.message || 'Terjadi kesalahan saat memproses permintaan'
      });
    }
  });
};
