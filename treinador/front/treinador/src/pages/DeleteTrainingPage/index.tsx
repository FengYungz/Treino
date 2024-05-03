import React, { useState } from 'react';
import axios from 'axios';

const DeleteTrainingPage: React.FC = () => {
  const [trainingId, setTrainingId] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response: any = await axios.delete(`http://localhost:3002/api/training/delete/${trainingId}`);
      setResponseMessage(response.data);
    } catch (error: any) {
      console.error('Error deleting training:', error);
      setResponseMessage(JSON.stringify(error.response?.data));
    }
  };

  return (
    <div>
      <h2>Delete Training</h2>
      <label>
        Training ID:
        <input type="text" value={trainingId} onChange={(e) => setTrainingId(e.target.value)} />
      </label>
      <button onClick={handleDelete}>Delete Training</button>
      <div>{responseMessage}</div>
    </div>
  );
};

export default DeleteTrainingPage;