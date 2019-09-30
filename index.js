const express = require('express');
const imageRouter = require('./image/router')
const bodyParseer = require('body-parser');
const cors = require('cors')

const app = express();

const port = process.env.PORT || 4000;

app.use(bodyParseer.json())
app.use(cors());
app.use(imageRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));