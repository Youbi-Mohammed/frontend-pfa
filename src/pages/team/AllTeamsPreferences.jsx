import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTeams } from "../../services/teamService";
import { getAllPreferences, getAllProjects, getAssignment } from "../../services/projectService";
import { downLoadProfileImage } from "../../services/userService";
import { hasRole } from "../../utils/userUtiles";
import { forEach } from "lodash";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import GroupsIcon from "@mui/icons-material/Groups";

function AllTeamsPreferences() {
  const token = localStorage.getItem("token");
  const isHOB = hasRole("ROLE_HEAD_OF_BRANCH");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [assignment, setAssignment] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [teamImages, setTeamImages] = useState([]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get current academic year
        let academicYear;
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        if (month >= 9 && month <= 12) {
          academicYear = `${year}/${year + 1}`;
        } else if (month >= 1 && month <= 7) {
          academicYear = `${year - 1}/${year}`;
        }

        const [fetchedTeams, fetchedPreferences, fetchedProjects, fetchedAssignment] = await Promise.all([
          getAllTeams(token, academicYear),
          getAllPreferences(token),
          getAllProjects(token),
          getAssignment(token)
        ]);

        setTeams(fetchedTeams);
        setPreferences(fetchedPreferences);
        setProjects(fetchedProjects);
        setAssignment(fetchedAssignment);

        // Download team responsibles images
        const images = [];
        for (const team of fetchedTeams) {
          if (team.responsible.profileImage) {
            const url = await downLoadProfileImage(team.responsible.id, token);
            images.push({
              id: team.responsible.id,
              url: url
            });
          }
        }
        setTeamImages(images);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSnackbarMessage("Failed to load data");
        setSnackbarOpen(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTeamPreferences = (teamId) => {
    return preferences.find(pref => pref.user.id === teams.find(t => t.id === teamId)?.responsible.id);
  };

  const getProjectTitle = (projectId) => {
    return projects.find(project => project.id === parseInt(projectId))?.title || "Unknown Project";
  };

  if (!isHOB) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Typography variant="h5" color="error">
          Access Denied - Only Head of Branch can view this page
        </Typography>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <BreadCrumb items={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "All Teams Preferences", href: "/dashboard/teams/preferences" }
      ]} />
      
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
        Teams Preferences Overview
      </Typography>
      
      {Object.keys(assignment).length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/dashboard/assignments/result")}
          style={{ marginBottom: '20px' }}
        >
          View Final Assignments
        </Button>
      )}

      <Divider style={{ margin: '20px 0' }} />

      {teams.length === 0 ? (
        <Typography variant="body1" style={{ textAlign: 'center', marginTop: '50px' }}>
          No teams found for the current academic year.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {teams.map(team => {
            const teamPref = getTeamPreferences(team.id);
            const responsibleImage = teamImages.find(img => img.id === team.responsible.id)?.url;

            return (
              <Grid item xs={12} md={6} lg={4} key={team.id}>
                <Card>
                  <CardContent>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <Avatar 
                        src={responsibleImage} 
                        style={{ marginRight: '10px' }}
                      >
                        {team.responsible.firstName.charAt(0)}{team.responsible.lastName.charAt(0)}
                      </Avatar>
                      <div>
                        <Typography variant="h6">{team.name}</Typography>
                        <Typography variant="subtitle2">
                          Responsible: {team.responsible.firstName} {team.responsible.lastName}
                        </Typography>
                      </div>
                    </div>

                    {teamPref ? (
                      <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>View Preferences ({Object.keys(teamPref.projectPreferenceRanks).length})</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <List dense>
                            {Object.entries(teamPref.projectPreferenceRanks)
                              .sort(([, a], [, b]) => a - b)
                              .map(([projectId, rank]) => (
                                <ListItem key={projectId}>
                                  <ListItemAvatar>
                                    <Avatar>
                                      <StarBorderPurple500Icon />
                                    </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={`${rank}. ${getProjectTitle(projectId)}`}
                                    secondary={`Project ID: ${projectId}`}
                                  />
                                </ListItem>
                              ))}
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                        <GroupsIcon style={{ fontSize: 60, opacity: 0.5, marginBottom: '10px' }} />
                        <Typography variant="body1" color="textSecondary">
                          No preferences submitted yet
                        </Typography>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AllTeamsPreferences;
