import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Classes from './pages/Classes';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Nutrition from './pages/Nutrition';
import Wod from './pages/Wod';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/contact" element={<Contact />} />
		<Route path="/wod" element={<Wod />} />
		<Route path="/nutrition" element={<Nutrition />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
