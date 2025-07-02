const axios = require('axios')

const base64EncodingUrl = (trackUrl, trackName, artistName) => {
    const data = `__/:${trackUrl}:${trackName}:${artistName}`;
    const base64Encoded = Buffer.from(data).toString('base64');
    return base64Encoded
};

const headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://spotify-down.com/'
};

async function spotifydown(url) {
    if (!/open.spotify.com/.test(url)) return new Error("Input Url from Spotify !")
    const result = {
        status: false,
        success: 500,
        metadata: {},
        download: ''
    }
    return new Promise(async (resolve, reject) => {
        const config = {
            method: 'post',
            url: 'https://spotify-down.com/api/metadata',
            params: {
                link: url
            },
            ...headers
        };

        await axios(config).then(async (metadata) => {
            const base64EncodedT = await base64EncodingUrl(metadata.data.data.link, metadata.data.data.title, metadata.data.data.artists);

            result.status = true || false;
            result.success = 200 || 500;
            result.metadata = metadata.data.data || {};
            result.download = await axios.get('https://spotify-down.com/api/download', {
                params: {
                    link: metadata.data.data.link,
                    n: metadata.data.data.title,
                    a: metadata.data.data.artists,
                    t: base64EncodedT,
                },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36',
                    'Referer': 'https://spotify-down.com/',
                },
            }).then(a => a.data.data.link) || '';
        });

        resolve(result);
    }).catch((e) => {
        reject({
            msg: 'Error Gagal Di Download'
        })
    })
};

module.exports = function(app) {
  app.get('/download/spotify', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        res.status(400).json({
            status: false,
            creator: 'ikann',
            message: 'Invalid or missing Spotify URL'
        });
    }

    try {
        const response = await spotifydown(url);
        res.status(200).json({
            status: true,
            creator: 'ikann',
            result: response.download ? response : {}
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            creator: 'ikann',
            message: 'Server Error',
            error: error.message || error
        });
    }
});
}