interface HealthBarProps {
  current: number;
  max: number;
}

export const HealthBar = ({ current, max }: HealthBarProps) => {
  return (
    <div className="flex items-center gap-1 mb-4">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-8 h-8 border-2 border-destructive transition-all duration-300 ${
            i < current 
              ? 'bg-gradient-heart heart-beat shadow-lg' 
              : 'bg-muted/50'
          }`}
          style={{
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
          }}
        />
      ))}
      <span className="ml-2 font-pixel text-sm text-foreground">
        {current}/{max}
      </span>
    </div>
  );
};