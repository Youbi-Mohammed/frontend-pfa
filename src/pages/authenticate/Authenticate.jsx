import { LoadingButton } from "@mui/lab";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { authenticate } from "../../services/authService";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
      const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };
    const [error, setError] = useState({
      code: null,
      message: "",
    });
  function handleClick() {
    setLoading(true);
  }

  
  const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData(event.currentTarget);
    const result = await authenticate(
      formData.get("email"),
      formData.get("password"),
     localStorage.setItem("mode","light"), // Assurez-vous que le mode est défini sur "light" lors de la connexion
      setSnackbarOpen,
      setSnackbarMessage,
      setLoading
    );

    if (result?.requiresPasswordChange) {
      // Redirection vers la page de changement de mot de passe
      navigate('/change-password', {
        state: {
          temporaryToken: result.temporaryToken,
          oldPassword: result.oldPassword
        }
      });
    } else if (result?.success) {
      // Redirection normale
      navigate('/');
    }

  } catch (error) {
    console.error("Erreur de connexion:", error);
  }
};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          src="/src/assets/auth_logo.png"
          sx={{ m: 1, bgcolor: "secondary.main" }}
        />
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            //value={localStorage.getItem("email") || ""} pour que je m'apprendre hhhh mais jai raté 
            defaultValue={localStorage.getItem("email") || ""}
             onChange={(e) => {
              // Optionnel: Mettre à jour le localStorage si besoin
              // localStorage.setItem("email", e.target.value);
              //khlaha hasni , c'est pas la peine t3zouha ; ila drto fiha cher w halala la la 
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <LoadingButton
            type="submit"
            loading={loading}
            loadingIndicator="Loading…"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            variant="contained"
          >
            <span>Sign In</span>
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="/auth/reset-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {/* <Link href="/auth/register" variant="body2">
                D'ont have an account? Sign Up
              </Link> */}
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