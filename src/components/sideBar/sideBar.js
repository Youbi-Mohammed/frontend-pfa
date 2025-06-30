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
import { styled } from "@mui/system"
import { Drawer } from "@mui/material"

const drawerWidth = 240
const collapsedWidth = 72

export const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    marginTop: "64px",
    maxHeight: "calc(100svh - 64px)",
    backgroundColor: "#fdfefe",
    borderRight: "1px solid #e6f2f2",
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
      background: "linear-gradient(180deg, #a3d5d5, #6bb6b6)",
      borderRadius: "3px",
      "&:hover": {
        background: "linear-gradient(180deg, #6bb6b6, #4a9a9a)",
      },
    },
  },
}))

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  minHeight: "48px",
  borderBottom: "1px solid #e6f2f2",
  marginBottom: "8px",
}))
