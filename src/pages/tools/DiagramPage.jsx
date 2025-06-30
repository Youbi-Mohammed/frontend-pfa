"use client"

import { useState } from "react"
import { styled } from "@mui/material/styles"
import { Box, Typography, TextField, Button, Paper } from "@mui/material"
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import AddIcon from "@mui/icons-material/Add"
import DownloadIcon from "@mui/icons-material/Download"

const DiagramContainer = styled(Box)({
  maxWidth: "800px",
  margin: "0 auto",
  padding: "32px 20px",
  fontFamily: "'Inter', sans-serif",
  color: "#1a1a1a",
  backgroundColor: "#fdfefe",
  minHeight: "100vh",
})

const MainTitle = styled(Typography)({
  fontFamily: "'Inter', sans-serif",
  fontSize: "32px",
  fontWeight: 700,
  color: "#1a1a1a",
  textAlign: "center",
  marginBottom: "40px",
  letterSpacing: "-0.5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
})

const FormSection = styled(Paper)({
  backgroundColor: "#f8fafa",
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "24px",
  border: "1px solid #e6f2f2",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  fontFamily: "'Inter', sans-serif",
})

const SectionTitle = styled(Typography)({
  fontFamily: "'Inter', sans-serif",
  fontSize: "20px",
  fontWeight: 600,
  color: "#2d7a7a",
  borderBottom: "2px solid #d1e7e7",
  paddingBottom: "12px",
  marginTop: "0",
  marginBottom: "20px",
})

const FormLabel = styled(Typography)({
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: "#1a1a1a",
  display: "block",
  marginBottom: "8px",
})

const ModernTextField = styled(TextField)({
  width: "100%",
  marginBottom: "16px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    fontFamily: "'Inter', sans-serif",
    fontSize: "16px",
    "& fieldset": {
      borderColor: "#d1e7e7",
    },
    "&:hover fieldset": {
      borderColor: "#a3d5d5",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2d7a7a",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Inter', sans-serif",
    color: "#4a4a4a",
    fontWeight: 500,
    "&.Mui-focused": {
      color: "#1e5a5a",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#1a1a1a",
    fontFamily: "'Inter', sans-serif",
    padding: "12px 14px",
  },
  "& .MuiInputBase-multiline": {
    minHeight: "80px",
  },
})

const EntityCard = styled(Box)({
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "16px",
  borderLeft: "4px solid #2d7a7a",
  border: "1px solid #e6f2f2",
  boxShadow: "0 2px 8px rgba(45, 122, 122, 0.08)",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    borderLeftColor: "#1e5a5a",
    boxShadow: "0 4px 12px rgba(45, 122, 122, 0.15)",
  },
})

const HintText = styled(Typography)({
  fontFamily: "'Inter', sans-serif",
  fontSize: "13px",
  color: "#6bb6b6",
  marginTop: "-8px",
  marginBottom: "16px",
  lineHeight: 1.4,
})

const AddButton = styled(Button)({
  fontFamily: "'Inter', sans-serif",
  backgroundColor: "#f8fafa",
  color: "#4a4a4a",
  border: "1px solid #d1e7e7",
  padding: "8px 16px",
  borderRadius: "6px",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "none",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#fcfefe",
    borderColor: "#a3d5d5",
    color: "#1e5a5a",
  },
})

const GenerateButton = styled(Button)({
  fontFamily: "'Inter', sans-serif",
  backgroundColor: "#2d7a7a",
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
    backgroundColor: "#1e5a5a",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(45, 122, 122, 0.3)",
  },
  "&:disabled": {
    backgroundColor: "#e6f2f2",
    color: "#a3d5d5",
    cursor: "not-allowed",
  },
})

const ErrorMessage = styled(Typography)({
  fontFamily: "'Inter', sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  color: "#dc6545",
  textAlign: "center",
  margin: "20px 0",
  padding: "12px",
  backgroundColor: "#fef7f4",
  border: "1px solid #f4d4c7",
  borderRadius: "8px",
})

const DiagramResult = styled(Paper)({
  marginTop: "40px",
  padding: "24px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  border: "1px solid #e6f2f2",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
})

const DiagramResultTitle = styled(Typography)({
  fontFamily: "'Inter', sans-serif",
  fontSize: "24px",
  fontWeight: 600,
  color: "#1a1a1a",
  textAlign: "center",
  marginBottom: "24px",
})

const DiagramHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  flexWrap: "wrap",
  gap: "12px",
})

const DownloadButton = styled(Button)({
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
  backgroundColor: "#2d7a7a",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#1e5a5a",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(45, 122, 122, 0.3)",
  },
})

function DiagramPage() {
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
        <AccountTreeIcon sx={{ fontSize: "36px", color: "#2d7a7a" }} />
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
              backgroundColor: "#f8fafa",
              border: "1px solid #e6f2f2",
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
