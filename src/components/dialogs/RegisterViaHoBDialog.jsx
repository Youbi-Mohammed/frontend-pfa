// import React, { useState } from 'react';
// import { registerViaHoB } from '../../services/registerViaHoBService';

// const StudentRegistrationForm = ({ userToken, onRegistrationComplete }) => {
//   // État initial du formulaire
//   const [studentData, setStudentData] = useState({
//     firstName: '',
//     lastName: '',
//     branch: 1, // Vous pouvez mettre une valeur par défaut ou laisser vide
//     cin: '',
//     inscriptionNumber: '',
//     email: '',
//     role: 'ROLE_STUDENT'
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [notification, setNotification] = useState({ show: false, message: '', isError: false });

//   // Gestion des changements dans les champs
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStudentData(prev => ({ ...prev, [name]: value }));
//   };

//   // Soumission du formulaire
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);

// //     try {
// //       // Appel du service avec le token utilisateur
// //       const response = await registerViaHoB(userToken, studentData);
      
// //       setNotification({
// //         show: true,
// //         message: 'Étudiant enregistré avec succès!',
// //         isError: false
// //       });

// //       // Réinitialisation du formulaire après succès
// //       setStudentData({
// //         firstName: '',
// //         lastName: '',
// //         branch: 1,
// //         cin: '',
// //         inscriptionNumber: '',
// //         email: '',
// //         role: 'ROLE_STUDENT'
// //       });

// //       // Callback pour informer le composant parent
// //       onRegistrationComplete?.(response);
// //     } catch (error) {
// //       setNotification({
// //         show: true,
// //         message: error.message || "Erreur lors de l'enregistrement",
// //         isError: true
// //       });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   console.log("Token utilisé:", userToken); // Debug A
//   console.log("Données du formulaire:", studentData); // Debug B

//   try {
//     const response = await registerViaHoB(userToken, studentData);
//     console.log("Réponse du serveur:", response); // Debug C
    
//       setNotification({
//         show: true,
//         message: 'Étudiant enregistré avec succès!',
//         isError: false
//       });

//       // Réinitialisation du formulaire après succès
//       setStudentData({
//         firstName: '',
//         lastName: '',
//         branch: 1,
//         cin: '',
//         inscriptionNumber: '',
//         email: '',
//         role: 'ROLE_STUDENT'
//       });

//       // Callback pour informer le composant parent
//       onRegistrationComplete?.(response);
    
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   } 
  
// ;

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Enregistrement d'un Nouvel Étudiant</h2>
      
//       <form onSubmit={handleSubmit} style={styles.form}>
//         {/* Champ Prénom */}
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Prénom *</label>
//           <input
//             type="text"
//             name="firstName"
//             value={studentData.firstName}
//             onChange={handleInputChange}
//             required
//             style={styles.input}
//           />
//         </div>

//         {/* Champ Nom */}
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Nom *</label>
//           <input
//             type="text"
//             name="lastName"
//             value={studentData.lastName}
//             onChange={handleInputChange}
//             required
//             style={styles.input}
//           />
//         </div>

//         {/* Champ CIN */}
//         <div style={styles.formGroup}>
//           <label style={styles.label}>CIN *</label>
//           <input
//             type="text"
//             name="cin"
//             value={studentData.cin}
//             onChange={handleInputChange}
//             required
//             style={styles.input}
//           />
//         </div>

//         {/* Champ Email */}
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Email *</label>
//           <input
//             type="email"
//             name="email"
//             value={studentData.email}
//             onChange={handleInputChange}
//             required
//             style={styles.input}
//           />
//         </div>

//         {/* Champ Numéro d'inscription */}
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Numéro d'inscription *</label>
//           <input
//             type="text"
//             name="inscriptionNumber"
//             value={studentData.inscriptionNumber}
//             onChange={handleInputChange}
//             required
//             style={styles.input}
//           />
//         </div>

//         {/* Champ Filière
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Filière *</label>
//           <select
//             name="branch"
//             value={studentData.branch}
//             onChange={handleInputChange}
//             required
//             style={styles.input}
//           >
//             <option value={1}>Filière 1</option>
//             <option value={2}>Filière 2</option>
//             <option value={3}>Filière 3</option>
//           </select>
//         </div> */}

//         {/* Bouton de soumission */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           style={{
//             ...styles.submitButton,
//             backgroundColor: isSubmitting ? '#cccccc' : '#1976d2'
//           }}
//         >
//           {isSubmitting ? 'Enregistrement en cours...' : 'Enregistrer l\'étudiant'}
//         </button>
//       </form>

//       {/* Notification */}
//       {notification.show && (
//         <div style={{
//           ...styles.notification,
//           backgroundColor: notification.isError ? '#f44336' : '#4caf50'
//         }}>
//           {notification.message}
//           <button 
//             onClick={() => setNotification(prev => ({ ...prev, show: false }))}
//             style={styles.notificationClose}
//           >
//             ×
//           </button>
//         </div>
//       )}
//     </div>
//   );


// // Styles
// const styles = {
//   container: {
//     maxWidth: '600px',
//     margin: '0 auto',
//     padding: '20px',
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
//   },
//   title: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: '24px'
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '16px'
//   },
//   formGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '8px'
//   },
//   label: {
//     fontWeight: '500',
//     color: '#555555'
//   },
//   input: {
//     padding: '10px 12px',
//     border: '1px solid #dddddd',
//     borderRadius: '4px',
//     fontSize: '16px'
//   },
//   submitButton: {
//     padding: '12px',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     marginTop: '16px'
//   },
//   notification: {
//     position: 'fixed',
//     bottom: '20px',
//     left: '50%',
//     transform: 'translateX(-50%)',
//     padding: '12px 24px',
//     color: 'white',
//     borderRadius: '4px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '16px',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
//   },
//   notificationClose: {
//     background: 'none',
//     border: 'none',
//     color: 'white',
//     cursor: 'pointer',
//     fontSize: '20px',
//     marginLeft: '8px'
//   }
// };

// export default StudentRegistrationForm;

//StudentRegistrationForm.jsx
// import React from 'react';
// import { Typography, Paper, Box } from '@mui/material';

// const StudentRegistrationForm = () => {
//   return (
//     <Box sx={{ p: 3 }}>
//       <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Test Student Registration
//         </Typography>
//         <Typography variant="body1">
//           Si vous voyez ce message, la route fonctionne correctement !
//         </Typography>
//         <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
//           <Typography variant="body2">
//             Chemin actuel : /dashboard/project/accounts
//           </Typography>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default StudentRegistrationForm;

/////////////////ca marche v
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerViaHoB } from "../../services/registerViaHoBService"
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Snackbar,
  IconButton,
  Box,
  Alert,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import SchoolIcon from "@mui/icons-material/School"
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount"

const ModernContainer = styled(Container)({
  marginTop: "32px",
  marginBottom: "32px",
  fontFamily: "'Inter', sans-serif",
})

const ModernPaper = styled(Paper)({
  borderRadius: "12px",
  padding: "40px",
  backgroundColor: "#ffffff",
  border: "1px solid #e6f2f2",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
  fontFamily: "'Inter', sans-serif",
})

const ModernTitle = styled(Typography)({
  fontFamily: "'Inter', sans-serif",
  fontSize: "28px",
  fontWeight: 700,
  color: "#1a1a1a",
  textAlign: "center",
  marginBottom: "32px",
  letterSpacing: "-0.5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
})

const ModernTextField = styled(TextField)({
  marginBottom: "20px",
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
    "&.Mui-disabled": {
      backgroundColor: "#f8fafa",
      "& fieldset": {
        borderColor: "#e6f2f2",
      },
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Inter', sans-serif",
    color: "#4a4a4a",
    fontWeight: 500,
    "&.Mui-focused": {
      color: "#1e5a5a",
    },
    "&.Mui-disabled": {
      color: "#6bb6b6",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#1a1a1a",
    fontFamily: "'Inter', sans-serif",
    "&.Mui-disabled": {
      color: "#6bb6b6",
    },
  },
})

const ModernFormControl = styled(FormControl)({
  marginBottom: "20px",
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
  "& .MuiSelect-select": {
    fontFamily: "'Inter', sans-serif",
    color: "#1a1a1a",
  },
})

const ModernSelect = styled(Select)({
  "& .MuiMenuItem-root": {
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    color: "#1a1a1a",
    "&:hover": {
      backgroundColor: "#f8fafa",
    },
    "&.Mui-selected": {
      backgroundColor: "#fcfefe",
      color: "#1e5a5a",
      "&:hover": {
        backgroundColor: "#f8fafa",
      },
    },
  },
})

const ModernButton = styled(Button)(({ variant, disabled }) => ({
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  borderRadius: "8px",
  textTransform: "none",
  padding: "12px 24px",
  fontSize: "14px",
  transition: "all 0.2s ease-in-out",
  ...(variant === "contained" && {
    backgroundColor: disabled ? "#e6f2f2" : "#2d7a7a",
    color: disabled ? "#a3d5d5" : "#ffffff",
    "&:hover": !disabled && {
      backgroundColor: "#1e5a5a",
      transform: "translateY(-1px)",
      boxShadow: "0 6px 16px rgba(45, 122, 122, 0.3)",
    },
  }),
}))

const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "32px",
  gap: "16px",
})

const FormContainer = styled(Box)({
  marginTop: "24px",
})

const ModernSnackbar = styled(Snackbar)({
  "& .MuiSnackbarContent-root": {
    borderRadius: "8px",
    fontFamily: "'Inter', sans-serif",
  },
})

const ModernAlert = styled(Alert)({
  fontFamily: "'Inter', sans-serif",
  borderRadius: "8px",
  "& .MuiAlert-message": {
    fontWeight: 500,
  },
})

const InfoBox = styled(Box)({
  backgroundColor: "#f8fafa",
  border: "1px solid #d1e7e7",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "24px",
})

const InfoText = styled(Typography)({
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  color: "#4a4a4a",
  lineHeight: 1.5,
})

const RegisterViaHoBDialog = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    branch: 1,
    cin: "",
    inscriptionNumber: "",
    email: "",
    role: "ROLE_STUDENT",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Handle normal field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Auto-generate CIN and inscription number from names
  const handleNameChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value }

      // Auto-generate CIN from first name
      if (name === "firstName" && value) {
        updatedData.cin = `CIN-${value.toUpperCase().replace(/\s+/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`
      }

      // Auto-generate inscription number from last name
      if (name === "lastName" && value) {
        updatedData.inscriptionNumber = `INS-${value.toUpperCase().replace(/\s+/g, "")}-${Math.floor(
          1000 + Math.random() * 9000,
        )}`
      }

      return updatedData
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Authentication required")

      if (!formData.firstName || !formData.lastName) {
        throw new Error("Please fill all required fields")
      }

      await registerViaHoB(token, formData)
      setSuccess("Account created successfully!")
      setFormData({
        firstName: "",
        lastName: "",
        branch: 1,
        cin: "",
        inscriptionNumber: "",
        email: "",
        role: "ROLE_STUDENT",
      })

      setTimeout(() => navigate("/dashboard"), 2000)
    } catch (err) {
      setError(err.message || "Account creation failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModernContainer maxWidth="md">
      <ModernPaper elevation={0}>
        <ModernTitle>
          <PersonAddIcon sx={{ fontSize: "32px", color: "#2d7a7a" }} />
          Create New Account
        </ModernTitle>

        <InfoBox>
          <InfoText>
            <strong>Auto-Generation:</strong> CIN and inscription numbers will be automatically generated based on the
            first and last names you enter. Simply fill in the required fields below.
          </InfoText>
        </InfoBox>

        <FormContainer component="form" onSubmit={handleSubmit}>
          <ModernTextField
            fullWidth
            label="First Name *"
            name="firstName"
            value={formData.firstName}
            onChange={handleNameChange}
            required
            placeholder="Enter first name"
          />

          <ModernTextField
            fullWidth
            label="Last Name *"
            name="lastName"
            value={formData.lastName}
            onChange={handleNameChange}
            required
            placeholder="Enter last name"
          />

          <ModernTextField
            fullWidth
            label="CIN (Auto-generated)"
            name="cin"
            value={formData.cin}
            disabled
            placeholder="Will be generated automatically"
          />

          <ModernTextField
            fullWidth
            label="Email Address *"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter email address"
          />

          <ModernTextField
            fullWidth
            label="Inscription Number (Auto-generated)"
            name="inscriptionNumber"
            value={formData.inscriptionNumber}
            disabled
            placeholder="Will be generated automatically"
          />

          <ModernFormControl fullWidth>
            <InputLabel>Account Type *</InputLabel>
            <ModernSelect name="role" value={formData.role} onChange={handleChange} label="Account Type *" required>
              <MenuItem value="ROLE_STUDENT">
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <SchoolIcon sx={{ fontSize: "18px", color: "#2d7a7a" }} />
                  Student
                </Box>
              </MenuItem>
              <MenuItem value="ROLE_SUPERVISOR">
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <SupervisorAccountIcon sx={{ fontSize: "18px", color: "#2d7a7a" }} />
                  Supervisor
                </Box>
              </MenuItem>
            </ModernSelect>
          </ModernFormControl>

          <ButtonContainer>
            <ModernButton
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} sx={{ color: "#ffffff" }} /> : <PersonAddIcon />}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </ModernButton>
          </ButtonContainer>
        </FormContainer>
      </ModernPaper>

      {/* Error Notification */}
      <ModernSnackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <ModernAlert
          onClose={() => setError(null)}
          severity="error"
          action={
            <IconButton size="small" color="inherit" onClick={() => setError(null)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {error}
        </ModernAlert>
      </ModernSnackbar>

      {/* Success Notification */}
      <ModernSnackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <ModernAlert
          onClose={() => setSuccess(null)}
          severity="success"
          action={
            <IconButton size="small" color="inherit" onClick={() => setSuccess(null)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {success}
        </ModernAlert>
      </ModernSnackbar>
    </ModernContainer>
  )
}

export default RegisterViaHoBDialog

// import React, { useState, useEffect } from 'react';
// import { registerViaHoB } from '../../services/registerViaHoBService';

// const StudentRegistrationForm = ({ onRegistrationComplete }) => {
//   // Récupération du token depuis le localStorage
//   const [userToken, setUserToken] = useState(null);
//   const [loadingToken, setLoadingToken] = useState(true);
//    const [userRole, setUserRole] = useState('');

//   // État initial du formulaire
//   const [studentData, setStudentData] = useState({
//     firstName: '',
//     lastName: '',
//     branch: 1,
//     cin: 'XXX',
//     inscriptionNumber: 'XXX',
//     email: '',
//     role: ''
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [notification, setNotification] = useState({ 
//     show: false, 
//     message: '', 
//     isError: false 
//   });

//   // Au montage du composant, récupère le token
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setUserToken(token);
//       // Ici vous pourriez ajouter une requête pour pré-remplir les champs si nécessaire
//       // fetchUserData(token);
//     } else {
//       setNotification({
//         show: true,
//         message: 'Vous devez être connecté pour accéder à cette fonctionnalité',
//         isError: true
//       });
//     }
//     setLoadingToken(false);
//   }, []);

//   // Gestion des changements dans les champs
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStudentData(prev => ({ ...prev, [name]: value }));
//   };

//     const handleRoleChange = (e) => {
//     // Seulement si l'utilisateur est superviseur
//      {
//       setStudentData(prev => ({ ...prev, role: e.target.value }));
//     }
//   };
//   // Soumission du formulaire
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!userToken) {
//       setNotification({
//         show: true,
//         message: 'Token non disponible - Veuillez vous reconnecter',
//         isError: true
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Validation minimale des données
//       if (!studentData.firstName || !studentData.lastName || !studentData.cin) {
//         throw new Error('Les champs obligatoires doivent être remplis');
//       }

//       const response = await registerViaHoB(userToken, studentData);
      
//       setNotification({
//         show: true,
//         message: 'Étudiant enregistré avec succès!',
//         isError: false
//       });

//       // Réinitialisation du formulaire après succès
//       setStudentData({
//         firstName: '',
//         lastName: '',
//         branch: 1,
//         cin: '',
//         inscriptionNumber: '',
//         email: '',
//         role: userRole === 'ROLE_SUPERVISOR' ? 'ROLE_STUDENT' : 'ROLE_STUDENT'
//       });

//       onRegistrationComplete?.(response);
//     } catch (error) {
//       setNotification({
//         show: true,
//         message: error.message || "Erreur lors de l'enregistrement",
//         isError: true
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loadingToken) {
//     return <div>Chargement...</div>;
//   }

//   if (!userToken) {
//     return (
//       <div style={{ 
//         padding: '20px', 
//         textAlign: 'center',
//         color: 'red'
//       }}>
//         Erreur d'authentification - Token non trouvé
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Creation Of New Account</h2>
      
//       <form onSubmit={handleSubmit} style={styles.form}>
//         {/* Champ Prénom */}
//         <div style={styles.formGroup}>
//           <label style={styles.label}>First name *</label>
//           <input
//             type="text"
//             name="firstName"
//             value={studentData.firstName}
//             onChange={handleInputChange}
//             required
//             style={styles.input}
//           />
//         </div>

//         {/* Champ Nom */}
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Last name *</label>
//           <input
//             type="text"
//             name="lastName"
//             value={studentData.lastName}
//             onChange={handleInputChange}
//             required
//             style={styles.input}
//           />
//         </div>

//         {/* Champ CIN */}
//         {/* <div style={styles.formGroup}>
//           <label style={styles.label}>CIN *</label>
//           <input
//             type="text"
//             name="cin"
//             value={studentData.cin}
//             onChange={handleInputChange}
//             required
//             style={styles.input}
//           />
//         </div> */}

//         {/* Champ Email */}
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Email *</label>
//           <input
//             type="email"
//             name="email"
//             value={studentData.email}
//             onChange={handleInputChange}
//             required
//             style={styles.input}
//           />
//         </div>

//         {/* Champ Numéro d'inscription */}
//         {/* <div style={styles.formGroup}>
//           <label style={styles.label}>Inscription number *</label>
//           <input
//             type="text"
//             name="inscriptionNumber"
//             value={studentData.inscriptionNumber}
//             onChange={handleInputChange}
//             required
//             style={styles.input}
//           />
//         </div> */}

//         {/* champ pour le role */}
//                    <div style={styles.formGroup}>
//              <label style={styles.label}>Account Type *</label>
//              <select
//                name="role"
//                value={studentData.role}
//                onChange={handleRoleChange}
//                required
//                style={styles.input}
//              >
//                <option value="">Select a role</option>
//                <option value="ROLE_STUDENT">Student</option>
//                <option value="ROLE_SUPERVISOR">Supervisor</option>
//              </select>
//            </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           style={{
//             ...styles.submitButton,
//             backgroundColor: isSubmitting ? '#cccccc' : '#1976d2'
//           }}
//         >
//           {isSubmitting ? 'Enregistrement en cours...' : 'Enregistrer l\'étudiant'}
//         </button>
//       </form>

//       {notification.show && (
//         <div style={{
//           ...styles.notification,
//           backgroundColor: notification.isError ? '#f44336' : '#4caf50'
//         }}>
//           {notification.message}
//           <button 
//             onClick={() => setNotification(prev => ({ ...prev, show: false }))}
//             style={styles.notificationClose}
//           >
//             ×
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // Styles (identique à votre version originale)
// const styles = {
//   container: {
//     maxWidth: '600px',
//     margin: '0 auto',
//     padding: '20px',
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
//   },
//   title: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: '24px'
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '16px'
//   },
//   formGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '8px'
//   },
//   label: {
//     fontWeight: '500',
//     color: '#555555'
//   },
//   input: {
//     padding: '10px 12px',
//     border: '1px solid #dddddd',
//     borderRadius: '4px',
//     fontSize: '16px'
//   },
//   submitButton: {
//     padding: '12px',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     marginTop: '16px'
//   },
//   notification: {
//     position: 'fixed',
//     bottom: '20px',
//     left: '50%',
//     transform: 'translateX(-50%)',
//     padding: '12px 24px',
//     color: 'white',
//     borderRadius: '4px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '16px',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
//   },
//   notificationClose: {
//     background: 'none',
//     border: 'none',
//     color: 'white',
//     cursor: 'pointer',
//     fontSize: '20px',
//     marginLeft: '8px'
//   }
// };

// export default StudentRegistrationForm;
//623

//////////ca marche ^
// import React, { useState, useEffect } from 'react';
// import { registerViaHoB } from '../../services/registerViaHoBService';

// const StudentRegistrationForm = ({ onRegistrationComplete }) => {
//   const [userToken, setUserToken] = useState(null);
//   const [loadingToken, setLoadingToken] = useState(true);
//   const [userRole, setUserRole] = useState(''); // Nouvel état pour le rôle

//   const [studentData, setStudentData] = useState({
//     firstName: '',
//     lastName: '',
//     branch: 1,
//     cin: '',
//     inscriptionNumber: '',
//     email: '',
//     role: '' // Rôle vide initialement
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [notification, setNotification] = useState({ 
//     show: false, 
//     message: '', 
//     isError: false 
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role'); // Récupère le rôle depuis le localStorage
    
//     if (token && role) {
//       setUserToken(token);
//       setUserRole(role);
      
//       // Définit le rôle par défaut en fonction de l'utilisateur connecté
//       setStudentData(prev => ({
//         ...prev,
//         role: role === 'ROLE_SUPERVISOR' ? 'ROLE_STUDENT' : 'ROLE_STUDENT'
//       }));
//     } else {
//       setNotification({
//         show: true,
//         message: 'Vous devez être connecté pour accéder à cette fonctionnalité',
//         isError: true
//       });
//     }
//     setLoadingToken(false);
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStudentData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleRoleChange = (e) => {
//     // Seulement si l'utilisateur est superviseur
//     if (userRole === 'ROLE_SUPERVISOR') {
//       setStudentData(prev => ({ ...prev, role: e.target.value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!userToken) {
//       setNotification({
//         show: true,
//         message: 'Token non disponible - Veuillez vous reconnecter',
//         isError: true
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       if (!studentData.firstName || !studentData.lastName || !studentData.cin || !studentData.role) {
//         throw new Error('Tous les champs obligatoires doivent être remplis');
//       }

//       const response = await registerViaHoB(userToken, studentData);
      
//       setNotification({
//         show: true,
//         message: 'Compte créé avec succès!',
//         isError: false
//       });

//       setStudentData({
//         firstName: '',
//         lastName: '',
//         branch: 1,
//         cin: '',
//         inscriptionNumber: '',
//         email: '',
//         role: userRole === 'ROLE_SUPERVISOR' ? 'ROLE_STUDENT' : 'ROLE_STUDENT'
//       });

//       onRegistrationComplete?.(response);
//     } catch (error) {
//       setNotification({
//         show: true,
//         message: error.message || "Erreur lors de la création du compte",
//         isError: true
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loadingToken) {
//     return <div>Chargement...</div>;
//   }

//   if (!userToken) {
//     return (
//       <div style={{ 
//         padding: '20px', 
//         textAlign: 'center',
//         color: 'red'
//       }}>
//         Erreur d'authentification - Token non trouvé
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Creation Of New Account</h2>
      
//       <form onSubmit={handleSubmit} style={styles.form}>
//         {/* Champs existants... */}
        
//         {/* Champ Rôle (seulement visible pour les superviseurs) */}
//         {userRole === 'ROLE_SUPERVISOR' && (
//           <div style={styles.formGroup}>
//             <label style={styles.label}>Account Type *</label>
//             <select
//               name="role"
//               value={studentData.role}
//               onChange={handleRoleChange}
//               required
//               style={styles.input}
//             >
//               <option value="">Select a role</option>
//               <option value="ROLE_STUDENT">Student</option>
//               <option value="ROLE_SUPERVISOR">Supervisor</option>
//             </select>
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           style={{
//             ...styles.submitButton,
//             backgroundColor: isSubmitting ? '#cccccc' : '#1976d2'
//           }}
//         >
//           {isSubmitting ? 'Processing...' : 'Create Account'}
//         </button>
//       </form>

//       {notification.show && (
//         <div style={{
//           ...styles.notification,
//           backgroundColor: notification.isError ? '#f44336' : '#4caf50'
//         }}>
//           {notification.message}
//           <button 
//             onClick={() => setNotification(prev => ({ ...prev, show: false }))}
//             style={styles.notificationClose}
//           >
//             ×
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // Styles (identique à votre version originale)
// const styles = {
//   container: {
//     maxWidth: '600px',
//     margin: '0 auto',
//     padding: '20px',
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
//   },
//   title: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: '24px'
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '16px'
//   },
//   formGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '8px'
//   },
//   label: {
//     fontWeight: '500',
//     color: '#555555'
//   },
//   input: {
//     padding: '10px 12px',
//     border: '1px solid #dddddd',
//     borderRadius: '4px',
//     fontSize: '16px'
//   },
//   submitButton: {
//     padding: '12px',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     marginTop: '16px'
//   },
//   notification: {
//     position: 'fixed',
//     bottom: '20px',
//     left: '50%',
//     transform: 'translateX(-50%)',
//     padding: '12px 24px',
//     color: 'white',
//     borderRadius: '4px',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '16px',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
//   },
//   notificationClose: {
//     background: 'none',
//     border: 'none',
//     color: 'white',
//     cursor: 'pointer',
//     fontSize: '20px',
//     marginLeft: '8px'
//   }
// };

// export default StudentRegistrationForm;