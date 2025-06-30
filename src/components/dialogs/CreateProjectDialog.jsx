"use client"

import { forwardRef, useEffect, useState } from "react"
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
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import CloseIcon from "@mui/icons-material/Close"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import ProjectIcon from "@mui/icons-material/Assignment"
import TeamIcon from "@mui/icons-material/Group"
import CodeIcon from "@mui/icons-material/Code"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import { styled } from "@mui/material/styles"
import { downLoadProfileImage, getSupervisors } from "../../services/userService"
import createProject from "../../services/projectService"
import { StyledDialog, StyledDialogContent, VisuallyHiddenInput } from "./createProjectDialog"
import { hasRole } from "../../utils/userUtiles"
import { getAllTeams } from "../../services/teamService"
import { forEach } from "lodash"

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

// Modern Teal Palette Styled Components
const ModernDialog = styled(StyledDialog)({
  "& .MuiDialog-paper": {
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e6f2f2",
    maxWidth: "800px",
    fontFamily: "'Inter', sans-serif",
  },
})

const ModernDialogTitle = styled(DialogTitle)({
  backgroundColor: "#f8fafa",
  color: "#1a1a1a",
  padding: "24px 32px",
  borderBottom: "1px solid #e6f2f2",
  "& .MuiTypography-root": {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: "20px",
    color: "#1a1a1a",
  },
})

const ModernDialogContent = styled(StyledDialogContent)({
  padding: "32px",
  backgroundColor: "#fdfefe",
})

const ModernTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    backgroundColor: "#ffffff",
    fontFamily: "'Inter', sans-serif",
    "& fieldset": {
      borderColor: "#d1e7e7",
    },
    "&:hover fieldset": {
      borderColor: "#a3d5d5",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2d7a7a",
      borderWidth: "1px",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Inter', sans-serif",
    color: "#4a4a4a",
    "&.Mui-focused": {
      color: "#1e5a5a",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#1a1a1a",
  },
})

const ModernAutocomplete = styled(Autocomplete)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    backgroundColor: "#ffffff",
    fontFamily: "'Inter', sans-serif",
    "& fieldset": {
      borderColor: "#d1e7e7",
    },
    "&:hover fieldset": {
      borderColor: "#a3d5d5",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2d7a7a",
      borderWidth: "1px",
    },
  },
  "& .MuiChip-root": {
    backgroundColor: "#f8fafa",
    color: "#1e5a5a",
    fontFamily: "'Inter', sans-serif",
    border: "1px solid #d1e7e7",
    borderRadius: "4px",
    fontSize: "12px",
    "& .MuiChip-deleteIcon": {
      color: "#4a9a9a",
    },
  },
})

const ModernFormControl = styled(FormControl)({
  "& .MuiFormLabel-root": {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    color: "#1a1a1a",
    fontSize: "15px",
  },
  "& .MuiFormControlLabel-label": {
    fontFamily: "'Inter', sans-serif",
    color: "#2d2d2d",
    fontSize: "14px",
  },
  "& .MuiRadio-root": {
    color: "#a3d5d5",
    "&.Mui-checked": {
      color: "#2d7a7a",
    },
  },
})

const ModernUploadContainer = styled(Box)({
  border: "1px dashed #d1e7e7",
  borderRadius: "6px",
  backgroundColor: "#ffffff",
  "&:hover": {
    borderColor: "#a3d5d5",
    backgroundColor: "#fcfefe",
  },
})

const ModernUploadButton = styled(Button)({
  fontFamily: "'Inter', sans-serif",
  color: "#4a4a4a",
  textTransform: "none",
  padding: "20px",
  width: "100%",
  fontSize: "14px",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#1e5a5a",
  },
})

const ModernFileItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  backgroundColor: "#fcfefe",
  borderTop: "1px solid #e6f2f2",
  "&:first-of-type": {
    borderTop: "none",
  },
})

const ModernButton = styled(Button)(({ variant, color }) => ({
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  borderRadius: "6px",
  textTransform: "none",
  padding: "10px 20px",
  fontSize: "14px",
  color: "#1a1a1a",
  ...(variant === "outlined" && {
    borderColor: "#d1e7e7",
    color: "#4a4a4a",
    backgroundColor: "#ffffff",
    "&:hover": {
      backgroundColor: "#fcfefe",
      borderColor: "#a3d5d5",
      color: "#2d2d2d",
    },
  }),
  ...(color === "error" && {
    color: "#dc6545",
    borderColor: "#f4d4c7",
    "&:hover": {
      backgroundColor: "#fef7f4",
      borderColor: "#e8b4a0",
    },
  }),
}))

const ModernLoadingButton = styled(LoadingButton)({
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  borderRadius: "6px",
  textTransform: "none",
  padding: "10px 24px",
  fontSize: "14px",
  backgroundColor: "#2d7a7a",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#1e5a5a",
  },
  "&:disabled": {
    backgroundColor: "#e6f2f2",
    color: "#a3d5d5",
  },
})

const ModernIconButton = styled(IconButton)({
  color: "#4a4a4a",
  "&:hover": {
    backgroundColor: "#fcfefe",
    color: "#1e5a5a",
  },
})

const SectionTitle = styled(Typography)({
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  fontSize: "16px",
  color: "#1a1a1a",
  marginBottom: "16px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
})

const ModernSectionContainer = styled(Box)({
  backgroundColor: "#ffffff",
  borderRadius: "6px",
  padding: "24px",
  marginBottom: "20px",
  border: "1px solid #e6f2f2",
})

const ModernIconBadge = styled(Box)({
  width: "24px",
  height: "24px",
  borderRadius: "4px",
  backgroundColor: "#f8fafa",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

const token = localStorage.getItem("token")

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
]

function CreateProjectDialog({ projectDialogOpen, handleModalClose, setSnackbarOpen, setSnackbarMessage }) {
  const [uploadedDiagram, setUploadedDiagram] = useState(null)
  const [uploadedSpecification, setUploadedSpecification] = useState(null)
  const mode = localStorage.getItem("mode")
  const isHOB = hasRole("ROLE_HEAD_OF_BRANCH")
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"))
  const [supervisors, setSupervisors] = useState([])
  const [teams, setTeams] = useState([])
  const [projectType, setProjectType] = useState("old")
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
  })
  const [loading, setLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [uploadedReport, setUploadedReport] = useState(null)
  const [supervisorsImages, setSupervisorsImages] = useState([])

  useEffect(() => {
    async function fetchData() {
      const fetchedSupervisors = await getSupervisors(token)
      let academicYear = ""
      const year = new Date().getFullYear()
      const month = new Date().getMonth()
      if (month >= 9 && month <= 12) {
        academicYear = `${year}/${year + 1}`
      } else if (month >= 1 && month <= 7) {
        academicYear = `${year - 1}/${year}`
      }
      const fetchedTeams = await getAllTeams(token, academicYear)
      const images = []
      forEach(fetchedSupervisors, async (supervisor) => {
        const url = await downLoadProfileImage(supervisor.id, token)
        images.push({
          id: supervisor.id,
          name: supervisor.firstName + " " + supervisor.lastName,
          url: url,
        })
      })
      setSupervisorsImages(images)
      setSupervisors(fetchedSupervisors)
      setTeams(fetchedTeams.filter((team) => team.project === null))
    }
    fetchData()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleRadioChange = (event) => {
    const { value } = event.target
    setProjectType(value)
    setFormData((prevFormData) => ({
      ...prevFormData,
      projectType: value,
    }))
  }

  const handleTechChange = (event, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      techStack: value,
    }))
  }

  const handleTeamChange = (event, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      team: value,
    }))
  }

  const handleSupervisorsChange = (event, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      supervisors: value,
    }))
  }

  const handleFilesChange = (event) => {
    const files = event.target.files
    const uploadedFilesList = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
    }))
    setUploadedFiles(uploadedFilesList)
    setFormData((prevFormData) => ({
      ...prevFormData,
      files: Array.from(files).slice(0, 10),
    }))
  }

  const handleRemoveFileFromFiles = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    setFormData((prevFormData) => ({
      ...prevFormData,
      files: prevFormData.files.filter((_, i) => i !== index),
    }))
  }

  const handleReportFileChange = (event) => {
    const file = event.target.files[0]
    const uploadedReport = {
      name: file.name,
      size: file.size,
    }
    setUploadedReport(uploadedReport)
    setFormData({ ...formData, report: file })
  }

  const handleRemoveReport = () => {
    setUploadedReport(null)
    setFormData({ ...formData, report: null })
  }

  const handleDiagramChange = (event) => {
    const file = event.target.files[0]
    setUploadedDiagram({
      name: file.name,
      size: file.size,
    })
    setFormData({ ...formData, diagram: file })
  }

  const handleSpecificationChange = (event) => {
    const file = event.target.files[0]
    setUploadedSpecification({
      name: file.name,
      size: file.size,
    })
    setFormData({ ...formData, specification: file })
  }

  const handleRemoveDiagram = () => {
    setUploadedDiagram(null)
    setFormData({ ...formData, diagram: null })
  }

  const handleRemoveSpecification = () => {
    setUploadedSpecification(null)
    setFormData({ ...formData, specification: null })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const techStack = formData.techStack.map((tech) => tech.title).join(", ")
    const data = new FormData()
    data.append("title", formData.title)
    data.append("description", formData.description)
    data.append("status", projectType)
    data.append("techStack", techStack)
    data.append("codeLink", formData.codeLink)
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    if (month >= 9 && month <= 12) {
      formData.academicYear = `${year}/${year + 1}`
    } else if (month >= 1 && month <= 7) {
      formData.academicYear = `${year - 1}/${year}`
    }
    data.append("academicYear", formData.academicYear)
    data.append("branch", formData.branch)
    if (formData.team && formData.team.id !== null) {
      data.append("team", formData.team.id)
    } else {
      data.append("team", null)
    }
    data.append(
      "supervisors",
      formData.supervisors.map((supervisor) => supervisor.id),
    )
    data.append("report", formData.report)
    if (formData.files.length === 0) {
      data.append("files", null)
    } else {
      formData.files.forEach((file) => data.append("files", file))
    }
    if (projectType === "new") {
      if (formData.diagram) data.append("diagram", formData.diagram)
      if (formData.specification) data.append("specification", formData.specification)
    }
    setLoading(false)
    await createProject(token, data, setSnackbarOpen, setSnackbarMessage)
    handleModalClose()
  }

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
          handleSubmit(event)
        },
      }}
    >
      <ModernDialogTitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ModernIconBadge>
              <ProjectIcon sx={{ color: "#2d7a7a", fontSize: "16px" }} />
            </ModernIconBadge>
            <Typography
              variant="h6"
              component="span"
              sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "#1a1a1a" }}
            >
              Create New Project
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
            color: "#4a4a4a",
            marginBottom: "24px",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          Please complete the form below to create a new academic project.
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
              <FormControlLabel value="old" control={<Radio />} label="Existing Project" />
              <FormControlLabel value="new" control={<Radio />} label="New Project" />
            </RadioGroup>
          </ModernFormControl>
        </ModernSectionContainer>

        <ModernSectionContainer>
          <SectionTitle>
            <ModernIconBadge>
              <ProjectIcon sx={{ color: "#2d7a7a", fontSize: "14px" }} />
            </ModernIconBadge>
            Project Information
          </SectionTitle>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ModernTextField
                autoFocus
                required
                fullWidth
                id="title"
                name="title"
                label="Project Title"
                type="text"
                variant="outlined"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
              />
            </Grid>

            <Grid item xs={12}>
              <ModernTextField
                required
                fullWidth
                id="description"
                name="description"
                label="Project Description"
                multiline
                rows={4}
                variant="outlined"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the project objectives and scope"
              />
            </Grid>

            <Grid item xs={12}>
              <ModernAutocomplete
                multiple
                id="techStack"
                limitTags={3}
                options={techOptions}
                filterSelectedOptions
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(props, option) => (
                  <li {...props}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 0" }}>
                      <i className={option.iconClassName} style={{ fontSize: "16px" }}></i>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#1a1a1a" }}>
                        {option.title}
                      </span>
                    </div>
                  </li>
                )}
                onChange={handleTechChange}
                renderInput={(params) => (
                  <ModernTextField {...params} label="Technology Stack" placeholder="Select technologies" />
                )}
              />
            </Grid>
          </Grid>
        </ModernSectionContainer>

        {projectType === "new" && (
          <ModernSectionContainer>
            <SectionTitle>
              <ModernIconBadge>
                <CloudUploadIcon sx={{ color: "#2d7a7a", fontSize: "14px" }} />
              </ModernIconBadge>
              Documentation
            </SectionTitle>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <ModernUploadContainer>
                  <ModernUploadButton component="label" variant="text" startIcon={<CloudUploadIcon />} fullWidth>
                    Upload Diagram (SVG) - Optional
                    <VisuallyHiddenInput type="file" accept=".svg" onChange={handleDiagramChange} />
                  </ModernUploadButton>
                  {uploadedDiagram && (
                    <ModernFileItem>
                      <div>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            color: "#1a1a1a",
                          }}
                        >
                          {uploadedDiagram.name}
                        </Typography>
                        <Typography sx={{ fontSize: "11px", color: "#4a4a4a", fontFamily: "'Inter', sans-serif" }}>
                          {(uploadedDiagram.size * 0.000001).toFixed(2)} MB
                        </Typography>
                      </div>
                      <ModernIconButton onClick={handleRemoveDiagram}>
                        <DeleteOutlineIcon fontSize="small" />
                      </ModernIconButton>
                    </ModernFileItem>
                  )}
                </ModernUploadContainer>
              </Grid>

              <Grid item xs={12} md={6}>
                <ModernUploadContainer>
                  <ModernUploadButton component="label" variant="text" startIcon={<CloudUploadIcon />} fullWidth>
                    Upload Specification (PDF) - Optional
                    <VisuallyHiddenInput type="file" accept=".pdf" onChange={handleSpecificationChange} />
                  </ModernUploadButton>
                  {uploadedSpecification && (
                    <ModernFileItem>
                      <div>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            color: "#1a1a1a",
                          }}
                        >
                          {uploadedSpecification.name}
                        </Typography>
                        <Typography sx={{ fontSize: "11px", color: "#4a4a4a", fontFamily: "'Inter', sans-serif" }}>
                          {(uploadedSpecification.size * 0.000001).toFixed(2)} MB
                        </Typography>
                      </div>
                      <ModernIconButton onClick={handleRemoveSpecification}>
                        <DeleteOutlineIcon fontSize="small" />
                      </ModernIconButton>
                    </ModernFileItem>
                  )}
                </ModernUploadContainer>
              </Grid>
            </Grid>
          </ModernSectionContainer>
        )}

        <ModernSectionContainer>
          <SectionTitle>
            <ModernIconBadge>
              <TeamIcon sx={{ color: "#2d7a7a", fontSize: "14px" }} />
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
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          fontFamily: "'Inter', sans-serif",
                          padding: "4px 0",
                        }}
                      >
                        <Typography sx={{ fontWeight: 500, fontSize: "13px", color: "#1a1a1a" }}>
                          {option.name}
                        </Typography>
                        <Typography sx={{ color: "#4a4a4a", fontSize: "11px" }}>{option.responsible.email}</Typography>
                      </div>
                    </li>
                  )}
                  onChange={handleTeamChange}
                  renderInput={(params) => (
                    <ModernTextField {...params} label="Assign Team" placeholder="Select team" />
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
                getOptionLabel={(option) => option.firstName + " " + option.lastName}
                value={formData.supervisors}
                onChange={handleSupervisorsChange}
                renderOption={(props, option) => (
                  <li {...props}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontFamily: "'Inter', sans-serif",
                        padding: "4px 0",
                      }}
                    >
                      <Avatar
                        src={supervisorsImages.find((supervisor) => supervisor.id === option.id)?.url}
                        sx={{ width: 28, height: 28 }}
                      />
                      <div>
                        <Typography sx={{ fontWeight: 500, fontSize: "13px", color: "#1a1a1a" }}>
                          {`${option.firstName} ${option.lastName}`}
                        </Typography>
                        <Typography sx={{ fontSize: "11px", color: "#4a4a4a" }}>{option.email}</Typography>
                      </div>
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <ModernTextField {...params} label="Project Supervisors" placeholder="Select supervisors" fullWidth />
                )}
              />
            </Grid>
          </Grid>
        </ModernSectionContainer>

        {projectType === "old" && (
          <ModernSectionContainer>
            <SectionTitle>
              <ModernIconBadge>
                <CodeIcon sx={{ color: "#2d7a7a", fontSize: "14px" }} />
              </ModernIconBadge>
              Project Resources
            </SectionTitle>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ModernTextField
                  id="codeLink"
                  name="codeLink"
                  label="Code Repository Link"
                  type="url"
                  fullWidth
                  variant="outlined"
                  value={formData.codeLink}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repository"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <ModernUploadContainer>
                  <ModernUploadButton component="label" variant="text" startIcon={<AttachFileIcon />} fullWidth>
                    Upload Project Report
                    <VisuallyHiddenInput type="file" name="report" id="report" onChange={handleReportFileChange} />
                  </ModernUploadButton>
                  {uploadedReport && (
                    <ModernFileItem>
                      <div>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            color: "#1a1a1a",
                          }}
                        >
                          {uploadedReport.name}
                        </Typography>
                        <Typography sx={{ fontSize: "11px", color: "#4a4a4a", fontFamily: "'Inter', sans-serif" }}>
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
                  <ModernUploadButton component="label" variant="text" startIcon={<AttachFileIcon />} fullWidth>
                    Upload Additional Files
                    <VisuallyHiddenInput type="file" name="files" id="files" multiple onChange={handleFilesChange} />
                  </ModernUploadButton>
                  {uploadedFiles.map((file, index) => (
                    <ModernFileItem key={index}>
                      <div>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            color: "#1a1a1a",
                          }}
                        >
                          {file.name}
                        </Typography>
                        <Typography sx={{ fontSize: "11px", color: "#4a4a4a", fontFamily: "'Inter', sans-serif" }}>
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
        )}
      </ModernDialogContent>

      <DialogActions
        sx={{
          padding: "20px 32px",
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e6f2f2",
          gap: "12px",
        }}
      >
        <ModernButton onClick={handleModalClose} color="error" variant="outlined">
          Cancel
        </ModernButton>
        <ModernLoadingButton type="submit" loading={loading} loadingIndicator="Creating..." variant="contained">
          Create Project
        </ModernLoadingButton>
      </DialogActions>
    </ModernDialog>
  )
}

export default CreateProjectDialog
