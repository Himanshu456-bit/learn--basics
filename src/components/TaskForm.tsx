"use client";

import type { Task } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { TaskIconPicker, TaskIconMap, DefaultTaskIcon } from '@/components/icons/PixelIcon';
import { cn } from '@/lib/utils';

const taskFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().max(500, 'Description too long').optional(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)'),
  icon: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: TaskFormValues) => void;
  onClose: () => void;
}

export function TaskForm({ task, onSubmit, onClose }: TaskFormProps) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      startTime: task?.startTime || '09:00',
      icon: task?.icon || 'default',
    },
  });

  const CurrentTaskIcon = TaskIconMap[form.watch('icon') || 'default'] || DefaultTaskIcon;

  return (
    <DialogContent className="bg-card border-2 border-border pixel-shadow sm:max-w-md rounded-none">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
          <CurrentTaskIcon size={24} color="hsl(var(--primary))" />
          {task ? 'Edit Pixel Task' : 'Add New Pixel Task'}
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Title</FormLabel>
                <FormControl>
                  <Input {...field} className="pixel-input rounded-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} className="pixel-input rounded-none min-h-[60px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Start Time (HH:MM)</FormLabel>
                <FormControl>
                  <Input type="time" {...field} className="pixel-input rounded-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Icon</FormLabel>
                <FormControl>
                   <TaskIconPicker currentIcon={field.value} onIconSelect={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="pixel-button-secondary rounded-none" onClick={onClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="pixel-button rounded-none bg-primary text-primary-foreground">
              {task ? 'Save Changes' : 'Add Task'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
