import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import CodeIcon from '@mui/icons-material/Code';
import EventIcon from '@mui/icons-material/Event';
import GetAppIcon from '@mui/icons-material/GetApp';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import { Avatar, AvatarGroup, Button, Card, CardActions, CardContent, CardHeader, Grid, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import { downloadFile } from "../../services/documentService";
import { getProjectById } from "../../services/projectService";
import { getTeamById } from "../../services/teamService";
import { downLoadProfileImage, getUserById } from "../../services/userService";
import { stringAvatar, stringToColor } from "../../utils/generalUtils";
import { hasRole } from "../../utils/userUtiles";
import ProjectDetailsSkeleton from "./ProjectDetailsSkeleton";
import Groups2Icon from "@mui/icons-material/Groups2";
import EditProjectDialog from '../../components/dialogs/EditProjectDialog';

function ProjectDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const mode = localStorage.getItem("mode") || 'light';
  const [project, setProject] = useState({});
  const [render, setRender] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [supervisors, setSupervisors] = useState([]);
  const [team, setTeam] = useState({});
  const [projectTeam, setProjectTeam] = useState({});
  const [documents, setDocuments] = useState([]);
  const [report, setReport] = useState(null);
  const [supervisorsImages, setSupervisorsImages] = useState([]);
  const [membersImages, setMembersImages] = useState([]);
  const [editProjectDialogOpen, setEditProjectDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Palette de couleurs teal/turquoise
  const colors = {
    primary: '#2d7a7a',
    primaryDark: '#1e5a5a',
    primaryLight: '#6bb6b6',
    primaryPastel: '#d1e7e7',
    background: mode === 'dark' ? '#121212' : '#fdfefe',
    paper: mode === 'dark' ? '#1e1e1e' : '#fcfefe',
    paperContrast: mode === 'dark' ? '#2a2a2a' : '#ffffff',
    textPrimary: mode === 'dark' ? '#fdfefe' : '#1a1a1a',
    textSecondary: mode === 'dark' ? '#d1e7e7' : '#4a4a4a',
    border: mode === 'dark' ? '#2d7a7a' : '#e6f2f2',
    error: '#dc6545',
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleModalClose = () => {
    setEditProjectDialogOpen(false);
  };

  const isSupervisor = hasRole("ROLE_SUPERVISOR");
  const isHOB = hasRole("ROLE_HEAD_OF_BRANCH");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [fetchedUser, fetchedProject] = await Promise.all([
          getUserById(userId, token),
          getProjectById(id, token)
        ]);

        let fetchedTeam = null;
        if (fetchedUser.teamId !== null) {
          fetchedTeam = await getTeamById(fetchedUser.teamId, token);
        }

        const fetchedSupervisors = await Promise.all(
          fetchedProject.supervisorIds.map(supervisorId => 
            getUserById(supervisorId, token)
        ));

        let fetchedProjectTeam = null;
        if (fetchedProject.teamId !== null) {
          fetchedProjectTeam = await getTeamById(fetchedProject.teamId, token);
        }

        const loadImages = async (items) => {
          return Promise.all(
            items.map(async item => {
              try {
                const url = await downLoadProfileImage(item.id, token);
                return {
                  id: item.id,
                  name: `${item.firstName} ${item.lastName}`,
                  url
                };
              } catch (error) {
                console.error(`Error loading image for user ${item.id}:`, error);
                return {
                  id: item.id,
                  name: `${item.firstName} ${item.lastName}`,
                  url: null
                };
              }
            })
          );
        };

        setProject(fetchedProject);
        setUser(fetchedUser);
        setTeam(fetchedTeam);
        setProjectTeam(fetchedProjectTeam);
        setSupervisors(fetchedSupervisors);

        const [supervisorImages, memberImages] = await Promise.all([
          loadImages(fetchedSupervisors),
          fetchedProjectTeam ? loadImages(fetchedProjectTeam.members) : Promise.resolve([])
        ]);
        
        setSupervisorsImages(supervisorImages);
        setMembersImages(memberImages);

        if (fetchedProject.folders) {
          const documentsFolder = fetchedProject.folders.find(f => f.type === "DOCUMENTS");
          const reportFolder = fetchedProject.folders.find(f => f.type === "REPORT");

          setDocuments(documentsFolder?.documents || []);
          setReport(reportFolder?.documents?.[0] || null);
        }

      } catch (error) {
        console.error("Error fetching project details:", error);
        setSnackbarMessage("Failed to load project details");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token, render]);

  if (loading) {
    return <ProjectDetailsSkeleton />;
  }

  if (!project) {
    return <div>Project not found!</div>;
  }

  const isTeamMember =
    projectTeam &&
    Object.keys(projectTeam).length > 0 &&
    projectTeam.members.some((member) => member.id === parseInt(userId));
  
  const isOldProject = project.status === "old";
  const canViewDocuments = 
    Object.keys(project).length > 0 &&
    ((isSupervisor && project.supervisorIds.some(id => id === parseInt(userId))) ||
    isHOB ||
    (hasRole("ROLE_STUDENT") && isTeamMember));
  
  const hasReport = report !== null && report !== undefined;
  const hasDocuments = documents && documents.length > 0;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      minHeight: "calc(100vh - 100px)",
      backgroundColor: colors.background,
      padding: '16px'
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <BreadCrumb
          items={[
            { label: "Home", link: "/" },
            { label: "Projects", link: "/projects" },
            { label: project.title, link: "#" },
          ]}
        />
        {isSupervisor && project.supervisorIds.some((id) => id === parseInt(userId)) && (
          <Button
            variant="text"
            onClick={() => setEditProjectDialogOpen(true)}
            startIcon={<BorderColorOutlinedIcon />}
            sx={{ color: colors.primary }}
          >
            Edit
          </Button>
        )}
      </div>

      <Grid container spacing={2} style={{ flex: 1 }}>
        <Grid item xs={12} md={7} lg={8} sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Paper elevation={2} sx={{
            padding: "20px",
            backgroundColor: colors.paper,
            border: `1px solid ${colors.border}`,
            borderRadius: '8px'
          }}>
            <Typography variant="h6" sx={{ color: colors.primary, mb: 1 }}>
              Description
            </Typography>
            <Typography variant="body1" sx={{ color: colors.textSecondary }}>
              {project.description}
            </Typography>
          </Paper>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <Paper elevation={2} sx={{
              flex: 1,
              minWidth: '200px',
              padding: "15px",
              backgroundColor: mode === 'dark' ? 'rgba(45, 122, 122, 0.2)' : 'rgba(45, 122, 122, 0.1)',
              border: `1px solid ${colors.border}`,
              borderRadius: '8px'
            }}>
              <Typography variant="h6" sx={{ 
                color: colors.primary,
                display: "flex", 
                alignItems: "center",
                mb: 1
              }}>
                Status <TimelapseIcon sx={{ ml: 1 }} />
              </Typography>
              <Typography variant="body1" sx={{ color: colors.textSecondary }}>
                {project.status}
              </Typography>
            </Paper>

            <Paper elevation={2} sx={{
              flex: 1,
              minWidth: '200px',
              padding: "15px",
              backgroundColor: mode === 'dark' ? 'rgba(107, 182, 182, 0.2)' : 'rgba(107, 182, 182, 0.1)',
              border: `1px solid ${colors.border}`,
              borderRadius: '8px'
            }}>
              <Typography variant="h6" sx={{ 
                color: colors.primary,
                display: "flex", 
                alignItems: "center",
                mb: 1
              }}>
                Academic Year <EventIcon sx={{ ml: 1 }} />
              </Typography>
              <Typography variant="body1" sx={{ color: colors.textSecondary }}>
                {project.academicYear}
              </Typography>
            </Paper>

            <Paper elevation={2} sx={{
              flex: 1,
              minWidth: '200px',
              padding: "15px",
              backgroundColor: mode === 'dark' ? 'rgba(209, 231, 231, 0.2)' : 'rgba(209, 231, 231, 0.1)',
              border: `1px solid ${colors.border}`,
              borderRadius: '8px'
            }}>
              <Typography variant="h6" sx={{ 
                color: colors.primary,
                display: "flex", 
                alignItems: "center",
                mb: 1
              }}>
                Technologies <CodeIcon sx={{ ml: 1 }} />
              </Typography>
              <Typography variant="body1" sx={{ color: colors.textSecondary }}>
                {project.techStack}
              </Typography>
            </Paper>
          </div>

          {hasReport && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <BreadCrumb items={[{ label: "Documents", link: "#" }]} />
              <DataGrid
                rows={canViewDocuments && hasDocuments && hasReport ? [report, ...documents] : [report]}
                columns={[
                  {
                    field: "docName",
                    headerName: "Document Name",
                    width: 200,
                    valueGetter: (params) =>
                      params.row === report
                        ? `Report: ${params.row.docName.split(".")[0].slice(0, -37)}`
                        : params.row.docName.split(".")[0].slice(0, -37),
                    headerClassName: 'data-grid-header',
                  },
                  {
                    field: "fileType",
                    headerName: "File Type",
                    width: 150,
                    valueGetter: (params) => params.row.docName.split(".").pop().toUpperCase(),
                    headerClassName: 'data-grid-header',
                  },
                  {
                    field: "size",
                    headerName: "Size",
                    width: 100,
                    valueGetter: (params) => `${(params.row.fileSize / 1024).toFixed(2)} KB`,
                    headerClassName: 'data-grid-header',
                  },
                  {
                    field: "downloadLink",
                    headerName: "Download",
                    width: 150,
                    renderCell: (params) => (
                      <Button
                        variant="text"
                        onClick={() => downloadFile(project.id, params.row.id, params.row.docName, token)}
                        sx={{ color: colors.primary }}
                      >
                        <GetAppIcon />
                      </Button>
                    ),
                    headerClassName: 'data-grid-header',
                  },
                ]}
                getRowClassName={(params) => params.row === report ? "report-row" : "normal-row"}
                sx={{
                  width: "100%",
                  backgroundColor: colors.paperContrast,
                  color: colors.textPrimary,
                  '& .MuiDataGrid-cell': {
                    borderBottom: `1px solid ${colors.border}`,
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: mode === 'dark' ? '#1e5a5a' : '#d1e7e7',
                    color: mode === 'dark' ? '#fdfefe' : '#1a1a1a',
                  },
                  '& .MuiDataGrid-footerContainer': { display: "none" },
                  '& .report-row': {
                    backgroundColor: 'rgba(45, 122, 122, 0.1)',
                    fontWeight: "bold",
                  },
                }}
                autoHeight
                disableRowSelectionOnClick
                disableSelectionOnClick
                disableColumnMenu
              />
            </div>
          )}
        </Grid>

        <Grid item xs={12} md={5} lg={4}>
          <Paper elevation={3} sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            backgroundColor: colors.paper,
            border: `1px solid ${colors.border}`,
            borderRadius: '8px'
          }}>
            <BreadCrumb items={[{ label: "Supervisors", link: "#" }]} />
            {supervisors.map((supervisor) => (
              <Card key={supervisor.id} sx={{ 
                backgroundColor: colors.paperContrast,
                border: `1px solid ${colors.border}` 
              }}>
                <CardHeader
                  sx={{ padding: "10px" }}
                  avatar={
                    <Avatar
                      src={supervisorsImages.find(img => img.id === supervisor.id)?.url}
                      sx={{ bgcolor: stringToColor(supervisor.firstName + " " + supervisor.lastName) }}
                    />
                  }
                  title={
                    <Typography sx={{ color: colors.textPrimary, fontWeight: 500 }}>
                      {supervisor.firstName} {supervisor.lastName}
                    </Typography>
                  }
                  subheader={
                    <Typography sx={{ color: colors.textSecondary }}>
                      {supervisor.email}
                    </Typography>
                  }
                />
              </Card>
            ))}

            <BreadCrumb items={[{ label: "Team", link: "#" }]} />
            {projectTeam && Object.keys(projectTeam).length > 0 ? (
              <Card sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px",
                backgroundColor: colors.paperContrast,
                border: `1px solid ${colors.border}`
              }}>
                <div>
                  <Typography variant="body1" sx={{ color: colors.textPrimary, fontWeight: 500 }}>
                    {projectTeam.name}
                  </Typography>
                </div>
                <AvatarGroup max={5}>
                  {projectTeam.members.map((member) => (
                    <Avatar
                      key={member.id}
                      src={membersImages.find(img => img.id === member.id)?.url}
                      sx={{ 
                        bgcolor: stringToColor(member.firstName + " " + member.lastName),
                        width: 40, 
                        height: 40 
                      }}
                    />
                  ))}
                </AvatarGroup>
              </Card>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: '20px' }}>
                <Groups2Icon sx={{ fontSize: 70, color: colors.textSecondary, opacity: 0.5 }} />
                <Typography variant="body1" sx={{ color: colors.textSecondary, mt: 1 }}>
                  No team assigned yet
                </Typography>
              </div>
            )}

            {project.codeLink && ((team && Object.keys(team).length > 0 && team.id === project.teamId) || 
              (isSupervisor && project.supervisorIds.includes(user.id)) || isHOB) && (
              <>
                <BreadCrumb items={[{ label: "Code Repository", link: "#" }]} />
                <Card sx={{ backgroundColor: colors.paperContrast, border: `1px solid ${colors.border}` }}>
                  <CardContent>
                    <Typography variant="body1" sx={{ color: colors.textPrimary }}>
                      {project.codeLink}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        color: colors.primary,
                        '&:hover': {
                          backgroundColor: 'rgba(45, 122, 122, 0.1)'
                        }
                      }}
                    >
                      Visit Repository
                    </Button>
                  </CardActions>
                </Card>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>

      <EditProjectDialog 
        editProjectDialogOpen={editProjectDialogOpen}
        handleModalClose={handleModalClose}
        setSnackbarOpen={setSnackbarOpen}
        setSnackbarMessage={setSnackbarMessage}
        project={project}
        setRender={setRender}
      />
    </div>
  );
}

export default ProjectDetails;