// // src/components/LogoutButton.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { logout } from '../../services/authService';

// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   IconButton,
//   Tooltip
// } from '@mui/material';
// import LogoutIcon from '@mui/icons-material/Logout';

// const Logout = ({ variant = 'icon' }) => {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleLogout = () => {
//     const success = logout();
//     if (success) {
//       navigate('/login');
//       window.location.reload(); // Pour rafraîchir complètement l'état de l'application
//     }
//   };

//   return (
//     <>
//       {variant === 'icon' ? (
//         <Tooltip title="Déconnexion">
//           <IconButton color="error" onClick={handleOpen}>
//             <LogoutIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Button
//           variant="outlined"
//           color="error"
//           startIcon={<LogoutIcon />}
//           onClick={handleOpen}
//           sx={{ ml: 2 }}
//         >
//           Déconnexion
//         </Button>
//       )}

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Confirmer la déconnexion</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Êtes-vous sûr de vouloir vous déconnecter ?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Annuler</Button>
//           <Button 
//             onClick={handleLogout} 
//             color="error"
//             variant="contained"
//           >
//             Déconnexion
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default Logout;
////76 tjrs ca marche fi khatr hassan 7ta Lstr 110
// import React from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button
// } from '@mui/material';

// const Logout = ({ open, onClose, onConfirm }) => {
//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Confirmer la déconnexion</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           Êtes-vous sûr de vouloir vous déconnecter ?
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Annuler</Button>
//         <Button 
//           onClick={onConfirm} 
//           color="error"
//           variant="contained"
//         >
//           Se déconnecter
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default Logout;
// Fou9 howa hadak 

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { logout } from '../../services/authService'; // Importez la fonction logout
import { useNavigate } from 'react-router-dom';

const Logout = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    const success = logout(); // Utilisation du service
    
    if (success) {
      navigate('/'); // Redirection vers la page d'authentification
    //   window.location.reload(); // Rafraîchissement pour nettoyer l'état
    } else {
      // Gérer l'échec de déconnexion si nécessaire
    //   alert('La déconnexion a échoué');
    navigate('/'); // Redirection vers la page d'authentification
    }
    
    onClose(); // Fermer la modal
  };

  return (
   <Dialog open={open} onClose={onClose}>
  <DialogTitle>Confirm Logout</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to log out?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={onClose}>Cancel</Button>
    <Button 
      onClick={handleConfirm} 
      color="error"
      variant="contained"
    >
      Log Out
    </Button>
  </DialogActions>
</Dialog>
  );
};

export default Logout;