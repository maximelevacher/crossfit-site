import React, { useState } from 'react';
import MuscleMapFull from '../components/MuscleMap/MuscleMapFull';

const muscleExercises = {
  abs: ['Plank 30s', '20 crunchs', '15 leg raises'],
  pecs: ['20 push-ups', 'Incline press', 'Chest dips'],
  'biceps-left': ['Curl haltère', 'Chin-ups', 'Curl marteau'],
  'quads-left': ['20 squats', '15 fentes', 'Jump squats'],
  glutes: ['Hip thrusts', 'Glute bridge', 'Step-ups'],
  traps: ['Shrugs', 'Upright row'],
};

const getRandomWod = (exList) => [...exList].sort(() => 0.5 - Math.random()).slice(0, 3);

const Wod = () => {
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [wod, setWod] = useState([]);

  const handleSelect = (muscle) => {
    setSelectedMuscle(muscle);
    setWod(getRandomWod(muscleExercises[muscle] || []));
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Générateur de WOD par muscle</h1>
      <p>Sélectionne un muscle 👇</p>

      <MuscleMapFull onSelect={handleSelect} />

      {selectedMuscle && (
        <>
          <h2>Exercices pour : {selectedMuscle}</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {wod.map((w, i) => (
              <li key={i}>🔥 {w}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Wod;
