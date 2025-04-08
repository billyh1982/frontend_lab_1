import React, { useContext, useState, useEffect } from 'react';
import { TaskContext } from '../interfaces/TaskContext';
import { Task } from '../interfaces/Task';
import '../styles/taskfor.css';
import { TaskFormProps } from '../interfaces/TaskFormProps'; 



const TaskForm: React.FC<TaskFormProps> = ({ taskToEdit, onSave, onDelete }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const taskContext = useContext(TaskContext);

  const { addTask, updateTask, deleteTask } = taskContext || {};

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [taskToEdit]);

  const handleAdd = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
    };
    if (addTask) {
      addTask(newTask);
    }

    // Reset form fields
    setTitle('');
    setDescription('');

    if (onSave) {
      onSave();
    }
  };

  const handleUpdate = () => {
    if (taskToEdit && updateTask) {
      updateTask({ ...taskToEdit, title, description });

      if (onSave) {
        onSave();
      }
    }
  };

  const handleDelete = () => {
    if (taskToEdit && deleteTask) {
      deleteTask(taskToEdit.id);

      if (onDelete) {
        onDelete();
      }
    }
  };

  return (
    <form>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        required
      />
      {!taskToEdit && (
        <button type="button" onClick={handleAdd} className="add-button">
          Add Task
        </button>
      )}
      {taskToEdit && (
        <>
          <button type="button" onClick={handleUpdate} className="update-button">
            Update Task
          </button>
          <button type="button" onClick={handleDelete} className="delete-button">
            Delete Task
          </button>
        </>
      )}
    </form>
  );
};

export default TaskForm;