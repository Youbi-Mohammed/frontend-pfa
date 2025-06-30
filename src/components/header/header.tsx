"use client"

import { AppBar, Toolbar, Typography, Box, Avatar, IconButton, Menu, MenuItem, Divider } from "@mui/material"
import { styled } from "@mui/material/styles"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import NotificationsIcon from "@mui/icons-material/Notifications"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import { useState } from "react"

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#ffffff",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  borderBottom: "1px solid #e2e8f0",
  position: "sticky",
  top: 0,
  zIndex: 1100,
})

const StyledToolbar = styled(Toolbar)({
  padding: "0 24px",
  minHeight: "80px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
})

const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "24px",
})

const LogoBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "8px 16px",
  borderRadius: "8px",
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#f1f5f9",
    borderColor: "#cbd5e1",
  },
})

const LogoImage = styled("img")({
  height: "48px",
  width: "auto",
  objectFit: "contain",
})

const LogoText = styled(Typography)({
  fontFamily: "Inter, sans-serif",
  fontWeight: 600,
  fontSize: "14px",
  color: "#1e3a8a",
  lineHeight: 1.2,
})

const AppTitle = styled(Typography)({
  fontFamily: "Inter, sans-serif",
  fontWeight: 700,
  fontSize: "24px",
  color: "#1e3a8a",
  textAlign: "center",
  flex: 1,
  letterSpacing: "-0.025em",
})

const UserSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
})

const StyledIconButton = styled(IconButton)({
  color: "#64748b",
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  padding: "8px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#f1f5f9",
    borderColor: "#cbd5e1",
    color: "#1e3a8a",
    transform: "translateY(-1px)",
  },
})

const UserAvatar = styled(Avatar)({
  backgroundColor: "#1e3a8a",
  color: "#ffffff",
  fontFamily: "Inter, sans-serif",
  fontWeight: 600,
  cursor: "pointer",
  border: "2px solid #e2e8f0",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    borderColor: "#3b82f6",
    transform: "scale(1.05)",
  },
})

const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    borderRadius: "12px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e2e8f0",
    marginTop: "8px",
    minWidth: "200px",
  },
  "& .MuiMenuItem-root": {
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    padding: "12px 16px",
    color: "#374151",
    "&:hover": {
      backgroundColor: "#f8fafc",
      color: "#1e3a8a",
    },
  },
})

const NotificationBadge = styled(Box)({
  position: "absolute",
  top: "6px",
  right: "6px",
  width: "8px",
  height: "8px",
  backgroundColor: "#ef4444",
  borderRadius: "50%",
  border: "2px solid #ffffff",
})

export default function Header({ user = { name: "Admin User", email: "admin@ensao.ac.ma" } }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    // Logique de déconnexion
    console.log("Logout clicked")
    handleClose()
  }

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        {/* Section Logos */}
        <LogoContainer>
          <LogoBox>
            <LogoImage
              src="/placeholder.svg?height=48&width=120"
              alt="ENSAO Logo"
              title="École Nationale des Sciences Appliquées d'Oujda"
            />
            <LogoText>
              ENSAO
              <br />
              <span style={{ fontSize: "12px", fontWeight: 400, color: "#64748b" }}>École Nationale</span>
            </LogoText>
          </LogoBox>

          <Box
            sx={{
              width: "2px",
              height: "40px",
              backgroundColor: "#e2e8f0",
              borderRadius: "1px",
            }}
          />

          <LogoBox>
            <LogoImage
              src="/placeholder.svg?height=48&width=48"
              alt="Université Mohammed Premier Logo"
              title="Université Mohammed Premier"
            />
            <LogoText>
              UMP
              <br />
              <span style={{ fontSize: "12px", fontWeight: 400, color: "#64748b" }}>Université Mohammed Premier</span>
            </LogoText>
          </LogoBox>
        </LogoContainer>

        {/* Titre de l'application */}
        <AppTitle variant="h1">Système de Gestion des PFAs</AppTitle>

        {/* Section Utilisateur */}
        <UserSection>
          <StyledIconButton title="Notifications">
            <NotificationsIcon fontSize="small" />
            <NotificationBadge />
          </StyledIconButton>

          <StyledIconButton title="Paramètres">
            <SettingsIcon fontSize="small" />
          </StyledIconButton>

          <UserAvatar onClick={handleClick} title={`${user.name} - ${user.email}`}>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </UserAvatar>
        </UserSection>

        {/* Menu utilisateur */}
        <StyledMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleClose}>
            <AccountCircleIcon sx={{ marginRight: "12px", fontSize: "18px", color: "#64748b" }} />
            Mon Profil
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <SettingsIcon sx={{ marginRight: "12px", fontSize: "18px", color: "#64748b" }} />
            Paramètres
          </MenuItem>
          <Divider sx={{ margin: "8px 0" }} />
          <MenuItem onClick={handleLogout} sx={{ color: "#ef4444 !important" }}>
            <LogoutIcon sx={{ marginRight: "12px", fontSize: "18px" }} />
            Se Déconnecter
          </MenuItem>
        </StyledMenu>
      </StyledToolbar>
    </StyledAppBar>
  )
}
