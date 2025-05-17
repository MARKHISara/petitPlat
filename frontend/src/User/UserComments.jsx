import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  Divider,
  Chip,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from './DashboardLayout';
import { EmojiEmotions, Comment, Restaurant } from '@mui/icons-material';

const UserComments = () => {
  const { authToken } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/my-recipes', {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: 'application/json',
          },
          withCredentials: true,
        });
        setRecipes(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des recettes :', error);
      }
    };

    if (authToken) {
      fetchMyRecipes();
    }
  }, [authToken]);

  return (
    <DashboardLayout>
      <Box p={isMobile ? 2 : 4}>
        <Box mb={4} display="flex" alignItems="center">
          <Restaurant sx={{ color: '#982b2b', fontSize: 40, mr: 2 }} />
          <Typography 
            variant="h4" 
            fontWeight="bold"
            sx={{
              color: '#982b2b',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            Commentaires sur mes recettes
          </Typography>
        </Box>

        {recipes.length === 0 ? (
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <EmojiEmotions sx={{ color: '#e27340', fontSize: 60, mb: 2 }} />
            <Typography variant="h6" color="#b0390e">
              Aucune recette trouvée
            </Typography>
            <Typography color="text.secondary">
              Vos recettes apparaîtront ici une fois créées
            </Typography>
          </Paper>
        ) : (
          recipes.map((recipe) => (
            <Card 
              key={recipe.id} 
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(152, 43, 43, 0.2)',
                }
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#b0390e',
                      fontWeight: 'bold'
                    }}
                  >
                    {recipe.title}
                  </Typography>
                  <Chip 
                    label={`${recipe.comments.length} commentaire(s)`}
                    color="primary"
                    size="small"
                    icon={<Comment />}
                    sx={{ 
                      backgroundColor: '#e27340',
                      color: 'white',
                    }}
                  />
                </Box>
                
                <Divider sx={{ 
                  mb: 3, 
                  borderColor: '#e27340',
                  opacity: 0.5
                }} />
                
                {recipe.comments.length === 0 ? (
                  <Box 
                    textAlign="center" 
                    p={2}
                    sx={{
                      backgroundColor: 'rgba(152, 43, 43, 0.05)',
                      borderRadius: 1
                    }}
                  >
                    <Typography color="#982b2b" fontStyle="italic">
                      Aucun commentaire pour cette recette
                    </Typography>
                  </Box>
                ) : (
                  recipe.comments.map((comment) => (
                    <Paper 
                      key={comment.id} 
                      elevation={0}
                      sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: 'rgba(226, 115, 64, 0.05)',
                      }}
                    >
                      <Box display="flex" alignItems="flex-start">
                        <Avatar 
                          sx={{ 
                            mr: 2,
                            bgcolor: '#982b2b',
                            color: 'white'
                          }}
                        >
                          {comment.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </Avatar>
                        <Box>
                          <Typography 
                            variant="subtitle2"
                            sx={{
                              color: '#b0390e',
                              fontWeight: 'bold'
                            }}
                          >
                            {comment.user?.name || 'Utilisateur inconnu'}
                          </Typography>
                          <Typography 
                            variant="body2"
                            sx={{
                              color: 'text.primary',
                              mt: 0.5
                            }}
                          >
                            {comment.content}
                          </Typography>
                          <Typography 
                            variant="caption"
                            sx={{
                              display: 'block',
                              mt: 1,
                              color: 'text.secondary',
                              fontStyle: 'italic'
                            }}
                          >
                            {new Date(comment.created_at).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  ))
                )}
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </DashboardLayout>
  );
};

export default UserComments;