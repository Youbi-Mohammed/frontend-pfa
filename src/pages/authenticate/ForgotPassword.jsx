import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Link,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import {
  forgotPassword,
  resetPassword,
  validateToken,
} from "../../services/authService";

const steps = ["Enter Email", "Enter Security Token", "Set New Password"];

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      PFA HUB {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const confirmPasswordRef = useRef(null);
  const [newPassword, setNewPassword] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleNext = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (activeStep === 0) {
      await forgotPassword(
        email,
        setSnackbarOpen,
        setSnackbarMessage,
        setLoading,
        setActiveStep
      );
    } else if (activeStep === 1) {
      await validateToken(
        email,
        token,
        setSnackbarOpen,
        setSnackbarMessage,
        setLoading,
        setActiveStep
      );
    } else if (activeStep === 2) {
      if (newPassword !== confirmPasswordRef.current.value) {
        setSnackbarOpen(true);
        setSnackbarMessage("Passwords do not match");
        setLoading(false);
      } else {
        const response = await resetPassword(
          token,
          newPassword,
          setSnackbarOpen,
          setSnackbarMessage,
          setLoading
        );
        if (response) {
          localStorage.setItem("email", email);
          setSnackbarOpen(true);
          setSnackbarMessage("Password reset successfully");
          setTimeout(() => {
            navigate("/auth/authenticate");
          }, 1500);
        }
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ bgcolor: "#f5fafa", minHeight: "100vh", py: 5 }}
    >
      <CssBaseline />
      <Box
        sx={{
          mt: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          borderRadius: 3,
          boxShadow: "0px 0px 18px rgba(45, 122, 122, 0.2)",
          bgcolor: "#ffffff",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "#2d7a7a",
            width: 64,
            height: 64,
            boxShadow: "0 0 8px #6bb6b6",
          }}
        >
          <LockResetIcon sx={{ color: "#ffffff", fontSize: "32px" }} />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 600, color: "#1a1a1a" }}>
          Forgot Password
        </Typography>
        <Stepper
          activeStep={activeStep}
          sx={{
            width: "100%",
            mt: 3,
            mb: 2,
            "& .MuiStepIcon-root.Mui-completed": { color: "#6bb6b6" },
            "& .MuiStepIcon-root.Mui-active": { color: "#2d7a7a" },
            "& .MuiStepLabel-label": { fontWeight: 500, color: "#2d2d2d" },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box
          component="form"
          onSubmit={handleNext}
          sx={{
            mt: 1,
            width: "100%",
            // Style global des inputs pour enlever le bleu MUI par défaut
            "& label": { color: "#2d7a7a" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#a3d5d5" },
              "&:hover fieldset": { borderColor: "#2d7a7a" },
              "&.Mui-focused fieldset": { borderColor: "#1e5a5a" },
              color: "#1a1a1a",
              bgcolor: "#fdfefe",
            },
            "& .MuiInputBase-input": { color: "#1a1a1a" },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1e5a5a !important",
            },
          }}
        >
          {activeStep === 0 && (
            <>
              <Alert severity="info" sx={{ mb: 2, bgcolor: "#e6f2f2", color: "#1e5a5a" }}>
                Enter your account email to receive a security token.
              </Alert>
              <TextField
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}

          {activeStep === 1 && (
            <>
              <Alert severity="info" sx={{ mb: 2, bgcolor: "#e6f2f2", color: "#1e5a5a" }}>
                Check your email and enter the security token.
              </Alert>
              <TextField
                required
                fullWidth
                label="Security Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </>
          )}

          {activeStep === 2 && (
            <>
              <Alert severity="info" sx={{ mb: 2, bgcolor: "#e6f2f2", color: "#1e5a5a" }}>
                Set your new password.
              </Alert>
              <TextField
                required
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                required
                fullWidth
                label="Confirm Password"
                type="password"
                inputRef={confirmPasswordRef}
              />
            </>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Link
              href="/auth/authenticate"
              variant="body2"
              sx={{
                color: "#2d7a7a",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline", color: "#6bb6b6" },
              }}
            >
              Login
            </Link>

            <Box>
              {activeStep !== 0 && (
                <Button
                  onClick={handleBack}
                  sx={{
                    mr: 1,
                    color: "#2d7a7a",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#e6f2f2" },
                  }}
                >
                  Back
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <LoadingButton
                  type="submit"
                  loading={loading}
                  loadingIndicator="Loading…"
                  variant="contained"
                  sx={{
                    bgcolor: "#2d7a7a",
                    textTransform: "none",
                    "&:hover": { bgcolor: "#1e5a5a" },
                  }}
                >
                  Reset
                </LoadingButton>
              ) : (
                <Button
                  variant="outlined"
                  onClick={handleNext}
                  sx={{
                    color: "#2d7a7a",
                    borderColor: "#2d7a7a",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#6bb6b6",
                      color: "white",
                      borderColor: "#6bb6b6",
                    },
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
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
            snackbarMessage &&
            (snackbarMessage.includes("successfully") ||
              snackbarMessage.includes("is valid"))
              ? "success"
              : "error"
          }
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Copyright sx={{ mt: 4, mb: 4, color: "#2d2d2d" }} />
    </Container>
  );
}

export default ForgotPassword;
