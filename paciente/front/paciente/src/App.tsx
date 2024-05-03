// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtocolsListPage from './pages/ProtocolsListPage/index';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtocolsListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
