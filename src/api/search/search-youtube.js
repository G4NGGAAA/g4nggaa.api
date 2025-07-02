module.exports = function(app) {
    const yts = require('yt-search');
    app.get('/search/youtube', async (req, res) => {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ status: false, error: 'Query is required' });
        }
        try {
            const ytResults = await yts.search(q);
            const ytTracks = ytResults.videos.map(video => ({
                title: video.title,
                author: video.author.name,
                authorUrl: video.author.url, 
                duration: video.duration.timestamp,
                thumbnail: video.thumbnail,
                url: video.url, 
                description: video.description, 
                ago: video.ago, 
                view: video.views
            }));
            res.status(200).json({
                status: true,
                result: ytTracks
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
}