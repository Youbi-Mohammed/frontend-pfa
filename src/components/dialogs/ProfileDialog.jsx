// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Box,
//   Avatar
// } from '@mui/material';

// const ProfileDialog = ({ open, onClose, userData, profileImage }) => {
// //   const [formData, setFormData] = useState({
// //     firstName: userData.firstName || '',
// //     lastName: userData.lastName || '',
// //     email: userData.email || ''
// //   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = () => {
//     // Ajoutez ici la logique pour sauvegarder les modifications
//     console.log('Données mises à jour:', formData);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Mon Profil</DialogTitle>
//       <DialogContent>
//         <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
//           <Avatar 
//             src={profileImage} 
//             sx={{ width: 100, height: 100 }} 
//           />
//         </Box>
        
//         <TextField
//           margin="dense"
//           label="Prénom"
//           name="firstName"
//           fullWidth
//         //   value={formData.firstName}
//           onChange={handleChange}
//           sx={{ mb: 2 }}
//         />
        
//         <TextField
//           margin="dense"
//           label="Nom"
//           name="lastName"
//           fullWidth
//         //   value={formData.lastName}
//           onChange={handleChange}
//           sx={{ mb: 2 }}
//         />
        
//         <TextField
//           margin="dense"
//           label="Email"
//           name="email"
//           fullWidth
//         //   value={formData.email}
//           onChange={handleChange}
//           sx={{ mb: 2 }}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Annuler</Button>
//         <Button onClick={handleSubmit} variant="contained" color="primary">
//           Sauvegarder
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
//  export default ProfileDialog;
import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
  IconButton,
  Typography,
  CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

const ProfileDialog = ({ 
  open, 
  onClose, 
  userData, 
  profileImage,
  onProfileUpdate 
}) => {
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || ''
  });
  const [newImage, setNewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const inputFileRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageClick = () => {
    inputFileRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const reader = new FileReader();
        reader.onload = (event) => {
          setNewImage(event.target.result);
        };
        reader.readAsDataURL(file);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const updatedData = {
        ...formData,
        profileImage: newImage || profileImage
      };
      await onProfileUpdate(updatedData);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: (theme) => theme.palette.background.paper,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`
      }}>
        <Typography variant="h6">Modifier le profil</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          mb: 4 
        }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar 
              src={newImage || profileImage} 
              sx={{ 
                width: 120, 
                height: 120, 
                fontSize: '3rem',
                border: (theme) => `2px solid ${theme.palette.primary.main}`
              }}
            />
            {isUploading && (
              <CircularProgress 
                size={60}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-30px',
                  marginLeft: '-30px',
                }}
              />
            )}
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: (theme) => theme.palette.background.paper,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.action.hover,
                }
              }}
              onClick={handleImageClick}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <input
              type="file"
              ref={inputFileRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </Box>
          
          <Button
            startIcon={<CloudUploadIcon />}
            onClick={handleImageClick}
            sx={{ mt: 2 }}
          >
            Changer la photo
          </Button>
        </Box>

        <TextField
          margin="normal"
          label="Prénom"
          name="firstName"
          fullWidth
          value={formData.firstName}
          onChange={handleChange}
          variant="outlined"
        />
        
        <TextField
          margin="normal"
          label="Nom"
          name="lastName"
          fullWidth
        //   value={formData.lastName}
value={localStorage.getItem('name') || formData.lastName}
          onChange={handleChange}
          variant="outlined"
        />
        
        <TextField
          margin="normal"
          label="Email"
          name="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          type="email"
        />
      </DialogContent>

      <DialogActions sx={{ 
        p: 2, 
        borderTop: (theme) => `1px solid ${theme.palette.divider}`
      }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ mr: 1 }}
        >
          Annuler
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={isUploading}
        >
          Enregistrer les modifications
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;