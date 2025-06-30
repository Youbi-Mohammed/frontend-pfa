import { getUsers } from "./userService";

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
          // Stocker les informations de l'utilisateur dans le localStorage
          localStorage.setItem("token",data.token);
          localStorage.setItem("email", user.email);
          localStorage.setItem("userId", user.id);
          localStorage.setItem("branchId", 1);//il ont deja injecter branche dans localstorage alors cest bien fait 
          localStorage.setItem("studiedBranchId", user.studiedBranchId);
          localStorage.setItem("team", user.teamId);
          localStorage.setItem("authorities", JSON.stringify(user.authorities));
          localStorage.setItem("name", user.firstName + " "+user.lastName);
          localStorage.setItem("firstName", user.firstName);
          localStorage.setItem("lastName", user.lastName);
          localStorage.setItem("password_changed", user.passwordChanged ? "false" : "true");//je dois changé ca
          localStroage.setItem("mode","light")//pour gerer le beug du mode dark et light 

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
// Extraire l'email du token avant de retourner la réponse
    const tokenData = JSON.parse(atob(temporaryToken.split('.')[1]));
    const userEmail = tokenData.sub;
    return { 
      ...await response.json(),
      userEmail 
    };

  } catch (error) {
    console.error("Erreur:", error);
    throw error;
  }
};




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

const resetPassword = async (token, newPassword, setSnackbarOpen, setSnackbarMessage, setLoading) => {
  try {
    const response = await fetch(`http://localhost:8080/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        password: newPassword // hna khsni ndir password li kayn f request dyal reset password , ntesti 7ta bsmia dyal variable f front 3la lah 
        // jai vu dans le test de islam que c'est password
        //mochkil kan ghir hna makanch ysift data f body dyal request
   
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Échec de la réinitialisation");
    }

    const data = await response.json();
    setSnackbarMessage(data.message || "Mot de passe réinitialisé avec succès");
    setSnackbarOpen(true);
    return true;

  } catch (error) {
    console.error("Reset password error:", error);
    setSnackbarMessage(error.message || "Erreur serveur");
    setSnackbarOpen(true);
    return false;
  } finally {
    setLoading(false);
  }
};
// src/services/authService.js

const logout = () => {
  try {
    // Supprimez toutes les données d'authentification
    localStorage.removeItem('token');
    
          localStorage.removeItem("email");
          localStorage.removeItem("userId");
          localStorage.removeItem("branchId");//il ont deja injecter branche dans localstorage alors cest bien fait 
          localStorage.removeItem("studiedBranchId");
          localStorage.removeItem("team");
          localStorage.removeItem("authorities");
          localStorage.removeItem("name");
          localStorage.removeItem("password_changed");//je dois changé ca
          localStroage.removeItem("mode")//pour gerer le beug du mode dark et light 

   
    sessionStorage.clear();// t2kiiiiiiiiid
    
    // Optionnel : Envoyer une requête au serveur pour invalider le token
    // await axios.post('/api/auth/logout');
    
    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
};
//authenticate deja exporter 
export { authenticate, changeInitialPassword,register, acceptUser, rejectUser, forgotPassword ,resetPassword,validateToken,logout};
