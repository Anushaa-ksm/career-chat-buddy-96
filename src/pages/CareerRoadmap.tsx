import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  BookOpen, 
  Award, 
  Users, 
  Zap, 
  Target,
  ArrowRight,
  Star,
  Building2,
  Code,
  Database,
  Cpu,
  Globe
} from 'lucide-react';

interface PathNode {
  id: string;
  title: string;
  description: string;
  type: 'education' | 'job' | 'specialization' | 'certification';
  duration?: string;
  salary?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  nextPaths: string[];
  icon: React.ReactNode;
  position: { x: number; y: number };
}

const CareerRoadmapPage = () => {
  const [selectedStream, setSelectedStream] = useState<string>('engineering');
  const [activeNode, setActiveNode] = useState<string>('bachelor');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const engineeringPaths: Record<string, PathNode> = {
    // Level 1: Foundation
    bachelor: {
      id: 'bachelor',
      title: 'B.Tech/B.E.',
      description: 'Bachelor of Engineering - Foundation',
      type: 'education',
      duration: '4 years',
      difficulty: 'Medium',
      nextPaths: ['choice-point'],
      icon: <GraduationCap className="w-6 h-6" />,
      position: { x: 50, y: 5 }
    },
    
    // Level 2: Decision Point
    'choice-point': {
      id: 'choice-point',
      title: 'Career Decision',
      description: 'Choose your path: Higher Education or Start Career',
      type: 'specialization',
      duration: '',
      difficulty: 'Medium',
      nextPaths: ['masters', 'job-entry'],
      icon: <Target className="w-6 h-6" />,
      position: { x: 50, y: 20 }
    },

    // Level 3A: Higher Education Path
    masters: {
      id: 'masters',
      title: 'M.Tech/MS',
      description: 'Masters in Engineering/Computer Science',
      type: 'education',
      duration: '2 years',
      difficulty: 'Hard',
      nextPaths: ['research-jobs', 'senior-roles'],
      icon: <Award className="w-6 h-6" />,
      position: { x: 25, y: 35 }
    },

    // Level 3B: Direct Job Path
    'job-entry': {
      id: 'job-entry',
      title: 'Junior Engineer',
      description: 'Entry-level development position',
      type: 'job',
      duration: '2-3 years',
      salary: '₹4-8 LPA',
      difficulty: 'Easy',
      nextPaths: ['skill-development'],
      icon: <Code className="w-6 h-6" />,
      position: { x: 75, y: 35 }
    },

    // Level 4A: Research/Academic Jobs
    'research-jobs': {
      id: 'research-jobs',
      title: 'Research Scientist',
      description: 'R&D roles in tech companies',
      type: 'job',
      salary: '₹12-25 LPA',
      difficulty: 'Hard',
      nextPaths: ['senior-research'],
      icon: <BookOpen className="w-6 h-6" />,
      position: { x: 15, y: 50 }
    },

    // Level 4B: Senior Roles after Masters
    'senior-roles': {
      id: 'senior-roles',
      title: 'Senior Engineer',
      description: 'Advanced technical positions',
      type: 'job',
      salary: '₹10-20 LPA',
      difficulty: 'Medium',
      nextPaths: ['leadership-track'],
      icon: <TrendingUp className="w-6 h-6" />,
      position: { x: 35, y: 50 }
    },

    // Level 4C: Skill Development
    'skill-development': {
      id: 'skill-development',
      title: 'Skill Specialization',
      description: 'Choose specialization: AI/ML, Cloud, Full Stack',
      type: 'specialization',
      duration: '1-2 years',
      difficulty: 'Medium',
      nextPaths: ['ai-specialist', 'cloud-specialist', 'fullstack-lead'],
      icon: <Zap className="w-6 h-6" />,
      position: { x: 75, y: 50 }
    },

    // Level 5A: AI/ML Track
    'ai-specialist': {
      id: 'ai-specialist',
      title: 'AI/ML Engineer',
      description: 'Machine Learning & Data Science',
      type: 'job',
      salary: '₹12-25 LPA',
      difficulty: 'Hard',
      nextPaths: ['ai-architect'],
      icon: <Cpu className="w-6 h-6" />,
      position: { x: 65, y: 65 }
    },

    // Level 5B: Cloud Track
    'cloud-specialist': {
      id: 'cloud-specialist',
      title: 'Cloud Engineer',
      description: 'AWS, Azure, Google Cloud specialist',
      type: 'job',
      salary: '₹10-22 LPA',
      difficulty: 'Medium',
      nextPaths: ['cloud-architect'],
      icon: <Database className="w-6 h-6" />,
      position: { x: 75, y: 65 }
    },

    // Level 5C: Full Stack Track
    'fullstack-lead': {
      id: 'fullstack-lead',
      title: 'Full Stack Lead',
      description: 'End-to-end application development',
      type: 'job',
      salary: '₹8-18 LPA',
      difficulty: 'Medium',
      nextPaths: ['tech-lead'],
      icon: <Globe className="w-6 h-6" />,
      position: { x: 85, y: 65 }
    },

    // Level 6A: Leadership Track
    'leadership-track': {
      id: 'leadership-track',
      title: 'Tech Lead',
      description: 'Technical team leadership',
      type: 'job',
      salary: '₹15-35 LPA',
      difficulty: 'Hard',
      nextPaths: ['engineering-manager', 'principal-engineer'],
      icon: <Users className="w-6 h-6" />,
      position: { x: 35, y: 80 }
    },

    // Level 6B: Senior Research
    'senior-research': {
      id: 'senior-research',
      title: 'Principal Scientist',
      description: 'Lead research initiatives',
      type: 'job',
      salary: '₹20-45 LPA',
      difficulty: 'Hard',
      nextPaths: ['research-director'],
      icon: <Award className="w-6 h-6" />,
      position: { x: 15, y: 80 }
    },

    // Level 6C: Architecture Roles
    'ai-architect': {
      id: 'ai-architect',
      title: 'AI Solutions Architect',
      description: 'Design AI/ML systems at scale',
      type: 'job',
      salary: '₹25-50 LPA',
      difficulty: 'Hard',
      nextPaths: ['cto-track'],
      icon: <Building2 className="w-6 h-6" />,
      position: { x: 65, y: 80 }
    },

    'cloud-architect': {
      id: 'cloud-architect',
      title: 'Cloud Solutions Architect',
      description: 'Design cloud infrastructure at enterprise scale',
      type: 'job',
      salary: '₹22-45 LPA',
      difficulty: 'Hard',
      nextPaths: ['cto-track'],
      icon: <Building2 className="w-6 h-6" />,
      position: { x: 75, y: 80 }
    },

    'tech-lead': {
      id: 'tech-lead',
      title: 'Engineering Manager',
      description: 'Manage engineering teams',
      type: 'job',
      salary: '₹18-40 LPA',
      difficulty: 'Hard',
      nextPaths: ['cto-track'],
      icon: <Users className="w-6 h-6" />,
      position: { x: 85, y: 80 }
    },

    // Level 7: Executive Track
    'cto-track': {
      id: 'cto-track',
      title: 'CTO/VP Engineering',
      description: 'Technology leadership and strategy',
      type: 'job',
      salary: '₹50+ LPA',
      difficulty: 'Hard',
      nextPaths: [],
      icon: <Star className="w-6 h-6" />,
      position: { x: 70, y: 95 }
    },

    'engineering-manager': {
      id: 'engineering-manager',
      title: 'Director of Engineering',
      description: 'Lead multiple engineering teams',
      type: 'job',
      salary: '₹30-60 LPA',
      difficulty: 'Hard',
      nextPaths: ['cto-track'],
      icon: <Briefcase className="w-6 h-6" />,
      position: { x: 35, y: 95 }
    },

    'principal-engineer': {
      id: 'principal-engineer',
      title: 'Principal Engineer',
      description: 'Technical expert and mentor',
      type: 'job',
      salary: '₹25-55 LPA',
      difficulty: 'Hard',
      nextPaths: ['cto-track'],
      icon: <Award className="w-6 h-6" />,
      position: { x: 50, y: 95 }
    },

    'research-director': {
      id: 'research-director',
      title: 'Research Director',
      description: 'Head of R&D division',
      type: 'job',
      salary: '₹35-70 LPA',
      difficulty: 'Hard',
      nextPaths: [],
      icon: <Target className="w-6 h-6" />,
      position: { x: 15, y: 95 }
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'education': return 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100';
      case 'job': return 'bg-green-50 border-green-200 text-green-800 hover:bg-green-100';
      case 'specialization': return 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100';
      case 'certification': return 'bg-orange-50 border-orange-200 text-orange-800 hover:bg-orange-100';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderConnections = () => {
    return Object.values(engineeringPaths).map(node => 
      node.nextPaths.map(nextId => {
        const nextNode = engineeringPaths[nextId];
        if (!nextNode) return null;
        
        return (
          <svg
            key={`${node.id}-${nextId}`}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#64748b"
                />
              </marker>
            </defs>
            <line
              x1={`${node.position.x}%`}
              y1={`${node.position.y + 8}%`}
              x2={`${nextNode.position.x}%`}
              y2={`${nextNode.position.y - 2}%`}
              stroke="#64748b"
              strokeWidth="2"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
              className="animate-pulse"
            />
          </svg>
        );
      })
    );
  };

  const renderNode = (node: PathNode) => {
    const isActive = activeNode === node.id;
    const isHovered = hoveredNode === node.id;
    
    return (
      <div
        key={node.id}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        style={{ 
          left: `${node.position.x}%`, 
          top: `${node.position.y}%`,
          zIndex: isActive || isHovered ? 10 : 5
        }}
        onMouseEnter={() => setHoveredNode(node.id)}
        onMouseLeave={() => setHoveredNode(null)}
      >
        <Card 
          className={`w-64 cursor-pointer transition-all duration-300 ${getNodeColor(node.type)} ${
            isActive ? 'ring-2 ring-primary shadow-lg scale-105' : ''
          } ${isHovered ? 'shadow-xl scale-102' : 'shadow-md'}`}
          onClick={() => setActiveNode(node.id)}
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              {node.icon}
              {node.title}
              {isActive && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground mb-3">{node.description}</p>
            
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getDifficultyColor(node.difficulty)}`}
                >
                  {node.difficulty}
                </Badge>
                <Badge variant="secondary" className="text-xs capitalize">
                  {node.type}
                </Badge>
              </div>
              
              {node.duration && (
                <Badge variant="outline" className="text-xs">
                  ⏱ {node.duration}
                </Badge>
              )}
              
              {node.salary && (
                <Badge variant="outline" className="text-xs">
                  💰 {node.salary}
                </Badge>
              )}
            </div>

            {node.nextPaths.length > 0 && (
              <div className="mt-3 text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <ArrowRight className="w-3 h-3" />
                  {node.nextPaths.length} paths ahead
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🚀 Career Roadmap Explorer
          </h1>
          <p className="text-lg text-muted-foreground">
            Interactive career path visualization for your future
          </p>
        </div>

        {/* Stream Selector */}
        <Tabs value={selectedStream} onValueChange={setSelectedStream} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="engineering" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Engineering
            </TabsTrigger>
            <TabsTrigger value="medicine" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Medicine
            </TabsTrigger>
            <TabsTrigger value="commerce" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Commerce
            </TabsTrigger>
            <TabsTrigger value="arts" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Arts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="engineering" className="mt-8">
            {/* Legend */}
            <div className="flex justify-center gap-6 mb-8 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded" />
                <span className="text-sm">Education</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-200 rounded" />
                <span className="text-sm">Career</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-100 border border-purple-200 rounded" />
                <span className="text-sm">Specialization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-100 border border-orange-200 rounded" />
                <span className="text-sm">Certification</span>
              </div>
            </div>

            {/* Interactive Roadmap */}
            <div className="relative bg-white rounded-xl border shadow-lg p-8 min-h-[1000px] overflow-hidden">
              {/* Flow Direction Guide */}
              <div className="absolute top-4 left-4 flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowRight className="w-4 h-4" />
                <span>Career Flow: Education → Specialization → Leadership</span>
              </div>
              
              {renderConnections()}
              {Object.values(engineeringPaths).map(renderNode)}
              
              {/* Floating Info Panel */}
              {activeNode && (
                <div className="absolute top-4 right-4 w-80">
                  <Card className="bg-white/95 backdrop-blur border-2 border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {engineeringPaths[activeNode].icon}
                        {engineeringPaths[activeNode].title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {engineeringPaths[activeNode].description}
                      </p>
                      
                      {engineeringPaths[activeNode].nextPaths.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Next Options:</h4>
                          <div className="space-y-1">
                            {engineeringPaths[activeNode].nextPaths.map(pathId => (
                              <div 
                                key={pathId}
                                className="flex items-center gap-2 text-sm p-2 rounded bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                                onClick={() => setActiveNode(pathId)}
                              >
                                {engineeringPaths[pathId]?.icon}
                                {engineeringPaths[pathId]?.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Placeholder for other streams */}
          <TabsContent value="medicine">
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold mb-4">Medicine Roadmap</h3>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="commerce">
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold mb-4">Commerce Roadmap</h3>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="arts">
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold mb-4">Arts Roadmap</h3>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Get Personalized Plan
          </Button>
          <Button variant="outline" size="lg">
            Download Roadmap
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareerRoadmapPage;