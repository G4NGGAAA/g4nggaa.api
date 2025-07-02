const axios = require('axios')

async function tinyurl(url) {
    let data = JSON.stringify({
        "url": url,
        "domain": "tinyurl.com"
    });

    const res = await axios.post('https://api.tinyurl.com/create?api_token=jvnZM70elj8JJLWQBBP3cjMwG99jph4xymzyzurjlsixYA8QqQqF9quZvRhT', data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cookie': 'XSRF-TOKEN=eyJpdiI6IlZZS0JGK3NFNFFhZVY2V1NkSWNCMkE9PSIsInZhbHVlIjoiY0t0eVdpaGhuTVcwaVdPalFqSjlGam10THlsa0JadTJ3Wno2cGs1SmRWQTl5bmxlYmxBaU5zc2tCMEZ6R2E1am5NdnRRL0czNTZ2YUtpaXBhSzJpakV5bmxHU3Q2SjV2aTVNMG8zRU10UjNwS2NPTUFuTkYwYXAzOGpXRjRzamwiLCJtYWMiOiJjNGUyMWRlYTVlNGU4OTlmYWFjYWEwYzIyZmQ3MzU5NjY4YTFmMzkyNTdlOTI3OWU1MTUzZDhhMGI5MWYyYjVlIiwidGFnIjoiIn0%3D; tinyurl_session=eyJpdiI6ImJsZVYvYzd2SWhxdnM5K3V5TmRzMUE9PSIsInZhbHVlIjoidkIzMUhrQlNrcG1LZVJzWlJ5MzF2RTZ1ekxWRndwdEcybVhjMTZQR0h3d3BJYWFTb3AzVHlTNW5YaXNicGdsZG1GYWd0aWdnQ01FOTBQUUhtVjlCZFRjaVh5TVBtVWxLTTZ4Q3U4dDhOVjgzdWI3RDZnUVErb2FLMS81YnpncEoiLCJtYWMiOiJhMzZlYjkyM2Q0OWMyZTc1NDc2OWYxNjUwYWJhMWNhYzE5NjBlNGFlMDJiZjc3NGZlZGUyOWZjOWVkZjM2NGQ5IiwidGFnIjoiIn0%3D; __cf_bm=TioWwSmmrBbyealUDYdksJf3jLYCPHZWdbZChYj.pN8-1742475180-1.0.1.1-9v8G0t3oJ3RUTgL7KutU3y4XTCOBa_2kDn6h33pBlh5MII31P2YjuvE5nKzrULHwaxSQ.bW8OWHxeqZSk4zDNcWbZBGUQAkzfovo39_X1WU'
        },
    });

    return res.data.data
}

module.exports = function (app) {
  app.get('/tools/tinyurl', async (req, res) => {

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ status: false, error: "Query parameter 'url' is required" });
  }
  try {
    const response = await tinyurl(url);
    res.status(200).json({
      status: true,
      creator: 'ikann',
      result: response
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});
}