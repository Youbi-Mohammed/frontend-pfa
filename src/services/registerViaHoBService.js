 //export async function registerViaHoB(token, data) {
//   const response = await fetch("http://localhost:8080/api/auth/registerViaHoB", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json"
//     },
//     //body: data,
//      body: JSON.stringify(data),
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Failed to create the account");
//   }

//   return await response.json();
// }
//////////////////
// const response = await fetch("http://localhost:8080/api/auth/registerViaHoB", {
//   method: "POST",
//   headers: {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//     // Ajoutez ceci pour les problèmes CORS
//     "Accept": "application/json"
//   },
//   body: JSON.stringify(data),
//   credentials: 'include' // Important pour les cookies de session
// })}
// registerViaHoBService.js
// registerViaHoBService.js
// export default async function registerViaHoB(token, data) {
//   console.log("Envoi des données au backend:", data); // Debug 1
  
//   try {
//     const response = await fetch("http://localhost:8080/api/auth/registerViaHoB", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify(data),
//       credentials: "include" // Important pour les cookies de session
//     });

//     console.log("Réponse HTTP:", response.status); // Debug 2

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Erreur backend:", errorText); // Debug 3
//       throw new Error(errorText || "Erreur inconnue du serveur");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Erreur complète:", error); // Debug 4
//     throw error;
//   }
// }
 
// registerViaHoBService.js
export async function registerViaHoB(token, data) {
  try {
    console.log("Envoi au backend:", { token: token.slice(0, 20) + "...", data });
    
    const response = await fetch("http://localhost:8080/api/auth/registerViaHoB", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Status HTTP:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erreur backend:", errorText);
      throw new Error(errorText || "Accès refusé (403)");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur complète:", error);
    throw error;
  }
}

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