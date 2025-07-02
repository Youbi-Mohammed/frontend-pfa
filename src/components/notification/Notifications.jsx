/* eslint-disable react/prop-types */
import { DeleteOutline } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Avatar,
  Box,
  IconButton,
  Popover,
  Tab,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { hasRole } from "../../utils/userUtiles";

function Notifications({
  isNotificationPopoverOpen,
  notificationAnchorEl,
  handleCloseNotsView,
  notifications,
  handleDeleteNotification,
  elapsedTime,
  mode,
  teamNotifications,
  sendersImages,
}) {
  const [value, setValue] = useState("1");
  const isSupervisor = hasRole("ROLE_SUPERVISOR");
  const isStudent = hasRole("ROLE_STUDENT");

  const handleNotsViewChange = (event, newValue) => {
    setValue(newValue);
  };

  const borderColor = mode === "dark" ? "#4a9a9a33" : "#a3d5d533"; // teal pastel transparent
  const backgroundColor = mode === "dark" ? "#121212" : "#f5f5f5";
  const textSecondaryColor = mode === "dark" ? "#a3d5d5" : "#4a4a4a";
  const primaryTeal = "#2d7a7a";
  const hoverTeal = "#1e5a5a";
  const errorCoral = "#dc6545";
  const errorHoverCoral = "#ff866f";

  return (
    <Popover
      open={isNotificationPopoverOpen}
      anchorEl={notificationAnchorEl}
      onClose={handleCloseNotsView}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{
        "& .MuiPopover-paper": {
          borderRadius: 2,
          width: window.innerWidth > 550 ? 380 : "100svw",
          height: window.innerWidth > 550 ? "65svh" : "100svh",
          minHeight: "65svh",
          bgcolor: backgroundColor,
          position: "relative",
          overflowY: "auto",
          "&::-webkit-scrollbar": { display: "none" },
          boxShadow:
            mode === "dark"
              ? "0 4px 20px rgba(57,193,232,0.5)"
              : "0 4px 20px rgba(45,122,122,0.3)",
        },
      }}
    >
      <Box
        sx={{
          borderRadius: "15px 15px 0 0",
          p: 2,
          display: "flex",
          width: window.innerWidth > 550 ? 380 : "calc(100svw - 32px)",
          alignItems: "center",
          justifyContent: "space-between",
          position: "fixed",
          zIndex: 1,
          bgcolor: backgroundColor,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12))",
          boxShadow:
            mode === "dark"
              ? "inset 0 -1px 0 #39c1e833"
              : "inset 0 -1px 0 #4a9a9a33",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            color: mode === "dark" ? "#39c1e8" : primaryTeal,
            fontSize: "1.1rem",
          }}
        >
          Notifications
        </Typography>
        <IconButton
          onClick={handleCloseNotsView}
          size="small"
          sx={{
            color: textSecondaryColor,
            "&:hover": { bgcolor: hoverTeal + "22" },
            "&:focus": { outline: "none", bgcolor: hoverTeal + "22" },
            "&:active": { bgcolor: hoverTeal + "33" },
          }}
          aria-label="close notifications"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: "100%",
          typography: "body1",
          pt: "54px",
          bgcolor: backgroundColor,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12))",
          minHeight: "calc(65svh - 64px)",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: borderColor }}>
            <TabList
              onChange={handleNotsViewChange}
              aria-label="notifications tabs"
              sx={{
                position: "fixed",
                width: window.innerWidth > 550 ? 380 : "calc(100% - 32px)",
                bgcolor: backgroundColor,
                zIndex: 1,
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12))",
                borderBottom: `1px solid ${borderColor}`,

                // Retirer toutes les couleurs bleues par défaut (focus, hover, selected)
                "& .MuiTab-root": {
                  color: textSecondaryColor,
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    color: hoverTeal,
                    bgcolor: hoverTeal + "11",
                  },
                  "&.Mui-selected": {
                    color: primaryTeal,
                    bgcolor: "transparent",
                    fontWeight: 700,
                  },
                  "&.Mui-focusVisible": {
                    bgcolor: "transparent",
                    outline: "none",
                  },
                  "&:focus": {
                    bgcolor: "transparent",
                    outline: "none",
                  },
                },

                // Pour l'indicateur de tab (underline)
                "& .MuiTabs-indicator": {
                  backgroundColor: primaryTeal,
                },
              }}
              textColor="inherit"
              indicatorColor="primary"
            >
              <Tab label="General" value="1" />
              {isStudent && <Tab label="Team" value="2" />}
              {(isSupervisor || isStudent) && <Tab label="Project" value="3" />}
            </TabList>
          </Box>

          {/* Panels - mêmes styles mais sans bleu */}
          <TabPanel value="1" sx={{ pt: "48px", px: 0 }}>
            {notifications && notifications.length > 0 ? (
              notifications.map((notification) => (
                <Box
                  key={notification.id}
                  sx={{
                    display: "flex",
                    p: 1,
                    alignItems: "center",
                    borderBottom: `1px solid ${borderColor}`,
                    gap: 1,
                  }}
                >
                  <Avatar
                    variant="rounded"
                    src={
                      sendersImages.find(
                        (sender) => sender.id === notification.idOfSender
                      )?.url
                    }
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      boxShadow:
                        mode === "dark"
                          ? "0 0 8px #39c1e8aa"
                          : "0 0 8px #2d7a7aaa",
                    }}
                  />

                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontSize: 14, color: textSecondaryColor }}
                    >
                      {notification.description}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 10,
                        textAlign: "right",
                        color: textSecondaryColor,
                        mt: 0.5,
                      }}
                    >
                      {elapsedTime[notification.id]}
                    </Typography>
                  </Box>

                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteNotification(notification.id)}
                    size="small"
                    sx={{
                      color: errorCoral,
                      "&:hover": { color: errorHoverCoral, bgcolor: "transparent" },
                      "&:focus": { outline: "none", bgcolor: "transparent" },
                      "&:active": { bgcolor: "transparent" },
                    }}
                    aria-label="delete notification"
                  >
                    <DeleteOutline />
                  </IconButton>
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  pt: 6,
                  color: textSecondaryColor,
                }}
              >
                <img
                  src="/src/assets/notification.png"
                  alt="No notifications"
                  height={150}
                  width={150}
                  style={{ opacity: 0.3 }}
                />
                <Typography variant="body1" sx={{ mt: 2 }}>
                  No notifications to show
                </Typography>
              </Box>
            )}
          </TabPanel>

          {isStudent && (
            <TabPanel value="2" sx={{ pt: "48px", px: 0 }}>
              {teamNotifications && teamNotifications.length > 0 ? (
                teamNotifications.map((teamNotification) => (
                  <Box
                    key={teamNotification.id}
                    sx={{
                      display: "flex",
                      p: 1,
                      alignItems: "center",
                      borderBottom: `1px solid ${borderColor}`,
                      gap: 1,
                    }}
                  >
                    <Avatar
                      variant="rounded"
                      src={
                        sendersImages.find(
                          (sender) => sender.id === teamNotification.idOfSender
                        )?.url
                      }
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        boxShadow:
                          mode === "dark"
                            ? "0 0 8px #39c1e8aa"
                            : "0 0 8px #2d7a7aaa",
                      }}
                    />
                    <Box
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontSize: 14, color: textSecondaryColor }}
                      >
                        {teamNotification.description}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 10,
                          textAlign: "right",
                          color: textSecondaryColor,
                          mt: 0.5,
                        }}
                      >
                        {elapsedTime[teamNotification.id]}
                      </Typography>
                    </Box>
                    <IconButton
                      edge="end"
                      onClick={() =>
                        handleDeleteNotification(
                          teamNotification.id,
                          teamNotification.type
                        )
                      }
                      size="small"
                      sx={{
                        color: errorCoral,
                        "&:hover": { color: errorHoverCoral, bgcolor: "transparent" },
                        "&:focus": { outline: "none", bgcolor: "transparent" },
                        "&:active": { bgcolor: "transparent" },
                      }}
                      aria-label="delete team notification"
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Box>
                ))
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: 6,
                    color: textSecondaryColor,
                  }}
                >
                  <img
                    src="/src/assets/notification.png"
                    alt="No team notifications"
                    height={150}
                    width={150}
                    style={{ opacity: 0.3 }}
                  />
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    No team notifications to show
                  </Typography>
                </Box>
              )}
            </TabPanel>
          )}

          {(isStudent || isSupervisor) && (
            <TabPanel value="3" sx={{ pt: "48px", px: 0 }}>
              {teamNotifications && teamNotifications.length > 0 ? (
                teamNotifications.map((teamNotification) => (
                  <Box
                    key={teamNotification.id}
                    sx={{
                      display: "flex",
                      p: 1,
                      alignItems: "center",
                      borderBottom: `1px solid ${borderColor}`,
                      gap: 1,
                    }}
                  >
                    <Avatar
                      variant="rounded"
                      src={
                        sendersImages.find(
                          (sender) => sender.id === teamNotification.idOfSender
                        )?.url
                      }
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        boxShadow:
                          mode === "dark"
                            ? "0 0 8px #39c1e8aa"
                            : "0 0 8px #2d7a7aaa",
                      }}
                    />
                    <Box
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontSize: 14, color: textSecondaryColor }}
                      >
                        {teamNotification.description}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 10,
                          textAlign: "right",
                          color: textSecondaryColor,
                          mt: 0.5,
                        }}
                      >
                        {elapsedTime[teamNotification.id]}
                      </Typography>
                    </Box>
                    <IconButton
                      edge="end"
                      onClick={() =>
                        handleDeleteNotification(
                          teamNotification.id,
                          teamNotification.type
                        )
                      }
                      size="small"
                      sx={{
                        color: errorCoral,
                        "&:hover": { color: errorHoverCoral, bgcolor: "transparent" },
                        "&:focus": { outline: "none", bgcolor: "transparent" },
                        "&:active": { bgcolor: "transparent" },
                      }}
                      aria-label="delete project notification"
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Box>
                ))
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: 6,
                    color: textSecondaryColor,
                  }}
                >
                  <img
                    src="/src/assets/notification.png"
                    alt="No project notifications"
                    height={150}
                    width={150}
                    style={{ opacity: 0.3 }}
                  />
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    No project notifications to show
                  </Typography>
                </Box>
              )}
            </TabPanel>
          )}
        </TabContext>
      </Box>
    </Popover>
  );
}

export default Notifications;
