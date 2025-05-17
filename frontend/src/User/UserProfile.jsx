import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  CircularProgress,
  Paper,
  Stack,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Edit, Lock, Email, Person, Description, CameraAlt } from '@mui/icons-material';
import DashboardLayout from './DashboardLayout';
import { styled } from '@mui/material/styles';

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#982b2b',
  '&:hover': {
    backgroundColor: '#7a2323',
  },
}));

const UserProfile = () => {
  const { user, authToken, login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    avatar: null,
    avatarUrl: '',
    bio: '',
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        // Construction de l'URL complète pour l'avatar
        let avatarUrl = '';
        if (response.data.avatar) {
          // Vérifie si l'avatar est déjà une URL complète
          if (response.data.avatar.startsWith('http')) {
            avatarUrl = response.data.avatar;
          } else {
            // Ajoute un timestamp pour éviter le cache
            avatarUrl = `http://localhost:8000/storage/${response.data.avatar}?${Date.now()}`;
          }
        }

        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          avatar: response.data.avatar || null,
          avatarUrl: avatarUrl,
          bio: response.data.bio || '',
          password: '',
          password_confirmation: '',
        });
      } catch (error) {
        console.error('Erreur lors de la récupération du profil :', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id && authToken) {
      fetchUser();
    }
  }, [user, authToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    if (formData.password) {
      data.append('password', formData.password);
      data.append('password_confirmation', formData.password_confirmation);
    }
    if (formData.avatar instanceof File) {
      data.append('avatar', formData.avatar);
    } else if (formData.avatar) {
      // Si c'est une chaîne (chemin existant), on l'envoie aussi
      data.append('avatar', formData.avatar);
    }
    data.append('bio', formData.bio);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/users/${user.id}?_method=PUT`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Mise à jour de l'URL de l'avatar après upload
      let updatedAvatarUrl = '';
      if (response.data.user.avatar) {
        if (response.data.user.avatar.startsWith('http')) {
          updatedAvatarUrl = response.data.user.avatar;
        } else {
          updatedAvatarUrl = `http://localhost:8000/storage/${response.data.user.avatar}?${Date.now()}`;
        }
      }

      login(authToken, response.data.user);
      setFormData(prev => ({
        ...prev,
        avatarUrl: updatedAvatarUrl,
        avatar: response.data.user.avatar,
        password: '',
        password_confirmation: ''
      }));

      alert('Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      if (error.response?.data?.errors) {
        alert(JSON.stringify(error.response.data.errors, null, 2));
      } else {
        alert("Une erreur s'est produite lors de la mise à jour.");
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        avatar: file,
        avatarUrl: previewUrl,
      }));
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress style={{ color: '#982b2b' }} />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              color: '#982b2b',
              fontWeight: 'bold',
              mb: 3,
            }}
          >
            Mon Profil
          </Typography>

          <Stack direction="column" alignItems="center" spacing={3}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={formData.avatarUrl}
                alt={formData.name}
                sx={{
                  width: 120,
                  height: 120,
                  border: '3px solid #982b2b',
                  fontSize: '3rem',
                  backgroundColor: formData.avatarUrl ? 'transparent' : '#982b2b',
                }}
              >
                {!formData.avatarUrl && formData.name.charAt(0).toUpperCase()}
              </Avatar>
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: '#982b2b',
                  '&:hover': {
                    backgroundColor: '#7a2323',
                  },
                }}
              >
                <CameraAlt sx={{ color: 'white' }} />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </IconButton>
            </Box>

            <Box component="form" onSubmit={handleSubmit} width="100%">
              <Stack spacing={3}>
                {/* Les autres champs du formulaire restent inchangés */}
                <TextField
                  label="Nom"
                  name="name"
                  fullWidth
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Mot de passe (laisser vide si inchangé)"
                  name="password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Confirmation du mot de passe"
                  name="password_confirmation"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Bio"
                  name="bio"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Description color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <ColorButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={updating}
                  startIcon={<Edit />}
                  sx={{ py: 1.5, mt: 2 }}
                >
                  {updating ? 'Mise à jour en cours...' : 'Mettre à jour mon profil'}
                </ColorButton>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </DashboardLayout>
  );
};

export default UserProfile;