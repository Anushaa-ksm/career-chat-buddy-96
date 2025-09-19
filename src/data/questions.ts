import { QuizQuestion } from '@/types/quiz';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "Do you enjoy solving math puzzles and logical problems?",
    options: [
      {
        text: "Yes, I love them!",
        scores: { engineering: 25, medicine: 10, arts: 5, commerce: 15 }
      },
      {
        text: "Sometimes, if they're interesting",
        scores: { engineering: 15, medicine: 15, arts: 10, commerce: 20 }
      },
      {
        text: "Not really my thing",
        scores: { engineering: 5, medicine: 10, arts: 25, commerce: 15 }
      }
    ]
  },
  {
    id: 2,
    text: "When you see someone hurt, what's your first instinct?",
    options: [
      {
        text: "Help them immediately and assess their condition",
        scores: { engineering: 10, medicine: 30, arts: 15, commerce: 10 }
      },
      {
        text: "Call for professional help",
        scores: { engineering: 15, medicine: 20, arts: 10, commerce: 20 }
      },
      {
        text: "Comfort them emotionally",
        scores: { engineering: 5, medicine: 15, arts: 25, commerce: 15 }
      }
    ]
  },
  {
    id: 3,
    text: "What type of content do you enjoy creating most?",
    options: [
      {
        text: "Digital art, music, or stories",
        scores: { engineering: 10, medicine: 5, arts: 30, commerce: 10 }
      },
      {
        text: "Business plans or marketing content",
        scores: { engineering: 10, medicine: 5, arts: 15, commerce: 30 }
      },
      {
        text: "Technical tutorials or how-to guides",
        scores: { engineering: 25, medicine: 15, arts: 10, commerce: 10 }
      }
    ]
  },
  {
    id: 4,
    text: "In a team project, what role do you naturally take?",
    options: [
      {
        text: "The leader who organizes and delegates",
        scores: { engineering: 15, medicine: 20, arts: 10, commerce: 30 }
      },
      {
        text: "The problem-solver who finds technical solutions",
        scores: { engineering: 30, medicine: 15, arts: 10, commerce: 10 }
      },
      {
        text: "The creative who comes up with innovative ideas",
        scores: { engineering: 10, medicine: 10, arts: 30, commerce: 15 }
      }
    ]
  },
  {
    id: 5,
    text: "What motivates you most in your work/studies?",
    options: [
      {
        text: "Making a positive impact on people's lives",
        scores: { engineering: 10, medicine: 30, arts: 20, commerce: 15 }
      },
      {
        text: "Building something innovative and useful",
        scores: { engineering: 30, medicine: 10, arts: 15, commerce: 20 }
      },
      {
        text: "Expressing creativity and inspiring others",
        scores: { engineering: 5, medicine: 10, arts: 30, commerce: 15 }
      }
    ]
  },
  {
    id: 6,
    text: "How do you prefer to spend your free time?",
    options: [
      {
        text: "Reading, gaming, or working on tech projects",
        scores: { engineering: 25, medicine: 15, arts: 15, commerce: 10 }
      },
      {
        text: "Volunteering or helping others in your community",
        scores: { engineering: 10, medicine: 25, arts: 20, commerce: 15 }
      },
      {
        text: "Creating art, music, or starting side businesses",
        scores: { engineering: 10, medicine: 5, arts: 25, commerce: 25 }
      }
    ]
  },
  {
    id: 7,
    text: "What's your dream work environment?",
    options: [
      {
        text: "A modern office with the latest technology",
        scores: { engineering: 25, medicine: 10, arts: 10, commerce: 20 }
      },
      {
        text: "A hospital or clinic where I can help patients",
        scores: { engineering: 5, medicine: 30, arts: 10, commerce: 5 }
      },
      {
        text: "A creative studio or flexible workspace",
        scores: { engineering: 10, medicine: 5, arts: 25, commerce: 25 }
      }
    ]
  }
];

export const CAREER_PATHS = {
  engineering: {
    careers: ['Software Engineer', 'Data Scientist', 'Robotics Engineer', 'AI Specialist', 'Civil Engineer'],
    nextSteps: [
      'Learn Python or JavaScript programming',
      'Join a coding bootcamp or CS course',
      'Build projects on GitHub',
      'Participate in hackathons',
      'Consider internships at tech companies'
    ],
    color: '#22C55E'
  },
  medicine: {
    careers: ['Doctor', 'Surgeon', 'Researcher', 'Biotechnologist', 'Pharmacist'],
    nextSteps: [
      'Prepare for NEET or medical entrance exams',
      'Excel in Biology and Chemistry',
      'Volunteer at hospitals or clinics',
      'Join medical olympiads',
      'Consider pre-med programs'
    ],
    color: '#EF4444'
  },
  arts: {
    careers: ['Graphic Designer', 'Writer', 'Filmmaker', 'Musician', 'Art Director'],
    nextSteps: [
      'Build a portfolio of your creative work',
      'Learn design software (Photoshop, Illustrator)',
      'Take art or creative writing classes',
      'Participate in art exhibitions or contests',
      'Network with other artists and creators'
    ],
    color: '#F59E0B'
  },
  commerce: {
    careers: ['Business Analyst', 'Marketing Manager', 'Entrepreneur', 'Financial Advisor', 'CEO'],
    nextSteps: [
      'Learn about business fundamentals',
      'Start a small business or side project',
      'Take courses in marketing or finance',
      'Join business competitions',
      'Network with entrepreneurs and business leaders'
    ],
    color: '#3B82F6'
  }
};