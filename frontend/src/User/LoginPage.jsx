import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
          withCredentials: true, // C'est essentiel pour Sanctum
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Connexion</h2>

      <div className="text-center mb-4">
        <span>Pas encore de compte ? </span>
        <Link to="/register" className="text-blue-500 hover:text-orange-500">
          Créez-en un ici
        </Link>
      </div>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Adresse e-mail"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-orange-500">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
