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
import React, { useState, useRef } from 'react';
import { uploadCsvStudent } from '../../services/csvUploadService';

const CsvUploadDialog = ({ onUploadSuccess, onUploadError }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', isError: false });
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setNotification({ show: false, message: '', isError: false });
  };

  const handleSubmit = async () => {
    if (!file) {
      setNotification({ show: true, message: 'No file selected', isError: true });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token missing');
      }

      const response = await uploadCsvStudent(token, formData);
      
      setNotification({
        show: true,
        message: response.message || 'CSV file uploaded successfully',
        isError: false
      });

      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

      if (onUploadSuccess) onUploadSuccess(response);
    } catch (error) {
      console.error('Error during upload:', error);
      setNotification({
        show: true,
        message: error.message || 'Error uploading the file',
        isError: true
      });
      if (onUploadError) onUploadError(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Upload a CSV File</h2>
      
      <div style={styles.uploadSection}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv"
          style={{ display: 'none' }}
        />
        <button
          onClick={() => fileInputRef.current.click()}
          style={styles.selectButton}
        >
          Select a CSV File
        </button>
        
        {file && (
          <div style={styles.fileInfo}>
            <span>{file.name}</span>
            <button 
              onClick={() => setFile(null)}
              style={styles.clearButton}
            >
              ×
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!file || isUploading}
        style={{
          ...styles.uploadButton,
          backgroundColor: isUploading ? '#ff9800' : '#4caf50',
          cursor: isUploading ? 'wait' : 'pointer'
        }}
      >
        {isUploading ? 'Uploading...' : 'Upload File'}
      </button>

      {notification.show && (
        <div style={{
          ...styles.notification,
          backgroundColor: notification.isError ? '#ffebee' : '#e8f5e9',
          color: notification.isError ? '#c62828' : '#2e7d32'
        }}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  title: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: '20px'
  },
  uploadSection: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  selectButton: {
    padding: '10px 15px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  fileInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px'
  },
  clearButton: {
    background: 'none',
    border: 'none',
    color: '#f44336',
    cursor: 'pointer',
    fontSize: '16px'
  },
  uploadButton: {
    padding: '10px 20px',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    width: '100%'
  },
  notification: {
    padding: '12px',
    borderRadius: '4px',
    marginTop: '20px',
    borderLeft: '4px solid currentColor'
  }
};

export default CsvUploadDialog;