const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessions');
const emargementRoutes = require('./routes/emargement');

app.use('/auth', authRoutes);
app.use('/sessions', sessionRoutes);
app.use('/emargement', emargementRoutes);
