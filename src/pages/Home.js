import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const features = [
  {
    title: 'Générateur de WOD',
    description: 'Génère un entraînement CrossFit aléatoire en fonction de ton style préféré.',
    link: '/wod',
    icon: (
      <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
        <path fill="#e63946" d="M20 13V11H8V9H6v6h2v-2h12z" />
      </svg>
    ),
    bg: '#f8f9fa',
  },
  {
    title: 'Nutrition',
    description: 'Des conseils diététiques adaptés aux athlètes CrossFit. Plans, astuces, recettes...',
    link: '/nutrition',
    icon: (
      <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
        <path fill="#e63946" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
      </svg>
    ),
    bg: '#f8f9fa',
  },
];

const Home = () => {
  return (
    <div className="home-container">
      {/* Video background */}
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/videos/demo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for readability */}
      <div className="overlay" />

      {/* Hero Content */}
      <div className="home-content">
        <h1>Train Like a Beast</h1>
        <p>Rejoins nos séances de CrossFit intensives et transforme ton corps</p>
        <button>Rejoins-nous</button>
      </div>

      {/* Features Section */}
      <div className="home-sections">
        {features.map((feature, index) => (
          <div className="card" key={index} style={{ backgroundColor: feature.bg }}>
            <div className="card-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <Link to={feature.link}>
              <button>Découvrir</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
