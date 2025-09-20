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
    bachelor: {
      id: 'bachelor',
      title: 'B.Tech/B.E.',
      description: 'Bachelor of Engineering - Foundation',
      type: 'education',
      duration: '4 years',
      difficulty: 'Medium',
      nextPaths: ['job-entry', 'masters', 'certifications'],
      icon: <GraduationCap className="w-6 h-6" />,
      position: { x: 50, y: 10 }
    },
    'job-entry': {
      id: 'job-entry',
      title: 'Software Engineer',
      description: 'Entry-level development position',
      type: 'job',
      duration: '2-3 years',
      salary: '₹4-8 LPA',
      difficulty: 'Easy',
      nextPaths: ['senior-dev', 'specializations-job'],
      icon: <Code className="w-6 h-6" />,
      position: { x: 20, y: 40 }
    },
    masters: {
      id: 'masters',
      title: 'M.Tech/MS',
      description: 'Masters in Engineering/Computer Science',
      type: 'education',
      duration: '2 years',
      difficulty: 'Hard',
      nextPaths: ['senior-dev', 'research', 'phd'],
      icon: <Award className="w-6 h-6" />,
      position: { x: 50, y: 40 }
    },
    certifications: {
      id: 'certifications',
      title: 'Cloud Certifications',
      description: 'AWS, Azure, Google Cloud',
      type: 'certification',
      duration: '3-6 months',
      difficulty: 'Medium',
      nextPaths: ['cloud-engineer', 'devops'],
      icon: <Globe className="w-6 h-6" />,
      position: { x: 80, y: 40 }
    },
    'senior-dev': {
      id: 'senior-dev',
      title: 'Senior Developer',
      description: 'Lead development projects',
      type: 'job',
      salary: '₹8-18 LPA',
      difficulty: 'Medium',
      nextPaths: ['tech-lead', 'architect', 'product-manager'],
      icon: <TrendingUp className="w-6 h-6" />,
      position: { x: 35, y: 70 }
    },
    'specializations-job': {
      id: 'specializations-job',
      title: 'AI/ML Specialization',
      description: 'Machine Learning & Data Science',
      type: 'specialization',
      duration: '6-12 months',
      difficulty: 'Hard',
      nextPaths: ['data-scientist', 'ml-engineer'],
      icon: <Cpu className="w-6 h-6" />,
      position: { x: 10, y: 70 }
    },
    'cloud-engineer': {
      id: 'cloud-engineer',
      title: 'Cloud Engineer',
      description: 'Cloud infrastructure specialist',
      type: 'job',
      salary: '₹10-20 LPA',
      difficulty: 'Medium',
      nextPaths: ['cloud-architect', 'devops-lead'],
      icon: <Database className="w-6 h-6" />,
      position: { x: 80, y: 70 }
    },
    'tech-lead': {
      id: 'tech-lead',
      title: 'Tech Lead',
      description: 'Technical team leadership',
      type: 'job',
      salary: '₹15-30 LPA',
      difficulty: 'Hard',
      nextPaths: ['architect', 'engineering-manager', 'cto'],
      icon: <Users className="w-6 h-6" />,
      position: { x: 35, y: 100 }
    },
    architect: {
      id: 'architect',
      title: 'Solution Architect',
      description: 'Design system architecture',
      type: 'job',
      salary: '₹20-45 LPA',
      difficulty: 'Hard',
      nextPaths: ['chief-architect', 'consultant'],
      icon: <Building2 className="w-6 h-6" />,
      position: { x: 50, y: 130 }
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
            <div className="relative bg-white rounded-xl border shadow-lg p-8 min-h-[800px] overflow-hidden">
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