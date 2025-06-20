import React, { useState } from 'react';

const WodGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [wod, setWod] = useState('');
  const [error, setError] = useState(null);

  const generateWod = async () => {
    setLoading(true);
    setError(null);
    setWod('');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: ``, // <-- replace this
        },
        body: JSON.stringify({
          model: 'gpt-4.1',
          messages: [
            {
              role: 'user',
              content: 'Write a one-sentence bedtime story about a unicorn.',
            },
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const message = data.choices?.[0]?.message?.content;

      if (message) {
        setWod(message.trim());
      } else {
        setError(message);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to generate WOD.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wod-container">
      <h2>Workout of the Day</h2>
      <button onClick={generateWod} disabled={loading}>
        {loading ? 'Generating...' : 'Generate WOD'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {wod && (
        <pre className="wod-output">{wod}</pre>
      )}
    </div>
  );
};

export default WodGenerator;
