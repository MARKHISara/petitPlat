import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  Link as MuiLink,
  Divider,
  InputAdornment,
  IconButton,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/system';
import Swal from 'sweetalert2';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#f8f8f8',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  backgroundColor: '#982b2b',
  '&:hover': {
    backgroundColor: '#7a2323',
  },
  padding: theme.spacing(1.5),
  borderRadius: '8px',
  fontWeight: 'bold',
}));

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: 'include',
      });
  
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        let errorMessage = 'Erreur lors de l\'inscription';
        if (data.errors) {
          errorMessage = Object.values(data.errors).flat().join(' ');
        }
        throw new Error(errorMessage);
      }
  
      register(data.token);
      
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Inscription réussie !',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#2b2b2b',
        color: '#ffffff',
      });
      
      navigate('/');
    } catch (err) {
      setError(err.message);
      
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: err.message,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        background: '#2b2b2b',
        color: '#ffffff',
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <Typography component="h1" variant="h4" color="#982b2b" fontWeight="bold">
          Inscription
        </Typography>
        
        <Typography variant="body2" color="textSecondary" align="center" mt={2}>
          Déjà un compte ?{' '}
          <MuiLink component={Link} to="/login" color="#982b2b" fontWeight="bold">
            Connectez-vous ici
          </MuiLink>
        </Typography>

        {error && (
          <Box mt={2} width="100%">
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        <StyledForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nom complet"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse e-mail"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password_confirmation"
            label="Confirmation du mot de passe"
            type={showConfirmPassword ? 'text' : 'password'}
            id="password_confirmation"
            autoComplete="new-password"
            value={formData.password_confirmation}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
          >
            S'inscrire
          </SubmitButton>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body2" color="textSecondary" align="center">
            En vous inscrivant, vous acceptez nos conditions d'utilisation.
          </Typography>
        </StyledForm>
      </StyledPaper>
    </Container>
  );
};

export default RegisterPage;