export interface EducationItem {
  id: string;
  qualification: string;
  course: string;
  institution: string;
  duration: string;
  percentage: string;
  status: string;
  highlight?: boolean;
}

export interface SkillGroup {
  id: string;
  category: string;
  filterGroup: 'programming' | 'frontend' | 'data' | 'tools-soft';
  description: string;
  skills: {
    name: string;
    note?: string;
    context: string;
  }[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  features: string[];
  dashboards: string[];
  architectureSummary: string;
}

export interface CertificationItem {
  id: string;
  index: string;
  title: string;
  issuer: string;
  date: string;
  type: 'Certification' | 'Participation';
  category: 'technical' | 'communication';
  summary: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  highlights: string[];
  category: string;
}

export const RESUME_DATA = {
  personal: {
    name: 'ANU K',
    headline: 'Aspiring Full Stack Developer',
    subHeadline: 'B.Sc. Computer Science (Artificial Intelligence & Data Science) Student',
    fullHeadline:
      'Aspiring Full Stack Developer | B.Sc. Computer Science (Artificial Intelligence & Data Science) Student',
    location: 'Tiruppur, Tamil Nadu',
    careerObjective:
      'Motivated and enthusiastic B.Sc. Computer Science (Artificial Intelligence & Data Science) student with a strong passion for technology and innovation. Seeking an entry-level role where I can apply my technical knowledge, solve real-world problems, continuously develop my skills, and contribute effectively to organizational success.',
    contact: {
      phone: '9600243246',
      phoneHref: 'tel:9600243246',
      email: 'anukumar16052007@gmail.com',
      emailHref: 'mailto:anukumar16052007@gmail.com',
      github: 'https://github.com/anukumar16052007-rgb',
      githubHandle: 'anukumar16052007-rgb',
      linkedin: 'https://www.linkedin.com/in/anu-k-642994431',
      linkedinHandle: 'anu-k-642994431',
    },
  },

  education: [
    {
      id: 'bsc-cs-aids',
      qualification: "Bachelor's Degree",
      course: 'Bachelor of Computer Science (Artificial Intelligence & Data Science)',
      institution: 'Shree Venkateshwara Arts and Science College, Tiruppur',
      duration: '2024 – Pursuing',
      percentage: '69.45%',
      status: 'Currently Pursuing',
      highlight: true,
    },
    {
      id: 'hsc-2024',
      qualification: 'Higher Secondary Certificate (HSC)',
      course: 'Higher Secondary Education (HSC)',
      institution: 'Jaivabai Girls Higher Secondary School',
      duration: '2024',
      percentage: '64.5%',
      status: 'Completed',
      highlight: false,
    },
    {
      id: 'sslc-2022',
      qualification: 'Secondary School Leaving Certificate (SSLC)',
      course: 'Secondary School Education (SSLC)',
      institution: 'Jaivabai Girls Higher Secondary School',
      duration: '2022',
      percentage: '59.4%',
      status: 'Completed',
      highlight: false,
    },
  ] as EducationItem[],

  skillGroups: [
    {
      id: 'programming',
      category: 'Programming',
      filterGroup: 'programming',
      description: 'Core programming languages and query foundations for application logic and data operations.',
      skills: [
        {
          name: 'Python (Basic)',
          note: 'Basic',
          context: 'Foundational scripting, backend logic, and Flask-based project integration',
        },
        {
          name: 'JavaScript',
          context: 'Interactive client-side logic, DOM manipulation, and asynchronous web workflows',
        },
        {
          name: 'SQL',
          context: 'Relational querying, structured schema interaction, and data retrieval',
        },
      ],
    },
    {
      id: 'framework',
      category: 'Framework',
      filterGroup: 'programming',
      description: 'Server-side web application framework utilized during full stack internship training.',
      skills: [
        {
          name: 'Django',
          context: 'Full stack web application development, routing, templates, and backend integration',
        },
      ],
    },
    {
      id: 'frontend',
      category: 'Frontend Development',
      filterGroup: 'frontend',
      description: 'Standards-compliant semantic markup and responsive layout styling across web interfaces.',
      skills: [
        {
          name: 'HTML',
          context: 'Semantic document structure, accessible forms, and multi-dashboard layouts',
        },
        {
          name: 'CSS',
          context: 'Responsive styling, adaptive layouts, and modern interface design',
        },
      ],
    },
    {
      id: 'database',
      category: 'Database',
      filterGroup: 'data',
      description: 'Relational database management system for persistent application data.',
      skills: [
        {
          name: 'MySQL',
          context: 'Structured relational storage for multi-role web platforms and records',
        },
      ],
    },
    {
      id: 'spreadsheet',
      category: 'Spreadsheet Software',
      filterGroup: 'data',
      description: 'Data organization, tabular tracking, and structured reporting.',
      skills: [
        {
          name: 'Microsoft Excel',
          context: 'Spreadsheet management, data tabulation, and structured analysis',
        },
      ],
    },
    {
      id: 'accounting',
      category: 'Accounting Software',
      filterGroup: 'data',
      description: 'Enterprise accounting and bookkeeping management platform.',
      skills: [
        {
          name: 'Tally ERP 9',
          context: 'Enterprise resource planning and financial accounting operations',
        },
      ],
    },
    {
      id: 'tools',
      category: 'Development Tools',
      filterGroup: 'tools-soft',
      description: 'Code authoring environment and version control workflow.',
      skills: [
        {
          name: 'Visual Studio Code (VS Code)',
          context: 'Primary integrated development environment for full stack engineering',
        },
        {
          name: 'GitHub',
          context: 'Source code hosting, repository management, and version control',
        },
      ],
    },
    {
      id: 'soft-skills',
      category: 'Soft Skills',
      filterGroup: 'tools-soft',
      description: 'Interpersonal, organizational, and collaborative strengths demonstrated in academic and JCI roles.',
      skills: [
        {
          name: 'Teamwork',
          context: 'Collaborating effectively across student, faculty, and development teams',
        },
        {
          name: 'Leadership',
          context: 'Demonstrated as Student Voice President – JCI coordinating student programs',
        },
        {
          name: 'Adaptability',
          context: 'Quickly learning new frameworks, tools, and real-world project workflows',
        },
      ],
    },
  ] as SkillGroup[],

  internship: {
    position: 'Full Stack Development Intern',
    company: 'Viz Web Solutions, Tiruppur',
    duration: 'May 2026 – July 2026',
    responsibilities: [
      'Completed practical training in Full Stack Development.',
      'Developed responsive web applications using HTML, CSS, JavaScript, and Django.',
      'Gained hands-on experience in frontend development, backend integration, and project deployment.',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Django'],
  },

  projects: [
    {
      id: 'road-hazard-system',
      index: '01',
      title: 'Road Hazard Complaint Management System',
      category: 'Civic Technology & Smart-City Web Application',
      description:
        'Developed a web-based Hazard Complaint Management System using HTML, CSS, and JavaScript. Implemented user authentication, complaint submission, GPS-based live location, image upload, map view, and complaint status tracking. Designed separate User and Government dashboards with a responsive interface for efficient complaint management.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      features: [
        'User authentication',
        'Complaint submission',
        'GPS-based live location',
        'Image upload',
        'Map view',
        'Complaint status tracking',
        'Separate User dashboard',
        'Separate Government dashboard',
        'Responsive interface',
      ],
      dashboards: ['User Dashboard', 'Government Dashboard'],
      architectureSummary:
        'Dual-portal civic reporting architecture allowing citizens to authenticate, capture GPS coordinates and photographic evidence of road hazards, visualize reports on an interactive map view, and track resolution progress managed through a dedicated Government dashboard.',
    },
    {
      id: 'ai-placement-readiness',
      index: '02',
      title: 'AI Placement Readiness Platform',
      category: 'AI-Assisted Career Readiness & Multi-Role Evaluation Platform',
      description:
        'Developed a web-based platform with dedicated dashboards for Students, Faculty, Admin, and Companies. Integrated AI-based Resume Analysis, Skill Gap Analysis, and Placement Readiness Score to evaluate student performance. Built modules for aptitude tests, coding assessments, mock interviews, company preparation, and performance analytics.',
      technologies: [
        'HTML',
        'CSS',
        'JavaScript',
        'Node.js',
        'Express.js',
        'MySQL',
        'Python (Flask)',
      ],
      features: [
        'Student dashboard',
        'Faculty dashboard',
        'Admin dashboard',
        'Company dashboard',
        'AI-based Resume Analysis',
        'Skill Gap Analysis',
        'Placement Readiness Score',
        'Aptitude tests',
        'Coding assessments',
        'Mock interviews',
        'Company preparation',
        'Performance analytics',
      ],
      dashboards: ['Student Dashboard', 'Faculty Dashboard', 'Admin Dashboard', 'Company Dashboard'],
      architectureSummary:
        'Multi-role full stack web platform combining Node.js, Express.js, MySQL, and Python (Flask) to deliver AI-based Resume Analysis, Skill Gap Analysis, and a unified Placement Readiness Score alongside structured aptitude, coding, and mock interview assessment modules.',
    },
  ] as ProjectItem[],

  certifications: [
    {
      id: 'cert-1',
      index: '01',
      title: 'Overview of English Language Communication',
      issuer: 'Naan Mudhalvan Scheme (TNSDC)',
      date: 'October 2025',
      type: 'Certification',
      category: 'communication',
      summary: 'Professional communication foundations under the Tamil Nadu Skill Development Corporation (Naan Mudhalvan Scheme).',
    },
    {
      id: 'cert-2',
      index: '02',
      title: 'Fundamentals of Web Development',
      issuer: 'Edunet IBM Skills Build',
      date: 'November 2025',
      type: 'Certification',
      category: 'technical',
      summary: 'Core web development principles, architecture, and modern browser technologies through Edunet IBM Skills Build.',
    },
    {
      id: 'cert-3',
      index: '03',
      title: 'Front End Development',
      issuer: 'Naan Mudhalvan Scheme (TNSDC), Oracle',
      date: 'July 2026',
      type: 'Certification',
      category: 'technical',
      summary: 'Frontend engineering and user interface implementation delivered through Naan Mudhalvan Scheme (TNSDC) and Oracle.',
    },
    {
      id: 'cert-4',
      index: '04',
      title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
      issuer: 'Oracle University',
      date: 'February 2026',
      type: 'Certification',
      category: 'technical',
      summary: 'Certified associate credential in Artificial Intelligence foundations and cloud concepts issued by Oracle University.',
    },
    {
      id: 'cert-5',
      index: '05',
      title: 'TECHKRITHI’25',
      issuer: 'Participant, VET Institute of Arts and Science',
      date: 'August 2025',
      type: 'Participation',
      category: 'technical',
      summary: 'Active participant in TECHKRITHI’25 technical symposium hosted at VET Institute of Arts and Science.',
    },
    {
      id: 'cert-6',
      index: '06',
      title: 'TERF Academy FEST2K24',
      issuer: 'Certificate of Participation',
      date: '2024',
      type: 'Participation',
      category: 'communication',
      summary: 'Awarded Certificate of Participation at TERF Academy FEST2K24.',
    },
    {
      id: 'cert-7',
      index: '07',
      title: 'Effective Public Communication',
      issuer: 'Certificate of Participation organized by Junior Chamber International (JCI)',
      date: 'Documented',
      type: 'Participation',
      category: 'communication',
      summary: 'Completed public speaking and communication program organized by Junior Chamber International (JCI).',
    },
  ] as CertificationItem[],

  leadership: {
    role: 'Student Voice President – JCI',
    organization: 'Junior Chamber International (JCI)',
    activities: [
      'Coordinated student events and leadership activities.',
      'Collaborated with faculty members and students to organize programs.',
    ],
  },

  activities: [
    {
      id: 'karate',
      title: 'Karate',
      subtitle: 'Athletic Championship & Martial Arts Discipline',
      category: 'Sports & Martial Arts',
      highlights: ['District Karate Champion – 2023.', 'Holds a Black Belt.'],
    },
    {
      id: 'dance',
      title: 'Dance',
      subtitle: 'Cultural Performance & Stage Participation',
      category: 'Performing Arts',
      highlights: ['Skilled in Dance.', 'Actively participated in cultural events.'],
    },
    {
      id: 'craft-making',
      title: 'Craft Making',
      subtitle: 'Applied Creativity & Handcrafted Design',
      category: 'Creative Arts',
      highlights: ['Interested in Craft Making and creative art activities.'],
    },
  ] as ActivityItem[],

  languages: [
    {
      name: 'Tamil',
      script: 'தமிழ்',
    },
    {
      name: 'English',
      script: 'English',
    },
    {
      name: 'Kannada',
      script: 'ಕನ್ನಡ',
    },
  ],

  declaration: {
    text: 'I hereby declare that the above information is true to the best of my knowledge and belief.',
    fields: [
      { label: 'Date', value: '—' },
      { label: 'Place', value: '—' },
      { label: 'Signature', value: 'ANU K' },
    ],
  },
};
