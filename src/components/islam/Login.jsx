import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { authenticate } from '../services/authService';
import  authenticate  from "../../services/islamService"
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log(authService); // Vérifiez ce qui est importé
      console.log(typeof authService.authenticate); // Doit afficher "function"
      
      const data = await authService.authenticate(email, password);
      
      if (data.passwordChangeRequired) {
        navigate('/change-password', { 
          state: { 
            temporaryToken: data.temporaryToken,
            oldPassword: password
          } 
        });
      } else if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Échec de la connexion');
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;