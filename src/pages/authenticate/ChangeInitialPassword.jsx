// import { useState } from 'react';
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   CircularProgress,
//   Alert,
//   Stack
// } from '@mui/material';

// const ChangeInitialPassword = ({
//   temporaryToken,
//   email,
//   onSuccess,
//   setSnackbarOpen,
//   setSnackbarMessage,
//   setLoading
// }) => {
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (newPassword !== confirmPassword) {
//       setError('Les mots de passe ne correspondent pas');
//       return;
//     }

//     try {
//       setLoading(true);
//       const result = await changeInitialPassword(
//         temporaryToken,
//         oldPassword,
//         newPassword,
//         setSnackbarOpen,
//         setSnackbarMessage,
//         setLoading
//       );

//       if (result) {
//         setSnackbarMessage('Mot de passe changé avec succès !');
//         setSnackbarOpen(true);
//         onSuccess();
//       }
//     } catch (err) {
//       setError(err.message || 'Une erreur est survenue');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h6" gutterBottom>
//         Changer votre mot de passe
//       </Typography>
//       <Typography variant="body2" color="textSecondary" gutterBottom>
//         Pour votre première connexion, vous devez changer votre mot de passe.
//       </Typography>

//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//       )}

//       <form onSubmit={handleSubmit}>
//         <Stack spacing={2}>
//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             value={email}
//             disabled
//           />
//           <TextField
//             label="Ancien mot de passe"
//             variant="outlined"
//             fullWidth
//             type="password"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             required
//           />
//           <TextField
//             label="Nouveau mot de passe"
//             variant="outlined"
//             fullWidth
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//           <TextField
//             label="Confirmer le nouveau mot de passe"
//             variant="outlined"
//             fullWidth
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={!oldPassword || !newPassword || !confirmPassword}
//           >
//             Changer le mot de passe
//           </Button>
//         </Stack>
//       </form>
//     </Box>
//   );
// };

// export default ChangeInitialPassword;
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { changeInitialPassword } from "../../services/authService"

export default function ChangeInitialPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { temporaryToken, oldPassword } = location.state || {};

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   if (newPassword !== confirmPassword) {
  //     setError("Les mots de passe ne correspondent pas");
  //     return;
  //   }

  //   try {
  //     await changeInitialPassword(temporaryToken, oldPassword, newPassword);
  //     // try {
  //     //         const users = await getUsers(data.temporaryToken);
  //     //         const user = users.find(user => user.email === email);
  //     //         if (user) {
  //     //     localStorage.setItem("email", user.email);}
  //     //           else{
  //     //             localStorage.setItem("email",null);
  //     //           }
  //     //         }
  //     //         catch (error) {
  //     //   console.warn("Erreur lors de la récupération des données utilisateur:", error);
  //     // }
  //     navigate('/auth/authenticate', { state: { message: "Mot de passe changé avec succès" } }

  //     );
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (newPassword !== confirmPassword) {
    setError("Les mots de passe ne correspondent pas");
    return;
  }

  try {
    const result = await changeInitialPassword(temporaryToken, oldPassword, newPassword);
    
    // Stocker l'email dans le localStorage
    if (result.userEmail) {
      localStorage.setItem("email", result.userEmail);
    }
    
    navigate('/auth/authenticate', { 
      state: { 
        message: "Mot de passe changé avec succès",
        email: result.userEmail // Optionnel: passer aussi dans l'état de navigation
      } 
    });
    
  } catch (error) {
    setError(error.message);
  }
};

  if (!temporaryToken) {
    return (
      <div>
        <h2>Erreur</h2>
        <p>Token manquant. Veuillez vous reconnecter.</p>
        <button onClick={() => navigate('/login')}>Retour à la connexion</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Changement de mot de passe requis</h2>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nouveau mot de passe:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirmer le mot de passe:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Changer le mot de passe</button>
      </form>
    </div>
  );
}