const express = require('express');
const pool = require('../db'); // Connexion à la base de données
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Route pour émarger une session
router.post('/:id/emargement', authenticateToken, async (req, res) => {
    if (req.user.role !== 'etudiant') {
        return res.status(403).json({ error: 'Accès interdit' });
    }

    const sessionId = req.params.id;
    try {
        const [result] = await pool.query(
            'INSERT INTO emargement (session_id, etudiant_id, status) VALUES (?, ?, ?)',
            [sessionId, req.user.id, true]
        );
        res.status(201).json({ message: 'Émargement réussi' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de l\'émargement' });
    }
});

module.exports = router;
