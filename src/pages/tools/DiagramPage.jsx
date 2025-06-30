"use client"

import { useState } from "react"
import { styled, useTheme } from "@mui/material/styles"
import { Box, Typography, TextField, Button, Paper } from "@mui/material"
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import AddIcon from "@mui/icons-material/Add"
import DownloadIcon from "@mui/icons-material/Download"

const DiagramContainer = styled(Box)(({ theme }) => ({
  maxWidth: "800px",
  margin: "0 auto",
  padding: "32px 20px",
  fontFamily: "'Inter', sans-serif",
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
}))

const MainTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  fontSize: "32px",
  fontWeight: 700,
  color: theme.palette.text.primary,
  textAlign: "center",
  marginBottom: "40px",
  letterSpacing: "-0.5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
}))

const FormSection = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#f8fafa' : theme.palette.background.paper,
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "24px",
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  fontFamily: "'Inter', sans-serif",
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  fontSize: "20px",
  fontWeight: 600,
  color: theme.palette.mode === 'light' ? '#2d7a7a' : '#4db3b3',
  borderBottom: `2px solid ${theme.palette.divider}`,
  paddingBottom: "12px",
  marginTop: "0",
  marginBottom: "20px",
}))

const FormLabel = styled(Typography)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: theme.palette.text.primary,
  display: "block",
  marginBottom: "8px",
}))

const ModernTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  marginBottom: "16px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: theme.palette.background.paper,
    fontFamily: "'Inter', sans-serif",
    fontSize: "16px",
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.mode === 'light' ? '#a3d5d5' : '#4db3b3',
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.mode === 'light' ? '#2d7a7a' : '#4db3b3',
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Inter', sans-serif",
    color: theme.palette.text.secondary,
    fontWeight: 500,
    "&.Mui-focused": {
      color: theme.palette.mode === 'light' ? '#1e5a5a' : '#4db3b3',
    },
  },
  "& .MuiOutlinedInput-input": {
    color: theme.palette.text.primary,
    fontFamily: "'Inter', sans-serif",
    padding: "12px 14px",
  },
  "& .MuiInputBase-multiline": {
    minHeight: "80px",
  },
}))

const EntityCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "16px",
  borderLeft: `4px solid ${theme.palette.mode === 'light' ? '#2d7a7a' : '#4db3b3'}`,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "0 2px 8px rgba(45, 122, 122, 0.08)",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    borderLeftColor: theme.palette.mode === 'light' ? '#1e5a5a' : '#5acccc',
    boxShadow: "0 4px 12px rgba(45, 122, 122, 0.15)",
  },
}))

const HintText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  fontSize: "13px",
  color: theme.palette.mode === 'light' ? '#6bb6b6' : '#88c8c8',
  marginTop: "-8px",
  marginBottom: "16px",
  lineHeight: 1.4,
}))

const AddButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  backgroundColor: theme.palette.mode === 'light' ? '#f8fafa' : theme.palette.background.paper,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
  padding: "8px 16px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "none",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.mode === 'light' ? '#a3d5d5' : '#4db3b3',
    color: theme.palette.mode === 'light' ? '#1e5a5a' : '#4db3b3',
  },
}))

const GenerateButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  backgroundColor: theme.palette.mode === 'light' ? '#2d7a7a' : '#3a9e9e',
  color: "#ffffff",
  border: "none",
  padding: "16px 32px",
  fontSize: "18px",
  fontWeight: 600,
  borderRadius: "8px",
  width: "100%",
  marginTop: "16px",
  textTransform: "none",
  transition: "all 0.3s ease-in-out",
  "&:hover:not(:disabled)": {
    backgroundColor: theme.palette.mode === 'light' ? '#1e5a5a' : '#2a8a8a',
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(45, 122, 122, 0.3)",
  },
  "&:disabled": {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.text.disabled,
    cursor: "not-allowed",
  },
}))

const ErrorMessage = styled(Typography)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  color: theme.palette.error.main,
  textAlign: "center",
  margin: "20px 0",
  padding: "12px",
  backgroundColor: theme.palette.error.light,
  border: `1px solid ${theme.palette.error.dark}`,
  borderRadius: "8px",
}))

const DiagramResult = styled(Paper)(({ theme }) => ({
  marginTop: "40px",
  padding: "24px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
}))

const DiagramResultTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  fontSize: "24px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  textAlign: "center",
  marginBottom: "24px",
}))

const DiagramHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  flexWrap: "wrap",
  gap: "12px",
})

const DownloadButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  borderRadius: "6px",
  padding: "8px 16px",
  textTransform: "none",
  transition: "all 0.2s ease-in-out",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  backgroundColor: theme.palette.mode === 'light' ? '#2d7a7a' : '#3a9e9e',
  color: "#ffffff",
  "&:hover": {
    backgroundColor: theme.palette.mode === 'light' ? '#1e5a5a' : '#2a8a8a',
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(45, 122, 122, 0.3)",
  },
}))

function DiagramPage() {
  const theme = useTheme();
  // States for each structured section
  const [systemName, setSystemName] = useState("")
  const [entities, setEntities] = useState([{ name: "", attributes: "", methods: "" }])
  const [relationships, setRelationships] = useState("")
  const [requirements, setRequirements] = useState("")
  const [umlDiagramSvg, setUmlDiagramSvg] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const addEntity = () => {
    setEntities([...entities, { name: "", attributes: "", methods: "" }])
  }

  const updateEntity = (index, field, value) => {
    const newEntities = [...entities]
    newEntities[index][field] = value
    setEntities(newEntities)
  }

  const formatStructuredDataToText = () => {
    let text = `System Name: ${systemName}\n\n`
    text += "Entities:\n"
    entities.forEach((entity, index) => {
      text += `${index + 1}. ${entity.name}:\n`
      text += `   Attributes: ${entity.attributes}\n`
      if (entity.methods && entity.methods.trim() !== "") {
        text += `   Methods: ${entity.methods}\n`
      }
    })
    text += "\nRelationships:\n"
    text += relationships
    text += "\n\nKey Functionalities:\n"
    text += requirements
    return text
  }

  const validateForm = () => {
    if (!systemName.trim()) {
      return "System name is required"
    }
    for (const entity of entities) {
      if (!entity.name.trim()) return "Entity name is required for all entries"
      if (!entity.attributes.trim()) return "Attributes are required for all entities"
    }
    if (!requirements.trim()) {
      return "Key functionalities are required"
    }
    return null
  }

  const downloadSvg = () => {
    if (!umlDiagramSvg) return
    const blob = new Blob([umlDiagramSvg], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${systemName.replace(/\s+/g, "_")}_diagram.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateDiagram = async () => {
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError(null)
    setUmlDiagramSvg("")

    try {
      const textExplanation = formatStructuredDataToText()
      const response = await fetch("http://localhost:8080/api/v1/diagrams/generate-from-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textExplanation }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to generate diagram")
      }

      const data = await response.json()
      if (data.plantUmlCode) {
        setUmlDiagramSvg(data.plantUmlCode)
      } else {
        setError("No diagram received from server")
      }
    } catch (err) {
      setError(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DiagramContainer>
      <MainTitle>
        <AccountTreeIcon sx={{ fontSize: "36px", color: theme.palette.mode === 'light' ? '#2d7a7a' : '#4db3b3' }} />
        UML Diagram Generator
      </MainTitle>

      <FormSection elevation={0}>
        <SectionTitle>1. System Overview</SectionTitle>
        <FormLabel>What is your system called? *</FormLabel>
        <ModernTextField
          type="text"
          value={systemName}
          onChange={(e) => setSystemName(e.target.value)}
          placeholder="Example: Library Management System"
          required
          variant="outlined"
        />
      </FormSection>

      <FormSection elevation={0}>
        <SectionTitle>2. Main Entities *</SectionTitle>
        <HintText>What are the key objects/concepts in your system? (Example: Book, User, Order)</HintText>

        {entities.map((entity, index) => (
          <EntityCard key={index}>
            <FormLabel>Entity Name *</FormLabel>
            <ModernTextField
              type="text"
              value={entity.name}
              onChange={(e) => updateEntity(index, "name", e.target.value)}
              placeholder="Example: Book"
              required
              variant="outlined"
            />

            <FormLabel>Characteristics (Attributes) *</FormLabel>
            <ModernTextField
              multiline
              rows={2}
              value={entity.attributes}
              onChange={(e) => updateEntity(index, "attributes", e.target.value)}
              placeholder="Example: title: String, author: String, ISBN: String"
              required
              variant="outlined"
            />

            <FormLabel>Possible Actions (Methods)</FormLabel>
            <ModernTextField
              multiline
              rows={2}
              value={entity.methods}
              onChange={(e) => updateEntity(index, "methods", e.target.value)}
              placeholder="Example: borrow(), return()"
              variant="outlined"
            />
          </EntityCard>
        ))}

        <AddButton onClick={addEntity} startIcon={<AddIcon />}>
          Add Entity
        </AddButton>
      </FormSection>

      <FormSection elevation={0}>
        <SectionTitle>3. Entity Relationships</SectionTitle>
        <HintText>
          How do your entities interact with each other? (Example: "A User can borrow multiple Books")
        </HintText>
        <ModernTextField
          multiline
          rows={3}
          value={relationships}
          onChange={(e) => setRelationships(e.target.value)}
          placeholder="Describe important relationships..."
          variant="outlined"
        />
      </FormSection>

      <FormSection elevation={0}>
        <SectionTitle>4. Key Functionalities *</SectionTitle>
        <HintText>
          What are the main actions your system should perform? (Example: "Search books", "Manage borrowings")
        </HintText>
        <ModernTextField
          multiline
          rows={4}
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="List 3-5 essential features..."
          required
          variant="outlined"
        />
      </FormSection>

      <GenerateButton onClick={generateDiagram} disabled={loading}>
        {loading ? "Generating..." : "Generate UML Diagram"}
      </GenerateButton>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {umlDiagramSvg && (
        <DiagramResult elevation={0}>
          <DiagramHeader>
            <DiagramResultTitle>Generated UML Diagram</DiagramResultTitle>
            <DownloadButton onClick={downloadSvg} startIcon={<DownloadIcon />}>
              Download SVG
            </DownloadButton>
          </DiagramHeader>
          <Box
            sx={{
              minHeight: "300px",
              backgroundColor: theme.palette.background.default,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: "8px",
              padding: "16px",
              "& svg": {
                width: "100%",
                height: "auto",
              },
            }}
            dangerouslySetInnerHTML={{ __html: umlDiagramSvg }}
          />
        </DiagramResult>
      )}
    </DiagramContainer>
  )
}

export default DiagramPage