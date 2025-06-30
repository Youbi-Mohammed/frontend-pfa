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
"use client"

import { useState, useRef } from "react"
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
  CircularProgress,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import EditIcon from "@mui/icons-material/Edit"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import CloseIcon from "@mui/icons-material/Close"
import PersonIcon from "@mui/icons-material/Person"

const ModernDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
    border: "1px solid #e6f2f2",
    fontFamily: "'Inter', sans-serif",
    maxWidth: "480px",
  },
})

const ModernDialogTitle = styled(DialogTitle)({
  backgroundColor: "#f8fafa",
  color: "#1a1a1a",
  padding: "20px 24px",
  borderBottom: "1px solid #e6f2f2",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "& .MuiTypography-root": {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: "18px",
    color: "#1a1a1a",
  },
})

const ModernDialogContent = styled(DialogContent)({
  padding: "32px 24px",
  backgroundColor: "#fdfefe",
  fontFamily: "'Inter', sans-serif",
})

const ModernTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    fontFamily: "'Inter', sans-serif",
    "& fieldset": {
      borderColor: "#d1e7e7",
    },
    "&:hover fieldset": {
      borderColor: "#a3d5d5",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2d7a7a",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Inter', sans-serif",
    color: "#4a4a4a",
    fontWeight: 500,
    "&.Mui-focused": {
      color: "#1e5a5a",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#1a1a1a",
    fontFamily: "'Inter', sans-serif",
  },
})

const ModernButton = styled(Button)(({ variant, color }) => ({
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  borderRadius: "8px",
  textTransform: "none",
  padding: "10px 20px",
  fontSize: "14px",
  transition: "all 0.2s ease-in-out",
  ...(variant === "contained" && {
    backgroundColor: "#2d7a7a",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#1e5a5a",
      transform: "translateY(-1px)",
      boxShadow: "0 6px 16px rgba(45, 122, 122, 0.3)",
    },
    "&:disabled": {
      backgroundColor: "#e6f2f2",
      color: "#a3d5d5",
    },
  }),
  ...(variant === "outlined" && {
    borderColor: "#d1e7e7",
    color: "#4a4a4a",
    backgroundColor: "#ffffff",
    "&:hover": {
      backgroundColor: "#fcfefe",
      borderColor: "#2d7a7a",
      color: "#1e5a5a",
    },
  }),
  ...(variant === "text" && {
    color: "#4a4a4a",
    "&:hover": {
      backgroundColor: "#fcfefe",
      color: "#1e5a5a",
    },
  }),
}))

const ModernIconButton = styled(IconButton)({
  color: "#4a4a4a",
  "&:hover": {
    backgroundColor: "#fcfefe",
    color: "#1e5a5a",
  },
})

const AvatarContainer = styled(Box)({
  position: "relative",
  display: "inline-block",
})

const ModernAvatar = styled(Avatar)({
  width: "120px",
  height: "120px",
  fontSize: "3rem",
  border: "3px solid #2d7a7a",
  backgroundColor: "#f8fafa",
  color: "#2d7a7a",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
})

const EditAvatarButton = styled(IconButton)({
  position: "absolute",
  bottom: "4px",
  right: "4px",
  backgroundColor: "#2d7a7a",
  color: "#ffffff",
  width: "36px",
  height: "36px",
  border: "2px solid #ffffff",
  "&:hover": {
    backgroundColor: "#1e5a5a",
    transform: "scale(1.1)",
  },
})

const UploadButton = styled(Button)({
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  borderRadius: "8px",
  textTransform: "none",
  padding: "8px 16px",
  fontSize: "13px",
  color: "#4a4a4a",
  backgroundColor: "#f8fafa",
  border: "1px solid #d1e7e7",
  marginTop: "16px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#fcfefe",
    borderColor: "#2d7a7a",
    color: "#1e5a5a",
  },
})

const LoadingOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(248, 250, 250, 0.8)",
  borderRadius: "50%",
})

const HiddenInput = styled("input")({
  display: "none",
})

const ProfileDialog = ({ open, onClose, userData, profileImage, onProfileUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    email: userData?.email || "",
  })

  const [newImage, setNewImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const inputFileRef = useRef(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageClick = () => {
    inputFileRef.current?.click()
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsUploading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const reader = new FileReader()
        reader.onload = (event) => {
          setNewImage(event.target.result)
        }
        reader.readAsDataURL(file)
      } finally {
        setIsUploading(false)
      }
    }
  }

  const handleSubmit = async () => {
    try {
      const updatedData = {
        ...formData,
        profileImage: newImage || profileImage,
      }
      await onProfileUpdate(updatedData)
      onClose()
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const getInitials = () => {
    const firstName = formData.firstName || userData?.firstName || ""
    const lastName = formData.lastName || userData?.lastName || ""
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <ModernDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <ModernDialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <PersonIcon sx={{ color: "#2d7a7a", fontSize: "20px" }} />
          <Typography variant="h6">Edit Profile</Typography>
        </Box>
        <ModernIconButton onClick={onClose}>
          <CloseIcon />
        </ModernIconButton>
      </ModernDialogTitle>

      <ModernDialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <AvatarContainer>
            <ModernAvatar src={newImage || profileImage}>{!newImage && !profileImage && getInitials()}</ModernAvatar>

            {isUploading && (
              <LoadingOverlay>
                <CircularProgress size={40} sx={{ color: "#2d7a7a" }} />
              </LoadingOverlay>
            )}

            <EditAvatarButton onClick={handleImageClick} disabled={isUploading}>
              <EditIcon fontSize="small" />
            </EditAvatarButton>

            <HiddenInput type="file" ref={inputFileRef} onChange={handleImageChange} accept="image/*" />
          </AvatarContainer>

          <UploadButton startIcon={<CloudUploadIcon />} onClick={handleImageClick} disabled={isUploading}>
            Change Photo
          </UploadButton>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <ModernTextField
            label="First Name"
            name="firstName"
            fullWidth
            value={formData.firstName}
            onChange={handleChange}
            variant="outlined"
          />

          <ModernTextField
            label="Last Name"
            name="lastName"
            fullWidth
            value={localStorage.getItem("name") || formData.lastName}
            onChange={handleChange}
            variant="outlined"
          />

          <ModernTextField
            label="Email Address"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            type="email"
          />
        </Box>
      </ModernDialogContent>

      <DialogActions
        sx={{
          padding: "20px 24px",
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e6f2f2",
          gap: "12px",
        }}
      >
        <ModernButton onClick={onClose} variant="outlined">
          Cancel
        </ModernButton>
        <ModernButton onClick={handleSubmit} variant="contained" disabled={isUploading}>
          Save Changes
        </ModernButton>
      </DialogActions>
    </ModernDialog>
  )
}

export default ProfileDialog
