const fetch = require('node-fetch')

async function brat(q) {
let res = await fetch(`https://brat.caliphdev.com/api/brat?text=${q}`)
  let buffer = await res.buffer()
return buffer
}

 module.exports = function(app) {
   app.get('/tools/brat', async (req, res) => {
       const { text } = req.query
       
       if (!text) {
      return res.status(400).json({ status: false, error: "Tolong masukkan text nya" });
    }
    
        try {
            const anuge = await brat(text);
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': anuge.length,
            });
            res.end(anuge);
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    });
 }