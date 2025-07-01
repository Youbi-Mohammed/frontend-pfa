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
"use client";

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
import { Collapse, ListItemButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
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
import { DrawerHeader, StyledDrawer } from "./sidebar";
import { getAllProjects } from "../../services/projectService";
import { ExpandCircleDown } from "@mui/icons-material";
import FolderCopyRoundedIcon from "@mui/icons-material/FolderCopyRounded";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import Logout from "../../pages/authenticate/Logout";

const studentStuff = [
  { id: 0, text: "BackLog", icon: <SubjectIcon />, path: "/dashboard/project/backlog" },
  { id: 1, text: "Board", icon: <ViewWeekIcon />, path: "/dashboard/project/board" },
  { id: 3, text: "Team", icon: <PeopleAltIcon />, path: "/dashboard/project/team" },
  { id: 43, text: "Documents", icon: <FolderCopyRoundedIcon />, path: "/dashboard/project/docs" },
];

const supervisorStuff = [
  { id: 17, text: "Requirements", icon: <SubjectIcon />, path: "/dashboard/my-projects/backlog" },
];

const HOBStuff = [
  { id: 10, text: "Create New Account", icon: <PersonAddAlt1Icon />, path: "/dashboard/new/account" },
  { id: 11, text: "Import Students via CSV", icon: <SchoolIcon />, path: "/dashboard/studentslist" },
  { id: 12, text: "Assignments", icon: <AssignmentIcon />, path: "/dashboard/assignments" },
];

const forAll = [
  {
    id: 15,
    text: "Results",
    icon: <QueryStatsIcon />,
    path: "/dashboard/assignments/result",
  },
  { id: 9, text: "Presentations", icon: <CoPresentIcon />, path: "/dashboard/presentations" },
  { id: 13, text: "Projects", icon: <FolderCopyIcon />, path: "/dashboard/projects" },
  { id: 48, text: "Diagram Generator", icon: <AccountTreeIcon />, path: "/dashboard/tools/diagram-generator" },
  { id: 49, text: "Specifications Generator", icon: <DescriptionIcon />, path: "/dashboard/tools/CDC-generator" },
  { id: 99, text: "Logout", icon: <SettingsIcon />, path: "/logout" },
];

const downLoadProfileImage = async (userId, token) => {
  try {
    const response = await fetch(`http://localhost:8080/api/users/${userId}/downloadProfileImage`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
};

export default function SideBar({ mode, open, handleDrawerClose }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [projects, setProjects] = useState([{}]);
  const [profileImage, setProfileImage] = useState(null);

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

  const [logoutOpen, setLogoutOpen] = useState(false);
  const userid = user?.id || localStorage.getItem("userId");

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
      setProjects(fetchedProjects);
    };
    if (isSupervisor) {
      fetchProjects();
    }
  }, []);

  // Définir les couleurs en fonction du mode
  const colors = {
    sidebarBg: mode === 'dark' ? '#121212' : '#fdfefe',
    sidebarBorder: mode === 'dark' ? '#333333' : '#e6f2f2',
    sidebarItemSelectedBg: mode === 'dark' ? '#1e1e1e' : '#f8fafa',
    sidebarItemSelectedBorder: mode === 'dark' ? '#333333' : '#d1e7e7',
    sidebarItemSelectedColor: mode === 'dark' ? '#4db6ac' : '#1e5a5a',
    sidebarItemColor: mode === 'dark' ? '#b0b0b0' : '#4a4a4a',
    sidebarSubheaderBg: mode === 'dark' ? '#121212' : '#fdfefe',
    sidebarSubheaderColor: mode === 'dark' ? '#4db6ac' : '#2d7a7a',
    sidebarIconColor: mode === 'dark' ? '#b0b0b0' : '#4a9a9a',
    sidebarIconSelectedColor: mode === 'dark' ? '#4db6ac' : '#2d7a7a',
    sidebarHoverBg: mode === 'dark' ? '#2a2a2a' : '#fcfefe',
    sidebarHoverBorder: mode === 'dark' ? '#333333' : '#a3d5d5',
    scrollbarThumb: mode === 'dark' 
      ? 'linear-gradient(180deg, #2a4a4a, #1e3d3d)' 
      : 'linear-gradient(180deg, #a3d5d5, #6bb6b6)',
    logoutColor: mode === 'dark' ? '#ff8a65' : '#dc6545',
    logoutHoverBg: mode === 'dark' ? '#332a28' : '#fef7f4',
    logoutHoverBorder: mode === 'dark' ? '#5d4037' : '#f4d4c7',
  };

  // Styles avec les couleurs adaptées au mode
  const sidebarItemStyle = (selected) => ({
    pl: open ? 3 : 0,
    pr: open ? 2 : 0,
    py: 0.8,
    borderRadius: "8px",
    marginBottom: "2px",
    backgroundColor: selected ? colors.sidebarItemSelectedBg : "transparent",
    border: selected ? `1px solid ${colors.sidebarItemSelectedBorder}` : "1px solid transparent",
    color: selected ? colors.sidebarItemSelectedColor : colors.sidebarItemColor,
    justifyContent: open ? "flex-start" : "center",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      backgroundColor: colors.sidebarHoverBg,
      borderColor: colors.sidebarHoverBorder,
      color: colors.sidebarItemSelectedColor,
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(45, 122, 122, 0.15)",
    },
  });

  const sidebarIconStyle = (selected) => ({
    color: selected ? colors.sidebarIconSelectedColor : colors.sidebarIconColor,
    minWidth: open ? "48px" : "24px",
    justifyContent: "center",
    transition: "all 0.3s ease",
    "& .MuiSvgIcon-root": {
      fontSize: "20px",
      filter: selected ? "drop-shadow(0 2px 4px rgba(45, 122, 122, 0.3))" : "none",
    },
  });

  const sidebarTextStyle = {
    ml: open ? -0.5 : 0,
    display: open ? "block" : "none",
    opacity: open ? 1 : 0,
    transition: "opacity 0.3s ease",
    "& .MuiTypography-root": {
      fontFamily: "'Inter', sans-serif",
      fontSize: "14px",
      fontWeight: 400,
      color: "inherit",
      lineHeight: 1.3,
    },
  };

  const subheaderStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "11px",
    fontWeight: 500,
    color: colors.sidebarSubheaderColor,
    textTransform: "uppercase",
    letterSpacing: "1px",
    backgroundColor: colors.sidebarSubheaderBg,
    display: open ? "block" : "none",
    padding: open ? "8px 16px 6px 16px" : "8px 8px 6px 8px",
    marginBottom: "4px",
  };

  const renderMenuItem = (item, isSubItem = false) => {
    const isSelected = selectedIndex === item.id;
    const content = (
      <ListItemButton
        sx={{
          ...sidebarItemStyle(isSelected),
          ml: isSubItem ? (open ? 1.5 : 0) : 0,
          pl: isSubItem ? (open ? 5 : 0) : open ? 3 : 0,
        }}
        onClick={(event) => {
          handleListItemClick(event, item.id);
          navigate(item.path);
        }}
      >
        <ListItemIcon sx={sidebarIconStyle(isSelected)}>{item.icon}</ListItemIcon>
        <ListItemText sx={sidebarTextStyle} primary={item.text} />
      </ListItemButton>
    );

    return !open ? (
      <Tooltip
        title={item.text}
        placement="right"
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: colors.sidebarSubheaderColor,
              color: "#ffffff",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              borderRadius: "8px",
            },
          },
        }}  
      >
        <ListItem disablePadding>{content}</ListItem>
      </Tooltip>
    ) : (
      <ListItem disablePadding>{content}</ListItem>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <StyledDrawer variant="persistent" anchor="left" open={open} mode={mode}>
        <DrawerHeader mode={mode}>
          <Tooltip
            title={open ? "Collapse" : "Expand"}
            placement="right"
            componentsProps={{
              tooltip: {
                sx: {
                  backgroundColor: colors.sidebarSubheaderColor,
                  color: "#ffffff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                },
              },
            }}
          >
            <IconButton
              onClick={handleDrawerClose}
              sx={{
                color: colors.sidebarIconSelectedColor,
                backgroundColor: colors.sidebarItemSelectedBg,
                border: `1px solid ${colors.sidebarItemSelectedBorder}`,
                borderRadius: "6px",
                padding: "6px",
                "&:hover": {
                  backgroundColor: colors.sidebarHoverBg,
                  borderColor: colors.sidebarHoverBorder,
                  transform: "scale(1.02)",
                },
              }}
            >
              {theme.direction === "ltr" ? open ? <ChevronLeftIcon /> : <ChevronRightIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Tooltip>
        </DrawerHeader>

        <Box
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            flex: 1,
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: colors.scrollbarThumb,
              borderRadius: "3px",
              "&:hover": {
                background: mode === 'dark'
                  ? "linear-gradient(180deg, #1e3d3d, #153030)"
                  : "linear-gradient(180deg, #6bb6b6, #4a9a9a)",
              },
            },
          }}
        >
          {isStudent && (
            <List>
              <ListSubheader sx={subheaderStyle}>PROJECT</ListSubheader>
              {studentStuff
                .filter((item) => item.id < 44)
                .map((item, index) => (
                  <div key={index}>{renderMenuItem(item)}</div>
                ))}
            </List>
          )}

          {isSupervisor && (
            <List>
              <ListSubheader sx={subheaderStyle}>PROJECTS</ListSubheader>
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <div key={project.id}>
                    <ListItem disablePadding>
                      {!open ? (
                        <Tooltip
                          title={project.title}
                          placement="right"
                          arrow
                          componentsProps={{
                            tooltip: {
                              sx: {
                                backgroundColor: colors.sidebarSubheaderColor,
                                color: "#ffffff",
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "12px",
                                borderRadius: "8px",
                              },
                            },
                          }}
                        >
                          <ListItemButton sx={sidebarItemStyle(false)} onClick={() => handleProjectClick(project.id)}>
                            <ListItemIcon sx={sidebarIconStyle(false)}>
                              <ExpandCircleDown
                                sx={{
                                  transition: "transform 0.3s ease-in-out",
                                  transform: expandedProjectId === project.id ? "rotate(0deg)" : "rotate(-90deg)",
                                  color: colors.sidebarIconColor,
                                }}
                              />
                            </ListItemIcon>
                          </ListItemButton>
                        </Tooltip>
                      ) : (
                        <ListItemButton sx={sidebarItemStyle(false)} onClick={() => handleProjectClick(project.id)}>
                          <ListItemIcon sx={sidebarIconStyle(false)}>
                            <ExpandCircleDown
                              sx={{
                                transition: "transform 0.3s ease-in-out",
                                transform: expandedProjectId === project.id ? "rotate(0deg)" : "rotate(-90deg)",
                                color: colors.sidebarIconColor,
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText sx={sidebarTextStyle} primary={project.title} />
                        </ListItemButton>
                      )}
                    </ListItem>

                    <Collapse in={expandedProjectId === project.id && open} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        {renderMenuItem(
                          {
                            id: `backlog-${project.id}`,
                            text: "Backlog",
                            icon: <SubjectIcon />,
                            path: `/dashboard/my-projects/backlog?projectId=${project.id}`,
                          },
                          true,
                        )}
                        {renderMenuItem(
                          {
                            id: `board-${project.id}`,
                            text: "Board",
                            icon: <ViewWeekIcon />,
                            path: `/dashboard/my-projects/board?teamId=${project.teamId}`,
                          },
                          true,
                        )}
                        {renderMenuItem(
                          {
                            id: `team-${project.id}`,
                            text: "Team",
                            icon: <PeopleAltIcon />,
                            path: `/dashboard/my-projects/team?teamId=${project.teamId}`,
                          },
                          true,
                        )}
                        {renderMenuItem(
                          {
                            id: `docs-${project.id}`,
                            text: "Documents",
                            icon: <FolderCopyRoundedIcon />,
                            path: `/dashboard/my-projects/docs?projectId=${project.id}`,
                          },
                          true,
                        )}
                      </List>
                    </Collapse>
                  </div>
                ))
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "20px 0 30px 0",
                  }}
                >
                  <Typography
                    sx={{
                      color: colors.sidebarItemColor,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "14px",
                      display: open ? "block" : "none",
                    }}
                  >
                    No projects found
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.sidebarItemColor,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      display: open ? "block" : "none",
                    }}
                  >
                    Go ahead and create one.
                  </Typography>
                </Box>
              )}
            </List>
          )}

          {isHOB && (
            <>
              <List>
                <ListSubheader sx={subheaderStyle}>ACCOUNT CREATION</ListSubheader>
                {HOBStuff.filter((item) => [10, 11].includes(item.id)).map((item) => (
                  <div key={item.id}>{renderMenuItem(item)}</div>
                ))}
              </List>

              <List>
                <ListSubheader sx={subheaderStyle}>ASSIGNMENTS</ListSubheader>
                {HOBStuff.filter((item) => item.id === 12).map((item) => (
                  <div key={item.id}>{renderMenuItem(item)}</div>
                ))}
              </List>
            </>
          )}

          <List>
            <ListSubheader sx={subheaderStyle}>GENERAL</ListSubheader>
            {forAll
              .filter((item) => item.id < 40)
              .map((item) => (
                <div key={item.id}>{renderMenuItem(item)}</div>
              ))}
          </List>

          <List>
            <ListSubheader sx={subheaderStyle}>AI TOOLS</ListSubheader>
            {forAll
              .filter((item) => item.id > 40 && item.id < 50)
              .map((item) => (
                <div key={item.id}>{renderMenuItem(item)}</div>
              ))}
          </List>

          <Box sx={{ mt: 2 }}>
            <ListItem disablePadding>
              {!open ? (
                <Tooltip
                  title="Logout"
                  placement="right"
                  arrow
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: colors.logoutColor,
                        color: "#ffffff",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                      },
                    },
                  }}
                >
                  <ListItemButton
                    sx={{
                      ...sidebarItemStyle(false),
                      color: colors.logoutColor,
                      "&:hover": {
                        backgroundColor: colors.logoutHoverBg,
                        borderColor: colors.logoutHoverBorder,
                        color: colors.logoutColor,
                      },
                    }}
                    onClick={() => setLogoutOpen(true)}
                  >
                    <ListItemIcon sx={{ ...sidebarIconStyle(false), color: colors.logoutColor }}>
                      <LogoutIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </Tooltip>
              ) : (
                <ListItemButton
                  sx={{
                    ...sidebarItemStyle(false),
                    color: colors.logoutColor,
                    "&:hover": {
                      backgroundColor: colors.logoutHoverBg,
                      borderColor: colors.logoutHoverBorder,
                      color: colors.logoutColor,
                    },
                  }}
                  onClick={() => setLogoutOpen(true)}
                >
                  <ListItemIcon sx={{ ...sidebarIconStyle(false), color: colors.logoutColor }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={sidebarTextStyle}
                    primary="Logout"
                    primaryTypographyProps={{ color: colors.logoutColor, fontWeight: 500 }}
                  />
                </ListItemButton>
              )}
            </ListItem>
          </Box>

          <Logout open={logoutOpen} onClose={() => setLogoutOpen(false)} />
        </Box>
      </StyledDrawer>
    </Box>
  );
}

