"use client";

import type { Task } from '@/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';
import { TaskIconMap, DefaultTaskIcon } from '@/components/icons/PixelIcon';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

export function TaskItem({ task, onEdit, onDelete, onToggleComplete }: TaskItemProps) {
  const IconComponent = TaskIconMap[task.icon || 'default'] || DefaultTaskIcon;

  return (
    <Card className={cn(
      "pixel-shadow-sm border-2 border-border rounded-none mb-3",
      task.completed ? 'bg-muted/50 opacity-70' : 'bg-card'
    )}>
      <CardHeader className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconComponent size={20} color={task.color || (task.completed ? 'hsl(var(--muted-foreground))' : 'hsl(var(--primary))')} />
            <CardTitle className={cn(
              "text-lg font-bold",
              task.completed ? 'line-through text-muted-foreground' : 'text-primary-foreground'
            )}>
              {task.title}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
             <Checkbox
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => onToggleComplete(task.id)}
                className="size-5 border-2 border-primary data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground rounded-none"
                aria-label={`Mark task ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
              />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(task)}
              className="text-foreground hover:text-accent hover:bg-accent/20 rounded-none p-1 size-7"
              aria-label={`Edit task ${task.title}`}
            >
              <Edit size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task.id)}
              className="text-destructive-foreground hover:text-destructive hover:bg-destructive/20 rounded-none p-1 size-7"
              aria-label={`Delete task ${task.title}`}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex justify-between items-end">
          <p className={cn("text-sm", task.completed ? "text-muted-foreground" : "text-foreground/80")}>
            {task.description || 'No description.'}
          </p>
          <p className={cn("text-xs font-semibold", task.completed ? "text-muted-foreground" : "text-accent")}>
            {task.startTime}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
