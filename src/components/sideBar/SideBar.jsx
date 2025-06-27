// import AssignmentIcon from "@mui/icons-material/Assignment";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import CoPresentIcon from "@mui/icons-material/CoPresent";
// import FolderCopyIcon from "@mui/icons-material/FolderCopy";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
// import QueryStatsIcon from "@mui/icons-material/QueryStats";
// import SchoolIcon from "@mui/icons-material/School";
// import SettingsIcon from "@mui/icons-material/Settings";
// import SubjectIcon from "@mui/icons-material/Subject";
// import ViewWeekIcon from "@mui/icons-material/ViewWeek";
// import { Collapse, ListItemButton, Typography } from "@mui/material";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import ListSubheader from "@mui/material/ListSubheader";
// import Tooltip from "@mui/material/Tooltip";
// import { useTheme } from "@mui/material/styles";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { hasRole } from "../../utils/userUtiles";
// import { DrawerHeader, StyledDrawer } from "./sideBar";
// import { getAllProjects } from "../../services/projectService";
// import { ExpandCircleDown, PeopleOutline } from "@mui/icons-material";
// import FolderCopyRoundedIcon from "@mui/icons-material/FolderCopyRounded";
// import AccountTreeIcon from '@mui/icons-material/AccountTree';
// const studentStuff = [
//   { id: 0, text: "BackLog", icon: <SubjectIcon />, path: "/dashboard/project/backlog" },
//   { id: 1, text: "Board", icon: <ViewWeekIcon />, path: "/dashboard/project/board" },
//   { id: 3, text: "Team", icon: <PeopleAltIcon />, path: "/dashboard/project/team" },
//   { id: 43, text: "Docs", icon: <FolderCopyRoundedIcon />, path: "/dashboard/project/docs" },
//   // { id:44, text: "Create new account" ,icon: <SubjectIcon/>,path: "/dashboard/project/accounts"},
//   // { id:45, text: "Create Students accounts via csv " ,icon: <SubjectIcon/>,path: "/dashboard/project/studentslist"}
// ];
// const supervisorStuff = [
//   // { id: 6, text: "Defenses", icon: <CoPresentIcon />, path: "/defenses" },
//   {id:17, text: "cahier de charge ", icon: <SubjectIcon />, path: "/dashboard/my-projects/backlog"},
// ];
// const HOBStuff = [
//   // { id: 7, text: "Requests", icon: <PersonAddAlt1Icon />, path: "/dashboard/requests" },
 
//   { id:10, text: "Create new account" ,icon: <SubjectIcon/>,path: "/dashboard/project/accounts"},
//   { id:11, text: "Create Students accounts via csv " ,icon: <SubjectIcon/>,path: "/dashboard/project/studentslist"},
//   { id: 12, text: "Assignments", icon: <AssignmentIcon />, path: "/dashboard/assignments",}
// ];

// const forAll = [
//   {
//     id: 15,
//     text: "Result",
//     icon: <AssignmentIcon />,
//     path: "/dashboard/assignments/result",
//   },
//   { id: 9, text: "Presentations", icon: <CoPresentIcon />, path: "/dashboard/presentations" },
//   { id: 13, text: "Projects", icon: <FolderCopyIcon />, path: "/dashboard/projects" },
//   { 
//     id: 16, text: "Diagram Generator", icon: <AccountTreeIcon />, path: "/dashboard/tools/diagram-generator" },
// ];
// // eslint-disable-next-line react/prop-types
// export default function SideBar({ mode, open, handleDrawerClose }) {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token")
//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const [projects , setProjects] = useState([{}]);

//   const isSupervisor = hasRole("ROLE_SUPERVISOR");
//   const isHOB = hasRole("ROLE_HEAD_OF_BRANCH");
//   const isStudent = hasRole("ROLE_STUDENT");
//   const handleListItemClick = (event, index) => {
//     setSelectedIndex(index);
//   };

//     const [expandedProjectId, setExpandedProjectId] = useState(null);

//     const handleProjectClick = (projectId) => {
//       setExpandedProjectId(projectId === expandedProjectId ? null : projectId);
//     };

//   useEffect(() => {
//     const fetchProjects = async () => {
//       const fetchedProjects = await getAllProjects(token);
//       console.log(fetchedProjects);
//       setProjects(fetchedProjects);
//     }
//     if(isSupervisor){
//       fetchProjects();
//     }
//   }, []);
//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <StyledDrawer variant="persistent" anchor="left" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === "ltr" ? (
//               <Tooltip title="Collapse">
//                 <ChevronLeftIcon />
//               </Tooltip>
//             ) : (
//               <ChevronRightIcon />
//             )}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <Box
//           sx={{
//             overflowY: "auto",
//             "&::-webkit-scrollbar": {
//               width: "5px", // Adjust the width of the scrollbar
//             },
//             "&::-webkit-scrollbar-track": {
//               background: "transparent", // Make the scrollbar track transparent
//             },
//             "&::-webkit-scrollbar-thumb": {
//               background:
//                 mode == "light"
//                   ? "rgba(0, 0, 0, 0.3)"
//                   : "rgba(255, 255, 255, 0.3)", // Adjust the transparency of the scrollbar thumb
//               borderRadius: "10px", // Adjust the border radius of the scrollbar thumb
//             },
//           }}
//         >
//           {/* puissque juste student qui marche pour moi je vais essayer de generer pour un student puis je le transforme a un HoB */}
//           {/* aussi de la metre a la place de requests */}
//           {/* {isStudent ? (
//             <List>
//               <ListSubheader sx={{
//                 backgroundColor  : mode === "light" ? "#f5f6fa" : "#121212",
//               }}>PROJECT</ListSubheader>
//               {studentStuff.map((item, index) => (
//                 <ListItem key={index} disablePadding>
//                   <ListItemButton
//                     sx={{ pl: 4, borderRadius: "4px" }}
//                     selected={selectedIndex === item.id}
//                     onClick={(event) => {
//                       handleListItemClick(event, item.id);
//                       navigate(item.path);
//                     }}
//                   >
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                     <ListItemText sx={{ ml: -1.5 }} primary={item.text} />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>
//           ) : null} */}
//           {isStudent && (
//   <>
//     {/* Section PROJECT existante */}
//     <List>
//       <ListSubheader sx={{
//         backgroundColor: mode === "light" ? "#f5f6fa" : "#121212",
//       }}>PROJECT</ListSubheader>
//       {studentStuff.filter(item => item.id < 44).map((item, index) => (
//         <ListItem key={index} disablePadding>
//           <ListItemButton
//             sx={{ pl: 4, borderRadius: "4px" }}
//             selected={selectedIndex === item.id}
//             onClick={(event) => {
//               handleListItemClick(event, item.id);
//               navigate(item.path);
//             }}
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText sx={{ ml: -1.5 }} primary={item.text} />
//           </ListItemButton>
//         </ListItem>
//       ))}
//     </List>

//     {/* Nouvelle section ACCOUNTS
//     <List>
//       <ListSubheader sx={{
//         backgroundColor: mode === "light" ? "#f5f6fa" : "#121212",
//       }}>ACCOUNTS</ListSubheader>
//       {studentStuff.filter(item => item.id >= 44).map((item, index) => (
//         <ListItem key={index} disablePadding>
//           <ListItemButton
//             sx={{ pl: 4, borderRadius: "4px" }}
//             selected={selectedIndex === item.id}
//             onClick={(event) => {
//               handleListItemClick(event, item.id);
//               navigate(item.path);
//             }}
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText sx={{ ml: -1.5 }} primary={item.text} />
//           </ListItemButton>
//         </ListItem>
//       ))}
//     </List> */}
//   </>
// )}

//           {isSupervisor ? (
//             <>
//               <Divider />
//               <List>
//                 <ListSubheader sx={{
//                   backgroundColor  : mode === "light" ? "#f5f6fa" : "#121212",
//                 }}>PROJECTS</ListSubheader>
//                 {projects && projects.length > 0 ? projects.map((project) => (
//                   <div key={project.id}>
//                     <ListItem disablePadding>
//                       <ListItemButton
//                         sx={{ borderRadius: "4px" }}
//                         selected={selectedIndex === project.id}
//                         onClick={(event) => {
//                           handleProjectClick(project.id);
//                         }}
//                       >
//                         <ListItemIcon
//                           sx={{ transition: "transform 0.3s ease" }}
//                         >
//                             <ExpandCircleDown
//                               sx={{
//                                 transition: "transform 0.3s ease-in-out ",
//                                 transform: expandedProjectId === project.id ? "rotate(0deg)" : "rotate(-90deg)",
//                               }}
//                             />
//                         </ListItemIcon>
//                         <ListItemText
//                           sx={{ ml: -1.5 }}
//                           primary={project.title}
//                         />
//                       </ListItemButton>
//                     </ListItem>
//                     <Collapse
//                       in={expandedProjectId === project.id}
//                       timeout="auto"
//                       unmountOnExit
//                     >
//                       <List disablePadding>
//                         <ListItemButton
//                           sx={{ ml: 2, borderRadius: "5px" }}
//                           onClick={(event) => {
//                             navigate(`/dashboard/my-projects/backlog?projectId=${project.id}`);
//                           }}
//                         >
//                           <ListItemIcon>
//                             <SubjectIcon />
//                           </ListItemIcon>
//                           <ListItemText sx={{ ml: -1 }} primary="Backlog" />
//                         </ListItemButton>
//                         <ListItemButton
//                           sx={{ ml: 2, borderRadius: "5px" }}
//                           onClick={(event) => {
//                             navigate(`/dashboard/my-projects/board?teamId=${project.teamId}`);
//                           }}
//                         >
//                           <ListItemIcon>
//                             <ViewWeekIcon />
//                           </ListItemIcon>
//                           <ListItemText sx={{ ml: -1 }} primary="Board" />
//                         </ListItemButton>
//                         <ListItemButton
//                           sx={{ ml: 2, borderRadius: "5px" }}
//                           onClick={(event) => {
//                             navigate(`/dashboard/my-projects/team?teamId=${project.teamId}`);
//                           }}
//                         >
//                           <ListItemIcon>
//                             <PeopleAltIcon />
//                           </ListItemIcon>
//                           <ListItemText sx={{ ml: -1 }} primary="Team" />
//                         </ListItemButton>
  
//                         <ListItemButton
//                           sx={{ ml: 2, borderRadius: "5px" }}
//                           onClick={(event) => {
//                             navigate(`/dashboard/my-projects/docs?projectId=${project.id}`);
//                           }}
//                         >
//                           <ListItemIcon>
//                             <FolderCopyRoundedIcon />
//                           </ListItemIcon>
//                           <ListItemText sx={{ ml: -1 }} primary="Docs" />
//                         </ListItemButton>
//                       </List>
//                     </Collapse>
//                   </div>
//                 )) : (
//                   <div style={{display:"flex" , justifyContent:"center" , flexDirection:"column" ,alignItems:"center" ,padding:"20px 0 30px 0"}}>
//                     <Typography color="textSecondary">No projects found</Typography>
//                     <Typography color="textSecondary" variant="body2">go ahead and create one.</Typography>
//                   </div>
//                 )}

//               </List>
//             </>
//           ) : null}

//           {/* {isHOB ? (
//             <>
//               <Divider />
//               <List>
//                 {HOBStuff.map((item, index) => (
//                   <ListItem key={index} disablePadding>
//                     <ListItemButton
//                       sx={{ borderRadius: "4px" }}
//                       selected={selectedIndex === item.id}
//                       onClick={(event) => {
//                         handleListItemClick(event, item.id);
//                         navigate(item.path);
//                       }}
//                     >
//                       <ListItemIcon>{item.icon}</ListItemIcon>
//                       <ListItemText sx={{ ml: -1.5 }} primary={item.text} />
//                     </ListItemButton>
//                   </ListItem>
//                 ))}
//               </List>
//             </>
//           ) : null} */}
//           {isHOB && (
//   <>
//     {/* Section ACCOUNTS CREATION */}
//     <List>
//       <ListSubheader sx={{
//         backgroundColor: mode === "light" ? "#f5f6fa" : "#121212",
//       }}>ACCOUNTS CREATION</ListSubheader>
//       {HOBStuff.filter(item => [10, 11].includes(item.id)).map((item) => (
//         <ListItem key={item.id} disablePadding>
//           <ListItemButton
//             sx={{ pl: 4, borderRadius: "4px" }}
//             selected={selectedIndex === item.id}
//             onClick={(event) => {
//               handleListItemClick(event, item.id);
//               navigate(item.path);
//             }}
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText sx={{ ml: -1.5 }} primary={item.text} />
//           </ListItemButton>
//         </ListItem>
//       ))}
//     </List>

//     {/* Section ASSIGNMENTS */}
//     <List>
//       <ListSubheader sx={{
//         backgroundColor: mode === "light" ? "#f5f6fa" : "#121212",
//       }}>ASSIGNMENTS</ListSubheader>
//       {HOBStuff.filter(item => item.id === 12).map((item) => (
//         <ListItem key={item.id} disablePadding>
//           <ListItemButton
//             sx={{ pl: 4, borderRadius: "4px" }}
//             selected={selectedIndex === item.id}
//             onClick={(event) => {
//               handleListItemClick(event, item.id);
//               navigate(item.path);
//             }}
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText sx={{ ml: -1.5 }} primary={item.text} />
//           </ListItemButton>
//         </ListItem>
//       ))}
//     </List>
//   </>
// )}

// {/* Section COMMON (forAll) */}
// {/* il faut choisir entre cette partie ou bien la partie a partir de ligne 392 */}
// <Divider />
// <List>
//   <ListSubheader sx={{
//     backgroundColor: mode === "light" ? "#f5f6fa" : "#121212",
//   }}>GENERAL</ListSubheader>
//   {forAll.map((item) => (
//     <ListItem key={item.id} disablePadding>
//       <ListItemButton
//         sx={{ pl: 4, borderRadius: "4px" }}
//         selected={selectedIndex === item.id}
//         onClick={(event) => {
//           handleListItemClick(event, item.id);
//           navigate(item.path);
//         }}
//       >
//         <ListItemIcon>{item.icon}</ListItemIcon>
//         <ListItemText sx={{ ml: -1.5 }} primary={item.text} />
//       </ListItemButton>
//     </ListItem>
//   ))}
// </List>
//           <Divider />
//           {/* et entre celle la  */}
//           {/* <List>
//             {forAll.map((item, index) => (
//               <ListItem key={index} disablePadding>
//                 <ListItemButton
//                   sx={{ borderRadius: "4px" }}
//                   selected={selectedIndex === item.id}
//                   onClick={(event) => {
//                     handleListItemClick(event, item.id);
//                     navigate(item.path);
//                   }}
//                 >
//                   <ListItemIcon>{item.icon}</ListItemIcon>
//                   <ListItemText sx={{ ml: -1.5 }} primary={item.text} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List> */}
//         </Box>
//       </StyledDrawer>
//     </Box>
//   );
// }
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SchoolIcon from "@mui/icons-material/School";
import SettingsIcon from "@mui/icons-material/Settings";
import SubjectIcon from "@mui/icons-material/Subject";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import { Collapse, ListItemButton, Typography, Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hasRole } from "../../utils/userUtiles";
import { DrawerHeader, StyledDrawer } from "./sideBar";
import { getAllProjects } from "../../services/projectService";
import { ExpandCircleDown, PeopleOutline } from "@mui/icons-material";
import FolderCopyRoundedIcon from "@mui/icons-material/FolderCopyRounded";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LogoutIcon from '@mui/icons-material/Logout';
import Logout from "../../pages/authenticate/Logout";
const studentStuff = [
  { id: 0, text: "BackLog", icon: <SubjectIcon />, path: "/dashboard/project/backlog" },
  { id: 1, text: "Board", icon: <ViewWeekIcon />, path: "/dashboard/project/board" },
  { id: 3, text: "Team", icon: <PeopleAltIcon />, path: "/dashboard/project/team" },
  { id: 43, text: "Docs", icon: <FolderCopyRoundedIcon />, path: "/dashboard/project/docs" },
];

const supervisorStuff = [
  {id:17, text: "cahier de charge ", icon: <SubjectIcon />, path: "/dashboard/my-projects/backlog"},
];

const HOBStuff = [
  { id:10, text: "Create new account" ,icon: <SubjectIcon/>,path: "/dashboard/new/account"},
  { id:11, text: "Create Students accounts via csv " ,icon: <SubjectIcon/>,path: "/dashboard/studentslist"},
  { id: 12, text: "Assignments", icon: <AssignmentIcon />, path: "/dashboard/assignments",}
];

const forAll = [
  {
    id: 15,
    text: "Result",
    icon: <AssignmentIcon />,
    path: "/dashboard/assignments/result",
  },
  { id: 9, text: "Presentations", icon: <CoPresentIcon />, path: "/dashboard/presentations" },
  { id: 13, text: "Projects", icon: <FolderCopyIcon />, path: "/dashboard/projects" },
  { 
    id: 16, text: "Diagram Generator", icon: <AccountTreeIcon />, path: "/dashboard/tools/diagram-generator" },
       { id: 17, text: "CDC", icon: <AccountTreeIcon />, path: "/dashboard/tools/CDC-generator" },

    {id :99 ,text: "Logout", icon: <SettingsIcon />, path: "/logout"}
];
// userId = localStorage.getItem("userId");
// token = localStorage.getItem("token");

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
    console.log(url);
    return url;
  } catch (error) {
    console.error("Error downloading image:", error);
    return null;
  }
}

export default function SideBar({ mode, open, handleDrawerClose }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [projects, setProjects] = useState([{}]);
  const [profileImage, setProfileImage] = useState(null);
  //const theme = useTheme();
  //const navigate = useNavigate();
  //const token = localStorage.getItem("token");
  //const user = JSON.parse(localStorage.getItem("user"));
  //const [selectedIndex, setSelectedIndex] = useState(null);
  //const [projects, setProjects] = useState([{}]);
//  const [profileImage, setProfileImage] = useState(null);

  const isSupervisor = hasRole("ROLE_SUPERVISOR");
  const isHOB = hasRole("ROLE_HEAD_OF_BRANCH");
  const isStudent = hasRole("ROLE_STUDENT");

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  

  const [expandedProjectId, setExpandedProjectId] = useState(null);

  const handleProjectClick = (projectId) => {
    setExpandedProjectId(projectId === expandedProjectId ? null : projectId);
  };
//   const [logoutOpen, setLogoutOpen] = useState(false);

// const handleLogoutClick = () => {
//   setLogoutOpen(true);
// };

// const handleLogoutConfirm = () => {
//   // Votre logique de déconnexion
//   localStorage.removeItem('token');
//   navigate('/auth/authenticate');
//   setLogoutOpen(false);
//   window.location.reload();
// };
const [logoutOpen, setLogoutOpen] = useState(false);
  const userid = user?.id || localStorage.getItem("userId");
  //const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (userid) {
        const imageUrl = await downLoadProfileImage(userid, token);
        setProfileImage(imageUrl);
      }
    };

    fetchProfileImage();
  }, [userid, token]);

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getAllProjects(token);
      console.log(fetchedProjects);
      setProjects(fetchedProjects);
    }
    if(isSupervisor){
      fetchProjects();
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <StyledDrawer variant="persistent" anchor="left" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (  
              <Tooltip title="Collapse">
                <ChevronLeftIcon />
              </Tooltip>
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
     
        
        {/* User Profile Section
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            p: 2, 
            borderBottom: `1px solid ${theme.palette.divider}`,
            //backgroundColor: mode === "light" ? "#f5f6fa" : "#121212",
            backgroundColor: mode === "light" ? "#E8E8E8" : "#121212",

          }}
        >
          <Avatar 
            src={profileImage || undefined} 
            alt={user?.name || "User"} 
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Typography variant="subtitle1" noWrap>
            {localStorage.getItem("name") || "User Name"}
          </Typography>
        </Box>
         */}
        <Divider />
        
        <Box
          sx={{
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background:
                mode == "light"
                  ? "rgba(0, 0, 0, 0.3)"
                  : "rgba(255, 255, 255, 0.3)",
              borderRadius: "10px",
            },
          }}
        >
          {isStudent && (
            <>
              <List>
                <ListSubheader sx={{
                  backgroundColor: mode === "light" ? "#f5f6fa" : "#121212",
                }}>PROJECT</ListSubheader>
                {studentStuff.filter(item => item.id < 44).map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton
                      sx={{ pl: 4, borderRadius: "4px" }}
                      selected={selectedIndex === item.id}
                      onClick={(event) => {
                        handleListItemClick(event, item.id);
                        navigate(item.path);
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText sx={{ ml: -1.5 }} primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          )}

          {isSupervisor && (
            <>
              <Divider />
              <List>
                <ListSubheader sx={{
                  backgroundColor: mode === "light" ? "#f5f6fa" : "#121212",
                }}>PROJECTS</ListSubheader>
                {projects && projects.length > 0 ? projects.map((project) => (
                  <div key={project.id}>
                    <ListItem disablePadding>
                      <ListItemButton
                        sx={{ borderRadius: "4px" }}
                        selected={selectedIndex === project.id}
                        onClick={(event) => {
                          handleProjectClick(project.id);
                        }}
                      >
                        <ListItemIcon
                          sx={{ transition: "transform 0.3s ease" }}
                        >
                            <ExpandCircleDown
                              sx={{
                                transition: "transform 0.3s ease-in-out ",
                                transform: expandedProjectId === project.id ? "rotate(0deg)" : "rotate(-90deg)",
                              }}
                            />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ ml: -1.5 }}
                          primary={project.title}
                        />
                      </ListItemButton>
                    </ListItem>
                    <Collapse
                      in={expandedProjectId === project.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List disablePadding>
                        <ListItemButton
                          sx={{ ml: 2, borderRadius: "5px" }}
                          onClick={(event) => {
                            navigate(`/dashboard/my-projects/backlog?projectId=${project.id}`);
                          }}
                        >
                          <ListItemIcon>
                            <SubjectIcon />
                          </ListItemIcon>
                          <ListItemText sx={{ ml: -1 }} primary="Backlog" />
                        </ListItemButton>
                        <ListItemButton
                          sx={{ ml: 2, borderRadius: "5px" }}
                          onClick={(event) => {
                            navigate(`/dashboard/my-projects/board?teamId=${project.teamId}`);
                          }}
                        >
                          <ListItemIcon>
                            <ViewWeekIcon />
                          </ListItemIcon>
                          <ListItemText sx={{ ml: -1 }} primary="Board" />
                        </ListItemButton>
                        <ListItemButton
                          sx={{ ml: 2, borderRadius: "5px" }}
                          onClick={(event) => {
                            navigate(`/dashboard/my-projects/team?teamId=${project.teamId}`);
                          }}
                        >
                          <ListItemIcon>
                            <PeopleAltIcon />
                          </ListItemIcon>
                          <ListItemText sx={{ ml: -1 }} primary="Team" />
                        </ListItemButton>
                        <ListItemButton
                          sx={{ ml: 2, borderRadius: "5px" }}
                          onClick={(event) => {
                            navigate(`/dashboard/my-projects/docs?projectId=${project.id}`);
                          }}
                        >
                          <ListItemIcon>
                            <FolderCopyRoundedIcon />
                          </ListItemIcon>
                          <ListItemText sx={{ ml: -1 }} primary="Docs" />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </div>
                )) : (
                  <div style={{display:"flex" , justifyContent:"center" , flexDirection:"column" ,alignItems:"center" ,padding:"20px 0 30px 0"}}>
                    <Typography color="textSecondary">No projects found</Typography>
                    <Typography color="textSecondary" variant="body2">go ahead and create one.</Typography>
                  </div>
                )}
              </List>
            </>
          )}

          {isHOB && (
            <>
              <List>
                <ListSubheader sx={{
                  backgroundColor: mode === "light" ? "#f5f6fa" : "#121212",
                }}>ACCOUNTS CREATION</ListSubheader>
                {HOBStuff.filter(item => [10, 11].includes(item.id)).map((item) => (
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton
                      sx={{ pl: 4, borderRadius: "4px" }}
                      selected={selectedIndex === item.id}
                      onClick={(event) => {
                        handleListItemClick(event, item.id);
                        navigate(item.path);
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText sx={{ ml: -1.5 }} primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>

              <List>
                <ListSubheader sx={{
                  backgroundColor: mode === "light" ? "#f5f6fa" : "#121212",
                }}>ASSIGNMENTS</ListSubheader>
                {HOBStuff.filter(item => item.id === 12).map((item) => (
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton
                      sx={{ pl: 4, borderRadius: "4px" }}
                      selected={selectedIndex === item.id}
                      onClick={(event) => {
                        handleListItemClick(event, item.id);
                        navigate(item.path);
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText sx={{ ml: -1.5 }} primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          )}

          <Divider />
          <List>
            <ListSubheader sx={{
              backgroundColor: mode === "light" ? "#f5f6fa" : "#121212",
            }}>GENERAL</ListSubheader>
            {forAll.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  sx={{ pl: 4, borderRadius: "4px" }}
                  selected={selectedIndex === item.id}
                  onClick={(event) => {
                    handleListItemClick(event, item.id);
                    navigate(item.path);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText sx={{ ml: -1.5 }} primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
                <Divider  />
      
      {/* <ListItem key={99} disablePadding>
        <ListItemButton
          sx={{ 
            pl: 4, 
            borderRadius: "4px",
            '&:hover': {
              backgroundColor: mode === "light" ? "#ffebee" : "#d32f2f"
            }
          }}
          selected={selectedIndex === 99}
          // onClick={() => {
          //   localStorage.removeItem('token');
          //   navigate('/login');
          //   // Rafraîchir la page pour nettoyer l'état
          //   // window.location.reload();
           onClick={(event) => {
                        handleListItemClick(event, item.id);
                        navigate(item.path);
                      }}
      //      onClick={(e) => {
      // e.stopPropagation();
      // e.preventDefault();
    // }}
         
        >
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>
          <ListItemText 
            // sx={{ ml: -1.5 }} 
            primary="Logout" 
            // primaryTypographyProps={{ color: "error" }}
          />
        </ListItemButton>
      </ListItem> */}
      {/* ok t7T  */}
      {/* <ListItem key={99} disablePadding>
  <ListItemButton
    sx={{ 
      pl: 4, 
      borderRadius: "4px",
      '&:hover': {
        backgroundColor: mode === "light" ? "#ffebee" : "#d32f2f"
      }
    }}
    selected={selectedIndex === 99}
    onClick={(event) => {
      event.preventDefault();
      event.stopPropagation();
      if(window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        localStorage.removeItem('token');
        navigate('/auth/authenticate');
        window.location.reload();
      }
    }}
  >
    <ListItemIcon>
      <LogoutIcon color="error" />
    </ListItemIcon>
    <ListItemText 
      sx={{ ml: -1.5 }} 
      primary="Logout" 
      primaryTypographyProps={{ color: "error" }}
    />
  </ListItemButton>
</ListItem> */}
          {/* ok fou9 */}
                <ListItem key={99} disablePadding>
        <ListItemButton
          sx={{ 
            pl: 4, 
            borderRadius: "4px",
            '&:hover': { backgroundColor: mode === "light" ? "#ffebee" : "#d32f2f" }
          }}
          onClick={() => setLogoutOpen(true)}
        >
          <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
          <ListItemText 
            sx={{ ml: -1.5 }} 
            primary="Logout" 
            primaryTypographyProps={{ color: "error" }}
          />
        </ListItemButton>
      </ListItem>

      <Logout 
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
      />
    
        </Box>
       
      </StyledDrawer>
    </Box>
  );
}