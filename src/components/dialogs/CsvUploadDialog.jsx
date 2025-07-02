// import React from "react";
// import "./footer.scss";

// function CsvUploadDialog() {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         <div className="row">
//           <div className="footer-col">
//             <h4>PFA HUB</h4>
//             <ul>
//               <li>
//                 <a href="#">About Us</a>
//               </li>
//               <li>
//                 <a href="#">Contact</a>
//               </li>
//               <li>
//                 <a href="#">Privacy Policy</a>
//               </li>
//             </ul>
//           </div>
//           <div className="footer-col">
//             <h4>Support</h4>
//             <ul>
//               <li>
//                 <a href="#">FAQ</a>
//               </li>
//               <li>
//                 <a href="#">Technical Support</a>
//               </li>
//             </ul>
//           </div>
//           <div className="footer-col">
//             <h4>Resources</h4>
//             <ul>
//               <li>
//                 <a href="#">Documentation</a>
//               </li>
//               <li>
//                 <a href="#">Tutorials</a>
//               </li>
//               <li>
//                 <a href="#">Community</a>
//               </li>
//             </ul>
//           </div>
//           <div className="footer-col">
//             <h4>Follow Us</h4>
//             <div className="social-links">
//               <a href="#">
//                 <img
//                   src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-facebook-circle-512.png"
//                   alt="Facebook"
//                 />
//               </a>
//               <a href="#">
//                 <img
//                   src="https://th.bing.com/th/id/OIP.-ZirgQE5pr8e7htQWowJIgHaHa?rs=1&pid=ImgDetMain"
//                   alt="Twitter"
//                 />
//               </a>
//               <a href="#">
//                 <img
//                   src="https://th.bing.com/th/id/OIP.YGJYM4pqXxVMHzPYfdLumgHaHa?rs=1&pid=ImgDetMain"
//                   alt="Instagram"
//                 />
//               </a>
//               <a href="#">
//                 <img
//                   src="https://pngimg.com/uploads/linkedIn/linkedIn_PNG7.png"
//                   alt="LinkedIn"
//                 />
//               </a>
//             </div>
//           </div>

//         </div>
//       </div>
//     </footer>
//   );
// }

// export default CsvUploadDialog;
// import React, { useState } from 'react';
// // import { uploadStudentsCSV } from '../../services/studentService'; // Votre service API
// import { uploadCsvStudent } from '../../services/csvUploadService';
// const CsvUploadDialog = () => {
//   const [file, setFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [message, setMessage] = useState({ text: '', isError: false });

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.type === 'text/csv') {
//       setFile(selectedFile);
//       setMessage({ text: '', isError: false });
//     } else {
//       setMessage({ text: 'Veuillez sélectionner un fichier CSV valide', isError: true });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!file) {
//       setMessage({ text: 'Aucun fichier sélectionné', isError: true });
//       return;
//     }

//     setIsUploading(true);
    
//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await uploadStudentsCSV(formData); // Votre fonction de service
      
//       setMessage({
//         text: response.message || 'Fichier CSV traité avec succès',
//         isError: false
//       });
//       setFile(null);
//       document.getElementById('csv-upload').value = ''; // Réinitialise l'input
//     } catch (error) {
//       setMessage({
//         text: error.response?.data?.message || "Erreur lors de l'upload du fichier",
//         isError: true
//       });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Importer des étudiants via CSV</h2>
      
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Fichier CSV *</label>
//           <input
//             id="csv-upload"
//             type="file"
//             accept=".csv"
//             onChange={handleFileChange}
//             style={styles.input}
//             disabled={isUploading}
//           />
//           {file && (
//             <p style={styles.fileInfo}>
//               Fichier sélectionné: {file.name} ({Math.round(file.size / 1024)} KB)
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={!file || isUploading}
//           style={{
//             ...styles.submitButton,
//             backgroundColor: (!file || isUploading) ? '#cccccc' : '#1976d2'
//           }}
//         >
//           {isUploading ? 'Envoi en cours...' : 'Envoyer le fichier'}
//         </button>
//       </form>

//       {message.text && (
//         <div style={{
//           ...styles.message,
//           color: message.isError ? '#d32f2f' : '#2e7d32'
//         }}>
//           {message.text}
//         </div>
//       )}

//       <div style={styles.instructions}>
//         <h3>Format CSV requis :</h3>
//         <p>firstName,lastName,email,cin,inscriptionNumber</p>
//         <p>Exemple :</p>
//         <pre>
//           John,Doe,john@example.com,AB12345,20230001<br />
//           Jane,Smith,jane@example.com,AB12346,20230002
//         </pre>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '800px',
//     margin: '0 auto',
//     padding: '20px',
//     backgroundColor: '#f9f9f9',
//     borderRadius: '8px',
//     boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//   },
//   title: {
//     textAlign: 'center',
//     color: '#333',
//     marginBottom: '24px'
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '20px'
//   },
//   formGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '8px'
//   },
//   label: {
//     fontWeight: '500',
//     color: '#555'
//   },
//   input: {
//     padding: '10px',
//     border: '1px solid #ddd',
//     borderRadius: '4px'
//   },
//   fileInfo: {
//     marginTop: '5px',
//     fontSize: '0.9em',
//     color: '#666'
//   },
//   submitButton: {
//     padding: '12px',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     marginTop: '10px'
//   },
//   message: {
//     marginTop: '20px',
//     padding: '10px',
//     borderRadius: '4px',
//     backgroundColor: '#f5f5f5'
//   },
//   instructions: {
//     marginTop: '30px',
//     padding: '15px',
//     backgroundColor: '#e8f5e9',
//     borderRadius: '4px',
//     borderLeft: '4px solid #2e7d32'
//   }
// };

// export default CsvUploadDialog;
// import React, { useState, useRef } from 'react';
// import { uploadCsvStudent } from '../../services/csvUploadService';

// const CsvUploadDialog = ({ onUploadSuccess, onUploadError }) => {
//   const [file, setFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [notification, setNotification] = useState({ show: false, message: '', isError: false });
//   const fileInputRef = useRef(null);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setNotification({ show: false, message: '', isError: false });
//   };

//   const handleSubmit = async () => {
//     if (!file) {
//       setNotification({ show: true, message: 'No file selected', isError: true });
//       return;
//     }

//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('Authentication token missing');
//       }

//       const response = await uploadCsvStudent(token, formData);
      
//       setNotification({
//         show: true,
//         message: response.message || 'CSV file uploaded successfully',
//         isError: false
//       });

//       setFile(null);
//       if (fileInputRef.current) fileInputRef.current.value = '';

//       if (onUploadSuccess) onUploadSuccess(response);
//     } catch (error) {
//       console.error('Error during upload:', error);
//       setNotification({
//         show: true,
//         message: error.message || 'Error uploading the file',
//         isError: true
//       });
//       if (onUploadError) onUploadError(error);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Upload a CSV File</h2>
      
//       <div style={styles.uploadSection}>
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           accept=".csv"
//           style={{ display: 'none' }}
//         />
//         <button
//           onClick={() => fileInputRef.current.click()}
//           style={styles.selectButton}
//         >
//           Select a CSV File
//         </button>
        
//         {file && (
//           <div style={styles.fileInfo}>
//             <span>{file.name}</span>
//             <button 
//               onClick={() => setFile(null)}
//               style={styles.clearButton}
//             >
//               ×
//             </button>
//           </div>
//         )}
//       </div>

//       <button
//         onClick={handleSubmit}
//         disabled={!file || isUploading}
//         style={{
//           ...styles.uploadButton,
//           backgroundColor: isUploading ? '#ff9800' : '#4caf50',
//           cursor: isUploading ? 'wait' : 'pointer'
//         }}
//       >
//         {isUploading ? 'Uploading...' : 'Upload File'}
//       </button>

//       {notification.show && (
//         <div style={{
//           ...styles.notification,
//           backgroundColor: notification.isError ? '#ffebee' : '#e8f5e9',
//           color: notification.isError ? '#c62828' : '#2e7d32'
//         }}>
//           {notification.message}
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '500px',
//     margin: '20px auto',
//     padding: '20px',
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//   },
//   title: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: '20px'
//   },
//   uploadSection: {
//     marginBottom: '20px',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '10px'
//   },
//   selectButton: {
//     padding: '10px 15px',
//     backgroundColor: '#1976d2',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     fontSize: '14px'
//   },
//   fileInfo: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '10px',
//     padding: '8px',
//     backgroundColor: '#f5f5f5',
//     borderRadius: '4px'
//   },
//   clearButton: {
//     background: 'none',
//     border: 'none',
//     color: '#f44336',
//     cursor: 'pointer',
//     fontSize: '16px'
//   },
//   uploadButton: {
//     padding: '10px 20px',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '16px',
//     width: '100%'
//   },
//   notification: {
//     padding: '12px',
//     borderRadius: '4px',
//     marginTop: '20px',
//     borderLeft: '4px solid currentColor'
//   }
// };

// export default CsvUploadDialog;
//255 fou9
// "use client"

// import { useState, useRef } from "react"
// import { useNavigate } from "react-router-dom"
// import { uploadCsvStudent } from "../../services/csvUploadService"
// import { Container, Box, Typography, Button, CircularProgress, Snackbar, Alert, Paper, IconButton } from "@mui/material"
// import { styled } from "@mui/material/styles"
// import CloudUploadIcon from "@mui/icons-material/CloudUpload"
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
// import DescriptionIcon from "@mui/icons-material/Description"
// import GroupAddIcon from "@mui/icons-material/GroupAdd"

// const ModernContainer = styled(Container)({
//   marginTop: "32px",
//   fontFamily: "'Inter', sans-serif",
// })

// const ModernPaper = styled(Paper)({
//   borderRadius: "12px",
//   padding: "40px",
//   backgroundColor: "#ffffff",
//   border: "1px solid #e6f2f2",
//   boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
//   fontFamily: "'Inter', sans-serif",
// })

// const ModernTitle = styled(Typography)({
//   fontFamily: "'Inter', sans-serif",
//   fontSize: "28px",
//   fontWeight: 700,
//   color: "#1a1a1a",
//   letterSpacing: "-0.5px",
//   margin: 0,
//   lineHeight: 1,
// })

// const ModernSubtitle = styled(Typography)({
//   fontFamily: "'Inter', sans-serif",
//   fontSize: "16px",
//   fontWeight: 400,
//   color: "#4a4a4a",
//   textAlign: "center",
//   marginBottom: "32px",
//   lineHeight: 1.6,
// })

// const UploadZone = styled(Box)(({ hasFile }) => ({
//   border: hasFile ? "2px solid #2d7a7a" : "2px dashed #d1e7e7",
//   borderRadius: "12px",
//   padding: "48px 32px",
//   textAlign: "center",
//   marginBottom: "24px",
//   cursor: "pointer",
//   backgroundColor: hasFile ? "#f8fafa" : "#ffffff",
//   transition: "all 0.3s ease-in-out",
//   "&:hover": {
//     backgroundColor: "#fcfefe",
//     borderColor: "#2d7a7a",
//     transform: "translateY(-2px)",
//     boxShadow: "0 8px 24px rgba(45, 122, 122, 0.15)",
//   },
// }))

// const UploadIcon = styled(CloudUploadIcon)({
//   fontSize: "48px",
//   color: "#2d7a7a",
//   marginBottom: "16px",
//   filter: "drop-shadow(0 2px 4px rgba(45, 122, 122, 0.2))",
// })

// const FileInfo = styled(Box)({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   gap: "12px",
//   padding: "16px 24px",
//   backgroundColor: "#f8fafa",
//   borderRadius: "8px",
//   border: "1px solid #d1e7e7",
//   marginBottom: "24px",
// })

// const FileIcon = styled(DescriptionIcon)({
//   color: "#2d7a7a",
//   fontSize: "24px",
// })

// const FileName = styled(Typography)({
//   fontFamily: "'Inter', sans-serif",
//   fontSize: "14px",
//   fontWeight: 500,
//   color: "#1a1a1a",
//   flex: 1,
// })

// const FileSize = styled(Typography)({
//   fontFamily: "'Inter', sans-serif",
//   fontSize: "12px",
//   color: "#4a4a4a",
// })

// const ModernButton = styled(Button)(({ variant, color }) => ({
//   fontFamily: "'Inter', sans-serif",
//   fontWeight: 600,
//   borderRadius: "8px",
//   textTransform: "none",
//   padding: "12px 24px",
//   fontSize: "14px",
//   transition: "all 0.2s ease-in-out",
//   ...(variant === "contained" && {
//     backgroundColor: "#2d7a7a",
//     color: "#ffffff",
//     "&:hover": {
//       backgroundColor: "#1e5a5a",
//       transform: "translateY(-1px)",
//       boxShadow: "0 6px 16px rgba(45, 122, 122, 0.3)",
//     },
//     "&:disabled": {
//       backgroundColor: "#e6f2f2",
//       color: "#a3d5d5",
//     },
//   }),
//   ...(variant === "outlined" && {
//     borderColor: "#d1e7e7",
//     color: "#4a4a4a",
//     backgroundColor: "#ffffff",
//     "&:hover": {
//       backgroundColor: "#fcfefe",
//       borderColor: "#2d7a7a",
//       color: "#1e5a5a",
//     },
//   }),
//   ...(color === "error" && {
//     color: "#dc6545",
//     borderColor: "#f4d4c7",
//     "&:hover": {
//       backgroundColor: "#fef7f4",
//       borderColor: "#e8b4a0",
//     },
//   }),
// }))

// const ButtonContainer = styled(Box)({
//   display: "flex",
//   justifyContent: "center",
//   gap: "16px",
//   marginTop: "24px",
// })

// const HiddenInput = styled("input")({
//   display: "none",
// })

// const ModernAlert = styled(Alert)({
//   fontFamily: "'Inter', sans-serif",
//   borderRadius: "8px",
//   "& .MuiAlert-message": {
//     fontWeight: 500,
//   },
// })

// const CsvUploadDialog = () => {
//   const navigate = useNavigate()
//   const [file, setFile] = useState(null)
//   const [isUploading, setIsUploading] = useState(false)
//   const [notification, setNotification] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   })

//   const fileInputRef = useRef(null)

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0]
//     if (selectedFile) {
//       if (!selectedFile.name.endsWith(".csv")) {
//         setNotification({
//           open: true,
//           message: "Please select a CSV file",
//           severity: "error",
//         })
//         return
//       }
//       setFile(selectedFile)
//     }
//   }

//   const handleUpload = async () => {
//     if (!file) {
//       setNotification({
//         open: true,
//         message: "No file selected",
//         severity: "error",
//       })
//       return
//     }

//     setIsUploading(true)
//     const formData = new FormData()
//     formData.append("file", file)

//     try {
//       const token = localStorage.getItem("token")
//       if (!token) throw new Error("Authentication required")

//       const response = await uploadCsvStudent(token, formData)

//       setNotification({
//         open: true,
//         message: response.message || "Students imported successfully",
//         severity: "success",
//       })

//       // Reset and redirect after success
//       setTimeout(() => {
//         setFile(null)
//         if (fileInputRef.current) fileInputRef.current.value = ""
//         navigate("/dashboard")
//       }, 2000)
//     } catch (error) {
//       setNotification({
//         open: true,
//         message: error.message || "Import failed",
//         severity: "error",
//       })
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const handleRemoveFile = () => {
//     setFile(null)
//     if (fileInputRef.current) fileInputRef.current.value = ""
//   }

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return "0 Bytes"
//     const k = 1024
//     const sizes = ["Bytes", "KB", "MB", "GB"]
//     const i = Math.floor(Math.log(bytes) / Math.log(k))
//     return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
//   }

//   return (
//     <ModernContainer maxWidth="md">
//       <ModernPaper elevation={0}>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "8px",
//             mb: 2,
//           }}
//         >
//           <GroupAddIcon sx={{ fontSize: "28px", color: "#2d7a7a" }} />
//           <ModernTitle sx={{ margin: 0 }}>Import Students</ModernTitle>
//         </Box>

//         <ModernSubtitle>
//           Upload a CSV file containing student information to bulk import accounts into the system.
//         </ModernSubtitle>

//         <UploadZone hasFile={!!file} onClick={() => fileInputRef.current?.click()}>
//           <HiddenInput type="file" ref={fileInputRef} onChange={handleFileChange} accept=".csv" />

//           <UploadIcon />

//           <Typography
//             sx={{
//               fontFamily: "'Inter', sans-serif",
//               fontSize: "18px",
//               fontWeight: 600,
//               color: "#1a1a1a",
//               marginBottom: "8px",
//             }}
//           >
//             {file ? "File Selected" : "Select CSV File"}
//           </Typography>

//           <Typography
//             sx={{
//               fontFamily: "'Inter', sans-serif",
//               fontSize: "14px",
//               color: "#4a4a4a",
//               marginBottom: "16px",
//             }}
//           >
//             {file ? "Click to change file" : "Click here or drag and drop your CSV file"}
//           </Typography>

//           <Typography
//             sx={{
//               fontFamily: "'Inter', sans-serif",
//               fontSize: "12px",
//               color: "#6bb6b6",
//               fontWeight: 500,
//             }}
//           >
//             Only .csv files are accepted • Max size: 10MB
//           </Typography>
//         </UploadZone>

//         {file && (
//           <FileInfo>
//             <FileIcon />
//             <Box sx={{ flex: 1 }}>
//               <FileName>{file.name}</FileName>
//               <FileSize>{formatFileSize(file.size)}</FileSize>
//             </Box>
//             <IconButton
//               onClick={handleRemoveFile}
//               disabled={isUploading}
//               sx={{
//                 color: "#dc6545",
//                 "&:hover": {
//                   backgroundColor: "#fef7f4",
//                 },
//               }}
//             >
//               <DeleteOutlineIcon fontSize="small" />
//             </IconButton>
//           </FileInfo>
//         )}

//         {file && (
//           <ButtonContainer>
//             <ModernButton
//               variant="contained"
//               onClick={handleUpload}
//               disabled={isUploading}
//               startIcon={isUploading ? <CircularProgress size={20} sx={{ color: "#ffffff" }} /> : <CloudUploadIcon />}
//             >
//               {isUploading ? "Importing..." : "Import Students"}
//             </ModernButton>

//             <ModernButton variant="outlined" color="error" onClick={handleRemoveFile} disabled={isUploading}>
//               Cancel
//             </ModernButton>
//           </ButtonContainer>
//         )}
//       </ModernPaper>

//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <ModernAlert
//           onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
//           severity={notification.severity}
//         >
//           {notification.message}
//         </ModernAlert>
//       </Snackbar>
//     </ModernContainer>
//   )
// }

// export default CsvUploadDialog
"use client"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { uploadCsvStudent } from "../../services/csvUploadService"
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import DescriptionIcon from "@mui/icons-material/Description"
import GroupAddIcon from "@mui/icons-material/GroupAdd"

const ModernContainer = styled(Container)({
  marginTop: "32px",
  fontFamily: "'Inter', sans-serif",
})

const ModernPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "12px",
  padding: "40px",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  fontFamily: "'Inter', sans-serif",
}))

const ModernTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  fontSize: "28px",
  fontWeight: 700,
  color: theme.palette.text.primary,
  letterSpacing: "-0.5px",
  margin: 0,
  lineHeight: 1,
}))

const ModernSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  fontSize: "16px",
  fontWeight: 400,
  color: theme.palette.text.secondary,
  textAlign: "center",
  marginBottom: "32px",
  lineHeight: 1.6,
}))

const UploadZone = styled(Box)(({ theme, hasFile }) => ({
  border: hasFile ? `2px solid #2d7a7a` : `2px dashed ${theme.palette.divider}`,
  borderRadius: "12px",
  padding: "48px 32px",
  textAlign: "center",
  marginBottom: "24px",
  cursor: "pointer",
  backgroundColor: hasFile ? theme.palette.action.hover : theme.palette.background.default,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
    borderColor: "#2d7a7a",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(45, 122, 122, 0.15)",
  },
}))

const UploadIcon = styled(CloudUploadIcon)({
  fontSize: "48px",
  color: "#2d7a7a",
  marginBottom: "16px",
  filter: "drop-shadow(0 2px 4px rgba(45, 122, 122, 0.2))",
})

const FileInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  padding: "16px 24px",
  backgroundColor: theme.palette.action.hover,
  borderRadius: "8px",
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: "24px",
}))

const FileIcon = styled(DescriptionIcon)({
  color: "#2d7a7a",
  fontSize: "24px",
})

const FileName = styled(Typography)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: theme.palette.text.primary,
  flex: 1,
}))

const FileSize = styled(Typography)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  fontSize: "12px",
  color: theme.palette.text.secondary,
}))

const ModernButton = styled(Button)(({ variant, color }) => ({
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  borderRadius: "8px",
  textTransform: "none",
  padding: "12px 24px",
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
  ...(color === "error" && {
    color: "#dc6545",
    borderColor: "#f4d4c7",
    "&:hover": {
      backgroundColor: "#fef7f4",
      borderColor: "#e8b4a0",
    },
  }),
}))

const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  marginTop: "24px",
})

const HiddenInput = styled("input")({
  display: "none",
})

const ModernAlert = styled(Alert)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  borderRadius: "8px",
  color: theme.palette.text.primary,
  "& .MuiAlert-message": {
    fontWeight: 500,
  },
}))

const CsvUploadDialog = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  })

  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (!selectedFile.name.endsWith(".csv")) {
        setNotification({
          open: true,
          message: "Please select a CSV file",
          severity: "error",
        })
        return
      }
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setNotification({
        open: true,
        message: "No file selected",
        severity: "error",
      })
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Authentication required")

      const response = await uploadCsvStudent(token, formData)

      setNotification({
        open: true,
        message: response.message || "Students imported successfully",
        severity: "success",
      })

      setTimeout(() => {
        setFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
        navigate("/dashboard")
      }, 2000)
    } catch (error) {
      setNotification({
        open: true,
        message: error.message || "Import failed",
        severity: "error",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <ModernContainer maxWidth="md">
      <ModernPaper elevation={0}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            mb: 2,
          }}
        >
          <GroupAddIcon sx={{ fontSize: "28px", color: "#2d7a7a" }} />
          <ModernTitle sx={{ margin: 0 }}>Import Students</ModernTitle>
        </Box>

        <ModernSubtitle>
          Upload a CSV file containing student information to bulk import accounts into the system.
        </ModernSubtitle>

        <UploadZone hasFile={!!file} onClick={() => fileInputRef.current?.click()}>
          <HiddenInput type="file" ref={fileInputRef} onChange={handleFileChange} accept=".csv" />

          <UploadIcon />

          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              fontWeight: 600,
              color: theme.palette.text.primary,
              marginBottom: "8px",
            }}
          >
            {file ? "File Selected" : "Select CSV File"}
          </Typography>

          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: theme.palette.text.secondary,
              marginBottom: "16px",
            }}
          >
            {file ? "Click to change file" : "Click here or drag and drop your CSV file"}
          </Typography>

          <Typography
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: theme.palette.text.secondary,
              fontWeight: 500,
            }}
          >
            Only .csv files are accepted • Max size: 10MB
          </Typography>
        </UploadZone>

        {file && (
          <FileInfo>
            <FileIcon />
            <Box sx={{ flex: 1 }}>
              <FileName>{file.name}</FileName>
              <FileSize>{formatFileSize(file.size)}</FileSize>
            </Box>
            <IconButton
              onClick={handleRemoveFile}
              disabled={isUploading}
              sx={{
                color: "#dc6545",
                "&:hover": {
                  backgroundColor: "#fef7f4",
                },
              }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </FileInfo>
        )}

        {file && (
          <ButtonContainer>
            <ModernButton
              variant="contained"
              onClick={handleUpload}
              disabled={isUploading}
              startIcon={isUploading ? <CircularProgress size={20} sx={{ color: "#ffffff" }} /> : <CloudUploadIcon />}
            >
              {isUploading ? "Importing..." : "Import Students"}
            </ModernButton>

            <ModernButton variant="outlined" color="error" onClick={handleRemoveFile} disabled={isUploading}>
              Cancel
            </ModernButton>
          </ButtonContainer>
        )}
      </ModernPaper>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <ModernAlert
          onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
          severity={notification.severity}
        >
          {notification.message}
        </ModernAlert>
      </Snackbar>
    </ModernContainer>
  )
}

export default CsvUploadDialog
