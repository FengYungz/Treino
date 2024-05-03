import React from 'react';


import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


import CreateTrainingPage from './pages/CreateTrainingPage/index';
import TrainingListPage from './pages/TrainingListPage/index';
import UpdateTrainingPage from './pages/UpdateTrainingPage';
import DeleteTrainingPage from './pages/DeleteTrainingPage';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/create">Create Training</Link>
            </li>
            <li>
              <Link to="/list">Training List</Link>
            </li>
            <li>
              <Link to="/update">Update Training</Link>
            </li>
            <li>
              <Link to="/delete">Delete Training</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/create" element={<CreateTrainingPage />} />
          <Route path="/list" element={<TrainingListPage />} />
          <Route path="/update" element={<UpdateTrainingPage />} />
          <Route path="/delete" element={<DeleteTrainingPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;