import google from "../assets/logos/google.svg";
import microsoft from "../assets/logos/microsoft.svg";
import meta from "../assets/logos/meta.png";
import netflix from "../assets/logos/netflix.png";
import spotify from "../assets/logos/spotify.png";

const jobs = [
  {
    id: 1,
    company: "Google",
    logo: google,
    title: "Frontend React Developer",
    location: "Bangalore",
    type: "Full Time",
    salary: "₹18 LPA",
    experience: "2+ Years",
    category: "Frontend Development",

    description:
      "We are looking for a passionate React Developer to build scalable web applications using modern JavaScript technologies and React.js.",

    responsibilities: [
      "Build reusable React components",
      "Develop responsive web pages",
      "Integrate REST APIs",
      "Optimize application performance",
      "Collaborate with UI/UX designers",
    ],

    skills: [
      "React",
      "JavaScript",
      "HTML5",
      "CSS3",
      "REST API",
      "Git",
    ],
  },

  {
    id: 2,
    company: "Microsoft",
    logo: microsoft,
    title: "MERN Stack Developer",
    location: "Hyderabad",
    type: "Remote",
    salary: "₹20 LPA",
    experience: "3+ Years",
    category: "Full Stack",

    description:
      "Build enterprise-level MERN applications with secure authentication and scalable backend architecture.",

    responsibilities: [
      "Develop REST APIs",
      "Build React frontend",
      "Manage MongoDB database",
      "Implement JWT Authentication",
      "Write clean reusable code",
    ],

    skills: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "JWT",
      "GitHub",
    ],
  },

  {
    id: 3,
    company: "Meta",
    logo: meta,
    title: "UI / UX Designer",
    location: "Remote",
    type: "Full Time",
    salary: "₹15 LPA",
    experience: "2+ Years",
    category: "UI / UX",

    description:
      "Design beautiful and user-friendly interfaces with modern design principles and excellent user experience.",

    responsibilities: [
      "Design mobile & web UI",
      "Create wireframes",
      "Build prototypes",
      "Collaborate with developers",
      "Improve user experience",
    ],

    skills: [
      "Figma",
      "Adobe XD",
      "Photoshop",
      "Illustrator",
      "Prototyping",
    ],
  },

  {
    id: 4,
    company: "Netflix",
    logo: netflix,
    title: "Node.js Backend Developer",
    location: "Mumbai",
    type: "Hybrid",
    salary: "₹22 LPA",
    experience: "4+ Years",
    category: "Backend",

    description:
      "Develop secure backend services, REST APIs and scalable microservices using Node.js and Express.",

    responsibilities: [
      "Build backend APIs",
      "Database design",
      "Authentication & Authorization",
      "Performance optimization",
      "Testing & debugging",
    ],

    skills: [
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Redis",
      "Docker",
    ],
  },

  {
    id: 5,
    company: "Spotify",
    logo: spotify,
    title: "React Developer",
    location: "Pune",
    type: "Remote",
    salary: "₹17 LPA",
    experience: "1+ Years",
    category: "Frontend Development",

    description:
      "Develop modern React applications with responsive UI, reusable components and API integrations.",

    responsibilities: [
      "Build React UI",
      "Consume REST APIs",
      "Responsive Design",
      "Bug Fixing",
      "Code Reviews",
    ],

    skills: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Bootstrap",
      "Git",
    ],
  },
];

export default jobs;