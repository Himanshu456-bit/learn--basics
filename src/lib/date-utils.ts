export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

export const getDisplayDate = (dateString: string): string => {
  const date = new Date(dateString);
  // Adjust for timezone offset to display correct local date
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() + userTimezoneOffset);
  
  return localDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export function getCurrentTimeContext(): { timeOfDay: string; dayOfWeek: string } {
  const now = new Date();
  const hour = now.getHours();
  let timeOfDay: string;

  if (hour >= 5 && hour < 12) timeOfDay = 'morning';
  else if (hour >= 12 && hour < 18) timeOfDay = 'afternoon';
  else if (hour >= 18 && hour < 22) timeOfDay = 'evening';
  else timeOfDay = 'night';

  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
  return { timeOfDay, dayOfWeek };
}
