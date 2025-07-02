const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data');
const { Buffer } = require('buffer');

async function remini(urlPath, method = 'enhance') {
    const Methods = ["enhance", "recolor", "dehaze"];
    method = Methods.includes(method) ? method : Methods[0];
    
    const scheme = `https://inferenceengine.vyro.ai/${method}`;
    const form = new FormData();
    
    try {
        // First, fetch the image if it's a URL
        let imageBuffer;
        if (urlPath.startsWith('http')) {
            const response = await axios.get(urlPath, { responseType: 'arraybuffer' });
            imageBuffer = response.data;
        } else {
            // Assume it's already a buffer or base64 string
            imageBuffer = Buffer.from(urlPath, urlPath.startsWith('/9j/') ? 'base64' : 'binary');
        }

        form.append("model_version", 1);
        form.append("image", imageBuffer, {
            filename: "enhance_image_body.jpg",
            contentType: "image/jpeg"
        });

        const headers = {
            ...form.getHeaders(),
            "User-Agent": "okhttp/4.9.3",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip"
        };

        const response = await axios.post(scheme, form, {
            headers,
            responseType: 'arraybuffer'
        });

        return Buffer.from(response.data, 'binary');
    } catch (error) {
        console.error('Error in remini function:', error);
        throw new Error('Failed to process image');
    }
}

module.exports = function (app) {
    app.get('/tools/remini', async (req, res) => {
        const { url, method = 'enhance' } = req.query;

        if (!url) {
            return res.status(400).json({ 
                status: false, 
                error: "Query parameter 'url' is required" 
            });
        }

        try {
            const result = await remini(url, method);
            res.writeHead(200, {
                'Content-Type': 'image/jpeg',
                'Content-Length': result.length,
            });
            res.end(result);
        } catch (error) {
            console.error('Error in /tools/remini endpoint:', error);
            res.status(500).json({ 
                status: false, 
                error: error.message || 'Internal server error' 
            });
        }
    });
};