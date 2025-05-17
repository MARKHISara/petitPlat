import React, { useState } from 'react';
import axios from 'axios';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Alert, 
  Paper,
  Divider,
  useTheme
} from '@mui/material';
import { Category, Dashboard, RestaurantMenu } from '@mui/icons-material';
import DashboardLayout from './DashboardLayout';


const AddCategory = () => {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/categories', {
        name,
      }, {
        withCredentials: true,
      });

      setSuccess(`Catégorie "${response.data.name}" ajoutée avec succès !`);
      setName('');
    } catch (err) {
      if (err.response?.data?.errors) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        setError(firstError);
      } else {
        setError("Erreur lors de l'ajout de la catégorie.");
      }
    }
  };

  return (
    <DashboardLayout>
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="80vh"
      sx={{
        background: 'linear-gradient(to bottom, rgba(152,43,43,0.05) 0%, rgba(255,255,255,1) 100%)',
        p: 2
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          maxWidth: 500, 
          width: '100%', 
          p: 4,
          borderRadius: 3,
          borderTop: `4px solid #982b2b`
        }}
      >
        <Box display="flex" alignItems="center" mb={3}>
          <RestaurantMenu 
            sx={{ 
              color: '#982b2b', 
              fontSize: 32, 
              mr: 2 
            }} 
          />
          <Typography 
            variant="h4" 
            component="h1"
            sx={{
              color: '#982b2b',
              fontWeight: 'bold',
              fontFamily: theme.typography.fontFamily
            }}
          >
            Nouvelle Catégorie
          </Typography>
        </Box>

        <Divider sx={{ 
          mb: 3, 
          borderColor: 'rgba(152, 43, 43, 0.2)' 
        }} />

        {success && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3,
              backgroundColor: 'rgba(46, 125, 50, 0.1)',
              color: '#2e7d32'
            }}
          >
            {success}
          </Alert>
        )}

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              backgroundColor: 'rgba(211, 47, 47, 0.1)',
              color: '#d32f2f'
            }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nom de la catégorie"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <Category 
                  sx={{ 
                    color: '#e27340', 
                    mr: 1 
                  }} 
                />
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(152, 43, 43, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: '#982b2b',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#982b2b',
                },
              },
              mb: 3
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              backgroundColor: '#982b2b',
              color: 'white',
              py: 1.5,
              '&:hover': {
                backgroundColor: '#7a2222',
                boxShadow: '0 3px 5px rgba(152, 43, 43, 0.3)'
              },
              transition: 'all 0.3s ease',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            Créer la Catégorie
          </Button>
        </form>
      </Paper>
    </Box>
    </DashboardLayout>
  );
};

export default AddCategory;