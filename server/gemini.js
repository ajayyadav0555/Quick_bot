// require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const GEMINI_API_URL = process.env.API_URL;
const GEMINI_API_KEY = process.env.API_KEY

app.post('/api/generate-response', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: query }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error from Gemini API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error generating response' });
  }
});

app.listen(5000, () => {
  console.log('Backend server is running on port 5000');
});
