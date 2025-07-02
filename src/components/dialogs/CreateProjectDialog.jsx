// import { forwardRef, useEffect, useState } from "react";
// import {
//   DialogActions,
//   DialogContentText,
//   DialogTitle,
//   Slide,
//   Button,
//   TextField,
//   Autocomplete,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Radio,
//   RadioGroup,
//   Grid,
//   useMediaQuery,
//   Typography,
//   Avatar,
//   Divider,
// } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// import CloseIcon from "@mui/icons-material/Close";
// import {
//   downLoadProfileImage,
//   getSupervisors,
//   getUsers,
// } from "../../services/userService";
// import createProject from "../../services/projectService";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { stringAvatar } from "../../utils/generalUtils";
// import {
//   StyledDialog,
//   StyledDialogContent,
//   StyledGrid,
//   VisuallyHiddenInput,
// } from "./createProjectDialog";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import { hasRole } from "../../utils/userUtiles";
// import { getAllTeams } from "../../services/teamService";
// import { forEach, set } from "lodash";
// const lightColors = [
//   "rgba(173, 216, 230, 0.5)",
//   "rgba(216, 191, 216, 0.5)",
//   "rgba(144, 238, 144, 0.5)",
//   "rgba(255, 255, 153, 0.5)",
//   "rgba(255, 204, 153, 0.5)",
//   "rgba(255, 182, 193, 0.5)",
// ];

// const chipStyles = {};
// for (let i = 0; i < 20; i++) {
//   chipStyles[
//     `& .css-1pje9j3-MuiButtonBase-root-MuiChip-root:nth-of-type(${i + 1})`
//   ] = {
//     backgroundColor: lightColors[i % 6],
//   };
//   chipStyles[
//     `& .css-38raov-MuiButtonBase-root-MuiChip-root:nth-of-type(${i + 1})`
//   ] = {
//     backgroundColor: lightColors[i % 6],
//   };
// }

// const Transition = forwardRef(function Transition(props, ref) {
//   return <Slide direction="down" ref={ref} {...props} />;
// });

// const token = localStorage.getItem("token");

// // eslint-disable-next-line react/prop-types
// function CreateProjectDialog({
//   projectDialogOpen,
//   handleModalClose,
//   setSnackbarOpen,
//   setSnackbarMessage,
// }) {
//   const [techOptions, setTechOptions] = useState([
//     {
//       title: "JavaScript",
//       iconClassName: "devicon-javascript-plain colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "React",
//       iconClassName: "devicon-react-original colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "Node.js",
//       iconClassName: "devicon-nodejs-plain colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "Express.js",
//       iconClassName: "devicon-express-original colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "Vue.js",
//       iconClassName: "devicon-vuejs-plain colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "Angular",
//       iconClassName: "devicon-angularjs-plain colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "Python",
//       iconClassName: "devicon-python-plain colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "Django",
//       iconClassName: "devicon-django-plain colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "Ruby on Rails",
//       iconClassName: "devicon-rails-plain colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "React Native",
//       iconClassName: "devicon-react-original colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "Flutter",
//       iconClassName: "devicon-flutter-plain colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "MongoDB",
//       iconClassName: "devicon-mongodb-plain colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "MySQL",
//       iconClassName: "devicon-mysql-plain colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "PostgreSQL",
//       iconClassName: "devicon-postgresql-plain colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "Git",
//       iconClassName: "devicon-git-plain colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "Docker",
//       iconClassName: "devicon-docker-plain colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "Kubernetes",
//       iconClassName: "devicon-kubernetes-plain colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "Symfony",
//       iconClassName: "devicon-symfony-original colored",
//       iconStyle: { fontSize: "20px" },
//     },
//     {
//       title: "SpringBoot",
//       iconClassName: "devicon-spring-plain colored",
//       iconStyle: { fontSize: "20px" },
//     },
//   ]);
//   const mode = localStorage.getItem("mode");
//   const isHOB = hasRole("ROLE_HEAD_OF_BRANCH");
//   const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
//   const [supervisors, setSupervisors] = useState([]);
//   const [teams, setTeams] = useState([]);
//   const [projectType, setProjectType] = useState("old");
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     techStack: [],
//     codeLink: "",
//     branch: 1,
//     academicYear: "",
//     supervisors: [],
//     files: [],
//     report: null,
//     team: null,
//   });
//   const [loading, setLoading] = useState(false);

//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [uploadedReport, setUploadedReport] = useState(null);
//   const [supervisorsImages, setSupervisorsImages] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const fetchedSupervisors = await getSupervisors(token);
//       let academicYear = "";
//       const year = new Date().getFullYear();
//       const month = new Date().getMonth();
//       if (month >= 9 && month <= 12) {
//         academicYear = `${year}/${year + 1}`;
//       } else if (month >= 1 && month <= 7) {
//         academicYear = `${year - 1}/${year}`;
//       }

//       const fetchedTeams = await getAllTeams(token, academicYear);
//       forEach(fetchedSupervisors, async (supervisor) => {
//         console.log(supervisor.firstName);
//         const url = await downLoadProfileImage(supervisor.id, token);
//         console.log(supervisor.firstName);
//         setSupervisorsImages((prev) => [
//           ...prev,
//           {
//             id: supervisor.id,
//             name: supervisor.firstName + " " + supervisor.lastName,
//             url: url,
//           },
//         ]);
//       });
//       setSupervisors(fetchedSupervisors);
//       setTeams(fetchedTeams.filter((team) => team.project === null));
//     }
//     fetchData();
//   }, []);
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };
//   const handleRadioChange = (event) => {
//     const { name, value } = event.target;
//     setProjectType(value);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleTechChange = (event, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       techStack: value,
//     }));
//   };
//   const handleTeamChange = (event, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       team: value,
//     }));
//   };

//   const handleSupervisorsChange = (event, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       supervisors: value,
//     }));
//   };

//   const handleFilesChange = (event) => {
//     const files = event.target.files;
//     console.log(files);
//     const uploadedFilesList = Array.from(files).map((file) => ({
//       name: file.name,
//       size: file.size,
//     }));
//     setUploadedFiles(uploadedFilesList);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       files: Array.from(files).slice(0, 10), // Limiting to first 10 files
//     }));
//   };

//   const handleRemoveFileFromFiles = (index) => {
//     setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       files: prevFormData.files.filter((_, i) => i !== index),
//     }));
//   };

//   const handleReportFileChange = (event) => {
//     const file = event.target.files[0];
//     const uploadedReport = {
//       name: file.name,
//       size: file.size,
//     };
//     setUploadedReport(uploadedReport);
//     setFormData({ ...formData, report: file });
//   };
//   const handleRemoveReport = () => {
//     setUploadedReport(null);
//     setFormData({ ...formData, report: null });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     const techStack = formData.techStack.map((tech) => tech.title).join(", ");
//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("description", formData.description);
//     data.append("status", projectType);
//     data.append("techStack", techStack);
//     data.append("codeLink", formData.codeLink);
//     const year = new Date().getFullYear();
//     const month = new Date().getMonth();
//     if (month >= 9 && month <= 12) {
//       formData.academicYear = `${year}/${year + 1}`;
//     } else if (month >= 1 && month <= 7) {
//       formData.academicYear = `${year - 1}/${year}`;
//     }
//     data.append("academicYear", formData.academicYear);
//     data.append("branch", formData.branch);
//     if (formData.team && formData.team.id !== null) {
//       data.append("team", formData.team.id);
//     } else {
//       data.append("team", null);
//     }
//     data.append(
//       "supervisors",
//       formData.supervisors.map((supervisor) => supervisor.id)
//     );
//     data.append("report", formData.report);
//     if (formData.files.length === 0) {
//       data.append("files", null);
//     } else {
//       formData.files.forEach((file) => data.append("files", file));
//     }
//     for (let pair of data.entries()) {
//       console.log(pair[0] + ", " + pair[1]);
//     }

//     setLoading(false);
//     await createProject(token, data, setSnackbarOpen, setSnackbarMessage);
//     handleModalClose();
//   };
//   const handleSubmitReportOnly = async (event) => {
//   event.preventDefault();
//   setLoading(true);

//   const data = new FormData();
  
//   // Champs obligatoires minimaux
//   data.append("title", "Projet avec rapport uniquement");
//   data.append("description", "Projet test pour import de rapport");
//    if (formData.team && formData.team.id !== null) {
//       data.append("team", formData.team.id);
//     } else {
//       data.append("team", null);
//     }
//    data.append(
//       "supervisors",
//       formData.supervisors.map((supervisor) => supervisor.id)
//     );
//   data.append("status", "DRAFT");
//   data.append("branch", formData.branch); // Utilisez la valeur par défaut (1)
  
//   // Ajoutez le rapport
//   if (formData.report) {
//     data.append("report", formData.report, formData.report.name);
//   }
//    else {
//     setSnackbarMessage("Aucun rapport sélectionné");
//     setSnackbarOpen(true);
//     setLoading(false);
//     return;
//   }

//   // Debug
//   for (let [key, value] of data.entries()) {
//     console.log(key, value instanceof File ? value.name : value);
//   }

//   try {
//     await createProject(token, data, setSnackbarOpen, setSnackbarMessage);
//     handleModalClose();
//   } catch (error) {
//     console.error("Erreur:", error);
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <StyledDialog
//       open={projectDialogOpen}
//       TransitionComponent={Transition}
//       keepMounted
//       onClose={handleModalClose}
//       aria-describedby="alert-dialog-slide-description"
//       PaperProps={{
//         component: "form",
//         onSubmit: (event) => {
//           handleSubmit(event);
//            handleSubmitReportOnly(event);
//         },
//       }}
//     >
//       <DialogTitle>
//         {" "}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <Typography variant="h6">Create Project</Typography>
//           <CloseIcon style={{ cursor: "pointer" }} onClick={handleModalClose} />
//         </div>
//       </DialogTitle>
//       <DialogContentText
//         id="alert-dialog-slide-description"
//         sx={{ marginLeft: "25px" }}
//       >
//         Fill in the details to create a new project
//       </DialogContentText>
//       <StyledDialogContent>
//         <FormControl component="fieldset" margin="normal">
//           <FormLabel component="legend">Project Type</FormLabel>
//           <RadioGroup
//             aria-label="projectType"
//             name="projectType"
//             value={projectType}
//             onChange={handleRadioChange}
//             row
//           >
//             <FormControlLabel
//               value="old"
//               control={<Radio />}
//               label="Old Project"
//             />
//             <FormControlLabel
//               value="new"
//               control={<Radio />}
//               label="New Project"
//             />
//           </RadioGroup>
//         </FormControl>

//         <Grid container spacing={2}>
//           {/* Title */}
//           <Grid item xs={12}>
//             <TextField
//               autoFocus
//               required
//               fullWidth
//               id="title"
//               name="title"
//               label="Title"
//               type="text"
//               variant="standard"
//               value={formData.title}
//               onChange={handleChange}
//             />
//           </Grid>
//           {/* Description */}
//           <Grid item xs={12}>
//             <TextField
//               required
//               fullWidth
//               id="description"
//               name="description"
//               label="Description"
//               multiline
//               rows={4}
//               variant="outlined"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </Grid>
//           {/* Tech Stack */}
//           <Grid item xs={12}>
//             <Autocomplete
//               multiple
//               id="techStack"
//               limitTags={4}
//               options={techOptions}
//               filterSelectedOptions
//               disableCloseOnSelect
//               sx={chipStyles}
//               getOptionLabel={(option) => option.title}
//               renderOption={(props, option) => (
//                 <li {...props}>
//                   <div>
//                     <i
//                       className={option.iconClassName}
//                       style={option.iconStyle}
//                     ></i>
//                     <span style={{ marginLeft: 8 }}>{option.title}</span>
//                   </div>
//                 </li>
//               )}
//               onChange={handleTechChange}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Tech Stack"
//                   placeholder="Select Tech Stack"
//                 />
//               )}
//             />
//           </Grid>
//           {/* Team stuff */}
//           {isHOB && (
//             <Grid item xs={12}>
//               <Autocomplete
//                 id="team"
//                 options={teams}
//                 getOptionLabel={(option) => option.name}
//                 renderOption={(props, option) => (
//                   <li {...props}>
//                     <div style={{ display: "flex", flexDirection: "column" }}>
//                       <p>{option.name}</p>
//                       <Typography color="textSecondary" variant="body2">
//                         {option.responsible.email}
//                       </Typography>
//                     </div>
//                   </li>
//                 )}
//                 onChange={handleTeamChange}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label="Team"
//                     placeholder="Select Team"
//                   />
//                 )}
//               />
//             </Grid>
//           )}
//           {/* Supervisors */}
//           <Grid item xs={12}>
//             <Autocomplete
//               multiple
//               id="supervisors"
//               disableCloseOnSelect
//               filterSelectedOptions
//               options={supervisors}
//               getOptionLabel={(option) =>
//                 option.firstName + " " + option.lastName
//               }
//               value={formData.supervisors}
//               onChange={handleSupervisorsChange}
//               renderOption={(props, option) => (
//                 <li {...props}>
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "10px",
//                     }}
//                   >
//                     <Avatar
//                       // {...stringAvatar(
//                       //   `${option.firstName} ${option.lastName}`
//                       // )}
//                       src={
//                         supervisorsImages.find(
//                           (supervisor) => supervisor.id === option.id
//                         )?.url
//                       }
//                       height={30}
//                       width={30}
//                     />
//                     <div>
//                       <span>{`${option.firstName} ${option.lastName}`}</span>
//                       <Typography variant="body2" color="textSecondary">
//                         {option.email}
//                       </Typography>
//                     </div>
//                   </div>
//                 </li>
//               )}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Supervisors"
//                   placeholder="Selected supervisors"
//                   fullWidth
//                 />
//               )}
//             />
//           </Grid>
//           {/* Code Link (if project is old) */}
//           {/* {projectType === "old" && ( */}
//             <Grid item xs={12}>
//               <TextField
//                 id="codeLink"
//                 name="codeLink"
//                 label="Code Link"
//                 type="url"
//                 fullWidth
//                 variant="standard"
//                 value={formData.codeLink}
//                 onChange={handleChange}
//               />
//             </Grid>
//           {/* )} */}
//           {/* {projectType === "new" && ( */}
//             {/* <StyledGrid item xs={12}>
//               <div
//                 style={{
//                   border: `1px solid ${
//                     mode === "dark" ? "#d3d3d350" : "rgba(0,0,0,0.3)"
//                   }`,
//                   width: "100%",
//                 }}
//               >
//                 <Button
//                   component="label"
//                   role={undefined}
//                   variant="text"
//                   sx={{
//                     color: mode === "dark" ? "lightgray" : "rgba(0,0,0,0.6)",
//                     width: "100%",
//                   }}
//                   tabIndex={-1}
//                   fullWidth={isSmallScreen}
//                   startIcon={<CloudUploadIcon />}
//                 >
//                   hahahahahahahahaha
//                   <VisuallyHiddenInput
//                     type="file"
//                     name="report"
//                     id="report"
//                     onChange={handleReportFileChange}
//                   />
//                 </Button>
//                 {uploadedReport && (
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       gap: "5px",
//                       width: "100%",
//                       minHeight: "60px",
//                       borderTop: `1px solid ${
//                         mode === "dark" ? "#d3d3d350" : "rgba(0,0,0,0.3)"
//                       }`,
//                       padding: "10px",
//                     }}
//                   >
//                     <div>
//                       <Typography sx={{ fontSize: "13px" }}>
//                         {uploadedReport.name}
//                       </Typography>
//                       <Typography
//                         sx={{ fontSize: "11px", marginTop: "3px" }}
//                         color="textSecondary"
//                       >
//                         {(uploadedReport.size * 0.000001).toFixed(2)} MB
//                       </Typography>
//                     </div>
//                     <DeleteOutlineIcon
//                       sx={{ cursor: "pointer" }}
//                       onClick={handleRemoveReport}
//                     />
//                   </div>
//                 )}
//               </div>
//               <div
//                 style={{
//                   border: `1px solid ${
//                     mode === "dark" ? "#d3d3d350" : "rgba(0,0,0,0.3)"
//                   }`,
//                   width: "100%",
//                 }}
//               >
//                 <Button
//                   component="label"
//                   role={undefined}
//                   variant="text"
//                   sx={{
//                     color: mode === "dark" ? "lightgray" : "rgba(0,0,0,0.6)",
//                     width: "100%",
//                   }}
//                   tabIndex={-1}
//                   fullWidth={isSmallScreen}
//                   startIcon={<CloudUploadIcon />}
//                 >
//                   Upload Files
//                   <VisuallyHiddenInput
//                     type="file"
//                     name="files"
//                     id="files"
//                     multiple
//                     onChange={handleFilesChange}
//                   />
//                 </Button>
//                 {uploadedFiles.map((file, index) => (
//                   <div
//                     key={index}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       gap: "5px",
//                       width: "100%",
//                       minHeight: "60px",
//                       borderTop: `1px solid ${
//                         mode === "dark" ? "#d3d3d350" : "rgba(0,0,0,0.3)"
//                       }`,
//                       padding: "10px",
//                     }}
//                   >
//                     <div>
//                       <Typography sx={{ fontSize: "13px" }} key={index}>
//                         {file.name}
//                       </Typography>
//                       <Typography
//                         sx={{ fontSize: "11px", marginTop: "3px" }}
//                         color="textSecondary"
//                         key={index}
//                       >
//                         {(file.size * 0.000001).toFixed(2)} MB
//                       </Typography>
//                     </div>
//                     <DeleteOutlineIcon
//                       sx={{ cursor: "pointer" }}
//                       onClick={() => handleRemoveFileFromFiles(index)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </StyledGrid> */}
//           {/* )} */}
//           {/* {projectType === "old" && (*/}
//             <StyledGrid item xs={12}>
//               <div
//                 style={{
//                   border: `1px solid ${
//                     mode === "dark" ? "#d3d3d350" : "rgba(0,0,0,0.3)"
//                   }`,
//                   width: "100%",
//                 }}
//               >
//                 {projectType === "old" && (
//                 <Button
//                   component="label"
//                   role={undefined}
//                   variant="text"
//                   sx={{
//                     color: mode === "dark" ? "lightgray" : "rgba(0,0,0,0.6)",
//                     width: "100%",
//                   }}
//                   tabIndex={-1}
//                   fullWidth={isSmallScreen}
//                   startIcon={<CloudUploadIcon />}
//                 >
//                   Upload Report
//                   <VisuallyHiddenInput
//                     type="file"
//                     name="report"
//                     id="report"
//                     onChange={handleReportFileChange}
//                   />
//                 </Button>
//                 )}
//                 {projectType === "new" && (
//                   <Button
//                   component="label"
//                   role={undefined}
//                   variant="text"
//                   sx={{
//                     color: mode === "dark" ? "lightgray" : "rgba(0,0,0,0.6)",
//                     width: "100%",
//                   }}
//                   tabIndex={-1}
//                   fullWidth={isSmallScreen}
//                   startIcon={<CloudUploadIcon />}
//                 >
//                   Upload Specifications Document
//                   <VisuallyHiddenInput
//                     type="file"
//                     name="report"
//                     id="report"
//                     onChange={handleReportFileChange}
//                   />
//                 </Button>
//                 )}
              
//                 {uploadedReport && (
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       gap: "5px",
//                       width: "100%",
//                       minHeight: "60px",
//                       borderTop: `1px solid ${
//                         mode === "dark" ? "#d3d3d350" : "rgba(0,0,0,0.3)"
//                       }`,
//                       padding: "10px",
//                     }}
//                   >
//                     <div>
//                       <Typography sx={{ fontSize: "13px" }}>
//                         {uploadedReport.name}
//                       </Typography>
//                       <Typography
//                         sx={{ fontSize: "11px", marginTop: "3px" }}
//                         color="textSecondary"
//                       >
//                         {(uploadedReport.size * 0.000001).toFixed(2)} MB
//                       </Typography>
//                     </div>
//                     <DeleteOutlineIcon
//                       sx={{ cursor: "pointer" }}
//                       onClick={handleRemoveReport}
//                     />
//                   </div>
//                 )}
//               </div>
//               <div
//                 style={{
//                   border: `1px solid ${
//                     mode === "dark" ? "#d3d3d350" : "rgba(0,0,0,0.3)"
//                   }`,
//                   width: "100%",
//                 }}
//               >
                
//                 <Button
//                   component="label"
//                   role={undefined}
//                   variant="text"
//                   sx={{
//                     color: mode === "dark" ? "lightgray" : "rgba(0,0,0,0.6)",
//                     width: "100%",
//                   }}
//                   tabIndex={-1}
//                   fullWidth={isSmallScreen}
//                   startIcon={<CloudUploadIcon />}
//                 >
//                   Upload Files
//                   <VisuallyHiddenInput
//                     type="file"
//                     name="files"
//                     id="files"
//                     multiple
//                     onChange={handleFilesChange}
//                   />
//                 </Button>
//                 {uploadedFiles.map((file, index) => (
//                   <div
//                     key={index}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       gap: "5px",
//                       width: "100%",
//                       minHeight: "60px",
//                       borderTop: `1px solid ${
//                         mode === "dark" ? "#d3d3d350" : "rgba(0,0,0,0.3)"
//                       }`,
//                       padding: "10px",
//                     }}
//                   >
//                     <div>
//                       <Typography sx={{ fontSize: "13px" }} key={index}>
//                         {file.name}
//                       </Typography>
//                       <Typography
//                         sx={{ fontSize: "11px", marginTop: "3px" }}
//                         color="textSecondary"
//                         key={index}
//                       >
//                         {(file.size * 0.000001).toFixed(2)} MB
//                       </Typography>
//                     </div>
//                     <DeleteOutlineIcon
//                       sx={{ cursor: "pointer" }}
//                       onClick={() => handleRemoveFileFromFiles(index)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </StyledGrid>
       
//         </Grid>
//       </StyledDialogContent>
//       <DialogActions>
//         <Button onClick={handleModalClose} color="error">
//           Cancel
//         </Button>
//         <LoadingButton
//           type="submit"
//           loading={loading}
//           loadingIndicator="creating..."
//           sx={{ paddingLeft: "15px", paddingRight: "15px" }}
//           variant="outlined"
//         >
//           <span>Save project</span>
//         </LoadingButton>
//       </DialogActions>
//     </StyledDialog>
//   );
// }

// export default CreateProjectDialog;
// import { forwardRef, useEffect, useState } from "react";
// import {
//   DialogActions,
//   DialogContentText,
//   DialogTitle,
//   Slide,
//   Button,
//   TextField,
//   Autocomplete,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Radio,
//   RadioGroup,
//   Grid,
//   useMediaQuery,
//   Typography,
//   Avatar,
//   IconButton,
//   Box,
//   styled
// } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// import CloseIcon from "@mui/icons-material/Close";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import ProjectIcon from "@mui/icons-material/Assignment";
// import TeamIcon from "@mui/icons-material/Group";
// import CodeIcon from "@mui/icons-material/Code";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import {
//   downLoadProfileImage,
//   getSupervisors,
// } from "../../services/userService";
// import createProject from "../../services/projectService";
// import { StyledDialog, StyledDialogContent, VisuallyHiddenInput } from "./createProjectDialog";
// import { hasRole } from "../../utils/userUtiles";
// import { getAllTeams } from "../../services/teamService";
// import { forEach } from "lodash";

// const Transition = forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// // Modern Teal Palette Styled Components
// const ModernDialog = styled(StyledDialog)({
//   "& .MuiDialog-paper": {
//     borderRadius: "8px",
//     backgroundColor: "#ffffff",
//     boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
//     border: "1px solid #e6f2f2",
//     maxWidth: "800px",
//     fontFamily: "'Inter', sans-serif",
//   },
// });

// const ModernDialogTitle = styled(DialogTitle)({
//   backgroundColor: "#f8fafa",
//   color: "#1a1a1a",
//   padding: "24px 32px",
//   borderBottom: "1px solid #e6f2f2",
//   "& .MuiTypography-root": {
//     fontFamily: "'Inter', sans-serif",
//     fontWeight: 600,
//     fontSize: "20px",
//     color: "#1a1a1a",
//   },
// });

// const ModernDialogContent = styled(StyledDialogContent)({
//   padding: "32px",
//   backgroundColor: "#fdfefe",
// });

// const ModernTextField = styled(TextField)({
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "6px",
//     backgroundColor: "#ffffff",
//     fontFamily: "'Inter', sans-serif",
//     "& fieldset": {
//       borderColor: "#d1e7e7",
//     },
//     "&:hover fieldset": {
//       borderColor: "#a3d5d5",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#2d7a7a",
//       borderWidth: "1px",
//     },
//   },
//   "& .MuiInputLabel-root": {
//     fontFamily: "'Inter', sans-serif",
//     color: "#4a4a4a",
//     "&.Mui-focused": {
//       color: "#1e5a5a",
//     },
//   },
//   "& .MuiOutlinedInput-input": {
//     color: "#1a1a1a",
//   },
// });

// const ModernAutocomplete = styled(Autocomplete)({
//   "& .MuiOutlinedInput-root": {
//     borderRadius: "6px",
//     backgroundColor: "#ffffff",
//     fontFamily: "'Inter', sans-serif",
//     "& fieldset": {
//       borderColor: "#d1e7e7",
//     },
//     "&:hover fieldset": {
//       borderColor: "#a3d5d5",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#2d7a7a",
//       borderWidth: "1px",
//     },
//   },
//   "& .MuiChip-root": {
//     backgroundColor: "#f8fafa",
//     color: "#1e5a5a",
//     fontFamily: "'Inter', sans-serif",
//     border: "1px solid #d1e7e7",
//     borderRadius: "4px",
//     fontSize: "12px",
//     "& .MuiChip-deleteIcon": {
//       color: "#4a9a9a",
//     },
//   },
// });

// const ModernFormControl = styled(FormControl)({
//   "& .MuiFormLabel-root": {
//     fontFamily: "'Inter', sans-serif",
//     fontWeight: 600,
//     color: "#1a1a1a",
//     fontSize: "15px",
//   },
//   "& .MuiFormControlLabel-label": {
//     fontFamily: "'Inter', sans-serif",
//     color: "#2d2d2d",
//     fontSize: "14px",
//   },
//   "& .MuiRadio-root": {
//     color: "#a3d5d5",
//     "&.Mui-checked": {
//       color: "#2d7a7a",
//     },
//   },
// });

// const ModernUploadContainer = styled(Box)({
//   border: "1px dashed #d1e7e7",
//   borderRadius: "6px",
//   backgroundColor: "#ffffff",
//   "&:hover": {
//     borderColor: "#a3d5d5",
//     backgroundColor: "#fcfefe",
//   },
// });

// const ModernUploadButton = styled(Button)({
//   fontFamily: "'Inter', sans-serif",
//   color: "#4a4a4a",
//   textTransform: "none",
//   padding: "20px",
//   width: "100%",
//   fontSize: "14px",
//   "&:hover": {
//     backgroundColor: "transparent",
//     color: "#1e5a5a",
//   },
// });

// const ModernFileItem = styled(Box)({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   padding: "12px 16px",
//   backgroundColor: "#fcfefe",
//   borderTop: "1px solid #e6f2f2",
//   "&:first-of-type": {
//     borderTop: "none",
//   },
// });

// const ModernButton = styled(Button)(({ variant, color }) => ({
//   fontFamily: "'Inter', sans-serif",
//   fontWeight: 500,
//   borderRadius: "6px",
//   textTransform: "none",
//   padding: "10px 20px",
//   fontSize: "14px",
//   color: "#1a1a1a",
//   ...(variant === "outlined" && {
//     borderColor: "#d1e7e7",
//     color: "#4a4a4a",
//     backgroundColor: "#ffffff",
//     "&:hover": {
//       backgroundColor: "#fcfefe",
//       borderColor: "#a3d5d5",
//       color: "#2d2d2d",
//     },
//   }),
//   ...(color === "error" && {
//     color: "#dc6545",
//     borderColor: "#f4d4c7",
//     "&:hover": {
//       backgroundColor: "#fef7f4",
//       borderColor: "#e8b4a0",
//     },
//   }),
// }));

// const ModernLoadingButton = styled(LoadingButton)({
//   fontFamily: "'Inter', sans-serif",
//   fontWeight: 600,
//   borderRadius: "6px",
//   textTransform: "none",
//   padding: "10px 24px",
//   fontSize: "14px",
//   backgroundColor: "#2d7a7a",
//   color: "#ffffff",
//   "&:hover": {
//     backgroundColor: "#1e5a5a",
//   },
//   "&:disabled": {
//     backgroundColor: "#e6f2f2",
//     color: "#a3d5d5",
//   },
// });

// const ModernIconButton = styled(IconButton)({
//   color: "#4a4a4a",
//   "&:hover": {
//     backgroundColor: "#fcfefe",
//     color: "#1e5a5a",
//   },
// });

// const SectionTitle = styled(Typography)({
//   fontFamily: "'Inter', sans-serif",
//   fontWeight: 600,
//   fontSize: "16px",
//   color: "#1a1a1a",
//   marginBottom: "16px",
//   display: "flex",
//   alignItems: "center",
//   gap: "8px",
// });

// const ModernSectionContainer = styled(Box)({
//   backgroundColor: "#ffffff",
//   borderRadius: "6px",
//   padding: "24px",
//   marginBottom: "20px",
//   border: "1px solid #e6f2f2",
// });

// const ModernIconBadge = styled(Box)({
//   width: "24px",
//   height: "24px",
//   borderRadius: "4px",
//   backgroundColor: "#f8fafa",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// });

// const token = localStorage.getItem("token");

// const techOptions = [
//   { title: "JavaScript", iconClassName: "devicon-javascript-plain colored" },
//   { title: "React", iconClassName: "devicon-react-original colored" },
//   { title: "Node.js", iconClassName: "devicon-nodejs-plain colored" },
//   { title: "Express.js", iconClassName: "devicon-express-original colored" },
//   { title: "Vue.js", iconClassName: "devicon-vuejs-plain colored" },
//   { title: "Angular", iconClassName: "devicon-angularjs-plain colored" },
//   { title: "Python", iconClassName: "devicon-python-plain colored" },
//   { title: "Django", iconClassName: "devicon-django-plain colored" },
//   { title: "Ruby on Rails", iconClassName: "devicon-rails-plain colored" },
//   { title: "React Native", iconClassName: "devicon-react-original colored" },
//   { title: "Flutter", iconClassName: "devicon-flutter-plain colored" },
//   { title: "MongoDB", iconClassName: "devicon-mongodb-plain colored" },
//   { title: "MySQL", iconClassName: "devicon-mysql-plain colored" },
//   { title: "PostgreSQL", iconClassName: "devicon-postgresql-plain colored" },
//   { title: "Git", iconClassName: "devicon-git-plain colored" },
//   { title: "Docker", iconClassName: "devicon-docker-plain colored" },
//   { title: "Kubernetes", iconClassName: "devicon-kubernetes-plain colored" },
//   { title: "Symfony", iconClassName: "devicon-symfony-original colored" },
//   { title: "SpringBoot", iconClassName: "devicon-spring-plain colored" },
// ];

// function CreateProjectDialog({ projectDialogOpen, handleModalClose, setSnackbarOpen, setSnackbarMessage }) {
//   const mode = localStorage.getItem("mode");
//   const isHOB = hasRole("ROLE_HEAD_OF_BRANCH");
//   const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
//   const [supervisors, setSupervisors] = useState([]);
//   const [teams, setTeams] = useState([]);
//   const [projectType, setProjectType] = useState("old");
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     techStack: [],
//     codeLink: "",
//     branch: 1,
//     academicYear: "",
//     supervisors: [],
//     files: [],
//     report: null,
//     team: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [uploadedReport, setUploadedReport] = useState(null);
//   const [supervisorsImages, setSupervisorsImages] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const fetchedSupervisors = await getSupervisors(token);
//       let academicYear = "";
//       const year = new Date().getFullYear();
//       const month = new Date().getMonth();
//       if (month >= 9 && month <= 12) {
//         academicYear = `${year}/${year + 1}`;
//       } else if (month >= 1 && month <= 7) {
//         academicYear = `${year - 1}/${year}`;
//       }

//       const fetchedTeams = await getAllTeams(token, academicYear);
//       const images = [];
//       forEach(fetchedSupervisors, async (supervisor) => {
//         const url = await downLoadProfileImage(supervisor.id, token);
//         images.push({
//           id: supervisor.id,
//           name: supervisor.firstName + " " + supervisor.lastName,
//           url: url,
//         });
//       });
//       setSupervisorsImages(images);
//       setSupervisors(fetchedSupervisors);
//       setTeams(fetchedTeams.filter((team) => team.project === null));
//     }
//     fetchData();
//   }, []);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleRadioChange = (event) => {
//     const { value } = event.target;
//     setProjectType(value);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       projectType: value,
//     }));
//   };

//   const handleTechChange = (event, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       techStack: value,
//     }));
//   };

//   const handleTeamChange = (event, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       team: value,
//     }));
//   };

//   const handleSupervisorsChange = (event, value) => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       supervisors: value,
//     }));
//   };

//   const handleFilesChange = (event) => {
//     const files = event.target.files;
//     const uploadedFilesList = Array.from(files).map((file) => ({
//       name: file.name,
//       size: file.size,
//     }));
//     setUploadedFiles(uploadedFilesList);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       files: Array.from(files).slice(0, 10),
//     }));
//   };

//   const handleRemoveFileFromFiles = (index) => {
//     setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       files: prevFormData.files.filter((_, i) => i !== index),
//     }));
//   };

//   const handleReportFileChange = (event) => {
//     const file = event.target.files[0];
//     const uploadedReport = {
//       name: file.name,
//       size: file.size,
//     };
//     setUploadedReport(uploadedReport);
//     setFormData({ ...formData, report: file });
//   };

//   const handleRemoveReport = () => {
//     setUploadedReport(null);
//     setFormData({ ...formData, report: null });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     const techStack = formData.techStack.map((tech) => tech.title).join(", ");
//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("description", formData.description);
//     data.append("status", projectType);
//     data.append("techStack", techStack);
//     data.append("codeLink", formData.codeLink);
//     const year = new Date().getFullYear();
//     const month = new Date().getMonth();
//     if (month >= 9 && month <= 12) {
//       formData.academicYear = `${year}/${year + 1}`;
//     } else if (month >= 1 && month <= 7) {
//       formData.academicYear = `${year - 1}/${year}`;
//     }
//     data.append("academicYear", formData.academicYear);
//     data.append("branch", formData.branch);
//     if (formData.team && formData.team.id !== null) {
//       data.append("team", formData.team.id);
//     } else {
//       data.append("team", null);
//     }
//     data.append(
//       "supervisors",
//       formData.supervisors.map((supervisor) => supervisor.id)
//     );
//     data.append("report", formData.report);
//     if (formData.files.length === 0) {
//       data.append("files", null);
//     } else {
//       formData.files.forEach((file) => data.append("files", file));
//     }
//     setLoading(false);
//     await createProject(token, data, setSnackbarOpen, setSnackbarMessage);
//     handleModalClose();
//   };

//   const handleSubmitReportOnly = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     const data = new FormData();
//     data.append("title", "Projet avec rapport uniquement");
//     data.append("description", "Projet test pour import de rapport");
//     if (formData.team && formData.team.id !== null) {
//       data.append("team", formData.team.id);
//     } else {
//       data.append("team", null);
//     }
//     data.append(
//       "supervisors",
//       formData.supervisors.map((supervisor) => supervisor.id)
//     );
//     data.append("status", "DRAFT");
//     data.append("branch", formData.branch);
//     if (formData.report) {
//       data.append("report", formData.report, formData.report.name);
//     } else {
//       setSnackbarMessage("Aucun rapport sélectionné");
//       setSnackbarOpen(true);
//       setLoading(false);
//       return;
//     }
//     await createProject(token, data, setSnackbarOpen, setSnackbarMessage);
//     handleModalClose();
//     setLoading(false);
//   };

//   return (
//     <ModernDialog
//       open={projectDialogOpen}
//       TransitionComponent={Transition}
//       keepMounted
//       onClose={handleModalClose}
//       aria-describedby="alert-dialog-slide-description"
//       PaperProps={{
//         component: "form",
//         onSubmit: (event) => {
//           handleSubmit(event);
//           handleSubmitReportOnly(event);
//         },
//       }}
//     >
//       <ModernDialogTitle>
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//             <ModernIconBadge>
//               <ProjectIcon sx={{ color: "#2d7a7a", fontSize: "16px" }} />
//             </ModernIconBadge>
//             <Typography variant="h6" component="span" sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
//               Create Project
//             </Typography>
//           </div>
//           <ModernIconButton onClick={handleModalClose}>
//             <CloseIcon />
//           </ModernIconButton>
//         </div>
//       </ModernDialogTitle>

//       <ModernDialogContent>
//         <DialogContentText
//           sx={{
//             fontFamily: "'Inter', sans-serif",
//             color: "#4a4a4a",
//             marginBottom: "24px",
//             fontSize: "14px",
//             textAlign: "center",
//           }}
//         >
//           Fill in the details to create a new project
//         </DialogContentText>

//         <ModernSectionContainer>
//           <ModernFormControl component="fieldset" margin="normal" fullWidth>
//             <FormLabel component="legend">Project Type</FormLabel>
//             <RadioGroup
//               aria-label="projectType"
//               name="projectType"
//               value={projectType}
//               onChange={handleRadioChange}
//               row
//               sx={{ marginTop: "12px", gap: "24px" }}
//             >
//               <FormControlLabel value="old" control={<Radio />} label="Old Project" />
//               <FormControlLabel value="new" control={<Radio />} label="New Project" />
//             </RadioGroup>
//           </ModernFormControl>
//         </ModernSectionContainer>

//         <ModernSectionContainer>
//           <SectionTitle>
//             <ModernIconBadge>
//               <ProjectIcon sx={{ color: "#2d7a7a", fontSize: "14px" }} />
//             </ModernIconBadge>
//             Project Details
//           </SectionTitle>

//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <ModernTextField
//                 autoFocus
//                 required
//                 fullWidth
//                 id="title"
//                 name="title"
//                 label="Title"
//                 type="text"
//                 variant="outlined"
//                 value={formData.title}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <ModernTextField
//                 required
//                 fullWidth
//                 id="description"
//                 name="description"
//                 label="Description"
//                 multiline
//                 rows={4}
//                 variant="outlined"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <ModernAutocomplete
//                 multiple
//                 id="techStack"
//                 limitTags={4}
//                 options={techOptions}
//                 filterSelectedOptions
//                 disableCloseOnSelect
//                 getOptionLabel={(option) => option.title}
//                 renderOption={(props, option) => (
//                   <li {...props}>
//                     <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                       <i className={option.iconClassName} style={{ fontSize: "16px" }}></i>
//                       <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px" }}>
//                         {option.title}
//                       </span>
//                     </div>
//                   </li>
//                 )}
//                 onChange={handleTechChange}
//                 renderInput={(params) => (
//                   <ModernTextField
//                     {...params}
//                     label="Tech Stack"
//                     placeholder="Select Tech Stack"
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <ModernTextField
//                 id="codeLink"
//                 name="codeLink"
//                 label="Code Link"
//                 type="url"
//                 fullWidth
//                 variant="outlined"
//                 value={formData.codeLink}
//                 onChange={handleChange}
//               />
//             </Grid>
//           </Grid>
//         </ModernSectionContainer>

//         <ModernSectionContainer>
//           <SectionTitle>
//             <ModernIconBadge>
//               <TeamIcon sx={{ color: "#2d7a7a", fontSize: "14px" }} />
//             </ModernIconBadge>
//             Team & Supervision
//           </SectionTitle>

//           <Grid container spacing={3}>
//             {isHOB && (
//               <Grid item xs={12}>
//                 <ModernAutocomplete
//                   id="team"
//                   options={teams}
//                   getOptionLabel={(option) => option.name}
//                   renderOption={(props, option) => (
//                     <li {...props}>
//                       <div style={{ display: "flex", flexDirection: "column" }}>
//                         <Typography sx={{ fontWeight: 500, fontSize: "13px" }}>
//                           {option.name}
//                         </Typography>
//                         <Typography sx={{ fontSize: "11px", color: "#4a4a4a" }}>
//                           {option.responsible.email}
//                         </Typography>
//                       </div>
//                     </li>
//                   )}
//                   onChange={handleTeamChange}
//                   renderInput={(params) => (
//                     <ModernTextField
//                       {...params}
//                       label="Team"
//                       placeholder="Select Team"
//                     />
//                   )}
//                 />
//               </Grid>
//             )}

//             <Grid item xs={12}>
//               <ModernAutocomplete
//                 multiple
//                 id="supervisors"
//                 disableCloseOnSelect
//                 filterSelectedOptions
//                 options={supervisors}
//                 getOptionLabel={(option) =>
//                   option.firstName + " " + option.lastName
//                 }
//                 value={formData.supervisors}
//                 onChange={handleSupervisorsChange}
//                 renderOption={(props, option) => (
//                   <li {...props}>
//                     <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                       <Avatar
//                         src={
//                           supervisorsImages.find(
//                             (supervisor) => supervisor.id === option.id
//                           )?.url
//                         }
//                         sx={{ width: 28, height: 28 }}
//                       />
//                       <div>
//                         <Typography sx={{ fontWeight: 500, fontSize: "13px" }}>
//                           {`${option.firstName} ${option.lastName}`}
//                         </Typography>
//                         <Typography sx={{ fontSize: "11px", color: "#4a4a4a" }}>
//                           {option.email}
//                         </Typography>
//                       </div>
//                     </div>
//                   </li>
//                 )}
//                 renderInput={(params) => (
//                   <ModernTextField
//                     {...params}
//                     label="Supervisors"
//                     placeholder="Selected supervisors"
//                     fullWidth
//                   />
//                 )}
//               />
//             </Grid>
//           </Grid>
//         </ModernSectionContainer>

//         <ModernSectionContainer>
//           <SectionTitle>
//             <ModernIconBadge>
//               <AttachFileIcon sx={{ color: "#2d7a7a", fontSize: "14px" }} />
//             </ModernIconBadge>
//             Documents
//           </SectionTitle>

//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <ModernUploadContainer>
//                 <ModernUploadButton
//                   component="label"
//                   variant="text"
//                   startIcon={<CloudUploadIcon />}
//                   fullWidth
//                 >
//                   {projectType === "old" ? "Upload Report" : "Upload Specifications Document"}
//                   <VisuallyHiddenInput
//                     type="file"
//                     name="report"
//                     id="report"
//                     onChange={handleReportFileChange}
//                   />
//                 </ModernUploadButton>
//                 {uploadedReport && (
//                   <ModernFileItem>
//                     <div>
//                       <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
//                         {uploadedReport.name}
//                       </Typography>
//                       <Typography sx={{ fontSize: "11px", color: "#4a4a4a" }}>
//                         {(uploadedReport.size * 0.000001).toFixed(2)} MB
//                       </Typography>
//                     </div>
//                     <ModernIconButton onClick={handleRemoveReport}>
//                       <DeleteOutlineIcon fontSize="small" />
//                     </ModernIconButton>
//                   </ModernFileItem>
//                 )}
//               </ModernUploadContainer>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <ModernUploadContainer>
//                 <ModernUploadButton
//                   component="label"
//                   variant="text"
//                   startIcon={<CloudUploadIcon />}
//                   fullWidth
//                 >
//                   Upload Files
//                   <VisuallyHiddenInput
//                     type="file"
//                     name="files"
//                     id="files"
//                     multiple
//                     onChange={handleFilesChange}
//                   />
//                 </ModernUploadButton>
//                 {uploadedFiles.map((file, index) => (
//                   <ModernFileItem key={index}>
//                     <div>
//                       <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
//                         {file.name}
//                       </Typography>
//                       <Typography sx={{ fontSize: "11px", color: "#4a4a4a" }}>
//                         {(file.size * 0.000001).toFixed(2)} MB
//                       </Typography>
//                     </div>
//                     <ModernIconButton onClick={() => handleRemoveFileFromFiles(index)}>
//                       <DeleteOutlineIcon fontSize="small" />
//                     </ModernIconButton>
//                   </ModernFileItem>
//                 ))}
//               </ModernUploadContainer>
//             </Grid>
//           </Grid>
//         </ModernSectionContainer>
//       </ModernDialogContent>

//       <DialogActions
//         sx={{
//           padding: "20px 32px",
//           backgroundColor: "#ffffff",
//           borderTop: "1px solid #e6f2f2",
//           gap: "12px",
//         }}
//       >
//         <ModernButton onClick={handleModalClose} color="error" variant="outlined">
//           Cancel
//         </ModernButton>
//         <ModernLoadingButton
//           type="submit"
//           loading={loading}
//           loadingIndicator="Creating..."
//           variant="contained"
//         >
//           Save Project
//         </ModernLoadingButton>
//       </DialogActions>
//     </ModernDialog>
//   );
// }

// export default CreateProjectDialog;

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
      borderColor: theme.palette.mode === 'light' ? '#a3d5d5' : theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: "1px",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Inter', sans-serif",
    color: theme.palette.text.secondary,
    "&.Mui-focused": {
      color: theme.palette.primary.main,
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
      borderColor: theme.palette.mode === 'light' ? '#a3d5d5' : theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: "1px",
    },
  },
  "& .MuiChip-root": {
    backgroundColor: theme.palette.mode === 'light' ? '#f8fafa' : theme.palette.background.default,
    color: theme.palette.mode === 'light' ? '#1e5a5a' : theme.palette.primary.main,
    fontFamily: "'Inter', sans-serif",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "4px",
    fontSize: "12px",
    "& .MuiChip-deleteIcon": {
      color: theme.palette.mode === 'light' ? '#4a9a9a' : theme.palette.primary.light,
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
    color: theme.palette.mode === 'light' ? '#a3d5d5' : theme.palette.primary.light,
    "&.Mui-checked": {
      color: theme.palette.primary.main,
    },
  },
}));

const ModernUploadContainer = styled(Box)(({ theme }) => ({
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: "6px",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    borderColor: theme.palette.mode === 'light' ? '#a3d5d5' : theme.palette.primary.light,
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
    color: theme.palette.primary.main,
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
      borderColor: theme.palette.mode === 'light' ? '#a3d5d5' : theme.palette.primary.light,
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
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
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
    color: theme.palette.primary.main,
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
          handleSubmitReportOnly(event);
        },
      }}
    >
      <ModernDialogTitle>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ModernIconBadge>
              <ProjectIcon sx={{ color: theme.palette.primary.main, fontSize: "16px" }} />
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
              <ProjectIcon sx={{ color: theme.palette.primary.main, fontSize: "14px" }} />
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
              <TeamIcon sx={{ color: theme.palette.primary.main, fontSize: "14px" }} />
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
              <AttachFileIcon sx={{ color: theme.palette.primary.main, fontSize: "14px" }} />
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