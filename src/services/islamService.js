// services/authService.js
const API_URL = 'http://localhost:8080/api/auth';

// Export bien configuré
const authenticate = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Échec de la connexion');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

// Export par défaut si nécessaire
// export default {authenticate};
 const changeInitialPassword = async (temporaryToken, oldPassword, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/change-initial-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ temporaryToken, oldPassword, newPassword }),
    });

    if (!response.ok) {
      throw new Error('Password change failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Password change error:', error);
    throw error;
  }
};

export default {authenticate,changeInitialPassword};