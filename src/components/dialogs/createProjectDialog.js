import { Dialog, DialogContent, Grid } from "@mui/material"
import { styled } from "@mui/system"

export const StyledDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    border: "1px solid #e2e8f0",
    fontFamily: "Inter, sans-serif",
    "&::-webkit-scrollbar": {
      width: "6px",
      height: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f5f9",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#64748b",
      borderRadius: "3px",
      "&:hover": {
        backgroundColor: "#475569",
      },
    },
  },
}))

export const StyledDialogContent = styled(DialogContent)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  padding: "24px",
  backgroundColor: "#f8fafc",
  fontFamily: "Inter, sans-serif",
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f1f5f9",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#64748b",
    borderRadius: "3px",
    "&:hover": {
      backgroundColor: "#475569",
    },
  },
}))

export const StyledGrid = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  alignItems: "center",
  flexWrap: "wrap",
  padding: "16px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    borderColor: "#3b82f6",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.1)",
  },
}))

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})
