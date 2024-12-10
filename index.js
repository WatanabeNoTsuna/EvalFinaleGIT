const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessions');
const emargementRoutes = require('./routes/emargement');

// Routes
app.use('/auth', authRoutes);
app.use('/sessions', sessionRoutes);
app.use('/emargement', emargementRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API d\'émargement !');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
