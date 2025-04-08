import React, { useContext, useState } from 'react';
import { TaskContext } from '../interfaces/TaskContext';
import { useAuth } from '../context/AuthContext';
import TaskForm from './TaskForm';
import { Task } from '../interfaces/Task';
import '../styles/TaskDashboard.css';

const TaskDashboard: React.FC = () => {
  const taskContext = useContext(TaskContext);
  const { tasks = [], deleteTask } = taskContext || { tasks: [], deleteTask: () => {} };

  const { user, login, logout } = useAuth(); // Access authentication state and actions
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // State for user input
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
  };

  const handleDelete = (id: string) => {
    if (deleteTask) {
      deleteTask(id);
    }
  };

  const handleSave = () => {
    setTaskToEdit(null);
  };

  const handleLogin = () => {
    if (userInfo.name && userInfo.email) {
      login({ id: Date.now().toString(), name: userInfo.name, email: userInfo.email });
      setUserInfo({ name: '', email: '' }); // Clear the input fields after login
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>things to do or shopping list</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              type="text"
              placeholder="Name"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
      <TaskForm taskToEdit={taskToEdit || undefined} onSave={handleSave} />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>
              {task.title} - {task.description}
            </span>
            <button onClick={() => handleEdit(task)} className="edit-button">
              Edit
            </button>
            <button onClick={() => handleDelete(task.id)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskDashboard;