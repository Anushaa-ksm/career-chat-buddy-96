import { QuizQuestion } from '@/types/quiz';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Yes/No Questions (1-4)
  {
    id: 1,
    text: "Do you enjoy solving math and logic puzzles?",
    options: [
      {
        text: "Yes",
        scores: { engineering: 30, medicine: 15, arts: 5, commerce: 15 }
      },
      {
        text: "No",
        scores: { engineering: 5, medicine: 10, arts: 30, commerce: 20 }
      }
    ]
  },
  {
    id: 2,
    text: "Are you interested in helping people with health issues?",
    options: [
      {
        text: "Yes",
        scores: { engineering: 10, medicine: 35, arts: 15, commerce: 10 }
      },
      {
        text: "No",
        scores: { engineering: 25, medicine: 5, arts: 25, commerce: 25 }
      }
    ]
  },
  {
    id: 3,
    text: "Do you love creating art, music, or stories?",
    options: [
      {
        text: "Yes",
        scores: { engineering: 10, medicine: 5, arts: 35, commerce: 15 }
      },
      {
        text: "No",
        scores: { engineering: 25, medicine: 25, arts: 5, commerce: 25 }
      }
    ]
  },
  {
    id: 4,
    text: "Are you interested in starting your own business?",
    options: [
      {
        text: "Yes",
        scores: { engineering: 15, medicine: 10, arts: 20, commerce: 35 }
      },
      {
        text: "No",
        scores: { engineering: 25, medicine: 25, arts: 25, commerce: 5 }
      }
    ]
  },
  // Multiple Choice Questions (5-8)
  {
    id: 5,
    text: "What's your preferred learning style?",
    options: [
      {
        text: "Hands-on experiments and building things",
        scores: { engineering: 30, medicine: 20, arts: 10, commerce: 15 }
      },
      {
        text: "Reading research papers and case studies",
        scores: { engineering: 15, medicine: 30, arts: 10, commerce: 20 }
      },
      {
        text: "Visual and creative exploration",
        scores: { engineering: 10, medicine: 10, arts: 30, commerce: 15 }
      },
      {
        text: "Networking and real-world applications",
        scores: { engineering: 15, medicine: 15, arts: 15, commerce: 30 }
      }
    ]
  },
  {
    id: 6,
    text: "Which subject combination appeals to you most?",
    options: [
      {
        text: "Physics, Math, and Computer Science",
        scores: { engineering: 35, medicine: 10, arts: 5, commerce: 15 }
      },
      {
        text: "Biology, Chemistry, and Physics",
        scores: { engineering: 15, medicine: 35, arts: 5, commerce: 10 }
      },
      {
        text: "Literature, History, and Psychology",
        scores: { engineering: 5, medicine: 15, arts: 35, commerce: 20 }
      },
      {
        text: "Economics, Accounting, and Marketing",
        scores: { engineering: 10, medicine: 5, arts: 15, commerce: 35 }
      }
    ]
  },
  {
    id: 7,
    text: "What motivates you most?",
    options: [
      {
        text: "Solving complex technical problems",
        scores: { engineering: 35, medicine: 15, arts: 10, commerce: 15 }
      },
      {
        text: "Making a difference in people's health and lives",
        scores: { engineering: 10, medicine: 35, arts: 20, commerce: 10 }
      },
      {
        text: "Expressing creativity and inspiring others",
        scores: { engineering: 10, medicine: 10, arts: 35, commerce: 20 }
      },
      {
        text: "Building successful ventures and leading teams",
        scores: { engineering: 15, medicine: 10, arts: 15, commerce: 35 }
      }
    ]
  },
  {
    id: 8,
    text: "What's your ideal work environment?",
    options: [
      {
        text: "Tech labs with cutting-edge equipment",
        scores: { engineering: 35, medicine: 15, arts: 10, commerce: 15 }
      },
      {
        text: "Hospitals and research facilities",
        scores: { engineering: 10, medicine: 35, arts: 10, commerce: 10 }
      },
      {
        text: "Creative studios and artistic spaces",
        scores: { engineering: 10, medicine: 10, arts: 35, commerce: 20 }
      },
      {
        text: "Corporate offices and meeting rooms",
        scores: { engineering: 15, medicine: 10, arts: 15, commerce: 35 }
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