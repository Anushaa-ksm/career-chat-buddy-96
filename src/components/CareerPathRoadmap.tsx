import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Briefcase, TrendingUp, BookOpen, Award, Users } from 'lucide-react';

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  type: 'education' | 'job' | 'specialization';
  duration?: string;
  salary?: string;
  nextOptions: string[];
  icon: React.ReactNode;
}

interface CareerPathRoadmapProps {
  stream: string;
}

export const CareerPathRoadmap = ({ stream }: CareerPathRoadmapProps) => {
  const [selectedPath, setSelectedPath] = useState<string>('bachelor');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['bachelor']));

  const engineeringRoadmap: Record<string, RoadmapNode> = {
    bachelor: {
      id: 'bachelor',
      title: 'B.Tech/B.E. Engineering',
      description: 'Foundation in engineering principles',
      type: 'education',
      duration: '4 years',
      nextOptions: ['masters', 'job-entry', 'certifications'],
      icon: <GraduationCap className="w-5 h-5" />
    },
    masters: {
      id: 'masters',
      title: 'M.Tech/MS',
      description: 'Specialized engineering knowledge',
      type: 'education',
      duration: '2 years',
      nextOptions: ['phd', 'job-senior', 'research'],
      icon: <Award className="w-5 h-5" />
    },
    phd: {
      id: 'phd',
      title: 'Ph.D.',
      description: 'Research and innovation',
      type: 'education',
      duration: '3-5 years',
      nextOptions: ['professor', 'research-scientist'],
      icon: <BookOpen className="w-5 h-5" />
    },
    'job-entry': {
      id: 'job-entry',
      title: 'Software Engineer',
      description: 'Entry-level development role',
      type: 'job',
      salary: '₹4-8 LPA',
      nextOptions: ['job-senior', 'specializations'],
      icon: <Briefcase className="w-5 h-5" />
    },
    'job-senior': {
      id: 'job-senior',
      title: 'Senior Engineer',
      description: 'Lead development projects',
      type: 'job',
      salary: '₹8-18 LPA',
      nextOptions: ['tech-lead', 'architect', 'manager'],
      icon: <TrendingUp className="w-5 h-5" />
    },
    'tech-lead': {
      id: 'tech-lead',
      title: 'Tech Lead',
      description: 'Technical leadership role',
      type: 'job',
      salary: '₹15-30 LPA',
      nextOptions: ['architect', 'manager', 'director'],
      icon: <Users className="w-5 h-5" />
    },
    certifications: {
      id: 'certifications',
      title: 'Industry Certifications',
      description: 'AWS, Google Cloud, Microsoft',
      type: 'specialization',
      duration: '3-6 months',
      nextOptions: ['job-senior', 'freelance'],
      icon: <Award className="w-5 h-5" />
    },
    specializations: {
      id: 'specializations',
      title: 'Specializations',
      description: 'AI/ML, Data Science, DevOps',
      type: 'specialization',
      duration: '6-12 months',
      nextOptions: ['data-scientist', 'ml-engineer'],
      icon: <BookOpen className="w-5 h-5" />
    },
    'data-scientist': {
      id: 'data-scientist',
      title: 'Data Scientist',
      description: 'Analyze data for insights',
      type: 'job',
      salary: '₹10-25 LPA',
      nextOptions: ['senior-ds', 'consultant'],
      icon: <TrendingUp className="w-5 h-5" />
    },
    'ml-engineer': {
      id: 'ml-engineer',
      title: 'ML Engineer',
      description: 'Build AI/ML systems',
      type: 'job',
      salary: '₹12-30 LPA',
      nextOptions: ['ai-architect', 'research-scientist'],
      icon: <Briefcase className="w-5 h-5" />
    },
    architect: {
      id: 'architect',
      title: 'Solution Architect',
      description: 'Design system architecture',
      type: 'job',
      salary: '₹20-45 LPA',
      nextOptions: ['chief-architect', 'cto'],
      icon: <Award className="w-5 h-5" />
    },
    manager: {
      id: 'manager',
      title: 'Engineering Manager',
      description: 'Manage engineering teams',
      type: 'job',
      salary: '₹18-40 LPA',
      nextOptions: ['director', 'vp'],
      icon: <Users className="w-5 h-5" />
    }
  };

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'education': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'job': return 'bg-green-50 border-green-200 text-green-800';
      case 'specialization': return 'bg-purple-50 border-purple-200 text-purple-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const renderNode = (nodeId: string, level: number = 0) => {
    const node = engineeringRoadmap[nodeId];
    if (!node) return null;

    const isExpanded = expandedNodes.has(nodeId);
    const hasChildren = node.nextOptions.length > 0;

    return (
      <div key={nodeId} className="relative">
        {/* Connection Line */}
        {level > 0 && (
          <div className="absolute -top-6 left-1/2 w-0.5 h-6 bg-border transform -translate-x-1/2" />
        )}
        
        {/* Node Card */}
        <Card 
          className={`w-64 mx-auto cursor-pointer transition-all duration-300 hover:shadow-lg ${getNodeColor(node.type)} ${
            selectedPath === nodeId ? 'ring-2 ring-primary shadow-lg' : ''
          }`}
          onClick={() => {
            setSelectedPath(nodeId);
            if (hasChildren) toggleNode(nodeId);
          }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              {node.icon}
              {node.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground mb-2">{node.description}</p>
            <div className="flex flex-wrap gap-1">
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
              <Badge variant="secondary" className="text-xs capitalize">
                {node.type}
              </Badge>
            </div>
            {hasChildren && (
              <div className="mt-2 text-center">
                <Button variant="ghost" size="sm" className="text-xs">
                  {isExpanded ? '▼ Collapse' : '▶ Expand'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Children Nodes */}
        {isExpanded && hasChildren && (
          <div className="mt-8 relative">
            {/* Branching Lines */}
            <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-border transform -translate-x-1/2" />
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
              {node.nextOptions.map((childId, index) => (
                <div key={childId} className="relative">
                  {/* Vertical line to child */}
                  <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-border transform -translate-x-1/2" />
                  {renderNode(childId, level + 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          🎯 {stream} Career Roadmap
        </h2>
        <p className="text-muted-foreground">
          Explore your career journey with multiple pathways
        </p>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 flex-wrap">
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
      </div>

      {/* Interactive Roadmap */}
      <div className="min-h-screen overflow-x-auto pb-20">
        <div className="min-w-max p-8">
          {renderNode('bachelor')}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <Button size="lg" className="font-semibold">
          Get Personalized Guidance
        </Button>
      </div>
    </div>
  );
};