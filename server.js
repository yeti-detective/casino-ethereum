const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

app.get('/abi', (req, res) => {
  res.json(JSON.parse(fs.readFileSync(path.join(__dirname, 'build', 'contracts', 'Casino.json'))).abi);
})

app.get('/:resource', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', req.params.resource));
})

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
})
