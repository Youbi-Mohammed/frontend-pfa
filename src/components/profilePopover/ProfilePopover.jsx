// import React, { useState, useEffect } from "react";
// import {
//   Popover,
//   Box,
//   Typography,
//   IconButton,
//   Avatar,
//   Divider,
//   Button,
//   TextField,
// } from "@mui/material";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { PhotoCamera, Close, Edit, Download } from "@mui/icons-material";
// // import { downLoadProfileImage, getUserById } from "../../services/userService";
// import {  getUserById } from "../../services/userService";

// import { uploadProfileImage } from "../../services/imageService";
// import { updateUserById } from "../../services/userService";
// import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
// import EditProfileDialog from "../dialogs/EditProfileDialog";
// const downLoadProfileImage = async (userId, token) => {
//   try {
//     const response = await fetch(
//       `http://localhost:8080/api/users/${userId}/downloadProfileImage`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     if (!response.ok) {
//       return null;
//     }
//     const image = await response.blob();
//     const url = window.URL.createObjectURL(image);
//     console.log(url);
//     return url;
//   } catch (error) {
//     console.error("Error downloading image:", error);
//     return null;
//   }
// }

// const ProfilePopover = ({ anchorEl, open, onClose, userData, profileImage, setProfileImage }) => {
//   const mode = localStorage.getItem("mode");
//   const token = localStorage.getItem("token");
//   const [isUploading, setIsUploading] = useState(false); // Déclaration manquante
//   const [isAvatarHovered, setIsAvatarHovered] = useState(false);
//    const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');


//   const handleImageChange = async (e) => {
//     if (e.target.files && e.target.files[0]) {
//       try {
//         const updatedUser = await uploadProfileImage(
//           userData.id,
//           e.target.files[0],
//           token
//         );
//         const url = await downLoadProfileImage(userData.id, token);
//         setProfileImage(url);
//       } catch (error) {
//         console.error("Error uploading image", error);
//       }
//     }
//   };
//   // const handleImageChange = async (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     setIsUploading(true);
//   //     try {
//   //       await new Promise(resolve => setTimeout(resolve, 1000));
//   //       const reader = new FileReader();
//   //       reader.onload = (event) => {
//   //         setNewImage(event.target.result);
//   //       };
//   //       reader.readAsDataURL(file);
//   //     } finally {
//   //       setIsUploading(false);
//   //     }
//   //   }
//   // };
   
//      //const token = localStorage.getItem("token");
//      useEffect(() => {
//        const fetchProfileImage = async () => {
//          if (localStorage.getItem("userId")){
//            const imageUrl = await downLoadProfileImage(localStorage.getItem("userId"), token);
//            setProfileImage(imageUrl);
//          }
//        };
   
//        fetchProfileImage();
//      }, [localStorage.getItem("userId"), token]);


//   return (
//     <Popover
//       open={open}
//       anchorEl={anchorEl}
//       onClose={onClose}
//       anchorOrigin={{
//         vertical: "bottom",
//         horizontal: "right",
//       }}
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       sx={{
//         "& .MuiPopover-paper": {
//           borderRadius: "15px",
//           width: window.innerWidth > 550 ? "280px" : "100svw",
//           minHeight: "fit-content",
//           maxHeight: "100vh",
//           backgroundColor: mode === "dark" ? "#121212" : "#f5f5f5",
//           position: "relative",
//           "&::-webkit-scrollbar": {
//             display: "none",
//           },
//         },
//       }}
//     >
//       <Box sx={{ borderRadius: 2 }}>
//         <Box display="flex" justifyContent="flex-end">
//           <IconButton onClick={onClose}>
//             <Close />
//           </IconButton>
//         </Box>
//         <Box
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           gap="10px"
//           p="0 10px 10px 10px"
//         >
//           <div
//             style={{
//               position: "relative",
//             }}
//             onMouseEnter={() => setIsAvatarHovered(true)}
//             onMouseLeave={() => setIsAvatarHovered(false)}
//           >
//             <Avatar 
//             src={profileImage || undefined} 
//             alt={localStorage.getItem("name") || "User"} 
//             sx={{ width: 40, height: 40, mr: 2 }}
//           />
//             <label>
//               <input
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 id="icon-button-file"
//                 type="file"
//                 onChange={handleImageChange}
//               />
//               <IconButton
//                 sx={{
//                   position: "absolute",
//                   bottom: "-10px",
//                   right: "-5px",
//                   color: "lightgray",
//                   display: isAvatarHovered ? "block" : "none",
//                 }}
//                 aria-label="upload picture"
//                 component="span" // Use component="span" to make the IconButton clickable
//                 disableRipple
//               >
//                 <PhotoCamera />
//               </IconButton>
//             </label>
//           </div>
//           {userData && (
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <Typography fontSize={17}>
//                 {localStorage.getItem("name")}
//               </Typography>
//               <Typography color="textSecondary" fontSize={13}>
//                 {localStorage.getItem("email")}
//               </Typography>
//             </div>
//           )}
//           <Divider sx={{ width: "100%" }} />

//           {userData && (
//             <Box
//               sx={{
//                 width: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "10px",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "8px",
//                   alignItems: "start",
//                   width: "100%",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => setOpenEditDialog(true)}
//               >
//                 <BorderColorOutlinedIcon
//                   sx={{
//                     color:
//                       mode === "dark"
//                         ? "rgba(255,255,255,0,85)"
//                         : "rgba(0,0,0,0,85)",
//                   }}
//                 />
//                 <Typography color="textSecondary">Edit Profile</Typography>
//               </div>
//               {/* <Divider sx={{ width: "100%" }} /> */}
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "8px",
//                   width: "100%",
//                   cursor: "pointer",
//                 }}
//               >
//                 {/* <LogoutIcon
//                   sx={{
//                     color:
//                       mode === "dark"
//                         ? "rgba(255,255,255,0,85)"
//                         : "rgba(0,0,0,0,85)",
//                   }}
//                 /> */}
//                 {/* <Typography color="textSecondary">Logout</Typography> */}
//               </div>
//             </Box>
//           )}
//         </Box>
//       </Box>
//       <EditProfileDialog
//         openEditDialog={openEditDialog}
//         handleEditClose={() => setOpenEditDialog(false)}
//         setSnackbarOpen={setSnackbarOpen}
//         setSnackbarMessage={setSnackbarMessage}
//         userData={userData}
//       />
//     </Popover>
//   );
// };
 
// export default ProfilePopover;
import React, { useState, useEffect } from "react";
import {
  Popover,
  Box,
  Typography,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";
import { PhotoCamera, Close } from "@mui/icons-material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import EditProfileDialog from "../dialogs/EditProfileDialog";

// Palette de couleurs teal/turquoise
const colors = {
  teal: "#2d7a7a",
  darkTeal: "#1e5a5a",
  lightTeal: "#6bb6b6",
  pastelTeal: "#a3d5d5",
  background: "#fdfefe",
  border: "#e6f2f2",
  textPrimary: "#1a1a1a",
  textSecondary: "#4a4a4a",
  coral: "#dc6545",
};

const downLoadProfileImage = async (userId, token) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/users/${userId}/downloadProfileImage`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      return null;
    }
    const image = await response.blob();
    const url = window.URL.createObjectURL(image);
    return url;
  } catch (error) {
    console.error("Error downloading image:", error);
    return null;
  }
}

const ProfilePopover = ({ anchorEl, open, onClose, userData, profileImage, setProfileImage }) => {
  const token = localStorage.getItem("token");
  const [isUploading, setIsUploading] = useState(false);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      try {
        // Logique d'upload d'image existante
        // ...
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }
  };
   
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (localStorage.getItem("userId")){
        const imageUrl = await downLoadProfileImage(localStorage.getItem("userId"), token);
        setProfileImage(imageUrl);
      }
    };
    fetchProfileImage();
  }, [localStorage.getItem("userId"), token]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        "& .MuiPopover-paper": {
          borderRadius: "12px",
          width: window.innerWidth > 550 ? "280px" : "100svw",
          minHeight: "fit-content",
          maxHeight: "100vh",
          backgroundColor: colors.background,
          position: "relative",
          border: `1px solid ${colors.border}`,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          "&::-webkit-scrollbar": { display: "none" },
        },
      }}
    >
      <Box sx={{ borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose} sx={{ color: colors.textSecondary }}>
            <Close />
          </IconButton>
        </Box>
        
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="10px"
          p="0 16px 16px 16px"
        >
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setIsAvatarHovered(true)}
            onMouseLeave={() => setIsAvatarHovered(false)}
          >
            <Avatar 
              src={profileImage || undefined} 
              alt={localStorage.getItem("name") || "User"} 
              sx={{ 
                width: 80, 
                height: 80, 
                border: `2px solid ${colors.teal}`,
                backgroundColor: colors.pastelTeal
              }}
            />
            <label>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="icon-button-file"
                type="file"
                onChange={handleImageChange}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: "-10px",
                  right: "-5px",
                  backgroundColor: colors.background,
                  border: `1px solid ${colors.border}`,
                  color: colors.teal,
                  display: isAvatarHovered ? "flex" : "none",
                  "&:hover": {
                    backgroundColor: colors.lightTeal,
                    color: colors.background
                  }
                }}
                aria-label="upload picture"
                component="span"
                disableRipple
              >
                <PhotoCamera fontSize="small" />
              </IconButton>
            </label>
          </div>
          
          {userData && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography fontSize={17} fontWeight={600} color={colors.textPrimary}>
                {localStorage.getItem("name")}
              </Typography>
              <Typography color={colors.textSecondary} fontSize={13}>
                {localStorage.getItem("email")}
              </Typography>
            </div>
          )}
          
          <Divider sx={{ width: "100%", borderColor: colors.border }} />

          {userData && (
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  width: "100%",
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "rgba(107, 182, 182, 0.1)",
                  }
                }}
                onClick={() => setOpenEditDialog(true)}
              >
                <BorderColorOutlinedIcon sx={{ color: colors.teal }} />
                <Typography color={colors.textSecondary}>Edit Profile</Typography>
              </div>
            </Box>
          )}
        </Box>
      </Box>
      
      <EditProfileDialog
        openEditDialog={openEditDialog}
        handleEditClose={() => setOpenEditDialog(false)}
        setSnackbarOpen={setSnackbarOpen}
        setSnackbarMessage={setSnackbarMessage}
        userData={userData}
      />
    </Popover>
  );
};
 
export default ProfilePopover;