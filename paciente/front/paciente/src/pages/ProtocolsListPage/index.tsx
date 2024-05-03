import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProtocolsListPage = () => {
  const [protocols, setProtocols] = useState<any[]>([]); // Definindo o tipo de protocols como any[]
  const [error, setError] = useState<string>(''); // Definindo o tipo de error como string

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/protocols');
        setProtocols(response.data);
      } catch (error) {
        console.error('Error fetching protocols:', error);
        setError('Error fetching protocols');
      }
    };

    fetchProtocols();
  }, []);

  return (
    <div>
      <h2>Protocols List</h2>
      {error && <div>Error: {error}</div>}
      <ul>
        {protocols.length > 0 && protocols.map((protocol: any) => ( // Verificando se protocols possui elementos antes de mapear
          <li key={protocol._id}>
            Protocol ID: {protocol.protocolId}, Trainer ID: {protocol.trainerId}, Trainee ID: {protocol.traineeId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProtocolsListPage;
