import { getUsers } from "./userService";
//////ici au bas ok
// const authenticate = async (
//   email,
//   password,
//   setSnackbarOpen,
//   setSnackbarMessage,
//   setLoading
// ) => {
//   try {
//     const response = await fetch(
//       "http://localhost:8080/api/auth/authenticate",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       }
//     );
//     console.log({ email, password });
//     if (response && response.ok) {
//       const data = await response.json();
//       console.log(data);

//       const users = await getUsers(data.token);
//       users.map((user) => {
//         if (user.email === email) {
//           localStorage.setItem("email", user.email);
//           localStorage.setItem("userId", user.id);
//           localStorage.setItem("branchId", user.branchId);//il ont deja injecter branche dans localstorage alors cest bien fait 
//           localStorage.setItem("studiedBranchId", user.studiedBranchId);
//           localStorage.setItem("team", user.teamId);
//           localStorage.setItem("authorities", JSON.stringify(user.authorities));
//           localStorage.setItem("name", user.firstName + " "+user.lastName);
//           localStorage.setItem("password_changed", user.passwordChanged ? "false" : "true");//je dois changé ca

        
//         }
//       });
//       return data;
//     } else {
//       setSnackbarMessage((await response.json()).message);
//       setSnackbarOpen(true);
//       setLoading(false)
//       return await response.json();
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// };

// export const changeInitialPassword = async ({ temporaryToken, oldPassword, newPassword }) => {
//   try {
//     const response = await fetch("http://localhost:8080/api/auth/change-initial-password", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         temporaryToken,
//         oldPassword,
//         newPassword
//       })
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText || "Erreur lors du changement de mot de passe.");
//     }

//     const data = await response.text(); // Si tu renvoies une simple string côté backend
//     return data;
//   } catch (error) {
//     console.error("Erreur complète:", error);
//     throw error;
//   }
// };
////en haut ok 
const authenticate = async (email, password, setSnackbarOpen, setSnackbarMessage, setLoading) => {
  try {
    const response = await fetch("http://localhost:8080/api/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Réponse du serveur:", data);

    if (!response.ok) {
      throw new Error(data.message || "Échec de l'authentification");
    }

    // Cas où le changement de mot de passe est requis
    if (data.passwordChangeRequired && data.temporaryToken) {
      return {
        requiresPasswordChange: true,
        temporaryToken: data.temporaryToken,
        oldPassword: password // Conservation pour validation
      };
    }

    // Cas de connexion normale
    if (data.token) {
      try {
        const users = await getUsers(data.token);
        const user = users.find(user => user.email === email);
        
        if (user) {
          // localStorage.setItem("token", data.token);
          // localStorage.setItem("email", currentUser.email);
          // localStorage.setItem("userId", currentUser.id);
          // localStorage.setItem("branchId", currentUser.branch?.id || "");
          // localStorage.setItem("studiedBranchId", currentUser.studiedBranch?.id || "");
          // localStorage.setItem("team", currentUser.team?.id || "");
          // localStorage.setItem("authorities", JSON.stringify(currentUser.authorities || []));
          // localStorage.setItem("name", `${currentUser.firstName} ${currentUser.lastName}`);
          // localStorage.setItem("firstLogin", currentUser.firstLogin ? "true" : "false");
          localStorage.setItem("token",data.token);
          localStorage.setItem("email", user.email);
          localStorage.setItem("userId", user.id);
          localStorage.setItem("branchId", user.branchId);//il ont deja injecter branche dans localstorage alors cest bien fait 
          localStorage.setItem("studiedBranchId", user.studiedBranchId);
          localStorage.setItem("team", user.teamId);
          localStorage.setItem("authorities", JSON.stringify(user.authorities));
          localStorage.setItem("name", user.firstName + " "+user.lastName);
          localStorage.setItem("password_changed", user.passwordChanged ? "false" : "true");//je dois changé ca

        }
      } catch (error) {
        console.warn("Erreur lors de la récupération des données utilisateur:", error);
        // On continue quand même avec le token si la récupération échoue
        localStorage.setItem("token", data.token);
      }
      
      return { success: true, token: data.token };
    }

    throw new Error("Réponse inattendue du serveur");

  } catch (error) {
    console.error("Erreur d'authentification:", error);
    setSnackbarMessage(error.message);
    setSnackbarOpen(true);
    throw error;
  } finally {
    setLoading(false);
  }
};
const changeInitialPassword = async (temporaryToken, oldPassword, newPassword) => {
  try {
    const response = await fetch("http://localhost:8080/api/auth/change-initial-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        temporaryToken,
        oldPassword,
        newPassword
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Échec du changement de mot de passe");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur:", error);
    throw error;
  }
};


///// ici ca marche vers le bas jusqua ligne 133
// import { getUsers } from "./userService";

// import { getUsers } from "./userService";
//////khdaama lt7t 7ed str 88

// export const authenticate = async (email, password, setSnackbarOpen, setSnackbarMessage, setLoading) => {
//   try {
//     const response = await fetch("http://localhost:8080/api/auth/authenticate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       // Gestion spécifique de l'erreur "User not found"
//       if (data.message && data.message.includes("User not found")) {
//         throw new Error("Email ou mot de passe incorrect");
//       }
//       throw new Error(data.message || "Échec de l'authentification");
//     }

//     return data;

//   } catch (error) {
//     console.error("Erreur d'authentification:", error);
//     setSnackbarMessage(error.message);
//     setSnackbarOpen(true);
//     throw error;
//   } finally {
//     setLoading(false);
//   }
// };

////////lfou9 khdama 
//import { getUsers } from "./userService";

// export const authenticate = async (
//   email,
//   password,
//   setSnackbarOpen,
//   setSnackbarMessage,
//   setLoading
// ) => {
//   try {
//     const response = await fetch(
//       "http://localhost:8080/api/auth/authenticate",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       setSnackbarMessage(data.message || "Échec de l'authentification");
//       setSnackbarOpen(true);
//       return data;
//     }

//     // Cas où un changement de mot de passe est requis
//     if (data.passwordChangeRequired) {
//       return {
//         passwordChangeRequired: true,
//         temporaryToken: data.temporaryToken,
//         oldPassword: password // On conserve l'ancien mot de passe pour la validation
//       };
//     }

//     // Cas normal - récupération des données utilisateur
//     if (data.token) {
//       const users = await getUsers(data.token);
//       const currentUser = users.find(user => user.email === email);
      
//       if (currentUser) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("email", currentUser.email);
//         localStorage.setItem("userId", currentUser.id);
//         localStorage.setItem("branchId", currentUser.branchId);
//         localStorage.setItem("studiedBranchId", currentUser.studiedBranchId);
//         localStorage.setItem("team", currentUser.teamId);
//         localStorage.setItem("authorities", JSON.stringify(currentUser.authorities));
//         localStorage.setItem("name", currentUser.firstName + " " + currentUser.lastName);
//       }

//       return data;
//     }

//     return data;

//   } catch (error) {
//     console.error("Erreur:", error);
//     setSnackbarMessage("Erreur de connexion au serveur");
//     setSnackbarOpen(true);
//     throw error;
//   } finally {
//     setLoading(false);
//   }
// };
//// ce qui etait en haut ca marche 
// const authenticate = async (
//   email,
//   password,
//   setSnackbarOpen,
//   setSnackbarMessage,
//   setLoading
// ) => {
//   try {
//     setLoading(true);
    
//     // 1. Authentification initiale
//     const authResponse = await fetch("http://localhost:8080/api/auth/authenticate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     // 2. Vérifier la réponse
//     if (!authResponse.ok) {
//       const errorData = await authResponse.json();
//       setSnackbarMessage(errorData.message || "Échec de l'authentification");
//       setSnackbarOpen(true);
//       setLoading(false);
//       return null;
//     }

//     // 3. Parser la réponse
//     const authData = await authResponse.json();
//     console.log("Réponse d'authentification:", authData);

//     // 4. Cas où le changement de mot de passe est requis
//     if (authData.passwordChangeRequired) {
//       return {
//         requiresPasswordChange: true,
//         temporaryToken: authData.temporaryToken,
//         email: email // On garde l'email pour le réutiliser
//       };
//     }

//     // 5. Cas normal (mot de passe déjà changé)
//     // Stocker le token immédiatement
//     localStorage.setItem("token", authData.token);

//     // Récupérer les infos utilisateur
//     try {
//       const users = await getUsers(authData.token);
//       const currentUser = users.find(user => user.email === email);
      
//       if (currentUser) {
//         localStorage.setItem("email", currentUser.email);
//         localStorage.setItem("userId", currentUser.id);
//         localStorage.setItem("branchId", currentUser.branchId);
//         localStorage.setItem("studiedBranchId", currentUser.studiedBranchId);
//         localStorage.setItem("team", currentUser.teamId);
//         localStorage.setItem("authorities", JSON.stringify(currentUser.authorities));
//         localStorage.setItem("name", `${currentUser.firstName} ${currentUser.lastName}`);
//       }
      
//       return authData;
//     } catch (error) {
//       console.error("Erreur lors de la récupération des utilisateurs:", error);
//       return authData; // On retourne quand même les données d'authentification
//     }

//   } catch (error) {
//     console.error("Erreur d'authentification:", error);
//     setSnackbarMessage(error.message || "Une erreur est survenue");
//     setSnackbarOpen(true);
//     setLoading(false);
//     return null;
//   } finally {
//     setLoading(false);
//   }
// };

// // Nouvelle fonction pour le changement de mot de passe initial
// const changeInitialPassword = async (
//   temporaryToken,
//   oldPassword,
//   newPassword,
//   setSnackbarOpen,
//   setSnackbarMessage,
//   setLoading
// ) => {
//   try {
//     setLoading(true);
    
//     const response = await fetch("http://localhost:8080/api/auth/change-initial-password", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         temporaryToken,
//         oldPassword,
//         newPassword
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       setSnackbarMessage(errorData.message || "Échec du changement de mot de passe");
//       setSnackbarOpen(true);
//       setLoading(false);
//       return null;
//     }

//     const result = await response.json();
//     setSnackbarMessage("Mot de passe changé avec succès");
//     setSnackbarOpen(true);
    
//     return result;

//   } catch (error) {
//     console.error("Erreur lors du changement de mot de passe:", error);
//     setSnackbarMessage(error.message || "Erreur lors du changement de mot de passe");
//     setSnackbarOpen(true);
//     return null;
//   } finally {
//     setLoading(false);
//   }
// };



const register = async (data,setSnackbarMessage,setSnackbarOpen,setLoading) => {
  const response = await fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    body: data,
  });
  try {
    if (response.ok) {
      setSnackbarMessage("Registration was made successfully");
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage((await response.json()).message);
      setSnackbarOpen(true);
    }
  } catch (error) {
    console.error("Error during registration:", error);
    setSnackbarMessage("Error during registration");
    setSnackbarOpen(true);
  } finally {
    setLoading(false);
  }

  return response;
};

const acceptUser = async (token, id,setSnackbarOpen,setSnackbarMessage,setConfirmLoading) => {
  console.log(id);
  const response = await fetch(`http://localhost:8080/api/auth/accept?user=${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });
  if (response.ok) {
    setSnackbarMessage("User accepted successfully");
    setSnackbarOpen(true);
    setConfirmLoading(false);
    return await response.json();
  } else {
    setSnackbarMessage("Error accepting user");
    setSnackbarOpen(true);
    setConfirmLoading(false);
    throw new Error("Error accepting user");
  }
}

const rejectUser = async (token,id ,setSnackbarOpen,setSnackbarMessage,setConfirmLoading) => {
  console.log(id);

  const response = await fetch(`http://localhost:8080/api/auth/reject?user=${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });
  if (response.ok) {
    setSnackbarMessage("User rejected successfully");
    setSnackbarOpen(true);
    setConfirmLoading(false);
    return await response.json();
  } else {
    setSnackbarMessage("Error rejecting user");
    setSnackbarOpen(true);
    setConfirmLoading(false);
    throw new Error("Error rejecting user");
  }
  
}

const forgotPassword = async (email, setSnackbarOpen, setSnackbarMessage,setLoading,setActiveStep) => {
  const response = await fetch("http://localhost:8080/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: email,
  });

  if (response.ok) {
    setSnackbarMessage("Email sent successfully");
    setSnackbarOpen(true);
    setLoading(false);
    console.log("Email sent successfully");
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log("after the setActiveStep");


  } else {
    setSnackbarMessage("Error sending password reset email");
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

    setSnackbarOpen(true);
    setLoading(false);
  }
};

const validateToken = async (email,token,setSnackBarOpen,setSnackbarMessage,setLoading,setActiveStep) => {
  const response = await fetch(`http://localhost:8080/api/auth/validate-token?token=${token}&email=${email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(await response.json());
  if (response.ok) {
    setSnackBarOpen(true);
    setSnackbarMessage("Token is valid");
    setLoading(false);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  } else {
    setSnackBarOpen(true);
    setSnackbarMessage("Token is invalid");
    setLoading(false);
  }
}

const resetPassword = async (token,password,setSnackBarOpen,setSnackbarMessage,setLoading) => {
  const response = await fetch(`http://localhost:8080/api/auth/reset-password?token=${token}&password=${password}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    setSnackBarOpen(true);
    setSnackbarMessage("Password reset successfully");
    setLoading(false);
  } else {
    setSnackBarOpen(true);
    setSnackbarMessage("Error resetting password");
    setLoading(false);
  }
}
//authenticate deja exporter 
export { authenticate, changeInitialPassword,register, acceptUser, rejectUser, forgotPassword ,resetPassword,validateToken};
// export {  register, acceptUser, rejectUser, forgotPassword ,resetPassword,validateToken};