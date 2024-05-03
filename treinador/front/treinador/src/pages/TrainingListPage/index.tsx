import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Training {
  protocolId: string;
  trainerId: string;
  traineeId: string;
}

const TrainingListPage: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/training/list');
        setTrainings(response.data as Training[]);
      } catch (error) {
        console.error('Error fetching trainings:', error);
        setError('Error fetching trainings');
      }
    };

    fetchTrainings();
  }, []);

  return (
    <div>
      <h2>Training List</h2>
      {error && (
        <div>
          {error}
        </div>
      )}
      <ul>
        {trainings.map((training, index) => (
          <li key={index}>
            <div>Protocol ID: {training.protocolId}</div>
            <div>Trainer ID: {training.trainerId}</div>
            <div>Trainee ID: {training.traineeId}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainingListPage;