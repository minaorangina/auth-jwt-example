const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('express-formidable');
const router = require('./router');

const app = express();
const port = process.env.PORT || 3004;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(formidable());

router(app);

app.listen(port, () => console.info(`🌍 Server is listening on ${port}`));
