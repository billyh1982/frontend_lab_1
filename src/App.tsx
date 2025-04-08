import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskProvider';
import TaskDashboard from './components/TaskDashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <div>
          <TaskDashboard />
        </div>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;