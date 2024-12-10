const express = require('express');
const pool = require('../db');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

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
        console.error('Erreur lors de la création de la session:', err);
        res.status(500).json({ error: 'Erreur lors de la création de la session' });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM sessions');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Erreur lors de la récupération des sessions:', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des sessions' });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    const sessionId = req.params.id;
    try {
        const [rows] = await pool.query('SELECT * FROM sessions WHERE id = ?', [sessionId]);
        if (rows.length === 0) return res.status(404).json({ error: 'Session introuvable' });
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error('Erreur lors de la récupération de la session:', err);
        res.status(500).json({ error: 'Erreur lors de la récupération de la session' });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'formateur') {
        return res.status(403).json({ error: 'Accès interdit' });
    }

    const sessionId = req.params.id;
    const { title, date } = req.body;
    try {
        await pool.query('UPDATE sessions SET title = ?, date = ? WHERE id = ?', [title, date, sessionId]);
        res.status(200).json({ message: 'Session mise à jour avec succès' });
    } catch (err) {
        console.error('Erreur lors de la mise à jour de la session:', err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la session' });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'formateur') {
        return res.status(403).json({ error: 'Accès interdit' });
    }

    const sessionId = req.params.id;
    try {
        await pool.query('DELETE FROM sessions WHERE id = ?', [sessionId]);
        res.status(200).json({ message: 'Session supprimée avec succès' });
    } catch (err) {
        console.error('Erreur lors de la suppression de la session:', err);
        res.status(500).json({ error: 'Erreur lors de la suppression de la session' });
    }
});

module.exports = router;
