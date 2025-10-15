export type Domain = {
  id: string;
  name: string;
  description: string;
  icon: string; // Using string for icon name from lucide-react
};

export const domains: Domain[] = [
  { id: "1", name: "Product Management", description: "Envisioning, building, and managing products that customers love.", icon: "Briefcase" },
  { id: "2", name: "Venture Capital", description: "Understanding the world of startup funding and investment strategies.", icon: "DollarSign" },
  { id: "3", name: "Innovation & Ideation", description: "Cultivating and validating groundbreaking business ideas.", icon: "Lightbulb" },
  { id: "4", name: "Business Strategy", description: "Developing frameworks for sustainable growth and market leadership.", icon: "Shield" },
  { id: "5", name: "Marketing & Growth", description: "Mastering the art of user acquisition and brand building.", icon: "Megaphone" },
  { id: "6", name: "Deep Tech", description: "Leveraging cutting-edge technology for disruptive solutions.", icon: "BrainCircuit" },
];

export type Event = {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "Workshop" | "Talk" | "Competition" | "Meetup";
  imageId: string;
};

export const events: Event[] = [
  {
    id: "1",
    date: "OCT 05, 2024",
    title: "Startup Idea Pitching Competition",
    description: "Pitch your revolutionary idea to a panel of investors and industry leaders.",
    type: "Competition",
    imageId: "event-1",
  },
  {
    id: "2",
    date: "OCT 19, 2024",
    title: "Fireside Chat with a Unicorn Founder",
    description: "An exclusive talk with the founder of a billion-dollar startup on their journey.",
    type: "Talk",
    imageId: "event-2",
  },
  {
    id: "3",
    date: "NOV 02, 2024",
    title: "Business Model Canvas Workshop",
    description: "A hands-on workshop to structure and refine your business ideas.",
    type: "Workshop",
    imageId: "event-3",
  },
];

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  imageId: string;
  socials: {
    linkedin: string;
    github: string;
    twitter?: string;
  };
  email?: string;
  phone?: string;
};

export const teamMembers: TeamMember[] = [
  { id: "1", name: "Alex Johnson", role: "President", imageId: "team-1", socials: { linkedin: "#", github: "#" } },
  { id: "2", name: "Brenda Smith", role: "Vice President", imageId: "team-2", socials: { linkedin: "#", github: "#" } },
  { id: "3", name: "Charlie Brown", role: "Head of Innovation", imageId: "team-3", socials: { linkedin: "#", github: "#" } },
  { id: "4", name: "David Williams", role: "Head of Marketing", imageId: "team-4", socials: { linkedin: "#", github: "#" } },
  { id: "5", name: "Eva Green", role: "Head of Events", imageId: "team-5", socials: { linkedin: "#", github: "#" } },
  { id: "6", name: "Frank Miller", role: "Head of Ventures", imageId: "team-6", socials: { linkedin: "#", github: "#" } },
  { id: "7", name: "Grace Lee", role: "Design Lead", imageId: "team-7", socials: { linkedin: "#", github: "#" } },
  { id: "8", name: "Henry Wilson", role: "Community Manager", imageId: "team-8", socials: { linkedin: "#", github: "#" } },
];

export type BoardMember = {
  id: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  linkedin?: string;
};

export const boardRoom: BoardMember[] = [
  {
    id: 'b1',
    name: 'Rudra Thacker',
    role: 'Managing Director (M.D)',
    email: 'rudrathacker.csamcc25@adaniuni.ac.in',
    phone: '+91 91047 41471',
    linkedin: 'Rudra Thacker',
  },
  {
    id: 'b2',
    name: 'Mahir Sujalkumar Shah',
    role: 'Chief Technical Officer (C.T.O)',
    email: 'MahirShah.CSAMCC25@adaniuni.ac.in',
    phone: '+91 99134 62205',
    linkedin: 'Mahir Shah',
  },
  {
    id: 'b3',
    name: 'Mann Shah',
    role: 'Chief Financial Officer (C.F.O)',
    email: 'mannshah.ict25@adaniuni.ac.in',
    phone: '+91 75740 00632',
    linkedin: 'Mann Shah',
  },
  {
    id: 'b4',
    name: 'Divyanshi Gohil',
    role: 'Chief Communication Officer (C.C.O)',
    email: 'divyanshibagohil.csamcc25@adaniuni.ac.in',
    phone: '94096 39972',
    linkedin: 'Divyanshi Gohil',
  },
  {
    id: 'b5',
    name: 'Yesha Desai',
    role: 'Chief Marketing Officer (C.M.O)',
    email: 'yeshadesai.csamcc25@adaniuni.ac.in',
    phone: '+91 91047 41471',
    linkedin: 'Yesha Desai',
  },
  {
    id: 'b6',
    name: 'Khushi Hiteshbhai Savaliya',
    role: 'Event Managing Officer (E.M.O)',
    email: 'KHUSHISAVALIYA.ICT25@adaniuni.ac.in',
    phone: '63597 36074',
    linkedin: 'Khushi Savaliya',
  },
];
