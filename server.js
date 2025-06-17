require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const APPSCRIPT_URL = process.env.APPSCRIPT_URL;

// 🔹 GET
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get(APPSCRIPT_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data', detail: error.message });
  }
});

// 🔹 POST
app.post('/api/data', async (req, res) => {
  try {
    const response = await axios.post(APPSCRIPT_URL, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengirim data', detail: error.message });
  }
});

// 🔹 PUT
app.put('/api/data/:no', async (req, res) => {
  try {
    const payload = { ...req.body, no: req.params.no, methodOverride: 'PUT' };
    const response = await axios.post(APPSCRIPT_URL, payload);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal update data', detail: error.message });
  }
});

// 🔹 DELETE
app.delete('/api/data/:no', async (req, res) => {
  try {
    const payload = { no: req.params.no, methodOverride: 'DELETE' };
    const response = await axios.post(APPSCRIPT_URL, payload);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal hapus data', detail: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
