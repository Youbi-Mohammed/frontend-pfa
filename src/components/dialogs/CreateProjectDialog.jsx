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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import {
  downLoadProfileImage,
  getSupervisors,
} from "../../services/userService";
import createProject from "../../services/projectService";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  StyledDialog,
  StyledDialogContent,
  StyledGrid,
  VisuallyHiddenInput,
} from "./createProjectDialog";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { hasRole } from "../../utils/userUtiles";
import { getAllTeams } from "../../services/teamService";
import { forEach } from "lodash";

const lightColors = [
  "rgba(173, 216, 230, 0.5)",
  "rgba(216, 191, 216, 0.5)",
  "rgba(144, 238, 144, 0.5)",
  "rgba(255, 255, 153, 0.5)",
  "rgba(255, 204, 153, 0.5)",
  "rgba(255, 182, 193, 0.5)",
];

const chipStyles = {};
for (let i = 0; i < 20; i++) {
  chipStyles[
    `& .css-1pje9j3-MuiButtonBase-root-MuiChip-root:nth-of-type(${i + 1})`
  ] = {
    backgroundColor: lightColors[i % 6],
  };
  chipStyles[
    `& .css-38raov-MuiButtonBase-root-MuiChip-root:nth-of-type(${i + 1})`
  ] = {
    backgroundColor: lightColors[i % 6],
  };
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

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

function CreateProjectDialog({
  projectDialogOpen,
  handleModalClose,
  setSnackbarOpen,
  setSnackbarMessage,
}) {
  const [uploadedDiagram, setUploadedDiagram] = useState(null);
  const [uploadedSpecification, setUploadedSpecification] = useState(null);
  const mode = localStorage.getItem("mode");
  const isHOB = hasRole("ROLE_HEAD_OF_BRANCH");
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
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
    diagram: null,
    specification: null,
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

  const handleDiagramChange = (event) => {
    const file = event.target.files[0];
    setUploadedDiagram({
      name: file.name,
      size: file.size,
    });
    setFormData({ ...formData, diagram: file });
  };

  const handleSpecificationChange = (event) => {
    const file = event.target.files[0];
    setUploadedSpecification({
      name: file.name,
      size: file.size,
    });
    setFormData({ ...formData, specification: file });
  };

  const handleRemoveDiagram = () => {
    setUploadedDiagram(null);
    setFormData({ ...formData, diagram: null });
  };

  const handleRemoveSpecification = () => {
    setUploadedSpecification(null);
    setFormData({ ...formData, specification: null });
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
    if (projectType === "new") {
      if (formData.diagram) data.append("diagram", formData.diagram);
      if (formData.specification) data.append("specification", formData.specification);
    }

    setLoading(false);
    await createProject(token, data, setSnackbarOpen, setSnackbarMessage);
    handleModalClose();
  };

  return (
    <StyledDialog
      open={projectDialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleModalClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          handleSubmit(event);
        },
      }}
    >
      <DialogTitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Create Project</Typography>
          <CloseIcon style={{ cursor: "pointer" }} onClick={handleModalClose} />
        </div>
      </DialogTitle>
      <StyledDialogContent>
        <DialogContentText
          id="alert-dialog-slide-description"
          sx={{ marginLeft: "25px", marginBottom: "16px" }}
        >
          Fill in the details to create a new project
        </DialogContentText>
        <FormControl component="fieldset" margin="normal" fullWidth>
          <FormLabel component="legend">Project Type</FormLabel>
          <RadioGroup
            aria-label="projectType"
            name="projectType"
            value={projectType}
            onChange={handleRadioChange}
            row
          >
            <FormControlLabel
              value="old"
              control={<Radio />}
              label="Old Project"
            />
            <FormControlLabel
              value="new"
              control={<Radio />}
              label="New Project"
            />
          </RadioGroup>
        </FormControl>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              required
              fullWidth
              id="title"
              name="title"
              label="Title"
              type="text"
              variant="standard"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
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
            <Autocomplete
              multiple
              id="techStack"
              limitTags={4}
              options={techOptions}
              filterSelectedOptions
              disableCloseOnSelect
              sx={chipStyles}
              getOptionLabel={(option) => option.title}
              renderOption={(props, option) => (
                <li {...props}>
                  <div>
                    <i
                      className={option.iconClassName}
                      style={{ fontSize: "20px" }}
                    ></i>
                    <span style={{ marginLeft: 8 }}>{option.title}</span>
                  </div>
                </li>
              )}
              onChange={handleTechChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tech Stack"
                  placeholder="Select Tech Stack"
                />
              )}
            />
          </Grid>

          {projectType === "new" && (
            <Grid item xs={12}>
              <div
                style={{
                  border: `1px solid ${
                    mode === "dark" ? "#d3d3d350" : "rgba(0,0,0,0.3)"
                  }`,
                  width: "100%",
                  marginBottom: "16px",
                }}
              >
                <Button
                  component="label"
                  variant="text"
                  sx={{
                    color: mode === "dark" ? "lightgray" : "rgba(0,0,0,0.6)",
                    width: "100%",
                  }}
                  tabIndex={-1}
                  fullWidth={isSmallScreen}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Diagram (SVG) - Optional
                  <VisuallyHiddenInput
                    type="file"
                    accept=".svg"
                    onChange={handleDiagramChange}
                  />
                </Button>
                {uploadedDiagram && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "5px",
                      width: "100%",
                      minHeight: "60px",
                      borderTop: `1px solid ${
                        mode === "dark" ? "#d3d3d350" : "rgba(0,0,0,0.3)"
                      }`,
                      padding: "10px",
                    }}
                  >
                    <div>
                      <Typography sx={{ fontSize: "13px" }}>
                        {uploadedDiagram.name}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "11px", marginTop: "3px" }}
                        color="textSecondary"
                      >
                        {(uploadedDiagram.size * 0.000001).toFixed(2)} MB
                      </Typography>
                    </div>
                    <DeleteOutlineIcon
                      sx={{ cursor: "pointer" }}
                      onClick={handleRemoveDiagram}
                    />
                  </div>
                )}
              </div>

              <div
                style={{
                  border: `1px solid ${
                    mode === "dark" ? "#d3d3d350" : "rgba(0,0,0,0.3)"
                  }`,
                  width: "100%",
                }}
              >
                <Button
                  component="label"
                  variant="text"
                  sx={{
                    color: mode === "dark" ? "lightgray" : "rgba(0,0,0,0.6)",
                    width: "100%",
                  }}
                  tabIndex={-1}
                  fullWidth={isSmallScreen}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Specification (PDF) - Optional
                  <VisuallyHiddenInput
                    type="file"
                    accept=".pdf"
                    onChange={handleSpecificationChange}
                  />
                </Button>
                {uploadedSpecification && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "5px",
                      width: "100%",
                      minHeight: "60px",
                      borderTop: `1px solid ${
                        mode === "dark" ? "#d3d3d350" : "rgba(0,0,0,0.3)"
                      }`,
                      padding: "10px",
                    }}
                  >
                    <div>
                      <Typography sx={{ fontSize: "13px" }}>
                        {uploadedSpecification.name}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "11px", marginTop: "3px" }}
                        color="textSecondary"
                      >
                        {(uploadedSpecification.size * 0.000001).toFixed(2)} MB
                      </Typography>
                    </div>
                    <DeleteOutlineIcon
                      sx={{ cursor: "pointer" }}
                      onClick={handleRemoveSpecification}
                    />
                  </div>
                )}
              </div>
            </Grid>
          )}

          {isHOB && (
            <Grid item xs={12}>
              <Autocomplete
                id="team"
                options={teams}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <li {...props}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <p>{option.name}</p>
                      <Typography color="textSecondary" variant="body2">
                        {option.responsible.email}
                      </Typography>
                    </div>
                  </li>
                )}
                onChange={handleTeamChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Team"
                    placeholder="Select Team"
                  />
                )}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Autocomplete
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Avatar
                      src={
                        supervisorsImages.find(
                          (supervisor) => supervisor.id === option.id
                        )?.url
                      }
                      height={30}
                      width={30}
                    />
                    <div>
                      <span>{`${option.firstName} ${option.lastName}`}</span>
                      <Typography variant="body2" color="textSecondary">
                        {option.email}
                      </Typography>
                    </div>
                  </div>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Supervisors"
                  placeholder="Selected supervisors"
                  fullWidth
                />
              )}
            />
          </Grid>

          {projectType === "old" && (
            <>
              <Grid item xs={12}>
                <TextField
                  id="codeLink"
                  name="codeLink"
                  label="Code Link"
                  type="url"
                  fullWidth
                  variant="standard"
                  value={formData.codeLink}
                  onChange={handleChange}
                />
              </Grid>

              <StyledGrid item xs={12}>
                <div
                  style={{
                    border: `1px solid ${
                      mode === "dark" ? "#d3d3d350" : "rgba(0,0,0,0.3)"
                    }`,
                    width: "100%",
                    marginBottom: "16px",
                  }}
                >
                  <Button
                    component="label"
                    variant="text"
                    sx={{
                      color: mode === "dark" ? "lightgray" : "rgba(0,0,0,0.6)",
                      width: "100%",
                    }}
                    tabIndex={-1}
                    fullWidth={isSmallScreen}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Report
                    <VisuallyHiddenInput
                      type="file"
                      name="report"
                      id="report"
                      onChange={handleReportFileChange}
                    />
                  </Button>
                  {uploadedReport && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "5px",
                        width: "100%",
                        minHeight: "60px",
                        borderTop: `1px solid ${
                          mode === "dark" ? "#d3d3d350" : "rgba(0,0,0,0.3)"
                        }`,
                        padding: "10px",
                      }}
                    >
                      <div>
                        <Typography sx={{ fontSize: "13px" }}>
                          {uploadedReport.name}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "11px", marginTop: "3px" }}
                          color="textSecondary"
                        >
                          {(uploadedReport.size * 0.000001).toFixed(2)} MB
                        </Typography>
                      </div>
                      <DeleteOutlineIcon
                        sx={{ cursor: "pointer" }}
                        onClick={handleRemoveReport}
                      />
                    </div>
                  )}
                </div>

                <div
                  style={{
                    border: `1px solid ${
                      mode === "dark" ? "#d3d3d350" : "rgba(0,0,0,0.3)"
                    }`,
                    width: "100%",
                  }}
                >
                  <Button
                    component="label"
                    variant="text"
                    sx={{
                      color: mode === "dark" ? "lightgray" : "rgba(0,0,0,0.6)",
                      width: "100%",
                    }}
                    tabIndex={-1}
                    fullWidth={isSmallScreen}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Files
                    <VisuallyHiddenInput
                      type="file"
                      name="files"
                      id="files"
                      multiple
                      onChange={handleFilesChange}
                    />
                  </Button>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "5px",
                        width: "100%",
                        minHeight: "60px",
                        borderTop: `1px solid ${
                          mode === "dark" ? "#d3d3d350" : "rgba(0,0,0,0.3)"
                        }`,
                        padding: "10px",
                      }}
                    >
                      <div>
                        <Typography sx={{ fontSize: "13px" }}>
                          {file.name}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "11px", marginTop: "3px" }}
                          color="textSecondary"
                        >
                          {(file.size * 0.000001).toFixed(2)} MB
                        </Typography>
                      </div>
                      <DeleteOutlineIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleRemoveFileFromFiles(index)}
                      />
                    </div>
                  ))}
                </div>
              </StyledGrid>
            </>
          )}
        </Grid>
      </StyledDialogContent>

      <DialogActions>
        <Button onClick={handleModalClose} color="error">
          Cancel
        </Button>
        <LoadingButton
          type="submit"
          loading={loading}
          loadingIndicator="creating..."
          sx={{ paddingLeft: "15px", paddingRight: "15px" }}
          variant="outlined"
        >
          <span>Save project</span>
        </LoadingButton>
      </DialogActions>
    </StyledDialog>
  );
}

export default CreateProjectDialog;