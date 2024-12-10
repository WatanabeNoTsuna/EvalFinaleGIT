const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'emargement',
    port: 3306
});

async function testConnection() {
    try {
        const [rows] = await pool.query('SHOW TABLES');
        console.log('Tables in the database:', rows);
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

// Appeler le test
testConnection();

module.exports = pool;
