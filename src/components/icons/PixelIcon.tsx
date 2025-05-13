"use client";
import { cn } from '@/lib/utils';

interface PixelIconProps {
  className?: string;
  color?: string;
  size?: number;
}

const defaultSize = 16;

export const DefaultTaskIcon = ({ className, color = 'hsl(var(--foreground))', size = defaultSize }: PixelIconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg" className={cn("pixelated shrink-0", className)}>
    <rect x="3" y="3" width="10" height="10" />
  </svg>
);

export const WorkTaskIcon = ({ className, color = 'hsl(var(--primary))', size = defaultSize }: PixelIconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("pixelated shrink-0", className)}>
    <path fillRule="evenodd" clipRule="evenodd" d="M2 2H14V5H12V14H4V5H2V2ZM6 7H10V12H6V7Z" fill={color}/>
  </svg>
);

export const StudyTaskIcon = ({ className, color = 'hsl(var(--secondary))', size = defaultSize }: PixelIconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("pixelated shrink-0", className)}>
    <path fillRule="evenodd" clipRule="evenodd" d="M3 2H13V4H11V12H9V4H7V12H5V4H3V2ZM3 13H13V15H3V13Z" fill={color}/>
  </svg>
);

export const PersonalTaskIcon = ({ className, color = 'hsl(var(--accent))', size = defaultSize }: PixelIconProps) => (
 <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("pixelated shrink-0", className)}>
    <path d="M8 1C9.65685 1 11 2.34315 11 4C11 5.65685 9.65685 7 8 7C6.34315 7 5 5.65685 5 4C5 2.34315 6.34315 1 8 1Z" fill={color}/>
    <path d="M4 8C2.89543 8 2 8.89543 2 10V13H14V10C14 8.89543 13.1046 8 12 8H4Z" fill={color}/>
  </svg>
);

export const TaskIconMap: Record<string, React.FC<PixelIconProps>> = {
  default: DefaultTaskIcon,
  work: WorkTaskIcon,
  study: StudyTaskIcon,
  personal: PersonalTaskIcon,
};

export const TaskIconPicker = ({ currentIcon, onIconSelect }: { currentIcon?: string, onIconSelect: (iconName: string) => void }) => {
  return (
    <div className="grid grid-cols-4 gap-2 p-1 border-2 border-border bg-input rounded-none">
      {Object.entries(TaskIconMap).map(([name, IconComponent]) => (
        <button
          key={name}
          type="button"
          onClick={() => onIconSelect(name)}
          className={cn(
            "p-2 flex justify-center items-center border-2 hover:border-primary",
            currentIcon === name ? "border-primary bg-primary/20" : "border-transparent"
          )}
          aria-label={`Select ${name} icon`}
        >
          <IconComponent size={24} />
        </button>
      ))}
    </div>
  );
};
