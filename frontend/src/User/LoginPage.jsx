import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/system';

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

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Obtenir le cookie CSRF
      await fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: 'include',
      });

      // Requête de connexion
      const response = await axios.post(
        'http://localhost:8000/api/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        }
      );

      const { token, user } = response.data;

      // Connexion côté context
      login(token, user);

      // Notification succès
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `Bienvenue ${user.name}`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#2b2b2b',
        color: '#ffffff',
      });

      navigate('/');
    } catch (error) {
      // Gestion des erreurs Laravel
      let message = 'Échec de la connexion. Veuillez réessayer.';

      if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        message = Object.values(errors).flat().join(' ');
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }

      setError(message);

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: message,
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
          Connexion
        </Typography>
        
        <Typography variant="body2" color="textSecondary" align="center" mt={2}>
          Pas encore de compte ?{' '}
          <MuiLink component={Link} to="/register" color="#982b2b" fontWeight="bold">
            Créez-en un ici
          </MuiLink>
        </Typography>

        {error && (
          <Box mt={2} width="100%">
            <Typography color="error" align="center">
              {error}
            </Typography>
          </Box>
        )}

        <StyledForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse e-mail"
            name="email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
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
          
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
          >
            Se connecter
          </SubmitButton>
          
          <Divider sx={{ my: 2 }} />
          
          <Box textAlign="center" mt={2}>
            <MuiLink component={Link} to="/forgot-password" color="#982b2b" fontWeight="bold">
              Mot de passe oublié ?
            </MuiLink>
          </Box>
        </StyledForm>
      </StyledPaper>
    </Container>
  );
};

export default LoginPage;