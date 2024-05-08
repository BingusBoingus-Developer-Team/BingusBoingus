import { ITask } from '../tasks/interfaces/task.interface';

export interface TaskEntry {
  name: string;
  schedule: string;
  task: ITask;
}
