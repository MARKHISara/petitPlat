import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Filter, Clock, Flame, MessageCircle, ChevronDown, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Footer from './Footer';

// Composant Toast pour les notifications
const Toast = ({ message, type = 'info', onClose }) => {
  const bgColors = {
    info: 'bg-[#e27340] text-white',
    success: 'bg-[#4CAF50] text-white',
    error: 'bg-[#982b2b] text-white',
  };

  const icons = {
    info: <Flame className="w-5 h-5" />,
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`fixed bottom-4 right-4 ${bgColors[type]} px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 max-w-xs`}
    >
      {icons[type]}
      <span className="text-sm">{message}</span>
      <button onClick={onClose} className="ml-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
};

const CommentModal = ({ recipeId, onCommentAdded }) => {
  const { authToken, user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [recipeId]);

  const fetchComments = () => {
    axios.get(`http://localhost:8000/api/recipes/${recipeId}/comments`)
      .then(res => setComments(res.data))
      .catch(console.error);
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !authToken) return;

    setIsSubmitting(true);
    try {
      await axios.post(
        'http://localhost:8000/api/recipes/comments',
        {
          content: newComment,
          recipe_id: recipeId
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        }
      );
      setNewComment('');
      fetchComments();
      onCommentAdded?.();
      showToast('Commentaire ajouté avec succès!', 'success');
    } catch (err) {
      console.error('Erreur lors de l\'ajout du commentaire:', err);
      showToast("Erreur lors de l'ajout du commentaire", 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-2xl border border-[#f0e0d6]">
        <Dialog.Title className="text-xl font-bold mb-4 text-[#982b2b] flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Commentaires
        </Dialog.Title>
        
        <div className="max-h-64 overflow-y-auto space-y-4 pr-2 mb-4">
          {comments.length > 0 ? comments.map(c => (
            <div key={c.id} className="border-b border-[#f0e0d6] pb-3 last:border-0">
              <p className="text-sm font-medium text-[#5a3921]">{c.user?.name}</p>
              <p className="text-sm text-[#7a5c44] mt-1">{c.content}</p>
            </div>
          )) : (
            <p className="text-center text-[#982b2b] py-4">Aucun commentaire pour le moment</p>
          )}
        </div>

        {authToken ? (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="flex-1 px-4 py-2 border border-[#f0e0d6] rounded-lg focus:ring-2 focus:ring-[#e27340] focus:border-transparent"
              disabled={isSubmitting}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="p-2 bg-gradient-to-r from-[#e27340] to-[#b0390e] text-white rounded-lg hover:shadow-md disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </form>
        ) : (
          <p className="text-center text-[#5a3921] py-2">
            <Link to="/login" className="text-[#982b2b] hover:underline font-medium">
              Connectez-vous
            </Link> pour commenter
          </p>
        )}

        <Dialog.Close className="mt-4 w-full bg-gradient-to-r from-[#e27340] to-[#b0390e] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-white font-medium shadow-md">
          Fermer
        </Dialog.Close>
      </Dialog.Content>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </Dialog.Portal>
  );
};

const RecipeCard = ({ recipe }) => {
  const [comments, setComments] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(recipe.likes_count || 0);
  const [toast, setToast] = useState(null);
  const { authToken, user } = useAuth();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/recipes/${recipe.id}/comments`)
      .then(res => {
        setComments(res.data);
        setCommentCount(res.data.length);
      })
      .catch(console.error);

    if (authToken) {
      checkIfLiked();
    }
  }, [recipe.id, authToken]);

  const checkIfLiked = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/my-likes', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
      const userLikes = response.data;
      setIsLiked(userLikes.some(like => like.recipe_id === recipe.id));
    } catch (error) {
      console.error('Error checking likes:', error);
    }
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleLike = async () => {
    if (!authToken) {
      showToast('Veuillez vous connecter pour liker cette recette', 'info');
      return;
    }

    try {
      if (isLiked) {
        await axios.delete(
          `http://localhost:8000/api/recipes/${recipe.id}/unlike`, 
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            }
          }
        );
        setIsLiked(false);
        setLikeCount(prev => prev - 1);
        showToast('Like retiré avec succès', 'success');
      } else {
        await axios.post(
          `http://localhost:8000/api/recipes/${recipe.id}/like`, 
          {}, 
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
        showToast('Recette likée avec succès!', 'success');
      }
    } catch (error) {
      console.error('Error updating like:', error);
      if (error.response) {
        showToast(
          error.response.data.message || 
          error.response.data.error || 
          'Une erreur est survenue',
          'error'
        );
      } else {
        showToast('Problème de connexion au serveur', 'error');
      }
    }
  };

  const handleCommentAdded = () => {
    setCommentCount(prev => prev + 1);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all flex flex-col border-t-4 border-[#982b2b] group hover:shadow-xl"
      >
        <div className="relative overflow-hidden">
          <img 
            src={`http://localhost:8000/storage/${recipe.image}`} 
            alt={recipe.title} 
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity ${isHovered ? 'opacity-100' : 'opacity-80'}`} />
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <h3 className="text-xl font-bold text-white drop-shadow-lg">{recipe.title}</h3>
            <div className="flex items-center gap-3 text-xs text-white/90 mt-1">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recipe.duration} min</span>
              <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> {recipe.difficulty}</span>
              <span>👥 {recipe.portions} pers</span>
            </div>
          </div>
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {recipe.ingredients?.slice(0, 100)}...
          </p>
          
          <div className="mt-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLike}
                className="flex items-center gap-1 text-sm font-medium hover:text-[#b0390e] transition-colors"
              >
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  className={`${isLiked ? 'text-[#b0390e] fill-[#b0390e]' : 'text-[#5a3921]'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path 
                      stroke="currentColor" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
                      fill={isLiked ? 'currentColor' : 'none'}
                    />
                  </svg>
                </motion.div>
                <span>{likeCount}</span>
              </button>
              
              <Dialog.Root>
                <Dialog.Trigger className="flex items-center gap-1 text-sm font-medium text-[#5a3921] hover:text-[#b0390e] transition-colors">
                  <MessageCircle className="w-4 h-4" /> 
                  <span>{commentCount} {commentCount === 1 ? 'commentaire' : 'commentaires'}</span>
                </Dialog.Trigger>
                <CommentModal recipeId={recipe.id} onCommentAdded={handleCommentAdded} />
              </Dialog.Root>
            </div>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`/recipes/${recipe.id}`}
              className="px-4 py-2 bg-gradient-to-r from-[#982b2b] to-[#b0390e] text-white text-sm font-medium rounded-lg hover:shadow-md transition-all"
            >
              Voir la recette
            </motion.a>
          </div>
        </div>
      </motion.div>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </>
  );
};

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipesRes, categoriesRes] = await Promise.all([
          axios.get('http://localhost:8000/api/recipes'),
          axios.get('http://localhost:8000/api/categories')
        ]);
        setRecipes(recipesRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        setError("Erreur lors du chargement des données");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedCategory ? recipe.category_id == selectedCategory : true)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f9f4f1]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#982b2b]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f9f4f1]">
        <div className="text-center p-6 bg-white rounded-lg max-w-md border border-[#f0e0d6] shadow-md">
          <h3 className="text-xl font-medium text-[#982b2b] mb-2">Erreur de chargement</h3>
          <p className="text-[#7a5c44] mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gradient-to-r from-[#e27340] to-[#b0390e] text-white rounded-lg hover:shadow-md"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f9f4f1] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#982b2b] mb-3">Découvrez nos délicieuses recettes</h1>
          <p className="text-lg text-[#7a5c44] max-w-2xl mx-auto">Trouvez l'inspiration pour votre prochain repas parmi nos créations gourmandes</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
          <div className="relative w-full md:w-2/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-[#982b2b] w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Rechercher une recette..."
              value={search}
              onChange={(e => setSearch(e.target.value))}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#f0e0d6] bg-white shadow-sm focus:ring-2 focus:ring-[#982b2b] text-[#5a3921] placeholder-[#a78b75]"
            />
          </div>
          
          <div className="relative w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl shadow-sm text-[#5a3921] font-medium hover:bg-[#f0e0d6] transition-colors w-full justify-center border border-[#f0e0d6]">
              <Filter className="w-5 h-5 text-[#982b2b]" />
              <span>Filtrer</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mb-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide px-1">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              !selectedCategory
                ? 'bg-gradient-to-r from-[#982b2b] to-[#b0390e] text-white shadow-md'
                : 'bg-white text-[#5a3921] hover:bg-[#f0e0d6] border border-[#f0e0d6]'
            }`}
          >
            Toutes
          </motion.button>

          {categories.map(cat => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory == cat.id
                  ? 'bg-gradient-to-r from-[#982b2b] to-[#b0390e] text-white shadow-md'
                  : 'bg-white text-[#5a3921] hover:bg-[#f0e0d6] border border-[#f0e0d6]'
              }`}
            >
              {cat.name}
            </motion.button>
          ))}
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-[#f0e0d6] shadow-sm">
            <div className="text-[#b0390e] text-5xl mb-4">🍳</div>
            <h3 className="text-xl font-medium text-[#982b2b] mb-2">Aucune recette trouvée</h3>
            <p className="text-[#7a5c44]">Essayez de modifier vos critères de recherche</p>
            <button 
              onClick={() => { setSearch(''); setSelectedCategory(null); }}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-[#e27340] to-[#b0390e] text-white rounded-lg hover:shadow-md"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default RecipeList;