function toGhOri(rawUrl) {
  const originalUrl = rawUrl
    .replace('raw.githubusercontent.com', 'github.com')
    .replace('/master', '/blob/master')
    .replace('/main', '/blob/main');
  return originalUrl;
}

module.exports = function (app) {
  app.get('/tools/toori', async (req, res) => {

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ status: false, error: "Query parameter 'url' is required" });
  }
  try {
    const response = await toGhOri(url);
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