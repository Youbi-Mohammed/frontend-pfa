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
import { logout } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Logout = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    const success = logout();
    if (success) {
      navigate('/');
    } else {
      navigate('/');
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{ color: '#1e5a5a', fontWeight: 'bold', fontSize: '1.25rem' }}
      >
        Confirm Logout
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: '#fdfefe' }}>
        <DialogContentText sx={{ color: '#2d2d2d' }}>
          Are you sure you want to log out?
        </DialogContentText>
      </DialogContent>

      <DialogActions
        sx={{ padding: '16px', backgroundColor: '#f8fafa', borderTop: '1px solid #e6f2f2' }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: '#2d7a7a',
            borderColor: '#a3d5d5',
            '&:hover': {
              borderColor: '#2d7a7a',
              backgroundColor: '#d1e7e7',
            }
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{
            backgroundColor: '#2d7a7a',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#1e5a5a',
            }
          }}
        >
          Log Out
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Logout;
