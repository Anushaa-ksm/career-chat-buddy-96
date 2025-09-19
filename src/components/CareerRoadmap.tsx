import { Button } from '@/components/ui/button';

interface CareerPath {
  stream: string;
  percentage: number;
  careers: string[];
  nextSteps: string[];
  color: string;
}

interface CareerRoadmapProps {
  primaryPath: CareerPath;
  secondaryPath?: CareerPath;
}

export const CareerRoadmap = ({ primaryPath, secondaryPath }: CareerRoadmapProps) => {
  return (
    <div className="space-y-4 mt-6">
      <div className="text-center">
        <h2 className="text-xl font-pixel font-bold text-foreground mb-2">
          🎯 YOUR CAREER ROADMAP
        </h2>
      </div>

      {/* Primary Path */}
      <div className="bg-gradient-chat border-2 border-border p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <div 
            className="w-4 h-4 border-2 border-foreground"
            style={{ backgroundColor: primaryPath.color }}
          />
          <h3 className="font-pixel font-bold text-card-foreground">
            PRIMARY MATCH: {primaryPath.stream.toUpperCase()} ({primaryPath.percentage}%)
          </h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <h4 className="font-pixel text-sm font-bold text-accent mb-1">CAREERS:</h4>
            <div className="flex flex-wrap gap-2">
              {primaryPath.careers.map((career, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-primary/20 border border-primary text-xs font-pixel"
                >
                  {career}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-pixel text-sm font-bold text-accent mb-1">NEXT STEPS:</h4>
            <ul className="space-y-1">
              {primaryPath.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-xs font-pixel">
                  <span className="text-accent">•</span>
                  <span className="text-card-foreground">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Secondary Path */}
      {secondaryPath && (
        <div className="bg-muted/50 border-2 border-muted p-4">
          <div className="flex items-center gap-2 mb-3">
            <div 
              className="w-4 h-4 border-2 border-foreground"
              style={{ backgroundColor: secondaryPath.color }}
            />
            <h3 className="font-pixel font-bold text-muted-foreground">
              SECONDARY: {secondaryPath.stream.toUpperCase()} ({secondaryPath.percentage}%)
            </h3>
          </div>
          
          <div className="space-y-2">
            <div>
              <h4 className="font-pixel text-xs font-bold text-muted-foreground mb-1">CAREERS:</h4>
              <div className="flex flex-wrap gap-1">
                {secondaryPath.careers.slice(0, 3).map((career, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-muted text-xs font-pixel text-muted-foreground"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center pt-4">
        <Button variant="sparkle" size="lg" className="pixel-pulse">
          EXPLORE MORE PATHS
        </Button>
      </div>
    </div>
  );
};