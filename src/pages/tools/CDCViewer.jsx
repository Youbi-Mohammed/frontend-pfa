// import React, { useState, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import './CDCViewer.css';
// import { pdf } from '@react-pdf/renderer';
// import PDFDocument from './PDFDocument';
// import './CDCViewer.css';

// export default function CDCViewer() {
//   const [markdown, setMarkdown] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Ajoutez ce wrapper div pour les styles
//   const MarkdownWrapper = ({ children }) => (
//     <div className="markdown-body">
//       {children}
//     </div>
//   );
//   const router = createBrowserRouter([
//   {
//     path: "/tools/cdc",
//     element: <CDCViewer />
//   }]);

//   const generateCDC = async (description) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:8080/api/v1/cdc/generate', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ description })
//       });
      
//       if (!response.ok) throw new Error('Erreur API');
      
//       const data = await response.json();
//       setMarkdown(data.document);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Exemple d'utilisation
//   useEffect(() => {
//     generateCDC('Application de gestion de projets');
//   }, []);
//   // Et cette fonction
// const handleExportPDF = async () => {
//     try {
//       // 1. Créer le blob PDF
//       const blob = await pdf(<PDFDocument content={markdown} />).toBlob();
      
//       // 2. Créer un URL temporaire
//       const url = URL.createObjectURL(blob);
      
//       // 3. Créer un lien et déclencher le téléchargement
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `CDC_${new Date().toISOString().split('T')[0]}.pdf`;
//       document.body.appendChild(link);
//       link.click();
      
//       // 4. Nettoyer
//       setTimeout(() => {
//         document.body.removeChild(link);
//         URL.revokeObjectURL(url);
//       }, 100);
      
//     } catch (error) {
//       console.error("Erreur lors de l'export PDF:", error);
//       setError("Échec de l'export PDF");
//     }
//   };
//   if (error) return <div className="error">Erreur : {error}</div>;

//   return (
//     <div className="cdc-container">
//       <h1>Générateur de Cahier des Charges</h1>
      
//       <div className="editor-preview">
//         <div className="input-section">
//           <h2>Description du projet</h2>
//           <textarea
//             placeholder="Décrivez votre projet..."
//             onChange={(e) => generateCDC(e.target.value)}
//           />
//         </div>
        
//         <div className="preview-section">
//           <h2>Prévisualisation</h2>
//           {isLoading ? (
//             <div className="loading">Génération en cours...</div>
//           ) : (
//             <ReactMarkdown remarkPlugins={[remarkGfm]} className="markdown-body">
//               {markdown}
//             </ReactMarkdown>
//           )}

          
//         </div>
//       </div>
//       <button 
//         onClick={handleExportPDF} 
//         disabled={isLoading || !markdown}
//         className="export-button"
//       >
//         Exporter en PDF
//       </button>
//       <MarkdownWrapper>
//         <ReactMarkdown remarkPlugins={[remarkGfm]}>
//           {markdown}
//         </ReactMarkdown>
//       </MarkdownWrapper>
//     </div>
//   );
// }
//t7t ok
// import React, { useState, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import { pdf } from '@react-pdf/renderer';
// import PDFDocument from './PDFDocument';
// import './CDCViewer.css';

// export default function CDCViewer() {
//   const [markdown, setMarkdown] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const MarkdownWrapper = ({ children }) => (
//     <div className="markdown-body">
//       {children}
//     </div>
//   );

//  const generateCDC = async (description) => {
//   setIsLoading(true);
//   try {
//     const response = await fetch('http://localhost:8081/api/v1/cdc/generate', {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify({ description }),
//       mode: 'cors' // Explicitement activer CORS
//     });
    
//     if (!response.ok) throw new Error('Erreur API');
    
//     const data = await response.json();
//     setMarkdown(data.document);
//   } catch (err) {
//     setError(err.message);
//   } finally {
//     setIsLoading(false);
//   }
// };

//   useEffect(() => {
//     generateCDC('Application de gestion de projets');
//   }, []);

//   const handleExportPDF = async () => {
//     try {
//       const blob = await pdf(<PDFDocument content={markdown} />).toBlob();
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `CDC_${new Date().toISOString().split('T')[0]}.pdf`;
//       document.body.appendChild(link);
//       link.click();
      
//       setTimeout(() => {
//         document.body.removeChild(link);
//         URL.revokeObjectURL(url);
//       }, 100);
      
//     } catch (error) {
//       console.error("Erreur lors de l'export PDF:", error);
//       setError("Échec de l'export PDF");
//     }
//   };

//   if (error) return <div className="error">Erreur : {error}</div>;

//   return (
//     <div className="cdc-container">
//       <h1>Générateur de Cahier des Charges</h1>
      
//       <div className="editor-preview">
//         <div className="input-section">
//           <h2>Description du projet</h2>
//           <textarea
//             placeholder="Décrivez votre projet..."
//             onChange={(e) => generateCDC(e.target.value)}
//           />
//         </div>
        
//         <div className="preview-section">
//           <h2>Prévisualisation</h2>
//           {isLoading ? (
//             <div className="loading">Génération en cours...</div>
//           ) : (
//             <MarkdownWrapper>
//               <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                 {markdown}
//               </ReactMarkdown>
//             </MarkdownWrapper>
//           )}
//         </div>
//       </div>
      
//       <button 
//         onClick={handleExportPDF} 
//         disabled={isLoading || !markdown}
//         className="export-button"
//       >
//         Exporter en PDF
//       </button>
//     </div>
//   );
// }
//fou9ok 
// import React, { useState, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import { pdf } from '@react-pdf/renderer';
// import PDFDocument from './PDFDocument';
// import './CDCViewer.css';

// export default function CDCViewer() {
//   const [markdown, setMarkdown] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const generateCDC = async (description) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:8080/api/v1/cdc/generate', {
//         method: 'POST',
//         headers: { 
//           // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           // had authorisation au cas ou makanach mriglin cors w csrf dyal security f backend  w7ta permition end point                 || requestURI.equals("/api/v1/cdc/generate") ;

//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({ description }),
//         mode: 'cors'
//       });
      
//       if (!response.ok) throw new Error('Erreur API');
      
//       const data = await response.json();
//       setMarkdown(data.document);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleExportPDF = async () => {
//     try {
//       const blob = await pdf(<PDFDocument content={markdown} />).toBlob();
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `CDC_${new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')}.pdf`;
//       document.body.appendChild(link);
//       link.click();
      
//       setTimeout(() => {
//         document.body.removeChild(link);
//         URL.revokeObjectURL(url);
//       }, 100);
//     } catch (error) {
//       console.error("Erreur lors de l'export PDF:", error);
//       setError("Échec de l'export PDF");
//     }
//   };

//   useEffect(() => {
//     generateCDC('Application de gestion de projets');
//   }, []);

//   if (error) return <div className="error">Erreur : {error}</div>;

//   return (
//     <div className="cdc-container">
//       <h1>Générateur de Cahier des Charges</h1>
      
//       <div className="editor-preview">
//         <div className="input-section">
//           <h2>Description du projet</h2>
//           <textarea
//             placeholder="Décrivez votre projet en détail..."
//             onChange={(e) => generateCDC(e.target.value)}
//             rows={8}
//           />
//         </div>
        
//         <div className="preview-section">
//           <h2>Prévisualisation</h2>
//           {isLoading ? (
//             <div className="loading">
//               <div className="spinner"></div>
//               Génération en cours...
//             </div>
//           ) : (
//             <div className="markdown-body">
//               <ReactMarkdown 
//                 remarkPlugins={[remarkGfm]}
//                 components={{
//                   strong: ({node, ...props}) => <strong className="bold-text" {...props} />,
//                   h1: ({node, ...props}) => <h1 className="title-h1" {...props} />,
//                   h2: ({node, ...props}) => <h2 className="title-h2" {...props} />,
//                   ul: ({node, ...props}) => <ul className="custom-list" {...props} />
//                 }}
//               >
//                 {markdown}
//               </ReactMarkdown>
//             </div>
//           )}
//         </div>
//       </div>
      
//       <button 
//         onClick={handleExportPDF} 
//         disabled={isLoading || !markdown}
//         className={`export-button ${isLoading || !markdown ? 'disabled' : ''}`}
//       >
//         {isLoading ? 'Génération...' : 'Exporter en PDF'}
//       </button>
//     </div>
//   );
// }
//t7t mzian
// import React, { useState, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import { pdf } from '@react-pdf/renderer';
// import PDFDocument from './PDFDocument';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   CircularProgress,
//   TextField,
//   Box,
//   Typography,
//   Snackbar,
//   Alert,
//   useTheme,
//   IconButton
// } from '@mui/material';
// import { Close as CloseIcon, Download as DownloadIcon } from '@mui/icons-material';

// const CDCViewer = ({ open, onClose }) => {
//   const theme = useTheme();
//   const [markdown, setMarkdown] = useState('');
//   const [description, setDescription] = useState('Application de gestion de projets');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const generateCDC = async (desc) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:8080/api/v1/cdc/generate', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({ description: desc }),
//         mode: 'cors'
//       });
      
//       if (!response.ok) throw new Error('Erreur API');
      
//       const data = await response.json();
//       setMarkdown(data.document);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleExportPDF = async () => {
//     try {
//       const blob = await pdf(<PDFDocument content={markdown} />).toBlob();
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `CDC_${new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')}.pdf`;
//       document.body.appendChild(link);
//       link.click();
      
//       setTimeout(() => {
//         document.body.removeChild(link);
//         URL.revokeObjectURL(url);
//       }, 100);
//     } catch (error) {
//       console.error("Erreur lors de l'export PDF:", error);
//       setError("Échec de l'export PDF");
//     }
//   };

//   useEffect(() => {
//     if (open) {
//       generateCDC(description);
//     }
//   }, [open]);

//   const handleClose = () => {
//     setMarkdown('');
//     setError(null);
//     onClose();
//   };

//   return (
//     <>
//       <Dialog 
//         open={open} 
//         onClose={handleClose} 
//         fullWidth 
//         maxWidth="lg"
//         PaperProps={{
//           sx: {
//             height: '80vh'
//           }
//         }}
//       >
//         <DialogTitle sx={{ 
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           bgcolor: theme.palette.primary.main,
//           color: theme.palette.common.white
//         }}>
//           Générateur de Cahier des Charges
//           <IconButton onClick={handleClose} sx={{ color: theme.palette.common.white }}>
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
        
//         <DialogContent dividers sx={{ display: 'flex', p: 0 }}>
//           <Box sx={{ 
//             width: '50%', 
//             p: 3,
//             borderRight: `1px solid ${theme.palette.divider}`
//           }}>
//             <Typography variant="h6" gutterBottom>
//               Description du projet
//             </Typography>
//             <TextField
//               fullWidth
//               multiline
//               minRows={10}
//               maxRows={15}
//               value={description}
//               onChange={(e) => {
//                 setDescription(e.target.value);
//                 generateCDC(e.target.value);
//               }}
//               variant="outlined"
//               placeholder="Décrivez votre projet en détail..."
//             />
//           </Box>
          
//           <Box sx={{ 
//             width: '50%', 
//             p: 3,
//             overflow: 'auto',
//             bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50]
//           }}>
//             <Typography variant="h6" gutterBottom>
//               Prévisualisation
//             </Typography>
//             {isLoading ? (
//               <Box sx={{ 
//                 display: 'flex', 
//                 justifyContent: 'center', 
//                 alignItems: 'center',
//                 height: '100%'
//               }}>
//                 <CircularProgress sx={{ mr: 2 }} />
//                 <Typography>Génération en cours...</Typography>
//               </Box>
//             ) : (
//               <ReactMarkdown 
//                 remarkPlugins={[remarkGfm]}
//                 components={{
//                   strong: ({node, ...props}) => <strong style={{ color: theme.palette.warning.main }} {...props} />,
//                   h1: ({node, ...props}) => <h1 style={{ 
//                     fontSize: '2em',
//                     borderBottom: `1px solid ${theme.palette.divider}`,
//                     paddingBottom: theme.spacing(1)
//                   }} {...props} />,
//                   h2: ({node, ...props}) => <h2 style={{ 
//                     fontSize: '1.5em',
//                     borderBottom: `1px solid ${theme.palette.divider}`,
//                     paddingBottom: theme.spacing(1)
//                   }} {...props} />,
//                   ul: ({node, ...props}) => <ul style={{ paddingLeft: theme.spacing(4) }} {...props} />
//                 }}
//               >
//                 {markdown}
//               </ReactMarkdown>
//             )}
//           </Box>
//         </DialogContent>
        
//         <DialogActions sx={{ p: 2 }}>
//           <Button 
//             onClick={handleClose}
//             color="secondary"
//           >
//             Annuler
//           </Button>
//           <Button
//             onClick={handleExportPDF}
//             disabled={isLoading || !markdown}
//             variant="contained"
//             color="primary"
//             startIcon={isLoading ? <CircularProgress size={20} /> : <DownloadIcon />}
//           >
//             {isLoading ? 'Génération...' : 'Exporter PDF'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={!!error}
//         autoHideDuration={6000}
//         onClose={() => setError(null)}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert 
//           severity="error"
//           onClose={() => setError(null)}
//         >
//           {error}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default CDCViewer;
//fou9 mzian
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { pdf } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  TextField,
  Box,
  Typography,
  Snackbar,
  Alert,
  useTheme,
  IconButton
} from '@mui/material';
import { Close as CloseIcon, Download as DownloadIcon } from '@mui/icons-material';

const CDCViewer = () => {  // Retirez les props open/onClose
  const theme = useTheme();
  const [markdown, setMarkdown] = useState('');
  const [description, setDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true);  // Contrôle local de l'ouverture

  const generateCDC = async (desc) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/v1/cdc/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ description: desc }),
        mode: 'cors'
      });
      
      if (!response.ok) throw new Error('Erreur API');
      
      const data = await response.json();
      setMarkdown(data.document);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      const blob = await pdf(<PDFDocument content={markdown} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `CDC_${new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Erreur lors de l'export PDF:", error);
      setError("Échec de l'export PDF");
    }
  };

  useEffect(() => {
    generateCDC(description);
  }, []);

  const handleClose = () => {
    setMarkdown('');
    setError(null);
    setOpen(false);  // Fermeture locale
    // Ajoutez ici une navigation si nécessaire (ex: navigate('/'))
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth 
      maxWidth="lg"
      PaperProps={{
        sx: {
          height: '80vh',
          borderRadius: 2
        }
      }}
    >
      {/* Le reste du code reste identique */}
      {/* <DialogTitle sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: 'primary.main',  
        color: 'common.white',
        py: 2,
        px: 3
      }}> */}
      <DialogTitle sx={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(to right, #424242, #303030)'
    : 'linear-gradient(to right, #f5f5f5, #e0e0e0)',
  color: theme.palette.mode === 'dark' ? '#ffffff' : 'rgba(0, 0, 0, 0.87)',
  py: 2,
  px: 3,
  boxShadow: theme.shadows[1]
}}>
        <Typography variant="h6" fontWeight="medium"
        color="#2D7A7A">
          Specifications Generator
        </Typography>
        <IconButton onClick={handleClose} sx={{ color:" #2D7A7A" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ 
        display: 'flex', 
        p: 0,
        '&.MuiDialogContent-dividers': {
          borderTop: `1px solid ${theme.palette.divider}`,
          borderBottom: `1px solid ${theme.palette.divider}`
        }
      }}>
        <Box sx={{ 
          width: '33%', 
          p: 3,
          borderRight: `1px solid ${theme.palette.divider}`,
          backgroundColor: 'background.paper'
        }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Project Description
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={12}
            maxRows={15}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              generateCDC(e.target.value);
            }}
            variant="outlined"
            placeholder="Veuillez décrire votre projet en détail. Le cahier des charges sera généré en français"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'divider'
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main'
                }
              }
            }}
          />
        </Box>
        
        <Box sx={{ 
          width: '67%', 
          p: 3,
          overflow: 'auto',
          backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50'
        }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Preview
          </Typography>
          {isLoading ? (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              height: '100%'
            }}>
              <CircularProgress size={24} sx={{ mr: 2 }} />
              <Typography>Generation in progress...</Typography>
            </Box>
          ) : (
            <Box sx={{
              '& h1': {
                fontSize: '1.8rem',
                borderBottom: `1px solid ${theme.palette.divider}`,
                pb: 1,
                mb: 2,
                color: 'text.primary'
              },
              '& h2': {
                fontSize: '1.5rem',
                borderBottom: `1px solid ${theme.palette.divider}`,
                pb: 1,
                mb: 2,
                color: 'text.primary'
              },
              '& strong': {
                color: 'warning.main',
                fontWeight: 600
              },
              '& ul': {
                pl: 4,
                mb: 2
              },
              '& li': {
                mb: 1
              }
            }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
              </ReactMarkdown>
            </Box>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ 
        p: 2,
        justifyContent: 'space-between',
        backgroundColor: 'background.default'
      }}>
        <Button 
          onClick={handleClose}
          variant="text"
          color="inherit"
          sx={{
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
        >
          Fermer
        </Button>
        <Button
  onClick={handleExportPDF}
  disabled={isLoading || !markdown}
  variant="contained"
  sx={{
    minWidth: 120,
    backgroundColor: '#2D7A7A', // Bleu Material-UI par défaut
    color: 'white',
    '&:hover': {
      backgroundColor: '#1565c0', // Bleu plus foncé au survol
    },
    '&.Mui-disabled': {
      backgroundColor: '#e0e0e0',
      color: '#9e9e9e'
    }
  }}
  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
>
  {isLoading ? 'Generating' : 'Export as PDF'}
</Button>
      </DialogActions>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="error"
          onClose={() => setError(null)}
          sx={{
            width: '100%',
            boxShadow: theme.shadows[3]
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default CDCViewer;