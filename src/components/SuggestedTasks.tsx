"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2, PlusSquare } from 'lucide-react';
import { suggestTasks, type SuggestTasksInput, type SuggestTasksOutput } from '@/ai/flows/suggest-tasks';
import { getCurrentTimeContext } from '@/lib/date-utils';
import { useToast } from "@/hooks/use-toast"; // Corrected import path
import { cn } from '@/lib/utils';

interface SuggestedTasksProps {
  onAddTask: (taskTitle: string, startTime?: string) => void;
}

export function SuggestedTasks({ onAddTask }: SuggestedTasksProps) {
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestedTasksList, setSuggestedTasksList] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSuggestTasks = async () => {
    setIsLoadingSuggestions(true);
    setSuggestedTasksList([]);
    try {
      const { timeOfDay, dayOfWeek } = getCurrentTimeContext();
      const input: SuggestTasksInput = { timeOfDay, dayOfWeek };
      // console.log("Suggesting tasks for:", input); // For debugging
      const result: SuggestTasksOutput = await suggestTasks(input);
      // console.log("AI Suggestions:", result); // For debugging
      setSuggestedTasksList(result.tasks || []);
      if (!result.tasks || result.tasks.length === 0) {
        toast({ title: "Hmm...", description: "AI couldn't think of anything right now." });
      }
    } catch (error) {
      console.error('Error fetching task suggestions:', error);
      toast({ title: "Uh oh!", description: "Could not fetch AI suggestions. Check console.", variant: "destructive" });
      setSuggestedTasksList([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };
  
  const handleAddSuggestedTask = (taskTitle: string) => {
    const now = new Date();
    const suggestedStartTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    onAddTask(taskTitle, suggestedStartTime);
    setSuggestedTasksList(prev => prev.filter(t => t !== taskTitle)); // Remove added task from suggestions
    toast({ title: "Pixel Perfect!", description: `Added "${taskTitle}" to your planner.` });
  };

  return (
    <Card className="mt-6 bg-card border-2 border-border pixel-shadow rounded-none">
      <CardHeader className="p-3">
        <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
          <Wand2 size={20} className="text-primary" />
          Pixel AI Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <Button
          onClick={handleSuggestTasks}
          disabled={isLoadingSuggestions}
          className="w-full pixel-button bg-secondary text-secondary-foreground rounded-none mb-3"
        >
          {isLoadingSuggestions ? (
            <Loader2 size={16} className="mr-2 animate-spin" />
          ) : (
            <Wand2 size={16} className="mr-2" />
          )}
          {isLoadingSuggestions ? 'Thinking...' : 'Suggest Tasks ✨'}
        </Button>
        {suggestedTasksList.length > 0 && (
          <div className="mt-3 space-y-2">
            <h4 className="font-semibold text-foreground/90">AI thinks you could:</h4>
            <ul className="list-none space-y-1">
              {suggestedTasksList.map((task, index) => (
                <li key={index} className="flex items-center justify-between p-2 bg-input border border-border rounded-none">
                  <span className="text-sm text-foreground/80">{task}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleAddSuggestedTask(task)}
                    className="p-1 text-accent hover:text-accent-foreground hover:bg-accent/20 rounded-none"
                    aria-label={`Add suggested task: ${task}`}
                    >
                    <PlusSquare size={16} />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
