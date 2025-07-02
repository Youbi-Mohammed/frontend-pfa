import { forwardRef, useEffect, useState } from "react";
import {
  DialogActions,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
  TextField,
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Grid,
  useMediaQuery,
  Typography,
  Avatar,
  IconButton,
  Box,
  styled,
  useTheme
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ProjectIcon from "@mui/icons-material/Assignment";
import TeamIcon from "@mui/icons-material/Group";
import CodeIcon from "@mui/icons-material/Code";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  downLoadProfileImage,
  getSupervisors,
} from "../../services/userService";
import createProject from "../../services/projectService";
import { StyledDialog, StyledDialogContent, VisuallyHiddenInput } from "./createProjectDialog";
import { hasRole } from "../../utils/userUtiles";
import { getAllTeams } from "../../services/teamService";
import { forEach } from "lodash";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Couleurs personnalisées
const TEAL_COLORS = {
  main: '#2D7A7A',
  light: '#4A9A9A',
  dark: '#1E5A5A',
  contrastText: '#FFFFFF'
};

// Dynamic Styled Components based on theme
const ModernDialog = styled(StyledDialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "8px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    border: `1px solid ${theme.palette.divider}`,
    maxWidth: "800px",
    fontFamily: "'Inter', sans-serif",
  },
}));

const ModernDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#f8fafa' : theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: "24px 32px",
  borderBottom: `1px solid ${theme.palette.divider}`,
  "& .MuiTypography-root": {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: "20px",
    color: theme.palette.text.primary,
  },
}));

const ModernDialogContent = styled(StyledDialogContent)(({ theme }) => ({
  padding: "32px",
  backgroundColor: theme.palette.background.paper,
}));

const ModernTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    backgroundColor: theme.palette.background.paper,
    fontFamily: "'Inter', sans-serif",
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: TEAL_COLORS.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: TEAL_COLORS.main,
      borderWidth: "1px",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Inter', sans-serif",
    color: theme.palette.text.secondary,
    "&.Mui-focused": {
      color: TEAL_COLORS.main,
    },
  },
  "& .MuiOutlinedInput-input": {
    color: theme.palette.text.primary,
  },
}));

const ModernAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    backgroundColor: theme.palette.background.paper,
    fontFamily: "'Inter', sans-serif",
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: TEAL_COLORS.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: TEAL_COLORS.main,
      borderWidth: "1px",
    },
  },
  "& .MuiChip-root": {
    backgroundColor: theme.palette.mode === 'light' ? '#f8fafa' : theme.palette.background.default,
    color: TEAL_COLORS.main,
    fontFamily: "'Inter', sans-serif",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "4px",
    fontSize: "12px",
    "& .MuiChip-deleteIcon": {
      color: TEAL_COLORS.light,
    },
  },
}));

const ModernFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiFormLabel-root": {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    color: theme.palette.text.primary,
    fontSize: "15px",
  },
  "& .MuiFormControlLabel-label": {
    fontFamily: "'Inter', sans-serif",
    color: theme.palette.text.secondary,
    fontSize: "14px",
  },
  "& .MuiRadio-root": {
    color: TEAL_COLORS.light,
    "&.Mui-checked": {
      color: TEAL_COLORS.main,
    },
  },
}));

const ModernUploadContainer = styled(Box)(({ theme }) => ({
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: "6px",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    borderColor: TEAL_COLORS.light,
    backgroundColor: theme.palette.mode === 'light' ? '#fcfefe' : theme.palette.background.default,
  },
}));

const ModernUploadButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  color: theme.palette.text.secondary,
  textTransform: "none",
  padding: "20px",
  width: "100%",
  fontSize: "14px",
  "&:hover": {
    backgroundColor: "transparent",
    color: TEAL_COLORS.main,
  },
}));

const ModernFileItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  backgroundColor: theme.palette.mode === 'light' ? '#fcfefe' : theme.palette.background.default,
  borderTop: `1px solid ${theme.palette.divider}`,
  "&:first-of-type": {
    borderTop: "none",
  },
}));

const ModernButton = styled(Button)(({ theme, variant, color }) => ({
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  borderRadius: "6px",
  textTransform: "none",
  padding: "10px 20px",
  fontSize: "14px",
  color: theme.palette.text.primary,
  ...(variant === "outlined" && {
    borderColor: theme.palette.divider,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
      backgroundColor: theme.palette.mode === 'light' ? '#fcfefe' : theme.palette.background.default,
      borderColor: TEAL_COLORS.light,
      color: theme.palette.text.primary,
    },
  }),
  ...(color === "error" && {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.light,
    "&:hover": {
      backgroundColor: theme.palette.mode === 'light' ? '#fef7f4' : theme.palette.error.dark,
      borderColor: theme.palette.error.main,
    },
  }),
}));

const ModernLoadingButton = styled(LoadingButton)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  borderRadius: "6px",
  textTransform: "none",
  padding: "10px 24px",
  fontSize: "14px",
  backgroundColor: TEAL_COLORS.main,
  color: TEAL_COLORS.contrastText,
  "&:hover": {
    backgroundColor: TEAL_COLORS.dark,
  },
  "&:disabled": {
    backgroundColor: theme.palette.mode === 'light' ? '#e6f2f2' : theme.palette.background.default,
    color: theme.palette.mode === 'light' ? '#a3d5d5' : theme.palette.text.disabled,
  },
}));

const ModernIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: theme.palette.mode === 'light' ? '#fcfefe' : theme.palette.background.default,
    color: TEAL_COLORS.main,
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  fontSize: "16px",
  color: theme.palette.text.primary,
  marginBottom: "16px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));

const ModernSectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "6px",
  padding: "24px",
  marginBottom: "20px",
  border: `1px solid ${theme.palette.divider}`,
}));

const ModernIconBadge = styled(Box)(({ theme }) => ({
  width: "24px",
  height: "24px",
  borderRadius: "4px",
  backgroundColor: theme.palette.mode === 'light' ? '#f8fafa' : theme.palette.background.default,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const token = localStorage.getItem("token");

const techOptions = [
  { title: "JavaScript", iconClassName: "devicon-javascript-plain colored" },
  { title: "React", iconClassName: "devicon-react-original colored" },
  { title: "Node.js", iconClassName: "devicon-nodejs-plain colored" },
  { title: "Express.js", iconClassName: "devicon-express-original colored" },
  { title: "Vue.js", iconClassName: "devicon-vuejs-plain colored" },
  { title: "Angular", iconClassName: "devicon-angularjs-plain colored" },
  { title: "Python", iconClassName: "devicon-python-plain colored" },
  { title: "Django", iconClassName: "devicon-django-plain colored" },
  { title: "Ruby on Rails", iconClassName: "devicon-rails-plain colored" },
  { title: "React Native", iconClassName: "devicon-react-original colored" },
  { title: "Flutter", iconClassName: "devicon-flutter-plain colored" },
  { title: "MongoDB", iconClassName: "devicon-mongodb-plain colored" },
  { title: "MySQL", iconClassName: "devicon-mysql-plain colored" },
  { title: "PostgreSQL", iconClassName: "devicon-postgresql-plain colored" },
  { title: "Git", iconClassName: "devicon-git-plain colored" },
  { title: "Docker", iconClassName: "devicon-docker-plain colored" },
  { title: "Kubernetes", iconClassName: "devicon-kubernetes-plain colored" },
  { title: "Symfony", iconClassName: "devicon-symfony-original colored" },
  { title: "SpringBoot", iconClassName: "devicon-spring-plain colored" },
];

function CreateProjectDialog({ projectDialogOpen, handleModalClose, setSnackbarOpen, setSnackbarMessage }) {
  const theme = useTheme();
  const isHOB = hasRole("ROLE_HEAD_OF_BRANCH");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [supervisors, setSupervisors] = useState([]);
  const [teams, setTeams] = useState([]);
  const [projectType, setProjectType] = useState("old");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: [],
    codeLink: "",
    branch: 1,
    academicYear: "",
    supervisors: [],
    files: [],
    report: null,
    team: null,
  });
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedReport, setUploadedReport] = useState(null);
  const [supervisorsImages, setSupervisorsImages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedSupervisors = await getSupervisors(token);
      let academicYear = "";
      const year = new Date().getFullYear();
      const month = new Date().getMonth();
      if (month >= 9 && month <= 12) {
        academicYear = `${year}/${year + 1}`;
      } else if (month >= 1 && month <= 7) {
        academicYear = `${year - 1}/${year}`;
      }

      const fetchedTeams = await getAllTeams(token, academicYear);
      const images = [];
      forEach(fetchedSupervisors, async (supervisor) => {
        const url = await downLoadProfileImage(supervisor.id, token);
        images.push({
          id: supervisor.id,
          name: supervisor.firstName + " " + supervisor.lastName,
          url: url,
        });
      });
      setSupervisorsImages(images);
      setSupervisors(fetchedSupervisors);
      setTeams(fetchedTeams.filter((team) => team.project === null));
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRadioChange = (event) => {
    const { value } = event.target;
    setProjectType(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      projectType: value,
    }));
  };

  const handleTechChange = (event, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      techStack: value,
    }));
  };

  const handleTeamChange = (event, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      team: value,
    }));
  };

  const handleSupervisorsChange = (event, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      supervisors: value,
    }));
  };

  const handleFilesChange = (event) => {
    const files = event.target.files;
    const uploadedFilesList = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
    }));
    setUploadedFiles(uploadedFilesList);
    setFormData((prevFormData) => ({
      ...prevFormData,
      files: Array.from(files).slice(0, 10),
    }));
  };

  const handleRemoveFileFromFiles = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFormData((prevFormData) => ({
      ...prevFormData,
      files: prevFormData.files.filter((_, i) => i !== index),
    }));
  };

  const handleReportFileChange = (event) => {
    const file = event.target.files[0];
    const uploadedReport = {
      name: file.name,
      size: file.size,
    };
    setUploadedReport(uploadedReport);
    setFormData({ ...formData, report: file });
  };

  const handleRemoveReport = () => {
    setUploadedReport(null);
    setFormData({ ...formData, report: null });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const techStack = formData.techStack.map((tech) => tech.title).join(", ");
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("status", projectType);
    data.append("techStack", techStack);
    data.append("codeLink", formData.codeLink);
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    if (month >= 9 && month <= 12) {
      formData.academicYear = `${year}/${year + 1}`;
    } else if (month >= 1 && month <= 7) {
      formData.academicYear = `${year - 1}/${year}`;
    }
    data.append("academicYear", formData.academicYear);
    data.append("branch", formData.branch);
    if (formData.team && formData.team.id !== null) {
      data.append("team", formData.team.id);
    } else {
      data.append("team", null);
    }
    data.append(
      "supervisors",
      formData.supervisors.map((supervisor) => supervisor.id)
    );
    data.append("report", formData.report);
    if (formData.files.length === 0) {
      data.append("files", null);
    } else {
      formData.files.forEach((file) => data.append("files", file));
    }
    setLoading(false);
    await createProject(token, data, setSnackbarOpen, setSnackbarMessage);
    handleModalClose();
  };

  const handleSubmitReportOnly = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("title", "Projet avec rapport uniquement");
    data.append("description", "Projet test pour import de rapport");
    if (formData.team && formData.team.id !== null) {
      data.append("team", formData.team.id);
    } else {
      data.append("team", null);
    }
    data.append(
      "supervisors",
      formData.supervisors.map((supervisor) => supervisor.id)
    );
    data.append("status", "DRAFT");
    data.append("branch", formData.branch);
    if (formData.report) {
      data.append("report", formData.report, formData.report.name);
    } else {
      setSnackbarMessage("Aucun rapport sélectionné");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }
    await createProject(token, data, setSnackbarOpen, setSnackbarMessage);
    handleModalClose();
    setLoading(false);
  };

  return (
    <ModernDialog
      open={projectDialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleModalClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          handleSubmit(event);
          // handleSubmitReportOnly(event);
        },
      }}
    >
      <ModernDialogTitle>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ModernIconBadge>
              <ProjectIcon sx={{ color: TEAL_COLORS.main, fontSize: "16px" }} />
            </ModernIconBadge>
            <Typography variant="h6" component="span" sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
              Create Project
            </Typography>
          </div>
          <ModernIconButton onClick={handleModalClose}>
            <CloseIcon />
          </ModernIconButton>
        </div>
      </ModernDialogTitle>

      <ModernDialogContent>
        <DialogContentText
          sx={{
            fontFamily: "'Inter', sans-serif",
            color: theme.palette.text.secondary,
            marginBottom: "24px",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          Fill in the details to create a new project
        </DialogContentText>

        <ModernSectionContainer>
          <ModernFormControl component="fieldset" margin="normal" fullWidth>
            <FormLabel component="legend">Project Type</FormLabel>
            <RadioGroup
              aria-label="projectType"
              name="projectType"
              value={projectType}
              onChange={handleRadioChange}
              row
              sx={{ marginTop: "12px", gap: "24px" }}
            >
              <FormControlLabel value="old" control={<Radio />} label="Old Project" />
              <FormControlLabel value="new" control={<Radio />} label="New Project" />
            </RadioGroup>
          </ModernFormControl>
        </ModernSectionContainer>

        <ModernSectionContainer>
          <SectionTitle>
            <ModernIconBadge>
              <ProjectIcon sx={{ color: TEAL_COLORS.main, fontSize: "14px" }} />
            </ModernIconBadge>
            Project Details
          </SectionTitle>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ModernTextField
                autoFocus
                required
                fullWidth
                id="title"
                name="title"
                label="Title"
                type="text"
                variant="outlined"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <ModernTextField
                required
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <ModernAutocomplete
                multiple
                id="techStack"
                limitTags={4}
                options={techOptions}
                filterSelectedOptions
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(props, option) => (
                  <li {...props}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <i className={option.iconClassName} style={{ fontSize: "16px" }}></i>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px" }}>
                        {option.title}
                      </span>
                    </div>
                  </li>
                )}
                onChange={handleTechChange}
                renderInput={(params) => (
                  <ModernTextField
                    {...params}
                    label="Tech Stack"
                    placeholder="Select Tech Stack"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <ModernTextField
                id="codeLink"
                name="codeLink"
                label="Code Link"
                type="url"
                fullWidth
                variant="outlined"
                value={formData.codeLink}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </ModernSectionContainer>

        <ModernSectionContainer>
          <SectionTitle>
            <ModernIconBadge>
              <TeamIcon sx={{ color: TEAL_COLORS.main, fontSize: "14px" }} />
            </ModernIconBadge>
            Team & Supervision
          </SectionTitle>

          <Grid container spacing={3}>
            {isHOB && (
              <Grid item xs={12}>
                <ModernAutocomplete
                  id="team"
                  options={teams}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <li {...props}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <Typography sx={{ fontWeight: 500, fontSize: "13px" }}>
                          {option.name}
                        </Typography>
                        <Typography sx={{ fontSize: "11px", color: theme.palette.text.secondary }}>
                          {option.responsible.email}
                        </Typography>
                      </div>
                    </li>
                  )}
                  onChange={handleTeamChange}
                  renderInput={(params) => (
                    <ModernTextField
                      {...params}
                      label="Team"
                      placeholder="Select Team"
                    />
                  )}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <ModernAutocomplete
                multiple
                id="supervisors"
                disableCloseOnSelect
                filterSelectedOptions
                options={supervisors}
                getOptionLabel={(option) =>
                  option.firstName + " " + option.lastName
                }
                value={formData.supervisors}
                onChange={handleSupervisorsChange}
                renderOption={(props, option) => (
                  <li {...props}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Avatar
                        src={
                          supervisorsImages.find(
                            (supervisor) => supervisor.id === option.id
                          )?.url
                        }
                        sx={{ width: 28, height: 28 }}
                      />
                      <div>
                        <Typography sx={{ fontWeight: 500, fontSize: "13px" }}>
                          {`${option.firstName} ${option.lastName}`}
                        </Typography>
                        <Typography sx={{ fontSize: "11px", color: theme.palette.text.secondary }}>
                          {option.email}
                        </Typography>
                      </div>
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <ModernTextField
                    {...params}
                    label="Supervisors"
                    placeholder="Selected supervisors"
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </ModernSectionContainer>

        <ModernSectionContainer>
          <SectionTitle>
            <ModernIconBadge>
              <AttachFileIcon sx={{ color: TEAL_COLORS.main, fontSize: "14px" }} />
            </ModernIconBadge>
            Documents
          </SectionTitle>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ModernUploadContainer>
                <ModernUploadButton
                  component="label"
                  variant="text"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  {projectType === "old" ? "Upload Report" : "Upload Specifications Document"}
                  <VisuallyHiddenInput
                    type="file"
                    name="report"
                    id="report"
                    onChange={handleReportFileChange}
                  />
                </ModernUploadButton>
                {uploadedReport && (
                  <ModernFileItem>
                    <div>
                      <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
                        {uploadedReport.name}
                      </Typography>
                      <Typography sx={{ fontSize: "11px", color: theme.palette.text.secondary }}>
                        {(uploadedReport.size * 0.000001).toFixed(2)} MB
                      </Typography>
                    </div>
                    <ModernIconButton onClick={handleRemoveReport}>
                      <DeleteOutlineIcon fontSize="small" />
                    </ModernIconButton>
                  </ModernFileItem>
                )}
              </ModernUploadContainer>
            </Grid>

            <Grid item xs={12} md={6}>
              <ModernUploadContainer>
                <ModernUploadButton
                  component="label"
                  variant="text"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Upload Files
                  <VisuallyHiddenInput
                    type="file"
                    name="files"
                    id="files"
                    multiple
                    onChange={handleFilesChange}
                  />
                </ModernUploadButton>
                {uploadedFiles.map((file, index) => (
                  <ModernFileItem key={index}>
                    <div>
                      <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
                        {file.name}
                      </Typography>
                      <Typography sx={{ fontSize: "11px", color: theme.palette.text.secondary }}>
                        {(file.size * 0.000001).toFixed(2)} MB
                      </Typography>
                    </div>
                    <ModernIconButton onClick={() => handleRemoveFileFromFiles(index)}>
                      <DeleteOutlineIcon fontSize="small" />
                    </ModernIconButton>
                  </ModernFileItem>
                ))}
              </ModernUploadContainer>
            </Grid>
          </Grid>
        </ModernSectionContainer>
      </ModernDialogContent>

      <DialogActions
        sx={{
          padding: "20px 32px",
          backgroundColor: theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`,
          gap: "12px",
        }}
      >
        <ModernButton onClick={handleModalClose} color="error" variant="outlined">
          Cancel
        </ModernButton>
        <ModernLoadingButton
          type="submit"
          loading={loading}
          loadingIndicator="Creating..."
          variant="contained"
        >
          Save Project
        </ModernLoadingButton>
      </DialogActions>
    </ModernDialog>
  );
}

export default CreateProjectDialog;