function toGhRaw(url) {
  const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob', '');
  return rawUrl;
}

module.exports = function (app) {
  app.get('/tools/toraw', async (req, res) => {

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ status: false, error: "Query parameter 'url' is required" });
  }
  try {
    const response = await toGhRaw(url);
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