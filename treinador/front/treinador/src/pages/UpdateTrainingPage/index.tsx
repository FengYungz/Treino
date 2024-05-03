import React, { useState } from 'react';
import axios from 'axios';

const UpdateTrainingPage: React.FC = () => {
  const [trainerId, setTrainerId] = useState('');
  const [traineeId, setTraineeId] = useState('');
  const [exercises, setExercises] = useState('');

  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState<any>(''); // Definindo o tipo da variável error como any

  const handleUpdate = async () => {
    try {
      const data = {
        trainerId: trainerId,
        traineeId: traineeId,
        exercises: JSON.parse(exercises) // Convertendo a string para JSON
      };

      await axios.put('http://localhost:3000/api/training/update', data);
      setResponseMessage('Training protocol has been updated');
    } catch (error: any) { // Definindo o tipo da variável error como any
      console.error('Error updating training:', error);
      setError(JSON.stringify(error.response.data)); // Convertendo o erro para JSON
    }
  };

  return (
    <div>
      <h2>Update Training</h2>
      <label>
        Trainer ID:
        <input type="text" value={trainerId} onChange={(e) => setTrainerId(e.target.value)} />
      </label>
      <label>
        Trainee ID:
        <input type="text" value={traineeId} onChange={(e) => setTraineeId(e.target.value)} />
      </label>
      <label>
        Exercises (JSON):
        <input type="text" value={exercises} onChange={(e) => setExercises(e.target.value)} />
      </label>
      <button onClick={handleUpdate}>Update Training</button>
      <div>{responseMessage}</div>
      <div>{error}</div> {/* Exibindo o erro na tela */}
    </div>
  );
};

export default UpdateTrainingPage;