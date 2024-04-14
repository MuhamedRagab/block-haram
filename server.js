const isPorn = require('is-porn');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json()).use(cors());

app.post('/is-haram', (req, res) => {
  const domain = req.body?.domain;

  if (!domain) {
    res.status(400).json({ error: 'Domain is required' });
  }

  try {
    isPorn(domain, (err, status) => {
      if (err) {
        res.status(500).json({ error: err });
      }

      res.send({ status });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
