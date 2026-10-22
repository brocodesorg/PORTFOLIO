export interface Project {
  id: string
  number: string
  title: string
  tagline: string
  description: string
  client: string
  year: string
  category: string
  tags: string[]
  gradient: string
  accentColor: string
  metrics: { label: string; value: string }
  liveUrl: string
  githubUrl: string
  featuredImage: string
}

export interface ServiceItem {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  features: string[]
  icon: 'code' | 'smartphone' | 'brain' | 'palette' | 'cloud'
  badge: string
}

export interface AchievementItem {
  year: string
  title: string
  category: string
  description: string
  badge: string
  highlight?: boolean
}

export interface TestimonialItem {
  id: string
  quote: string
  author: string
  role: string
  company: string
  avatar: string
  rating: number
}

export interface SiteContent {
  company: {
    name: string
    displayName: string
    tagline: string
    subheadline: string
    manifestoHeadline: string
    manifestoParagraphs: string[]
    websiteUrl: string
  }
  stats: { value: number; suffix: string; label: string; description: string }[]
  services: ServiceItem[]
  projects: Project[]
  achievements: AchievementItem[]
  techStack: {
    category: string
    skills: { name: string; level: string; icon: string }[]
  }[]
  testimonials: TestimonialItem[]
  contact: {
    title: string
    subtitle: string
    email: string
    website: string
    instagram: string
    location: string
    availability: string
  }
  socials: { name: string; handle: string; url: string; platform: string }[]
  footer: {
    tagline: string
    copyright: string
  }
}

export const siteContent: SiteContent = {
  company: {
    name: "BROCODES",
    displayName: "BROCODES",
    tagline: "Code. Create. Dominate.",
    subheadline: "An elite creative engineering laboratory building high-performance 3D web apps, AI systems, and category-defining digital products.",
    manifestoHeadline: "WE DON'T JUST WRITE CODE. WE ARCHITECT DIGITAL EMPIRES.",
    manifestoParagraphs: [
      "At BROCODES, standard is the enemy of exceptional. In a web flooded with generic templates and uninspired software, we engineer bespoke digital masterpieces that captivate eyes, command authority, and turn bold visions into unstoppable reality.",
      "Every animation is timed with surgical precision. Every 3D shader is tuned for 60fps glory. Every system is built to scale to millions of users without breaking a sweat.",
      "Whether you are launching a breakthrough venture or rewriting the rules of your industry, we equip you with code that dominates the competition."
    ],
    websiteUrl: "https://brocodes.space/",
  },

  stats: [
    { value: 50, suffix: "+", label: "Projects Delivered", description: "Production deployments globally" },
    { value: 30, suffix: "+", label: "Happy Clients", description: "From seed startups to unicorn brands" },
    { value: 5, suffix: "", label: "Hackathon Wins", description: "Global engineering championships" },
    { value: 1, suffix: "M+", label: "Users Reached", description: "Active users powered by our software" },
  ],

  services: [
    {
      id: "web-dev",
      number: "01",
      title: "Web Engineering",
      subtitle: "Next.js & Ultra-Speed Web",
      description: "Blistering-fast, SEO-optimized web experiences engineered with Next.js App Router, Three.js, and bespoke animation runtimes. Instant response times, zero bloat.",
      features: [
        "Headless Architecture & SSR/SSG",
        "Interactive 3D WebGL Experiences",
        "Sub-100ms Core Web Vitals",
        "Design System Implementation"
      ],
      icon: "code",
      badge: "High-Performance"
    },
    {
      id: "mobile-apps",
      number: "02",
      title: "Mobile Experiences",
      subtitle: "iOS & Android Fluidity",
      description: "Native-grade cross-platform applications built with React Native and Expo. Seamless gestures, haptic feedback, and offline-first capabilities that users love.",
      features: [
        "Fluid 120Hz Gesture Animations",
        "Offline-First SQLite / WatermelonDB",
        "Real-Time Push & Background Sync",
        "App Store & Play Store Fast-Track"
      ],
      icon: "smartphone",
      badge: "Cross-Platform"
    },
    {
      id: "ai-solutions",
      number: "03",
      title: "AI & Intelligence",
      subtitle: "Autonomous Agents & RAG",
      description: "Production LLM architectures, fine-tuned diffusion models, and real-time computer vision pipelines that automate complex enterprise tasks and delight customers.",
      features: [
        "Custom Autonomous Multi-Agent Workflows",
        "Vector Databases & Semantic Search",
        "Fine-tuned Open Weights (Llama 3 / Mistral)",
        "Streaming Natural Language Interfaces"
      ],
      icon: "brain",
      badge: "Cutting-Edge"
    },
    {
      id: "ui-ux-design",
      number: "04",
      title: "UI/UX & 3D Design",
      subtitle: "Awwwards-Level Aesthetics",
      description: "Visual systems that stop thumbs in their tracks. We craft immersive 3D spatial interfaces, motion guidelines, and conversion-engineered product layouts.",
      features: [
        "Spatial 3D Asset Creation (Blender & Spline)",
        "Micro-Interactions & Kinetic Motion",
        "Comprehensive Figma Token Systems",
        "WCAG 2.1 AA Accessible Interfaces"
      ],
      icon: "palette",
      badge: "Award-Caliber"
    },
    {
      id: "cloud-devops",
      number: "05",
      title: "Cloud & DevOps",
      subtitle: "Scalable Infrastructure",
      description: "Rock-solid cloud infrastructure and automated CI/CD pipelines on AWS, GCP, and Kubernetes. Zero-downtime blue/green rollouts and edge computing.",
      features: [
        "Infrastructure as Code (Terraform)",
        "Kubernetes & Docker Container Orchestration",
        "Edge Caching with Cloudflare Workers",
        "Automated Security & Penetration Testing"
      ],
      icon: "cloud",
      badge: "Zero-Downtime"
    },
  ],

  projects: [
    {
      id: "neurolink-ai",
      number: "01",
      title: "NeuroLink AI",
      tagline: "Real-time Neural Visualization Platform",
      description: "High-dimensional neural network telemetry dashboard rendering 100,000+ interactive synaptic nodes in WebGL with sub-frame latency for biotech researchers.",
      client: "Synapse Biotech Inc.",
      year: "2024",
      category: "AI & Data Visualization",
      tags: ["Three.js", "React", "Python FastAPI", "WebGL", "PyTorch"],
      gradient: "from-pink-600 via-purple-700 to-indigo-900",
      accentColor: "#EC4899",
      metrics: { label: "Synapse Processing", value: "2.4M/sec" },
      liveUrl: "https://brocodes.space/",
      githubUrl: "https://github.com",
      featuredImage: "/images/projects/neurolink.svg",
    },
    {
      id: "cryptovault",
      number: "02",
      title: "CryptoVault Core",
      tagline: "Institutional Web3 Digital Fortress",
      description: "Decentralized treasury management protocol featuring multi-sig threshold signatures, real-time MEV protection, and dynamic kinetic charting.",
      client: "Vault Capital Labs",
      year: "2024",
      category: "Web3 & Fintech",
      tags: ["Next.js", "Solidity", "Tailwind CSS", "GSAP", "Ethers.js"],
      gradient: "from-cyan-600 via-teal-700 to-slate-900",
      accentColor: "#0891B2",
      metrics: { label: "Secured Volume", value: "$450M+" },
      liveUrl: "https://brocodes.space/",
      githubUrl: "https://github.com",
      featuredImage: "/images/projects/cryptovault.svg",
    },
    {
      id: "fitpulse",
      number: "03",
      title: "FitPulse Biometrics",
      tagline: "Wearable Health & High-Performance IoT",
      description: "Next-gen sports telemetry application with millisecond heart-rate variability tracking, predictive fatigue modeling, and generative audio coach.",
      client: "FitPulse Wearables",
      year: "2023",
      category: "Mobile & IoT",
      tags: ["React Native", "BLE Engine", "TypeScript", "Node.js", "WebSockets"],
      gradient: "from-amber-500 via-rose-600 to-slate-950",
      accentColor: "#F59E0B",
      metrics: { label: "Active Syncs", value: "820K Daily" },
      liveUrl: "https://brocodes.space/",
      githubUrl: "https://github.com",
      featuredImage: "/images/projects/fitpulse.svg",
    },
    {
      id: "cloudflow",
      number: "04",
      title: "CloudFlow Engine",
      tagline: "Autonomous Infrastructure Orchestrator",
      description: "Developer control plane that synthesizes Kubernetes clusters, preview environments, and ephemeral databases through natural language commands.",
      client: "CloudFlow Systems",
      year: "2023",
      category: "Cloud & DevTools",
      tags: ["Go", "Kubernetes", "Next.js", "gRPC", "Docker"],
      gradient: "from-purple-600 via-fuchsia-700 to-slate-900",
      accentColor: "#A855F7",
      metrics: { label: "Deploy Time Reduction", value: "84%" },
      liveUrl: "https://brocodes.space/",
      githubUrl: "https://github.com",
      featuredImage: "/images/projects/cloudflow.svg",
    },
    {
      id: "ecotracker",
      number: "05",
      title: "EcoTracker Global",
      tagline: "Enterprise Carbon Telemetry Platform",
      description: "Satellite-driven carbon footprint audit engine analyzing supply chain emissions for Fortune 500 manufacturers aiming for Net-Zero targets.",
      client: "Verde Alliance",
      year: "2023",
      category: "Sustainability & GeoSpatial",
      tags: ["Mapbox GL", "React", "D3.js", "PostGIS", "AWS Lambda"],
      gradient: "from-emerald-600 via-teal-800 to-slate-950",
      accentColor: "#10B981",
      metrics: { label: "Emissions Monitored", value: "14.2M Tons" },
      liveUrl: "https://brocodes.space/",
      githubUrl: "https://github.com",
      featuredImage: "/images/projects/ecotracker.svg",
    },
  ],

  achievements: [
    {
      year: "2024",
      title: "Awwwards Site of the Day Candidate",
      category: "Design Excellence",
      description: "Honored for breakthrough WebGL spatial interaction and fluid typography on the NeuroLink platform.",
      badge: "Awwwards Recognition",
      highlight: true
    },
    {
      year: "2024",
      title: "Global AI Hackathon Grand Champion",
      category: "Hackathon Win",
      description: "Captured 1st Place out of 800+ teams worldwide for real-time collaborative agent architecture.",
      badge: "1st Place Winner",
      highlight: true
    },
    {
      year: "2023",
      title: "ProductHunt #1 Product of the Day",
      category: "Product Launch",
      description: "FitPulse achieved #1 trending product with over 3,200 upvotes and 45,000 day-one downloads.",
      badge: "Golden Kitty Nominee"
    },
    {
      year: "2023",
      title: "TechCrunch Disrupt Startup Battlefield Finalist",
      category: "Venture Competition",
      description: "Presented CryptoVault's threshold security infrastructure to Silicon Valley venture leaders.",
      badge: "Top 20 Finalist"
    },
    {
      year: "2022",
      title: "AWS Certified DevOps Pro Distinction",
      category: "Certification",
      description: "100% engineering team accreditation in enterprise cloud resilience, microservices, and security.",
      badge: "Official AWS Partner"
    },
  ],

  techStack: [
    {
      category: "Frontend & 3D Spatial",
      skills: [
        { name: "Next.js 14", level: "Expert", icon: "nextjs" },
        { name: "React 18", level: "Expert", icon: "react" },
        { name: "Three.js / R3F", level: "Master", icon: "threejs" },
        { name: "GSAP Motion", level: "Master", icon: "gsap" },
        { name: "Tailwind CSS", level: "Expert", icon: "tailwind" },
        { name: "TypeScript", level: "Expert", icon: "typescript" },
        { name: "WebGL / GLSL", level: "Advanced", icon: "webgl" },
        { name: "Framer Motion", level: "Master", icon: "framer" },
      ]
    },
    {
      category: "Backend, AI & Cloud",
      skills: [
        { name: "Python / FastAPI", level: "Master", icon: "python" },
        { name: "PyTorch & LangChain", level: "Advanced", icon: "ai" },
        { name: "Node.js / Bun", level: "Expert", icon: "node" },
        { name: "PostgreSQL / pgvector", level: "Expert", icon: "postgres" },
        { name: "Docker & K8s", level: "Advanced", icon: "docker" },
        { name: "AWS & Cloudflare", level: "Master", icon: "cloud" },
        { name: "Redis & WebSockets", level: "Expert", icon: "redis" },
        { name: "GraphQL & REST", level: "Expert", icon: "graphql" },
      ]
    }
  ],

  testimonials: [
    {
      id: "test-1",
      quote: "BROCODES didn't just deliver our web app; they completely redefined our company's market posture. Their 3D interactions and silky smooth scroll turned our product into the benchmark of our sector.",
      author: "Dr. Marcus Vance",
      role: "Founder & Chief Scientist",
      company: "Synapse Biotech",
      avatar: "MV",
      rating: 5,
    },
    {
      id: "test-2",
      quote: "Working with the BROCODES team was like hiring the best creative studio and the highest-caliber engineering shop simultaneously. Flawless communication, maniacal attention to detail, and delivered 2 weeks early.",
      author: "Elena Rostova",
      role: "VP of Product",
      company: "Vault Capital Labs",
      avatar: "ER",
      rating: 5,
    },
    {
      id: "test-3",
      quote: "Our ProductHunt launch blew past every KPI because BROCODES crafted an interface so stunning that users couldn't stop sharing screen recordings. They are in a league of their own.",
      author: "Kareem Al-Mansoor",
      role: "Co-Founder & CEO",
      company: "FitPulse Wearables",
      avatar: "KA",
      rating: 5,
    },
  ],

  contact: {
    title: "READY TO BUILD SOMETHING ICONIC?",
    subtitle: "Tell us about your ambitious project, engineering challenge, or revolutionary startup. We review submissions within 24 hours.",
    email: "brocodesorg@gmail.com",
    website: "https://brocodes.space/",
    instagram: "https://www.instagram.com/brocodesorg",
    location: "Global Remote • HQ San Francisco & Bengaluru",
    availability: "Accepting select client projects for Q4 & 2025"
  },

  socials: [
    { name: "Instagram", handle: "@brocodesorg", url: "https://www.instagram.com/brocodesorg", platform: "instagram" },
    { name: "Website", handle: "brocodes.space", url: "https://brocodes.space/", platform: "website" },
    { name: "GitHub", handle: "@brocodesorg", url: "https://github.com", platform: "github" },
    { name: "LinkedIn", handle: "company/brocodes", url: "https://linkedin.com", platform: "linkedin" },
  ],

  footer: {
    tagline: "ARCHITECTING DIGITAL DOMINANCE THROUGH CODE & 3D ARTISTRY.",
    copyright: "© 2024-2026 BROCODES LLC. ALL RIGHTS RESERVED."
  }
}
