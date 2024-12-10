API d'Émargement
Cette API permet de gérer une plateforme d'émargement pour des formations, incluant :

Gestion des utilisateurs (formateurs et étudiants)
Création, modification et suppression des sessions de cours
Émargement des étudiants à des sessions

Fonctionnalités
1. Authentification (/auth)
Inscription (POST /auth/signup)

Crée un utilisateur formateur ou étudiant
Exp : 
{
  "name": "Paul ROber",
  "email": "paulrobert@example.com",
  "password": "password123",
  "role": "etudiant"
}

Connexion (POST /auth/login)

Connecte un utilisateur et génère un token JWT
Exp :
{
  "email": "paulrobert@example.com",
  "password": "password123"
}

Gestion des sessions (/sessions)
Créer une session (POST /sessions)

Headers : 
Key : Authorization 
Value : <token obtenu après le login>
