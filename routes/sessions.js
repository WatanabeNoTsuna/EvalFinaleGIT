const express = require('express');
const pool = require('../db'); // Connexion à la base de données
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Route pour créer une session
router.post('/', authenticateToken, async (req, res) => {
    if (req.user.role !== 'formateur') {
        return res.status(403).json({ error: 'Accès interdit' });
    }

    const { title, date } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO sessions (title, date, formateur_id) VALUES (?, ?, ?)',
            [title, date, req.user.id]
        );
        res.status(201).json({ id: result.insertId, title, date });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la création de la session' });
    }
});

module.exports = router;
