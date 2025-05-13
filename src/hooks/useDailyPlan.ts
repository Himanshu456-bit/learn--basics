"use client";

import type { Task, DailyPlan } from '@/types';
import { useState, useEffect, useCallback } from 'react';
import { formatDate } from '@/lib/date-utils';
import { useToast } from "@/hooks/use-toast"; // Corrected import path

const LOCAL_STORAGE_KEY = 'pixelPlannerDailyPlans';

export function useDailyPlan(initialDate?: Date) {
  const [currentDate, setCurrentDate] = useState<string>(() => formatDate(initialDate || new Date()));
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadPlansFromStorage = useCallback((): Record<string, DailyPlan> => {
    if (typeof window === 'undefined') return {};
    const storedPlans = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedPlans ? JSON.parse(storedPlans) : {};
  }, []);

  const savePlansToStorage = useCallback((plans: Record<string, DailyPlan>) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(plans));
  }, []);

  const loadTasksForDate = useCallback((dateStr: string) => {
    setIsLoading(true);
    const allPlans = loadPlansFromStorage();
    const planForDate = allPlans[dateStr];
    setTasks(planForDate ? planForDate.tasks.sort((a, b) => a.startTime.localeCompare(b.startTime)) : []);
    setIsLoading(false);
  }, [loadPlansFromStorage]);

  useEffect(() => {
    loadTasksForDate(currentDate);
  }, [currentDate, loadTasksForDate]);

  const updateTasksForCurrentDate = useCallback((updatedTasks: Task[]) => {
    const allPlans = loadPlansFromStorage();
    allPlans[currentDate] = { date: currentDate, tasks: updatedTasks.sort((a, b) => a.startTime.localeCompare(b.startTime)) };
    savePlansToStorage(allPlans);
    setTasks(updatedTasks.sort((a, b) => a.startTime.localeCompare(b.startTime)));
  }, [currentDate, loadPlansFromStorage, savePlansToStorage]);

  const addTask = useCallback((task: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = { ...task, id: crypto.randomUUID(), completed: false };
    updateTasksForCurrentDate([...tasks, newTask]);
    toast({ title: "Pixel Power!", description: "New task added to your day." });
  }, [tasks, updateTasksForCurrentDate, toast]);

  const editTask = useCallback((updatedTask: Task) => {
    updateTasksForCurrentDate(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    toast({ title: "Upgrade Complete!", description: "Task updated successfully." });
  }, [tasks, updateTasksForCurrentDate, toast]);

  const deleteTask = useCallback((taskId: string) => {
    updateTasksForCurrentDate(tasks.filter(task => task.id !== taskId));
    toast({ title: "Task Blasted!", description: "Task removed from your schedule.", variant: "destructive" });
  }, [tasks, updateTasksForCurrentDate, toast]);

  const toggleTaskCompletion = useCallback((taskId: string) => {
    updateTasksForCurrentDate(
      tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task)
    );
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        toast({ title: task.completed ? "Way to go!" : "Still on the list!", description: `Task marked as ${task.completed ? "not done" : "done"}.` });
    }
  }, [tasks, updateTasksForCurrentDate, toast]);
  
  const changeDate = useCallback((newDate: Date) => {
    setCurrentDate(formatDate(newDate));
  }, []);

  return {
    currentDate,
    tasks,
    isLoading,
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompletion,
    changeDate,
    loadTasksForDate, // Expose for potential refresh
  };
}
