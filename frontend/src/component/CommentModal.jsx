import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Filter, Star, Clock, Flame, MessageCircle, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';

const CommentModal = ({ comments, setComments, recipeId }) => {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // 👈 si auth via token stocké
      const res = await axios.post('http://localhost:8000/api/recipes/comments', {
        content: newComment,
        recipe_id: recipeId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComments(prev => [res.data.comment, ...prev]);
      setNewComment("");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Impossible d'ajouter le commentaire.");
    } finally {
      setLoading(false);
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

        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Écrire un commentaire..."
            className="w-full p-3 border border-[#f0e0d6] rounded-lg resize-none focus:ring-2 focus:ring-[#e27340] text-sm text-[#5a3921]"
            rows={3}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-gradient-to-r from-[#e27340] to-[#b0390e] px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity shadow-md w-full"
          >
            {loading ? "Envoi..." : "Ajouter le commentaire"}
          </button>
        </form>

        <div className="max-h-64 overflow-y-auto space-y-4 pr-2">
          {comments.length > 0 ? comments.map(c => (
            <div key={c.id} className="border-b border-[#f0e0d6] pb-3 last:border-0">
              <p className="text-sm font-medium text-[#5a3921]">{c.user?.name}</p>
              <p className="text-sm text-[#7a5c44] mt-1">{c.content}</p>
            </div>
          )) : (
            <p className="text-center text-[#982b2b] py-4">Aucun commentaire pour le moment</p>
          )}
        </div>

        <Dialog.Close className="mt-6 w-full bg-gradient-to-r from-[#e27340] to-[#b0390e] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-white font-medium shadow-md">
          Fermer
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default CommentModal