const express = require('express');
const pool = require('../db');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/:id/emargement', authenticateToken, async (req, res) => {
    if (req.user.role !== 'etudiant') {
        return res.status(403).json({ error: 'Accès interdit' });
    }

    const sessionId = req.params.id;
    try {
        await pool.query(
            'INSERT INTO emargement (session_id, etudiant_id, status) VALUES (?, ?, ?)',
            [sessionId, req.user.id, true]
        );
        res.status(201).json({ message: 'Émargement réussi' });
    } catch (err) {
        console.error('Erreur lors de l\'émargement:', err);
        res.status(500).json({ error: 'Erreur lors de l\'émargement' });
    }
});

router.get('/:id/emargement', authenticateToken, async (req, res) => {
    if (req.user.role !== 'formateur') {
        return res.status(403).json({ error: 'Accès interdit' });
    }

    const sessionId = req.params.id;
    try {
        const [rows] = await pool.query(
            'SELECT utilisateurs.name, emargement.status FROM emargement JOIN utilisateurs ON emargement.etudiant_id = utilisateurs.id WHERE emargement.session_id = ?',
            [sessionId]
        );
        res.status(200).json(rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des émargements:', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des émargements' });
    }
});

module.exports = router;
