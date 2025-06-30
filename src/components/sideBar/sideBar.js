// import { styled } from "@mui/system";
// import { Drawer, ListItemButton } from "@mui/material";
// const drawerWidth = 230;
// export const StyledDrawer = styled(Drawer)(({ theme }) => ({
//   "& .MuiDrawer-paper": {
//     boxSizing: "border-box",
//     marginTop: "64px",
//     maxHeight: "calc(100svh - 64px)",

//     backgroundColor: localStorage.getItem("mode") === "light" ? "#f5f6fa" : "#121212",
//     padding: "5px",
//     zIndex: 1000,
//     width: drawerWidth,
//   },
// }));

// export const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   justifyContent: "flex-end",
// }));
import { styled } from "@mui/system";
import { Drawer } from "@mui/material";

const drawerWidth = 240;
const collapsedWidth = 72;

export const StyledDrawer = styled(Drawer)(({ theme, open, mode }) => {
  // Définir les couleurs en fonction du mode
  const colors = {
    sidebarBg: mode === 'dark' ? '#121212' : '#fdfefe',
    sidebarBorder: mode === 'dark' ? '#333333' : '#e6f2f2',
    scrollbarThumb: mode === 'dark' 
      ? 'linear-gradient(180deg, #2a4a4a, #1e3d3d)' 
      : 'linear-gradient(180deg, #a3d5d5, #6bb6b6)',
  };
  
  return {
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      marginTop: "64px",
      maxHeight: "calc(100svh - 64px)",
      backgroundColor: colors.sidebarBg,
      borderRight: `1px solid ${colors.sidebarBorder}`,
      padding: "8px",
      zIndex: 1000,
      width: open ? drawerWidth : collapsedWidth,
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
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
    },
  };
});

export const DrawerHeader = styled("div")(({ theme, mode }) => {
  // Définir les couleurs en fonction du mode
  const colors = {
    sidebarBorder: mode === 'dark' ? '#333333' : '#e6f2f2',
  };
  
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    minHeight: "48px",
    borderBottom: `1px solid ${colors.sidebarBorder}`,
    marginBottom: "8px",
  };
});
