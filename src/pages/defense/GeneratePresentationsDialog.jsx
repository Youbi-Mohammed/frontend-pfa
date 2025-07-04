// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Typography,
//   Alert,
//   CircularProgress
// } from '@mui/material';
// import { generatePresentations } from '../../services/presentaionService';

// const GeneratePresentationsDialog = ({ open, onClose }) => {
//   const [formData, setFormData] = useState({
//     startDate: '',
//     roomNumber: 'BR49'
//   });
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setResult(null);

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('Token non trouvé');

//       const data = await generatePresentations(
//         formData.startDate,
//         formData.roomNumber,
//         token
//       );

//       if (!data) throw new Error('Réponse vide du serveur');

//       setResult(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setFormData({ startDate: '', roomNumber: 'BR49' });
//     setResult(null);
//     setError('');
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Générer les présentations</DialogTitle>
//       <DialogContent dividers>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Date de début"
//             type="date"
//             name="startDate"
//             value={formData.startDate}
//             onChange={handleChange}
//             fullWidth
//             required
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             label="Salle"
//             type="text"
//             name="roomNumber"
//             value={formData.roomNumber}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//           />

//           {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

//           {result && (
//             <Alert severity="success" sx={{ mt: 2 }}>
//               <Typography>Créées: {result.createdPresentations || 0}</Typography>
//               <Typography>Prochain créneau: {result.nextAvailableSlot || 'Non disponible'}</Typography>
//             </Alert>
//           )}
//         </form>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose} disabled={loading}>
//           Annuler
//         </Button>
//         <Button
//           onClick={handleSubmit}
//           variant="contained"
//           disabled={loading}
//           startIcon={loading && <CircularProgress size={20} />}
//         >
//           {loading ? 'Génération...' : 'Générer'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default GeneratePresentationsDialog;
// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Typography,
//   Alert,
//   CircularProgress,
//   DialogContentText
// } from '@mui/material';
// import { generatePresentations } from '../../services/presentaionService';
// import { LoadingButton } from '@mui/lab';

// const GeneratePresentationsDialog = ({ open, onClose }) => {
//   const [formData, setFormData] = useState({
//     startDate: '',
//     roomNumber: 'BR49'
//   });
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setResult(null);

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('Token non trouvé');

//       const data = await generatePresentations(
//         formData.startDate,
//         formData.roomNumber,
//         token
//       );

//       if (!data) throw new Error('Réponse vide du serveur');

//       setResult(data);
//       // Fermer le dialogue après un court délai pour montrer le succès
//       setTimeout(() => {
//         handleClose();
//       }, 1500);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     if (loading) return; // Empêche la fermeture pendant le chargement
    
//     setFormData({ startDate: '', roomNumber: 'BR49' });
//     setResult(null);
//     setError('');
//     onClose();
//   };

//   return (
//   <Dialog
//     open={open}
//     onClose={handleClose}
//     maxWidth="sm"
//     fullWidth
//     disableEscapeKeyDown={loading}
//   >
//     <DialogTitle>Generate Presentations</DialogTitle>
//     <DialogContent dividers>
//       <form id="presentation-form" onSubmit={handleSubmit}>
//         <TextField
//           label="Start Date"
//           type="date"
//           name="startDate"
//           value={formData.startDate}
//           onChange={handleChange}
//           fullWidth
//           required
//           margin="normal"
//           InputLabelProps={{ shrink: true }}
//           disabled={loading}
//         />
//         <TextField
//           label="Room"
//           type="text"
//           name="roomNumber"
//           value={formData.roomNumber}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           disabled={loading}
//         />

//         {error && (
//           <Alert severity="error" sx={{ mt: 2 }}>
//             {error}
//           </Alert>
//         )}

//         {result && (
//           <Alert severity="success" sx={{ mt: 2 }}>
//             {/* <Typography>Created: {result.createdPresentations || 0}</Typography>
//             <Typography>Next available slot: {result.nextAvailableSlot || 'Not available'}</Typography> */}
//           </Alert>
//         )}
//       </form>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={handleClose} disabled={loading}>
//         Cancel
//       </Button>
//       <LoadingButton
//         type="submit"
//         form="presentation-form"
//         variant="contained"
//         loading={loading}
//         loadingIndicator="Generating..."
//       >
//         Generate
//       </LoadingButton>
//     </DialogActions>
//   </Dialog>
// );

// };

// export default GeneratePresentationsDialog;
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
  CircularProgress
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { generatePresentations } from '../../services/presentaionService';

const GeneratePresentationsDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    roomNumber: 'BR49'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');

      const data = await generatePresentations(
        formData.startDate,
        formData.roomNumber,
        token
      );

      if (!data) throw new Error('Empty server response');

      setResult(data);
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;
    setFormData({ startDate: '', roomNumber: 'BR49' });
    setResult(null);
    setError('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={loading}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(45, 122, 122, 0.2)'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          backgroundColor: '#2D7A7A', 
          color: 'white',
          fontWeight: 'bold',
          padding: '16px 24px'
        }}
      >
        Generate Presentations
      </DialogTitle>
      
      <DialogContent dividers sx={{ padding: '24px' }}>
        <form id="presentation-form" onSubmit={handleSubmit}>
          <TextField
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
            disabled={loading}
            sx={{ mb: 3 }}
          />
          
          <TextField
            label="Room"
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={loading}
            sx={{ mb: 3 }}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Alert>
          )}

          {result && (
            <Alert severity="success" sx={{ mt: 2, mb: 2 }}>
              Presentations generated successfully!
            </Alert>
          )}
        </form>
      </DialogContent>
      
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button 
          onClick={handleClose} 
          disabled={loading}
          sx={{
            color: '#2D7A7A',
            '&:hover': {
              backgroundColor: 'rgba(45, 122, 122, 0.08)'
            }
          }}
        >
          Cancel
        </Button>
        
        <LoadingButton
          type="submit"
          form="presentation-form"
          variant="contained"
          loading={loading}
          loadingIndicator={<CircularProgress size={24} color="inherit" />}
          sx={{
            backgroundColor: '#2D7A7A',
            '&:hover': {
              backgroundColor: '#1E5F5F'
            },
            '&.Mui-disabled': {
              backgroundColor: '#A0BDBD'
            }
          }}
        >
          Generate
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default GeneratePresentationsDialog;