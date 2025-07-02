import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar/NavBar.jsx";
// import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";
import SideBar from "../components/sideBar/SideBar.jsx";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MainLayout = ({ mode, setMode }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/auth/authenticate");
      return;
    }
  }, [navigate]);
  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 900) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  

  return (
    <div className="app" style={{ height: "100%", minHeight: "100svh" }}>
      <NavBar handleDrawerOpen={handleDrawerOpen} setMode={setMode} />
      <Box
        sx={{

          // backgroundColor: mode === "light" ? "#f5f6fa" : "#121212",
          marginLeft: window.innerWidth <= 900 ? 0 : open ? "230px" : "0px",
          transition: "margin-left 0.2s ease",
        }}
      >
        <Box
          className="container"
          sx={{
            height: "100%",
            minHeight: "100svh",
            padding: { xs: "80px 10px 10px 10px", md: "80px 20px 20px 20px" },
          }}
        >
          <Outlet />
        </Box>
        <div
          style={{
            backgroundColor: mode === "light" ? "#f5f6fa" : "#121212",
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
          }}
        >
          <Footer />
        </div>
      </Box>
      <SideBar open={open} mode={mode} handleDrawerClose={handleDrawerClose} />
    </div>
  );
};

export default MainLayout;
// import { Outlet } from "react-router-dom";
// import NavBar from "../components/navBar/NavBar.jsx";
// import Footer from "../components/footer/Footer";
// import SideBar from "../components/sideBar/SideBar.jsx";
// import { useEffect, useState } from "react";
// import { 
//   Box, 
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   useTheme,
//   useMediaQuery
// } from "@mui/material";
// import { useNavigate, Link as RouterLink } from "react-router-dom";
// import {
//   Dashboard as DashboardIcon,
//   Assignment as AssignmentIcon,
//   Group as GroupIcon,
//   CoPresent as PresentationIcon,
//   Lightbulb as MotivationIcon,
//   CalendarToday as CalendarIcon
// } from "@mui/icons-material";

// const MainLayout = ({ mode, setMode }) => {
//   const [open, setOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const navigate = useNavigate();
  
//   // Mock user data
//   const user = { firstName: "User", role: "student" }; // Change to actual user data
//   const isStudent = user.role === "student";

//   // Motivational quotes
//   const motivationalQuotes = [
//     "Success is the sum of small efforts repeated daily.",
//     "The only limit to our realization of tomorrow is our doubts of today.",
//     "Your project today is your achievement tomorrow.",
//     "Collaboration is the key to innovative solutions."
//   ];

//   useEffect(() => {
//     if (localStorage.getItem("token") === null) {
//       navigate("/auth/authenticate");
//       return;
//     }
//   }, [navigate]);

//   useEffect(() => {
//     setOpen(!isMobile);
//   }, [isMobile]);

//   const handleDrawerToggle = () => {
//     setOpen(!open);
//   };
//     const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ 
//       display: 'flex',
//       minHeight: '100vh',
//       backgroundColor: theme.palette.background.default
//     }}>
//             <NavBar handleDrawerOpen={handleDrawerOpen} setMode={setMode} />

//       {/* Sidebar */}
//       <SideBar open={open} mode={mode} handleDrawerClose={() => setOpen(false)} />
      
//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: `calc(100% - ${open ? 240 : 0}px)`,
//           transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//           }),
//           ml: { sm: `${open ? 240 : 0}px` },
//         }}
//       >
       
        
//         {/* Welcome Dashboard */}
//         <Box sx={{ 
//           pt: { xs: '70px', sm: '20px' },
//           maxWidth: '1600px',
//           mx: 'auto'
//         }}>
//           {/* Welcome Card */}
//           <Card sx={{ 
//             mb: 3,
//             background: theme.palette.mode === 'dark'
//               ? 'linear-gradient(135deg, #2c3e50 0%, #4a6491 100%)'
//               : 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
//             color: theme.palette.common.white,
//             boxShadow: theme.shadows[4]
//           }}>
//             <CardContent>
//               <Grid container spacing={2} alignItems="center">
//                 <Grid item xs={12} md={8}>
//                   <Typography variant="h4" gutterBottom>
//                     Welcome to PFA Management App
//                   </Typography>
//                   <Typography variant="body1" sx={{ mb: 2 }}>
//                     {motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}
//                   </Typography>
//                   <Typography variant="body2">
//                     Today is {new Date().toLocaleDateString('en-US', { 
//                       weekday: 'long', 
//                       year: 'numeric', 
//                       month: 'long', 
//                       day: 'numeric' 
//                     })}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12} md={4} sx={{ 
//                   display: 'flex',
//                   justifyContent: 'center'
//                 }}>
//                   <MotivationIcon sx={{ fontSize: 80, opacity: 0.8 }} />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>

//           {/* Quick Links */}
//           <Grid container spacing={3} sx={{ mt: 2 }}>
//             <Grid item xs={12}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6" component="div" gutterBottom>
//                     Quick Access
//                   </Typography>
//                   <Grid container spacing={2}>
//                     <Grid item xs={6} sm={3}>
//                       <Button
//                         component={RouterLink}
//                         to={isStudent ? "/dashboard/project/team" : "/dashboard/projects"}
//                         variant="outlined"
//                         fullWidth
//                         startIcon={<DashboardIcon />}
//                         sx={{ py: 1.5 }}
//                       >
//                         Dashboard
//                       </Button>
//                     </Grid>
//                     <Grid item xs={6} sm={3}>
//                       <Button
//                         component={RouterLink}
//                         to="/dashboard/projects"
//                         variant="outlined"
//                         fullWidth
//                         startIcon={<AssignmentIcon />}
//                         sx={{ py: 1.5 }}
//                       >
//                         Projects
//                       </Button>
//                     </Grid>
//                     {isStudent && (
//                       <Grid item xs={6} sm={3}>
//                         <Button
//                           component={RouterLink}
//                           to="/dashboard/team"
//                           variant="outlined"
//                           fullWidth
//                           startIcon={<GroupIcon />}
//                           sx={{ py: 1.5 }}
//                         >
//                           Team
//                         </Button>
//                       </Grid>
//                     )}
//                     <Grid item xs={6} sm={3}>
//                       <Button
//                         component={RouterLink}
//                         to="/dashboard/presentations"
//                         variant="outlined"
//                         fullWidth
//                         startIcon={<PresentationIcon />}
//                         sx={{ py: 1.5 }}
//                       >
//                         Presentations
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>

         
//           {/* Child routes content */}
//           <Box sx={{ mt: 3 }}>
//             <Outlet />
//           </Box>
//         </Box>
        
//         {/* Footer */}
//         <Footer />
//       </Box>
//     </Box>
//   );
// };

// export default MainLayout;