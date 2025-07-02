const axios = require('axios');

async function getFreeFireProfile(userId) {
  try {
    const response = await axios.post(
      "https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store",
      new URLSearchParams({
        productId: "3",
        itemId: "353",
        catalogId: "376",
        paymentId: "1252",
        gameId: userId,
        product_ref: "CMS",
        product_ref_denom: "REG"
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: "https://www.duniagames.co.id/",
          Accept: "application/json"
        }
      }
    );

    const nickname = response.data?.data?.gameDetail?.userName;

    if (!nickname) throw new Error("Nickname tidak ditemukan");

    return {
      status: true,
      userId,
      nickname
    };
  } catch (error) {
    return {
      status: false,
      message: "User ID tidak ditemukan"
    };
  }
}

module.exports = function(app) {
  app.get('/stalk/epep', async (req, res) => {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ status: false, message: "Parameter 'id' tidak ditemukan" });
    }

    const result = await getFreeFireProfile(id);
    res.status(200).json({
      status: true,
      creator: 'ikann',
      result
    });
  });
};