import { Task } from './Task';


export interface TaskFormProps {
  taskToEdit?: Task;
  onSave?: () => void;
    onDelete?: () => void;
}