import React, { useState, useEffect } from 'react';
import MuscleMapFull from '../components/MuscleMap/MuscleMapFull';
import './Wod.css';
const MUSCLES = [
  "quads",
  "glutes",
  "pecs",
  "abs",
  "hamstrings",
  "triceps",
  "biceps",
  "lats",
  "calves",
  "obliques",
  "lower-back",
  // etc.
];

const WOD_PARTS = ['warmup', 'strength', 'metcon'];

const Wod = () => {
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [randomWod, setRandomWod] = useState(null);

  const handleMuscleSelect = (muscle) => {
    setSelectedMuscle(muscle);
    setRandomWod(null);
  };

  useEffect(() => {
    if (!selectedMuscle) return;

    fetch(`/exercises/${selectedMuscle}.txt`)
        .then((res) => res.text())
        .then((text) => {
          // Split by double newline for groups
          const blocks = text
              .split(/\n\s*\n/)
              .map(block => block.trim().split('\n').filter(Boolean));
          setExercises(blocks);
        })
        .catch(() => setExercises([]));
  }, [selectedMuscle]);

  const WOD_PARTS = ["warmup", "workout", "finisher"];

  const generateRandomWod = async () => {
    const selectedMuscle = MUSCLES[Math.floor(Math.random() * MUSCLES.length)];

    try {
      const res = await fetch(`/exercises/${selectedMuscle}.txt`);
      const text = await res.text();

      // découpe les groupes par \n\n
      const groups = text.split(/\n\s*\n/).map(block =>
          block.trim().split('\n').filter(Boolean)
      );

      if (groups.length === 0) return;

      const newWod = {};
      for (let part of WOD_PARTS) {
        const group = groups[Math.floor(Math.random() * groups.length)];
        const exercise = group[Math.floor(Math.random() * group.length)];
        newWod[part] = {
          muscle: selectedMuscle,
          exercise: exercise
        };
      }

      setRandomWod(newWod);
    } catch (err) {
      console.error("Failed to load WOD:", err);
      setRandomWod(null);
    }
  };

  return (
      <div className="wod-page">
        <div className="wod-container">
          <h2 className="wod-title">🔥 Generate Your WOD</h2>

          <button onClick={generateRandomWod} className="random-btn">
            🎲 Generate Full WOD
          </button>

          <h3 className="section-title">Or Select a Muscle</h3>

          <MuscleMapFull selectedMuscle={selectedMuscle} onSelect={handleMuscleSelect} />

          {selectedMuscle && (
              <div className="exercise-section">
                <div className="muscle-banner">
                  <span className="muscle-icon">💪</span>
                  <h3 className="muscle-label">{selectedMuscle.toUpperCase()}</h3>
                </div>

                <div className="exercise-vertical-layout">
                  {exercises.map((group, index) => (
                      <div key={index} className="exercise-vertical-card">
                        <div className="exercise-card-header">Group {index + 1}</div>
                        <ul className="exercise-list">
                          {group.map((exercise, idx) => (
                              <li key={idx} className="exercise-list-item">🏋️ {exercise}</li>
                          ))}
                        </ul>
                      </div>
                  ))}
                </div>
              </div>
          )}

          {randomWod && (
              <div className="random-wod">
                <h3>🔥 Full WOD:</h3>
                {WOD_PARTS.map((part) => (
                    <div key={part} className="wod-block">
                      <h4>{part.toUpperCase()}</h4>
                      <p>
                        <strong>{randomWod[part].exercise}</strong> ({randomWod[part].muscle})
                      </p>
                    </div>
                ))}
              </div>
          )}
        </div>
      </div>

  );
};

export default Wod;
