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
// import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { changeInitialPassword } from "../../services/authService"

// export default function ChangeInitialPassword() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   const { temporaryToken, oldPassword } = location.state || {};

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
    
//   //   if (newPassword !== confirmPassword) {
//   //     setError("Les mots de passe ne correspondent pas");
//   //     return;
//   //   }

//   //   try {
//   //     await changeInitialPassword(temporaryToken, oldPassword, newPassword);
//   //     // try {
//   //     //         const users = await getUsers(data.temporaryToken);
//   //     //         const user = users.find(user => user.email === email);
//   //     //         if (user) {
//   //     //     localStorage.setItem("email", user.email);}
//   //     //           else{
//   //     //             localStorage.setItem("email",null);
//   //     //           }
//   //     //         }
//   //     //         catch (error) {
//   //     //   console.warn("Erreur lors de la récupération des données utilisateur:", error);
//   //     // }
//   //     navigate('/auth/authenticate', { state: { message: "Mot de passe changé avec succès" } }

//   //     );
//   //   } catch (error) {
//   //     setError(error.message);
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   if (newPassword !== confirmPassword) {
//     setError("Les mots de passe ne correspondent pas");
//     return;
//   }

//   try {
//     const result = await changeInitialPassword(temporaryToken, oldPassword, newPassword);
    
//     // Stocker l'email dans le localStorage
//     if (result.userEmail) {
//       localStorage.setItem("email", result.userEmail);
//     }
    
//     navigate('/auth/authenticate', { 
//       state: { 
//         message: "Mot de passe changé avec succès",
//         email: result.userEmail // Optionnel: passer aussi dans l'état de navigation
//       } 
//     });
    
//   } catch (error) {
//     setError(error.message);
//   }
// };

//   if (!temporaryToken) {
//     return (
//       <div>
//         <h2>Erreur</h2>
//         <p>Token manquant. Veuillez vous reconnecter.</p>
//         <button onClick={() => navigate('/login')}>Retour à la connexion</button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>Changement de mot de passe requis</h2>
//       {error && <div style={{color: 'red'}}>{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Nouveau mot de passe:</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Confirmer le mot de passe:</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Changer le mot de passe</button>
//       </form>
//     </div>
//   );
// }


//////lfou9 ok ok ok ok ok 
//7ta lt7t 7ed str 400
// import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//   Container,
//   CssBaseline,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   Alert,
//   Snackbar
// } from '@mui/material';
// import LockResetIcon from '@mui/icons-material/LockReset';
// import Avatar from '@mui/material/Avatar';

// import { changeInitialPassword } from '../../services/authService';

// export default function ChangeInitialPassword() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   const { temporaryToken, oldPassword } = location.state || {};

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       setError("Les mots de passe ne correspondent pas");
//       return;
//     }

//     try {
//       const result = await changeInitialPassword(
//         temporaryToken,
//         oldPassword,
//         newPassword
//       );

//       if (result.userEmail) {
//         localStorage.setItem('email', result.userEmail);
//       }

//       setSnackbarMessage('Mot de passe changé avec succès !');
//       setSnackbarOpen(true);

//       setTimeout(() => {
//         navigate('/auth/authenticate', {
//           state: {
//             message: 'Mot de passe changé avec succès',
//             email: result.userEmail
//           }
//         });
//       }, 1500);

//     } catch (err) {
//       setError(err.message || 'Une erreur est survenue');
//     }
//   };

//   if (!temporaryToken) {
//     return (
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box sx={{ mt: 8, textAlign: 'center' }}>
//           <Typography variant="h5" gutterBottom>
//             Erreur
//           </Typography>
//           <Typography variant="body1">
//             Token manquant. Veuillez vous reconnecter.
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{ mt: 2 }}
//             onClick={() => navigate('/auth/authenticate')}
//           >
//             Retour à la connexion
//           </Button>
//         </Box>
//       </Container>
//     );
//   }

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center'
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//           <LockResetIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Changement de mot de passe requis
//         </Typography>
//         <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
//           Pour votre première connexion, vous devez changer votre mot de passe.
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
//             {error}
//           </Alert>
//         )}

//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             label="Nouveau mot de passe"
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             label="Confirmer le mot de passe"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Changer le mot de passe
//           </Button>
//         </Box>
//       </Box>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={4000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity="success"
//           sx={{ width: '100%' }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// }
///fou9 khdam 
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  Snackbar
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import Avatar from '@mui/material/Avatar';

import { changeInitialPassword } from '../../services/authService';

export default function ChangeInitialPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { temporaryToken, oldPassword } = location.state || {};

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const result = await changeInitialPassword(
        temporaryToken,
        oldPassword,
        newPassword
      );

      if (result.userEmail) {
        localStorage.setItem('email', result.userEmail);
      }

      setSnackbarMessage('Password changed successfully!');
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate('/auth/authenticate', {
          state: {
            message: 'Password changed successfully',
            email: result.userEmail
          }
        });
      }, 1500);

    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  if (!temporaryToken) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Error
          </Typography>
          <Typography variant="body1">
            Missing token. Please log in again.
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate('/auth/authenticate')}
          >
            Back to login
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockResetIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Initial Password Update Required
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          For your first login, you need to change your password.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Change Password
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
