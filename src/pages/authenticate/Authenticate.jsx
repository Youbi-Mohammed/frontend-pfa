import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Alert,
  Snackbar,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { authenticate } from "../../services/authService";
import { useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Authenticate() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const result = await authenticate(
        formData.get("email"),
        formData.get("password"),
        localStorage.setItem("mode", "light"),
        setSnackbarOpen,
        setSnackbarMessage,
        setLoading
      );

      if (result?.requiresPasswordChange) {
        navigate("/change-password", {
          state: {
            temporaryToken: result.temporaryToken,
            oldPassword: result.oldPassword,
          },
        });
      } else if (result?.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          padding: 4,
          borderRadius: 3,
          backgroundColor:
            theme.palette.mode === "light" ? "#fcfefe" : "#1a1a1a",
          boxShadow: theme.palette.mode === "light" ? 3 : 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            alt="Logo"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            sx={{
              width: 64,
              height: 64,
              bgcolor: theme.palette.mode === "light" ? "#2d7a7a" : "#4a9a9a",
            }}
          />
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontWeight: 600,
              color:
                theme.palette.mode === "light" ? "#1a1a1a" : "#d1e7e7",
            }}
          >
            Sign in to your account
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            autoFocus
            defaultValue={localStorage.getItem("email") || ""}
            InputProps={{
              style: {
                backgroundColor:
                  theme.palette.mode === "light" ? "#ffffff" : "#2a2a2a",
                color:
                  theme.palette.mode === "light" ? "#1a1a1a" : "#f1f1f1",
              },
            }}
            InputLabelProps={{
              style: {
                color:
                  theme.palette.mode === "light" ? "#4a4a4a" : "#a3d5d5",
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps={{
              style: {
                backgroundColor:
                  theme.palette.mode === "light" ? "#ffffff" : "#2a2a2a",
                color:
                  theme.palette.mode === "light" ? "#1a1a1a" : "#f1f1f1",
              },
            }}
            InputLabelProps={{
              style: {
                color:
                  theme.palette.mode === "light" ? "#4a4a4a" : "#a3d5d5",
              },
            }}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            sx={{
              mt: 1,
              color:
                theme.palette.mode === "light" ? "#2d2d2d" : "#a3d5d5",
            }}
          />

          <LoadingButton
            type="submit"
            loading={loading}
            loadingIndicator="Loading..."
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#2d7a7a",
              color: "#fff",
              "&:hover": {
                bgcolor: "#1e5a5a",
              },
            }}
          >
            Sign In
          </LoadingButton>

          <Grid container justifyContent="space-between">
            <Grid item>
              <Link
                href="/auth/reset-password"
                variant="body2"
                sx={{
                  color:
                    theme.palette.mode === "light"
                      ? "#2d7a7a"
                      : "#6bb6b6",
                }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {/* Uncomment if needed
              <Link href="/auth/register" variant="body2" sx={{ color: '#2d7a7a' }}>
                {"Don't have an account? Sign Up"}
              </Link> 
              */}
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={
            snackbarMessage && snackbarMessage.includes("successfully")
              ? "success"
              : "error"
          }
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}


// import { LoadingButton } from "@mui/lab";
// import Avatar from "@mui/material/Avatar";
// import Box from "@mui/material/Box";
// import Checkbox from "@mui/material/Checkbox";
// import Container from "@mui/material/Container";
// import CssBaseline from "@mui/material/CssBaseline";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Grid from "@mui/material/Grid";
// import Alert from "@mui/material/Alert";
// import Snackbar from "@mui/material/Snackbar";
// import Link from "@mui/material/Link";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { authenticate } from "../../services/authService";
// import { useState } from "react";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// export default function Authenticate() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
  
//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };
// ///khdma 7ta lstr 247
// //   const handleSubmit = async (event) => {
// //   event.preventDefault();
// //   setLoading(true);

// //   const data = new FormData(event.currentTarget);
// //   const email = data.get("email");
// //   const password = data.get("password");

// //   try {
// //     const res = await authenticate(email, password, setSnackbarOpen, setSnackbarMessage, setLoading);

// //     if (res?.passwordChangeRequired) {
// //       navigate('/change-password', {
// //         state: {
// //           temporaryToken: res.temporaryToken,
// //           oldPassword: password
// //         }
// //       });
// //       return;
// //     }

// //     if (res?.token) {
// //       localStorage.setItem("token", res.token);
// //       navigate('/');
// //     }

// //   } catch (error) {
// //     // Les erreurs sont déjà gérées dans le service
// //     console.error("Erreur:", error);
// //   }
// // };
// ////lfou9khdama
// const handleSubmit = async (event) => {
//   event.preventDefault();
//   setLoading(true);

//   const formData = new FormData(event.currentTarget);
//   const email = formData.get("email");
//   const password = formData.get("password");

//   try {
//     const result = await authenticate(
//       email, 
//       password,
//       setSnackbarOpen,
//       setSnackbarMessage,
//       setLoading
//     );

//     if (result?.passwordChangeRequired) {
//       // Redirection vers le changement de mot de passe
//       navigate('/change-password', {
//         state: {
//           temporaryToken: result.temporaryToken,
//           oldPassword: result.oldPassword
//         }
//       });
//     } else if (result?.token) {
//       // Redirection vers la page d'accueil
//       navigate('/dashboard/project');
//     }

//   } catch (error) {
//     console.error("Erreur de connexion:", error);
//   }
// };
//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Avatar
//           src="/src/assets/auth_logo.png"
//           sx={{ m: 1, bgcolor: "secondary.main" }}
//         />
//         <Typography component="h1" variant="h5">
//           Sign in
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//           />
//           <FormControlLabel
//             control={<Checkbox value="remember" color="primary" />}
//             label="Remember me"
//           />
//           <LoadingButton
//             type="submit"
//             loading={loading}
//             loadingIndicator="Loading…"
//             fullWidth
//             sx={{ mt: 3, mb: 2 }}
//             variant="contained"
//           >
//             <span>Sign In</span>
//           </LoadingButton>
//           <Grid container>
//             <Grid item xs>
//               <Link component={RouterLink} to="/auth/reset-password" variant="body2">
//                 Forgot password?
//               </Link>
//             </Grid>
//             <Grid item>
//               <Link component={RouterLink} to="/auth/register" variant="body2">
//                 Don't have an account? Sign Up
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={
//             snackbarMessage && snackbarMessage.includes("successfully")
//               ? "success"
//               : "error"
//           }
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//       <Copyright sx={{ mt: 8, mb: 4 }} />
//     </Container>
//   );
// }