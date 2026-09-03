export interface Skill {
  id: string;
  name: string;
  description: string;
  uses: string[];
  projects: { name: string; url: string }[];
}

export const skillsList: Skill[] = [
  {
    id: '01',
    name: 'Python',
    description: 'Architecting efficient, scalable backend systems and AI pipelines using Python.',
    uses: ['Core backend development', 'AI/ML scripting'],
    projects: []
  },
  {
    id: '02',
    name: 'C++',
    description: 'Building performance-critical components and low-level systems with C++.',
    uses: ['High-performance computing', 'Algorithm optimization'],
    projects: []
  },
  {
    id: '03',
    name: 'JavaScript',
    description: 'The language of the web. Crafting interactive, dynamic experiences that live in the browser.',
    uses: ['Frontend logic', 'DOM manipulation'],
    projects: []
  },
  {
    id: '04',
    name: 'TypeScript',
    description: 'Bringing type safety and scalable architecture to complex JavaScript applications.',
    uses: ['Large-scale web apps', 'Strict type checking'],
    projects: []
  },
  {
    id: '05',
    name: 'SQL',
    description: 'Designing structured schemas and managing high-performance data queries.',
    uses: ['Database architecture', 'Complex queries'],
    projects: []
  },
  {
    id: '06',
    name: 'HTML',
    description: 'Crafting semantic and accessible document structures for the modern web.',
    uses: ['Web semantics', 'SEO structure'],
    projects: []
  },
  {
    id: '07',
    name: 'CSS',
    description: 'Styling interactive, responsive, and beautiful user interfaces.',
    uses: ['Layouts and animations', 'Responsive design'],
    projects: []
  },
  {
    id: '08',
    name: 'React',
    description: 'Building component-driven user interfaces with state-of-the-art declarative paradigms.',
    uses: ['Single Page Applications', 'Complex UI states'],
    projects: []
  },
  {
    id: '09',
    name: 'Next.js',
    description: 'Architecting production-grade React applications with server-side rendering and static generation.',
    uses: ['Full-stack React', 'SEO-friendly routing'],
    projects: []
  },
  {
    id: '10',
    name: 'React Native',
    description: 'Developing cross-platform mobile applications with native performance.',
    uses: ['iOS & Android apps', 'Mobile UI'],
    projects: []
  },
  {
    id: '11',
    name: 'Node.js',
    description: 'Building scalable network applications and fast backend microservices.',
    uses: ['Server-side scripting', 'API gateways'],
    projects: []
  },
  {
    id: '12',
    name: 'Express.js',
    description: 'Designing minimal and flexible Node.js web application backends and APIs.',
    uses: ['RESTful APIs', 'Middleware integration'],
    projects: []
  },
  {
    id: '13',
    name: 'FastAPI',
    description: 'Creating extremely fast and modern Python APIs with automatic interactive documentation.',
    uses: ['High-performance APIs', 'Machine learning endpoints'],
    projects: []
  },
  {
    id: '14',
    name: 'Django',
    description: 'Building robust, secure, and highly scalable web applications in Python.',
    uses: ['Full-stack Python', 'Rapid prototyping'],
    projects: []
  },
  {
    id: '15',
    name: 'Tailwind CSS',
    description: 'Crafting completely custom, highly-performant designs using utility-first CSS.',
    uses: ['Rapid styling', 'Design system implementation'],
    projects: []
  },
  {
    id: '16',
    name: 'Framer Motion',
    description: 'Animating React components with physics-based, butter-smooth motion.',
    uses: ['Micro-interactions', 'Complex page transitions'],
    projects: []
  },
  {
    id: '17',
    name: 'Three.js',
    description: 'Rendering stunning 3D graphics and interactive scenes directly in the browser.',
    uses: ['Web-based 3D', 'Immersive experiences'],
    projects: []
  },
  {
    id: '18',
    name: 'OpenCV',
    description: 'Developing real-time computer vision applications and image processing pipelines.',
    uses: ['Image recognition', 'Object tracking'],
    projects: []
  },
  {
    id: '19',
    name: 'PyTorch',
    description: 'Building and training advanced deep learning models with incredible flexibility.',
    uses: ['Deep learning research', 'Neural network design'],
    projects: []
  },
  {
    id: '20',
    name: 'TensorFlow',
    description: 'Deploying robust machine learning models at scale in production environments.',
    uses: ['Production ML', 'Model serving'],
    projects: []
  },
  {
    id: '21',
    name: 'NumPy',
    description: 'Performing high-performance scientific computing and matrix operations in Python.',
    uses: ['Data manipulation', 'Mathematical operations'],
    projects: []
  },
  {
    id: '22',
    name: 'Pandas',
    description: 'Analyzing, cleaning, and transforming massive datasets efficiently.',
    uses: ['Data analysis', 'Feature engineering'],
    projects: []
  },
  {
    id: '23',
    name: 'scikit-learn',
    description: 'Implementing foundational machine learning algorithms and statistical modeling.',
    uses: ['Predictive modeling', 'Data clustering'],
    projects: []
  },
  {
    id: '24',
    name: 'MySQL',
    description: 'Managing structured, relational data with a battle-tested SQL database.',
    uses: ['Relational storage', 'Transactional data'],
    projects: []
  },
  {
    id: '25',
    name: 'PostgreSQL',
    description: 'Architecting advanced relational databases with complex data types and rock-solid reliability.',
    uses: ['Enterprise data management', 'Advanced querying'],
    projects: []
  },
  {
    id: '26',
    name: 'MongoDB',
    description: 'Building flexible, scalable applications using document-oriented NoSQL storage.',
    uses: ['Unstructured data', 'Rapid iteration schemas'],
    projects: []
  },
  {
    id: '27',
    name: 'Firebase',
    description: 'Developing apps rapidly with real-time databases and managed authentication.',
    uses: ['Real-time sync', 'Serverless backends'],
    projects: []
  },
  {
    id: '28',
    name: 'Supabase',
    description: 'Leveraging open-source Firebase alternatives built securely on top of PostgreSQL.',
    uses: ['Database as a service', 'Auth and Edge Functions'],
    projects: []
  },
  {
    id: '29',
    name: 'Redis',
    description: 'Accelerating applications with blazing fast in-memory data structures and caching.',
    uses: ['High-speed caching', 'Session management'],
    projects: []
  },
  {
    id: '30',
    name: 'Git',
    description: 'Managing source code versions and collaborating efficiently on complex projects.',
    uses: ['Version control', 'Code branching strategies'],
    projects: []
  },
  {
    id: '31',
    name: 'GitHub',
    description: 'Streamlining CI/CD pipelines and open-source collaboration in the cloud.',
    uses: ['Code hosting', 'Automated workflows'],
    projects: []
  },
  {
    id: '32',
    name: 'Docker',
    description: 'Containerizing applications for consistent deployment across any environment.',
    uses: ['Environment isolation', 'Microservices'],
    projects: []
  },
  {
    id: '33',
    name: 'Cloudflare',
    description: 'Securing web traffic and distributing content with a massive edge network.',
    uses: ['CDN caching', 'DDoS protection'],
    projects: []
  },
  {
    id: '34',
    name: 'Vercel',
    description: 'Deploying frontend frameworks instantly with a global edge infrastructure.',
    uses: ['Next.js hosting', 'Serverless deployments'],
    projects: []
  },
  {
    id: '35',
    name: 'REST APIs',
    description: 'Designing standardized, stateless communication interfaces for web services.',
    uses: ['System integrations', 'Data fetching'],
    projects: []
  },
  {
    id: '36',
    name: 'WebSockets',
    description: 'Enabling real-time, bi-directional communication between clients and servers.',
    uses: ['Live chat', 'Real-time dashboards'],
    projects: []
  },
  {
    id: '37',
    name: 'Figma',
    description: 'Prototyping user interfaces and collaborating on pixel-perfect digital designs.',
    uses: ['UI/UX Design', 'Wireframing'],
    projects: []
  },
  {
    id: '38',
    name: 'Framer',
    description: 'Designing interactive, production-ready web experiences without code.',
    uses: ['Rapid site building', 'Interactive prototyping'],
    projects: []
  },
  {
    id: '39',
    name: 'VS Code',
    description: 'Writing code efficiently in a highly customized, extensible editing environment.',
    uses: ['Code editing', 'Debugging'],
    projects: []
  },
  {
    id: '40',
    name: 'Linux',
    description: 'Navigating, scripting, and managing servers using the open-source OS standard.',
    uses: ['Server management', 'Bash scripting'],
    projects: []
  },
  {
    id: '41',
    name: 'Postman',
    description: 'Testing, documenting, and monitoring APIs during backend development.',
    uses: ['API testing', 'Endpoint documentation'],
    projects: []
  },
  {
    id: '42',
    name: 'Generative AI',
    description: 'Integrating cutting-edge generative models to automate tasks and create dynamic content.',
    uses: ['Content generation', 'Automated workflows'],
    projects: []
  },
  {
    id: '43',
    name: 'LLMs',
    description: 'Developing applications powered by Large Language Models like GPT-4 and Claude.',
    uses: ['Natural Language Processing', 'Conversational AI'],
    projects: []
  },
  {
    id: '44',
    name: 'RAG',
    description: 'Retrieval-Augmented Generation for making AI contextually aware of custom data.',
    uses: ['AI search systems', 'Knowledge bases'],
    projects: []
  },
  {
    id: '45',
    name: 'AI Agents',
    description: 'Building autonomous AI systems capable of executing complex, multi-step tasks.',
    uses: ['Autonomous logic', 'Task delegation'],
    projects: []
  },
  {
    id: '46',
    name: 'Computer Vision',
    description: 'Enabling machines to extract high-level understanding from digital images or videos.',
    uses: ['Object detection', 'Image segmentation'],
    projects: []
  }
];
