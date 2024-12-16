const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Gunakan PORT dari lingkungan

// Aktifkan CORS
app.use(cors());

// Endpoint proxy untuk SerpAPI
app.get('/proxy/serpapi', async (req, res) => {
    const query = req.query.q; // Ambil parameter query
    const apiKey = '90585ca6160eb6ce5bae4a0be6f0bc7bd9e50db3e4087c5d754308cd91121f40';
    const serpApiUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&hl=id&gl=id&api_key=${apiKey}`;

    try {
        const response = await axios.get(serpApiUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from SerpAPI:', error.message);
        res.status(500).json({ error: 'Error fetching data from SerpAPI' });
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});