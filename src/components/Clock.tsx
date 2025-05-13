
"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateClock = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };

    // Set time immediately on client-side mount
    updateClock(); 
    
    const timerId = setInterval(updateClock, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  // Render null on the server and during initial client render before useEffect runs
  if (time === null) {
    return (
        <div className="fixed top-4 right-4 bg-card border-2 border-border pixel-shadow-sm rounded-none p-2 text-sm text-primary font-mono z-50" aria-hidden="true">
            <span>--:--:--</span>
        </div>
    );
  }

  return (
    <div className={cn(
        "fixed top-4 right-4 bg-card border-2 border-border pixel-shadow-sm rounded-none p-2 text-sm text-primary font-mono z-50"
        )}>
      <span>{time}</span>
    </div>
  );
}
