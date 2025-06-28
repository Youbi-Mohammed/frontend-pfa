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
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { pdf } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import './CDCViewer.css';

export default function CDCViewer() {
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateCDC = async (description) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/v1/cdc/generate', {
        method: 'POST',
        headers: { 
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
          // had authorisation au cas ou makanach mriglin cors w csrf dyal security f backend  w7ta permition end point                 || requestURI.equals("/api/v1/cdc/generate") ;

          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ description }),
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
    generateCDC('Application de gestion de projets');
  }, []);

  if (error) return <div className="error">Erreur : {error}</div>;

  return (
    <div className="cdc-container">
      <h1>Générateur de Cahier des Charges</h1>
      
      <div className="editor-preview">
        <div className="input-section">
          <h2>Description du projet</h2>
          <textarea
            placeholder="Décrivez votre projet en détail..."
            onChange={(e) => generateCDC(e.target.value)}
            rows={8}
          />
        </div>
        
        <div className="preview-section">
          <h2>Prévisualisation</h2>
          {isLoading ? (
            <div className="loading">
              <div className="spinner"></div>
              Génération en cours...
            </div>
          ) : (
            <div className="markdown-body">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  strong: ({node, ...props}) => <strong className="bold-text" {...props} />,
                  h1: ({node, ...props}) => <h1 className="title-h1" {...props} />,
                  h2: ({node, ...props}) => <h2 className="title-h2" {...props} />,
                  ul: ({node, ...props}) => <ul className="custom-list" {...props} />
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
      
      <button 
        onClick={handleExportPDF} 
        disabled={isLoading || !markdown}
        className={`export-button ${isLoading || !markdown ? 'disabled' : ''}`}
      >
        {isLoading ? 'Génération...' : 'Exporter en PDF'}
      </button>
    </div>
  );
}