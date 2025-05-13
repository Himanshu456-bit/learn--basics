export interface Task {
  id: string;
  title: string;
  description?: string;
  startTime: string; // e.g., "09:00"
  completed: boolean;
  icon?: string; // For specific pixel icon identifier
  color?: string; // Optional color for task item
}

export interface DailyPlan {
  date: string; // YYYY-MM-DD
  tasks: Task[];
}
