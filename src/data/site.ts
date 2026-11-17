// All your personal content lives here. Edit this file to update the whole site.

export const profile = {
  name: 'NiYo Hubert',
  firstName: 'Hubert',
  photo: '/NiYo-Hubert.jpg',
  // The three title lines shown under your name in the hero
  titleLines: [
    'Final-year student in Bachelor of Business and ICT',
    'Software, AI Systems Engineering',
    'Co-founder of JEHE TECH team',
  ],
  pitch:
    'I build modern, reliable software and AI-driven systems that turn ideas into products people actually use.',
  // TODO: replace these placeholders with your real details
  email: 'hubertniyo2@gmail.com',
  phone: '+250 789 182 449',
  whatsapp: '250789182449', // digits only, with country code
  location: 'Kigali, Rwanda',
}

export const socials = {
  github: 'https://github.com/Hubert127',
  linkedin: 'https://www.linkedin.com/in/Hubert NIYOMUGABO',
  instagram: 'https://www.instagram.com/niyo_hubert',
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'Gallery', to: '/gallery' },
]

export const skills = [
  'React',
  'TypeScript',
  'JavaScript',
  'Tailwind CSS',
  'Vite',
  'Git & GitHub',
  'Python',
  'AI Systems',
  'Business Analysis',
  'plain HTML,CSS AND JAVASCRIPT',
  'SQL',
]

export const experience = [
  {
    role: 'Co-founder',
    org: 'JEHE TECH Co',
    period: 'Present',
    text: 'Co-leading a technology team that designs and delivers the Intelligent Systems and Predictable Models.',
  },
  {
    role: 'Bachelor of Business and ICT',
    org: 'Your University',
    period: 'Final year',
    text: 'Studying business and information technology with a focus on software and AI systems engineering and how can have the good impact to the economics and how can solve the real challenges we face with everyday.',
  },
   {
    role: 'AI & Robotics Hackathon Competition',
    org: 'Mount Kigali University',
    period: 'July 2026',
    text: 'As a JEHE TECH team we participated in this competition where we built UBUZIMA.ai which serves and help heath community workers to get the predictable disease obtained based on symptoms and the vitals taken from the patient through the IoT tool Kit we designed',
  },
   {
    role: 'Academic Internship',
    org: 'D.S.R Agency Ltd (DP WORLD)',
    period: 'May-August 2026',
    text: 'I did Academic internship at custom Agency where i worked on their customs declarations Rwanda electronic Single Window(ReSW).',
  },
]

export const projects = [
  {
    title: 'Project one',
    text: 'Short description of the problem it solves and what you built.',
    tags: ['React', 'TypeScript'],
    link: '#',
  },
  {
    title: 'Project two',
    text: 'Short description of the problem it solves and what you built.',
    tags: ['Python', 'AI'],
    link: '#',
  },
  {
    title: 'Project three',
    text: 'Short description of the problem it solves and what you built.',
    tags: ['Tailwind', 'Vite'],
    link: '#',
  },
]

export const gallery = [
  { src: '/NiYo-Hubert.jpg', caption: 'NiYo Hubert' },
  // Add more: { src: '/gallery/photo-2.jpg', caption: 'Caption' },
  { src: '/Ubuzimaai.jpeg', caption: 'Ubuzima.ai', wide: true },
  { src: '/Hubert_reward.jpeg', caption: 'NiYo Hubert' },
  { src: '/certificate_hachathon.jpeg', caption: 'Certificate of Participation' },
  { src: '/With_lectures.jpeg', caption: 'NiYo Hubert' },
]
