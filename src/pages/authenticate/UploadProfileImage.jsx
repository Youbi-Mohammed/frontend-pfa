import React, { useState } from 'react';
import { uploadProfileImage } from '../../services/imageService';

const ProfileImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  // 🔧 À adapter selon ta logique d'authentification
  const userId = localStorage.getItem("userId"); // ID de l'utilisateur
    const token = localStorage.getItem("token"); // Token d'authentification

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Veuillez choisir une image.');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const result = await uploadProfileImage(userId, selectedFile,token);
      setMessage('Image téléchargée avec succès.');
      console.log('User mis à jour :', result);
    } catch (error) {
      setMessage('Erreur lors du téléchargement.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Uploader une image de profil</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <div>
          <p>Aperçu :</p>
          <img src={previewUrl} alt="Preview" width="150" />
        </div>
      )}
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Téléchargement...' : 'Uploader'}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default ProfileImageUploader;
