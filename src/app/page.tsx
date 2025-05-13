
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { TaskForm } from '@/components/TaskForm';
import { TaskItem } from '@/components/TaskItem';
import { SuggestedTasks } from '@/components/SuggestedTasks';
import { Clock } from '@/components/Clock'; 
import { useDailyPlan } from '@/hooks/useDailyPlan';
import type { Task } from '@/types';
import { formatDate, getDisplayDate } from '@/lib/date-utils';
import { PlusSquare, CalendarDays, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image'; 

export default function PixelPlannerPage() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const { currentDate, tasks, isLoading, addTask, editTask, deleteTask, toggleTaskCompletion, changeDate } = useDailyPlan(selectedDate);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  // Ensure client-side rendering for date input value
  const [dateInputValue, setDateInputValue] = useState('');
  useEffect(() => {
    setDateInputValue(formatDate(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    changeDate(selectedDate);
  }, [selectedDate, changeDate]);
  
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    // Adjust for timezone offset if date from input is UTC
    const userTimezoneOffset = newDate.getTimezoneOffset() * 60000;
    setSelectedDate(new Date(newDate.getTime() + userTimezoneOffset));
  };

  const handleOpenForm = (task?: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  const handleSubmitForm = (data: Omit<Task, 'id' | 'completed'>) => {
    if (editingTask) {
      editTask({ ...editingTask, ...data });
    } else {
      addTask(data);
    }
    handleCloseForm();
  };
  
  const handleAddSuggestedTask = (taskTitle: string, startTime?: string) => {
    addTask({ title: taskTitle, startTime: startTime || "12:00", icon: 'default' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 flex flex-col items-center selection:bg-accent selection:text-accent-foreground">
      <Clock /> 
      <header className="w-full max-w-2xl mb-6 text-center p-2 pt-16 sm:pt-8"> 
        {/* Optional: Pixel art logo here */}
        {/* <Image src="https://picsum.photos/100/50" alt="Pixel Planner Logo" width={100} height={50} className="mx-auto mb-2 pixelated" data-ai-hint="pixel logo" /> */}
        <h1 className="text-4xl md:text-5xl font-bold text-primary pixel-shadow" style={{ WebkitTextStroke: '1px hsl(var(--border))', paintOrder: 'stroke fill' }}>
          Pixel Planner
        </h1>
        <p className="text-sm text-foreground/80 mt-1">Craft your day, one block at a time!</p>
      </header>

      <main className="w-full max-w-2xl"> 
        <section className="mb-6 p-3 bg-card border-2 border-border pixel-shadow-sm rounded-none">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative">
              <Input
                type="date"
                value={dateInputValue}
                onChange={handleDateChange}
                className="pixel-input rounded-none pl-10 w-full sm:w-auto text-lg"
                aria-label="Select date for tasks"
              />
              <CalendarDays size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
            </div>
             <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => handleOpenForm()} 
                  className="pixel-button bg-primary text-primary-foreground rounded-none w-full sm:w-auto"
                  aria-label="Add new task"
                  >
                  <PlusSquare size={18} className="mr-2" />
                  Add Pixel Task
                </Button>
              </DialogTrigger>
              {isFormOpen && <TaskForm task={editingTask} onSubmit={handleSubmitForm} onClose={handleCloseForm} />}
            </Dialog>
          </div>
           <p className="text-center text-accent font-semibold text-lg mt-3">{getDisplayDate(currentDate)}</p>
        </section>
        
        <section>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 size={32} className="animate-spin text-primary" />
              <p className="ml-2 text-lg">Loading Pixel Tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-8 px-4 bg-card border-2 border-border pixel-shadow-sm rounded-none">
              <Image src="https://picsum.photos/128/128?grayscale" alt="Empty state placeholder" width={80} height={80} className="mx-auto mb-3 opacity-50" data-ai-hint="empty box" /> {/* Removed pixelated class, global style handles it */}
              <p className="text-xl font-semibold text-foreground/80">No tasks for this day... yet!</p>
              <p className="text-sm text-muted-foreground">Add a task or let the Pixel AI suggest some!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={() => handleOpenForm(task)}
                  onDelete={deleteTask}
                  onToggleComplete={toggleTaskCompletion}
                />
              ))}
            </div>
          )}
        </section>

        <SuggestedTasks onAddTask={handleAddSuggestedTask} />
      </main>

      <footer className="w-full max-w-2xl mt-12 text-center text-xs text-muted-foreground"> 
        <p>&copy; {new Date().getFullYear()} Pixel Planner. All rights reserved. Built with ☕ and 👾.</p>
      </footer>
    </div>
  );
}

