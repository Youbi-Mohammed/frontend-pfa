import React, { useState } from 'react';

const ChangeInitialPassword = () => {
  const [temporaryToken, setTemporaryToken] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch("http://localhost:8080/api/auth/change-initial-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          temporaryToken,
          oldPassword,
          newPassword
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erreur lors du changement de mot de passe.");
      }

      const result = await response.text(); // car le back renvoie une string
      setMessage(`✅ Succès : ${result}`);
    } catch (err) {
      setMessage(`❌ Erreur : ${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Test - Changer le mot de passe initial</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Token temporaire :</label>
          <input
            type="text"
            value={temporaryToken}
            onChange={(e) => setTemporaryToken(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label>Ancien mot de passe :</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label>Nouveau mot de passe :</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Changer le mot de passe</button>
      </form>

      {message && (
        <div style={{ marginTop: '20px', color: message.startsWith('✅') ? 'green' : 'red' }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ChangeInitialPassword;
