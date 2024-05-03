import React, { useState } from 'react';
import axios from 'axios';

const CreateTrainingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    trainerId: '',
    traineeId: '',
    exercises: [{ name: "", series: 0 }] // Corrigido para ser um array de objetos
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'exercises') {
      handleExercisesChange(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleExercisesChange = (value: string) => {
    try {
      const exercises = JSON.parse(value);
      setFormData(prevState => ({ ...prevState, exercises }));
    } catch (error) {
      console.error('Error parsing exercises JSON:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: any = await axios.post('http://localhost:3002/api/training/create', formData);
      setResponseMessage(JSON.stringify(response.data));
    } catch (error: any) {
      console.error('Error creating training:', error);
      setResponseMessage(JSON.stringify(error.response?.data));
    }
  };

  return (
    <div>
      <h2>Create Training</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Trainer ID:
          <input type="text" name="trainerId" value={formData.trainerId} onChange={handleChange} />
        </label>
        <label>
          Trainee ID:
          <input type="text" name="traineeId" value={formData.traineeId} onChange={handleChange} />
        </label>
        <label>
          Exercises (JSON):
          <textarea name="exercises" value={JSON.stringify(formData.exercises)} onChange={handleChange} rows={5} />
        </label>
        <button type="submit">Create Training</button>
      </form>
      <div>{responseMessage}</div>
    </div>
  );
};

export default CreateTrainingPage;