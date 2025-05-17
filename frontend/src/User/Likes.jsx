import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from './DashboardLayout';
import { Flame, Heart } from 'lucide-react'; // Import des icônes

const Likes = () => {
  const { authToken } = useAuth();
  const [likesSummary, setLikesSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikesSummary = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/recipes/likes-summary', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (Array.isArray(response.data)) {
          setLikesSummary(response.data);
        } else {
          console.warn('La réponse n\'est pas un tableau');
          setLikesSummary([]);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des likes :', error);
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchLikesSummary();
    } else {
      setLoading(false);
    }
  }, [authToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e27340]"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Flame className="w-8 h-8 text-[#b0390e]" />
          <h2 className="text-2xl font-bold text-[#982b2b]">Vos recettes favorites</h2>
        </div>

        {likesSummary.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-[#f0e0d6] shadow-sm">
            <Heart className="w-12 h-12 mx-auto text-[#e27340] mb-4" />
            <h3 className="text-xl font-medium text-[#982b2b] mb-2">Pas encore de likes</h3>
            <p className="text-[#7a5c44]">Vos recettes n'ont pas encore reçu de j'aime</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {likesSummary.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-lg border-t-4 border-[#e27340] hover:shadow-xl transition-shadow"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-[#5a3921]">{item.recipe_title}</h3>
                    <div className="flex items-center bg-[#f9f4f1] px-3 py-1 rounded-full">
                      <Heart className="w-4 h-4 text-[#b0390e] mr-1" />
                      <span className="text-sm font-medium text-[#982b2b]">
                        {item.likes_count} {item.likes_count > 1 ? 'likes' : 'like'}
                      </span>
                    </div>
                  </div>

                  {item.liked_by.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[#f0e0d6]">
                      <p className="text-sm font-medium text-[#5a3921] mb-2">Appréciée par :</p>
                      <div className="flex flex-wrap gap-2">
                        {item.liked_by.map((name, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 bg-[#f9f4f1] text-[#7a5c44] rounded-full text-sm"
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Likes;