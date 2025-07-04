// import React from "react";
// import {
//   Typography,
//   Container,
//   Grid,
//   Box,
//   Card,
//   CardContent,
//   Button,
//   CardMedia,
// } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";
// import CoPresentIcon from "@mui/icons-material/CoPresent";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import GroupIcon from "@mui/icons-material/Group";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import { useTheme } from "@mui/material/styles";
// import { hasRole } from "../../utils/userUtiles";

// function Home() {
//   const mode = localStorage.getItem("mode") || "light";
//   const isStudent = hasRole("ROLE_STUDENT"); 
//   const theme = useTheme();

//   return (
//     <Box
//       style={{
//         minHeight: "calc(100vh - 64px)",
//         padding: "50px 20px",
//       }}
//     >
//       <Container>
//         <Grid container spacing={4} alignItems="center">
//           <Grid item xs={12} md={6}>
//             <Typography variant="h3" gutterBottom>
//               Welcome to PFA Management App
//             </Typography>
//             <Typography variant="h6" paragraph>
//               Streamline your project management and collaboration with ease.
//             </Typography>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             {/* Place for an image */}
//             <Box
//               sx={{
//                 width: "100%",
//                 borderRadius: "8px",
//                 display: "flex",
//                 justifyContent: {
//                   xs: "center",
//                   md: "flex-end",

//                 },
//               }}
//             >
//               <Box sx={{
//                 width: {
//                   xs: "100%",
//                   sm: "65%",
//                 },
//               }}>
//                 <img
//                   src="/src/assets/project-management.png"
//                   alt="Home"
//                   style={{
//                     width: "100%",
//                     borderRadius: "8px",
//                   }}
//                 />
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>

//          <Grid container spacing={4} sx={{ mt: 4 }}>
         
//           <Grid item xs={12}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h5" component="div" gutterBottom>
//                   Continue to the App
//                 </Typography>
//                 <Grid container spacing={2} sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                 }}>
//                   <Grid item xs={6} md={3}>
//                     <Button
//                       component={RouterLink}
//                       to={isStudent ? "/dashboard" : "/dashboard"}
//                       variant="outlined"
//                       fullWidth
//                       startIcon={<DashboardIcon />}
//                     >
//                       Click Here to Continue
//                     </Button>
//                   </Grid>
                  
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid> 

//         {/* About Section */}
//         <Grid container spacing={4} sx={{ mt: 4 }}>
//           <Grid item xs={12}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h5" component="div" gutterBottom>
//                   About
//                 </Typography>
//                 <Typography variant="body1" paragraph>
//                   Welcome to the PFA Management App, designed to streamline your
//                   project management and collaboration efforts with intuitive
//                   tools and features.
//                 </Typography>
//                 <Typography variant="body1" paragraph>
//                   Our mission is to simplify the complexities of project
//                   management, ensuring teams stay organized and productive. With
//                   a user-friendly interface and powerful functionalities,
//                   managing projects has never been easier.
//                 </Typography>
//                 <Typography variant="h6" gutterBottom>
//                   Key Features:
//                 </Typography>
//                 <Typography variant="body1" paragraph>
//                   <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                     <DashboardIcon sx={{ mr: 1 }} />
//                     Dashboard for quick overview and insights.
//                   </Box>
//                   <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                     <AssignmentIcon sx={{ mr: 1 }} />
//                     Project management tools to plan, track, and execute tasks
//                     efficiently.
//                   </Box>
//                   <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                     <GroupIcon sx={{ mr: 1 }} />
//                     Team collaboration features to enhance teamwork and
//                     communication.
//                   </Box>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <NotificationsActiveIcon sx={{ mr: 1 }} />
//                     Notifications and updates to keep everyone informed and
//                     aligned.
//                   </Box>
//                 </Typography>
//                 {/* YouTube Video Demo */}
//                 {/* <Box
//                   sx={{
//                     position: "relative",
//                     paddingTop: "56.25%", // 16:9 aspect ratio (for YouTube videos)
//                     mt: 4,
//                   }}
//                 > */}
//                    {/* a retiré */}
//                   {/* <CardMedia
//                     component="iframe"
//                     src="https://www.youtube.com/embed/nGOy37YAE7g"
//                     title="Demo Video"
//                     sx={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       width: "100%",
//                       height: "100%",
//                     }}
//                   /> */}
//                 {/* </Box> */}
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

// export default Home;
// import React from "react";
// import {
//   Typography,
//   Container,
//   Grid,
//   Box,
//   Button,
//   useTheme,
//   Paper,
//   Avatar
// } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";
// import SchoolIcon from "@mui/icons-material/School";
// import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
// import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import { LayoutDashboard, ArrowRight } from "lucide-react"

// function Home() {
//   const theme = useTheme();
//   const isDarkMode = theme.palette.mode === "dark";

//   // Palette teal/turquoise professionnelle
//   const colors = {
//     primary: isDarkMode ? "#2d7a7a" : "#1e5a5a",
//     primaryLight: isDarkMode ? "#4a9a9a" : "#2d7a7a",
//     background: isDarkMode ? "#121212" : "#f8fafa",
//     textPrimary: isDarkMode ? "#f0fafa" : "#1a1a1a",
//     textSecondary: isDarkMode ? "#cce6e6" : "#2d2d2d",
//     paper: isDarkMode ? "#1e2e2e" : "#ffffff",
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         backgroundColor: colors.background,
//         backgroundImage: isDarkMode
//           ? "linear-gradient(135deg, #0a1a1a 0%, #121212 100%)"
//           : "linear-gradient(135deg, #e0f2f1 0%, #f8fafa 100%)",
//         p: 4,
//         transition: "all 0.3s ease",
//       }}
//     >
//       <Container maxWidth="md">
//         {/* Header */}
//         <Box textAlign="center" mb={6}>
//           <Typography
//             variant="h3"
//             component="h1"
//             sx={{
//               fontWeight: 700,
//               color: colors.textPrimary,
//               mb: 2,
//               fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
//             }}
//           >
//             Academic Project Management
//           </Typography>
//           <Typography
//             variant="h6"
//             component="p"
//             sx={{
//               color: colors.textSecondary,
//               maxWidth: "700px",
//               margin: "0 auto",
//               fontSize: { xs: "1rem", md: "1.1rem" },
//             }}
//           >
//             Streamline project workflows for students, supervisors, and administrators
//           </Typography>
//         </Box>

//         {/* Role Selection Cards - Version simplifiée */}
//         <Grid container spacing={3} justifyContent="center" mb={8}>
//           {/* Head of Branch */}
//           <Grid item xs={12} sm={6} md={4}>
//             {/* <Button
//               component={RouterLink}
//               to="/dashboard"
//               variant="contained"
//               fullWidth
//               sx={{
//                 height: "100px",
//                 backgroundColor: colors.primary,
//                 color: "#fff",
//                 borderRadius: "12px",
//                 "&:hover": {
//                   backgroundColor: colors.primaryLight,
//                   transform: "translateY(-3px)",
//                   boxShadow: `0 5px 15px ${isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(30, 90, 90, 0.2)"}`,
//                 },
//                 transition: "all 0.3s ease",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 gap: "10px",
//                 p: 2,
//               }}
//             >
//               <AdminPanelSettingsIcon sx={{ fontSize: 40 }} />
//               <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                 Continue To the App
//               </Typography>
//             </Button> */}
//             <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
//       <Button
//         size="lg"
//         className="group relative h-16 px-8 text-lg font-semibold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
//       >
//         {/* Effet de brillance animé */}
//         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

//         {/* Contenu du bouton */}
//         <div className="relative flex items-center">
//           <LayoutDashboard className="w-6 h-6 mr-3 animate-pulse" />
//           Visit Your Dashboard
//           <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
//         </div>
//       </Button>
//     </div>
//           </Grid>
//           </Grid>

        

//         {/* Platform Description */}
//         <Paper
//           elevation={0}
//           sx={{
//             backgroundColor: isDarkMode ? "rgba(30, 46, 46, 0.5)" : "rgba(255, 255, 255, 0.7)",
//             borderRadius: "12px",
//             p: 4,
//             textAlign: "center",
//             backdropFilter: "blur(5px)",
//             border: `1px solid ${isDarkMode ? "#2d7a7a" : "#d1e7e7"}`,
//           }}
//         >
//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: 600,
//               color: colors.textPrimary,
//               mb: 3,
//             }}
//           >
//             Comprehensive Academic Project Management
//           </Typography>
          
//           <Typography
//             variant="body1"
//             sx={{
//               color: colors.textSecondary,
//               maxWidth: "800px",
//               margin: "0 auto",
//               mb: 3,
//               lineHeight: 1.7,
//             }}
//           >
//             Our platform provides a centralized solution for managing the entire lifecycle of academic projects. 
//             From proposal submission to final evaluation, we streamline communication, document sharing, 
//             and progress tracking for all stakeholders in the educational process.
//           </Typography>
//         </Paper>
//       </Container>
//     </Box>
//   );
// }

// export default Home;
import React from "react";
import {
  Typography,
  Container,
  Grid,
  Box,
  Button,
  useTheme,
  Paper,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { LayoutDashboard, ArrowRight } from "lucide-react";

function Home() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  // Palette teal/turquoise professionnelle
  const colors = {
    primary: isDarkMode ? "#2d7a7a" : "#1e5a5a",
    primaryLight: isDarkMode ? "#4a9a9a" : "#2d7a7a",
    background: isDarkMode ? "#121212" : "#f8fafa",
    textPrimary: isDarkMode ? "#f0fafa" : "#1a1a1a",
    textSecondary: isDarkMode ? "#cce6e6" : "#2d2d2d",
    paper: isDarkMode ? "#1e2e2e" : "#ffffff",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: colors.background,
        backgroundImage: isDarkMode
          ? "linear-gradient(135deg, #0a1a1a 0%, #121212 100%)"
          : "linear-gradient(135deg, #e0f2f1 0%, #f8fafa 100%)",
        p: 4,
        transition: "all 0.3s ease",
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              color: colors.textPrimary,
              mb: 2,
              fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
            }}
          >
            Academic Project Management
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              color: colors.textSecondary,
              maxWidth: "700px",
              margin: "0 auto",
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            Streamline project workflows for students, supervisors, and administrators
          </Typography>
        </Box>

        {/* Dashboard Button with Lucide Icons */}
        <Box display="flex" justifyContent="center" mb={8}>
          <Button
            component={RouterLink}
            to="/dashboard"
            variant="contained"
            sx={{
              height: "80px",
              width: "300px",
              backgroundColor: colors.primary,
              color: "#fff",
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: colors.primaryLight,
                transform: "translateY(-3px)",
                boxShadow: `0 5px 15px ${isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(30, 90, 90, 0.2)"}`,
              },
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Shimmer effect */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                transform: "translateX(-100%)",
                transition: "transform 0.6s",
                "&:hover": {
                  transform: "translateX(100%)",
                },
              }}
            />
            
            {/* Button content */}
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                position: "relative",
                 whiteSpace: "nowrap",
              }}
            >
              <LayoutDashboard
                size={24}
                style={{
                  marginRight: "12px",
                  animation: "pulse 2s infinite",
                  
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Go To Your Dashboard
              </Typography>
              <ArrowRight
                size={20}
                style={{
                  marginLeft: "12px",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateX(4px)",
                  },
                }}
              />
            </Box> */}
            {/* Button content */}
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    whiteSpace: "nowrap", // Ajouté pour empêcher le retour à la ligne
  }}
>
  <LayoutDashboard
    size={24}
    style={{
      marginRight: "12px",
      animation: "pulse 2s infinite",
    }}
  />
  <Typography variant="h6" sx={{ fontWeight: 600, textTransform: 'none' }}>
    Go To Your Dashboard
  </Typography>
  <ArrowRight
    size={20}
    style={{
      marginLeft: "12px",
      transition: "transform 0.2s",
    }}
    sx={{
      "&:hover": {
        transform: "translateX(4px)",
      },
    }}
  />
</Box>
          </Button>
        </Box>

        {/* Platform Description */}
        <Paper
          elevation={0}
          sx={{
            backgroundColor: isDarkMode ? "rgba(30, 46, 46, 0.5)" : "rgba(255, 255, 255, 0.7)",
            borderRadius: "12px",
            p: 4,
            textAlign: "center",
            backdropFilter: "blur(5px)",
            border: `1px solid ${isDarkMode ? "#2d7a7a" : "#d1e7e7"}`,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: colors.textPrimary,
              mb: 3,
            }}
          >
            Comprehensive Academic Project Management
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: colors.textSecondary,
              maxWidth: "800px",
              margin: "0 auto",
              mb: 3,
              lineHeight: 1.7,
            }}
          >
            Our platform provides a centralized solution for managing the entire lifecycle of academic projects. 
            From proposal submission to final evaluation, we streamline communication, document sharing, 
            and progress tracking for all stakeholders in the educational process.
          </Typography>
        </Paper>
      </Container>

      {/* Add the pulse animation to the global styles */}
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      `}</style>
    </Box>
  );
}

export default Home;