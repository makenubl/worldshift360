import { useState, useEffect, useMemo, useCallback } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  User,
  TrendingUp,
  Globe,
  AlertTriangle,
  ChevronRight,
  Zap,
  Briefcase,
  GitBranch,
  Flame,
  Waves,
  Bot,
  Banknote,
  Binary,
  Building2,
  BookOpen,
  Brain,
  Eye,
  Lock,
  Unlock,
  Sparkles,
  Network,
  Fingerprint,
  Lightbulb,
  MessageCircle,
  ThumbsUp,
  Send,
  ChevronDown,
  MapPin,
  Star,
  Share2,
  Bookmark,
  BarChart3,
  CheckCircle2,
  XCircle,
  Compass,
  Image,
} from "lucide-react";

// ═══════════════════════════════════════════
//  MINDSHIFT 360 v3 — SOCIAL INTELLIGENCE
//  "Humanity's Collective Intelligence"
// ═══════════════════════════════════════════

const css = `
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes pulse-soft { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes wave { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(2.2); } }
  @keyframes countUp { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeIn 0.4s ease forwards; }
  .slide-up { animation: slideUp 0.3s ease forwards; }
  .pop-in { animation: popIn 0.25s ease forwards; }
  .pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }
  .float-gentle { animation: float 6s ease-in-out infinite; }
  .shimmer { background: linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.03) 50%, transparent 75%); background-size: 200% 100%; animation: shimmer 3s infinite; }

  .glass { background: rgba(17, 24, 39, 0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.06); }
  .glass-hover:hover { background: rgba(17, 24, 39, 0.85); border-color: rgba(255,255,255,0.1); }
  .card { background: rgba(17, 24, 39, 0.5); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; transition: border-color 0.2s; }
  .card:hover { border-color: rgba(255,255,255,0.12); }

  .scrollbar-thin::-webkit-scrollbar { width: 4px; }
  .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
  .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }

  .text-gradient-green { background: linear-gradient(135deg, #10b981, #34d399); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .text-gradient-blue { background: linear-gradient(135deg, #3b82f6, #60a5fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .text-gradient-multi { background: linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

  .reaction-btn { transition: all 0.15s; padding: 4px 10px; border-radius: 20px; cursor: pointer; user-select: none; }
  .reaction-btn:hover { transform: scale(1.1); }
  .reaction-btn:active { transform: scale(0.95); }
  .reaction-btn.active { background: rgba(16, 185, 129, 0.15); }

  .comment-input { transition: all 0.2s; }
  .comment-input:focus { box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2); }

  .trend-tag { transition: all 0.15s; }
  .trend-tag:hover { background: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.3); transform: translateY(-1px); }

  .feed-card { transition: all 0.2s; }
  .feed-card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.2); }

  @keyframes flowDash { from { stroke-dashoffset: 12; } to { stroke-dashoffset: 0; } }
  @keyframes flowPulse { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.45; } }
  .wealth-flow { stroke-dasharray: 4 8; animation: flowDash 2s linear infinite; }
  .wealth-flow-glow { animation: flowPulse 3s ease-in-out infinite; }

  @keyframes barGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  .influence-bar { transform-origin: left; animation: barGrow 1s ease-out forwards; }

  @keyframes tickerSlide { from { transform: translateY(8px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .ticker-item { animation: tickerSlide 0.5s ease forwards; }

  @keyframes breathe { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
  .breathe { animation: breathe 4s ease-in-out infinite; }
`;

// ── REACTIONS ──
const REACTIONS = [
  { emoji: "🔥", label: "Important", key: "fire" },
  { emoji: "💡", label: "Insightful", key: "insight" },
  { emoji: "😨", label: "Concerning", key: "concern" },
  { emoji: "💪", label: "We can do this", key: "strength" },
  { emoji: "🤔", label: "Need more info", key: "think" },
];

// ── SEED USERS ──
const AVATARS = [
  "🧑‍💻",
  "👩‍⚕️",
  "👨‍🌾",
  "👩‍🏫",
  "🧑‍✈️",
  "👨‍💼",
  "👩‍🔬",
  "🧕",
  "👨‍🎓",
  "👩‍💻",
  "🎖️",
  "👷",
];
const USER_PROFILES = [
  {
    name: "Aisha Malik",
    handle: "@aisha_dev",
    avatar: "👩‍💻",
    badge: "Tech",
    location: "Toronto",
    sector: "Technology/IT",
    verified: true,
  },
  {
    name: "Chukwu Adeyemi",
    handle: "@chukwu_dev",
    avatar: "🧑‍💻",
    badge: "Backend",
    location: "Lagos",
    sector: "Technology/IT",
    verified: true,
  },
  {
    name: "Dr. Fatima Noor",
    handle: "@dr_fatima",
    avatar: "👩‍⚕️",
    badge: "Health",
    location: "São Paulo",
    sector: "Healthcare",
    verified: true,
  },
  {
    name: "Muhammad Iqbal",
    handle: "@iqbal_farmer",
    avatar: "👨‍🌾",
    badge: "Agriculture",
    location: "Jakarta",
    sector: "Agriculture",
    verified: false,
  },
  {
    name: "Sara Ahmed",
    handle: "@sara_fintech",
    avatar: "👩‍💼",
    badge: "Finance",
    location: "Berlin",
    sector: "Finance",
    verified: true,
  },
  {
    name: "James Chen",
    handle: "@james_freelance",
    avatar: "🧑‍💻",
    badge: "Freelancer",
    location: "Tokyo",
    sector: "Freelancing",
    verified: false,
  },
  {
    name: "Prof. Maria Santos",
    handle: "@prof_maria",
    avatar: "👩‍🏫",
    badge: "Education",
    location: "Mexico City",
    sector: "Education",
    verified: true,
  },
  {
    name: "Nia Okafor",
    handle: "@nia_builder",
    avatar: "👷",
    badge: "Infrastructure",
    location: "Nairobi",
    sector: "Construction",
    verified: false,
  },
];

// ── AI FEED POSTS ──
const FEED_POSTS = [
  {
    id: "p1",
    type: "ai_scenario",
    aiTitle: "Global Call Centers Will Lose 60% of Jobs to AI by 2028",
    aiBody:
      "Here's what the data shows: GPT-level AI can now handle 80% of customer service queries better than humans. The global BPO sector employs millions across India, Philippines, Pakistan, and beyond — representing a $150B+ industry. The question isn't IF these jobs disappear, but WHAT replaces them.\n\nThe opportunity? These same people, retrained in AI prompt engineering and AI-assisted services, could earn 3-5x more. The global BPO sector could SHIFT to $250B in AI-augmented services — but only if workers upskill NOW.",
    aiVerdict: "likely",
    category: "technology",
    severity: "critical",
    reactions: { fire: 1847, insight: 923, concern: 2105, strength: 445, think: 612 },
    comments: [
      {
        user: USER_PROFILES[0],
        text: "Already seeing this at my company. We replaced 40 support agents with AI + 5 prompt engineers. Those 5 now earn more than the 40 combined. The transition is brutal but the math is clear.",
        time: "2h ago",
        likes: 342,
        replies: [
          {
            user: USER_PROFILES[5],
            text: "But what about the 40 who lost their jobs? Not everyone can become a prompt engineer. We need a transition plan, not just celebration of efficiency.",
            time: "1h ago",
            likes: 187,
          },
          {
            user: USER_PROFILES[0],
            text: "@ali_freelance Exactly. Every country needs national retraining programs. Coursera, LinkedIn Learning, and free AI bootcamps worldwide are the only lifeline.",
            time: "45m ago",
            likes: 234,
          },
        ],
      },
      {
        user: USER_PROFILES[1],
        text: "Military has the same challenge. Intelligence analysis that took teams of 20 can now be done by AI systems with 3 operators. We're retraining our signals corps but it's not fast enough.",
        time: "3h ago",
        likes: 567,
        replies: [],
      },
      {
        user: USER_PROFILES[6],
        text: "I teach computer science at a university. 80% of our curriculum is outdated. We're teaching students skills that won't exist by the time they graduate. The entire education system needs emergency reform.",
        time: "5h ago",
        likes: 891,
        replies: [
          {
            user: USER_PROFILES[4],
            text: "Central banks worldwide are realizing traditional banking courses are obsolete. We're seeing fintech skills frameworks emerge in 15+ countries. Happy to share global patterns.",
            time: "4h ago",
            likes: 123,
          },
        ],
      },
    ],
    poll: {
      question: "When will AI replace most call center jobs globally?",
      options: [
        { text: "Already happening (2025)", votes: 3421 },
        { text: "Within 2 years (2027)", votes: 5892 },
        { text: "5+ years away (2030+)", votes: 2103 },
        { text: "Won't happen — humans preferred", votes: 876 },
      ],
    },
    time: "6h ago",
    views: "48.2K",
  },
  {
    id: "p2",
    type: "ai_paradigm",
    aiTitle: "OLD vs NEW: Banking is Dead. Long Live DeFi?",
    oldWorld: {
      title: "Conventional Banking",
      points: [
        "Central banks control money supply",
        "2B+ people globally unbanked",
        "Remittance fees 5-8% worldwide",
        "KYC requirements vary by country",
        "Interest rates hurt borrowers globally",
      ],
    },
    newWorld: {
      title: "Crypto & Mobile Finance",
      points: [
        "M-Pesa/GCash/UPI already serve 1B+ wallets",
        "Blockchain remittances cut fees to 0.5%",
        "DeFi lending without bank approval",
        "CBDCs launching in 30+ countries",
        "Stablecoins as inflation hedge",
      ],
    },
    aiBody:
      "The world sends/receives $800B+ in remittances annually. Traditional banks and money transfer operators eat $60B+ in fees. Blockchain could reduce that overnight. But here's the catch: regulation varies wildly, most central banks haven't approved crypto, and billions still trust cash. Who wins?",
    reactions: { fire: 2341, insight: 1567, concern: 892, strength: 1203, think: 445 },
    comments: [
      {
        user: USER_PROFILES[4],
        text: "Working in banking for 12 years. The writing is on the wall. Our CEO just formed a 'Digital Transformation' committee — code for 'figure out how not to die.' Every bank knows mobile wallets are eating their lunch.",
        time: "4h ago",
        likes: 723,
        replies: [
          {
            user: USER_PROFILES[7],
            text: "In developing economies worldwide, mobile money is outpacing banks. WeChat Pay in China, M-Pesa in Kenya, GCash in Philippines, UPI in India. The bank branch model is dying globally.",
            time: "3h ago",
            likes: 445,
          },
        ],
      },
      {
        user: USER_PROFILES[3],
        text: "As a farmer, I can tell you — getting a bank loan takes 6 months and requires land as collateral. A DeFi protocol could approve me in minutes based on my crop yield history. The system is broken.",
        time: "8h ago",
        likes: 1102,
        replies: [],
      },
    ],
    poll: {
      question: "What's the future of money worldwide?",
      options: [
        { text: "Banks will adapt and survive", votes: 2890 },
        { text: "Mobile wallets will dominate", votes: 6734 },
        { text: "Crypto will go mainstream", votes: 3201 },
        { text: "Cash will remain king", votes: 1456 },
      ],
    },
    time: "12h ago",
    views: "71.5K",
  },
  {
    id: "p3",
    type: "ai_scenario",
    aiTitle: "Water Crisis: 2 Billion People Face Severe Water Scarcity",
    aiBody:
      "Global water storage capacity is critically mismatched with need. South Asia stores 30 days, North America 120, Australia 900. Climate volatility is making this worse — not better. Floods in Pakistan (2022), droughts in Horn of Africa, unprecedented heat everywhere.\n\nAgriculture depends 70% on freshwater globally. We are facing a cascade of food crises. Dams in Pakistan, Egypt, and across Africa are silting up. Climate migration will displace 1B+ people by 2050 if we don't act now.",
    aiVerdict: "critical",
    category: "climate",
    severity: "critical",
    reactions: { fire: 3201, insight: 1234, concern: 4567, strength: 890, think: 2345 },
    comments: [
      {
        user: USER_PROFILES[3],
        text: "I lost everything in climate-related floods. My crops — years of savings — gone in hours. Now I've switched to drip irrigation and climate-resilient varieties. Uses 60% less water. Farmers worldwide need to learn this.",
        time: "1d ago",
        likes: 2341,
        replies: [
          {
            user: USER_PROFILES[6],
            text: "Would you share your expertise globally? Your practical water conservation techniques are invaluable. We can distribute worldwide through educational networks.",
            time: "20h ago",
            likes: 567,
          },
          {
            user: USER_PROFILES[3],
            text: "Absolutely! If my experience saves even one farmer globally from what I went through, it's worth it. Climate resilience is everyone's fight.",
            time: "18h ago",
            likes: 891,
          },
        ],
      },
      {
        user: USER_PROFILES[1],
        text: "Water is a global security issue. Governments everywhere nod and do nothing. Disaster response is too late. We need global coordination on water management NOW.",
        time: "2d ago",
        likes: 1567,
        replies: [],
      },
    ],
    time: "1d ago",
    views: "124K",
  },
  {
    id: "p4",
    type: "ai_insight",
    aiTitle: "🔮 Global Currency Markets: Dollar Hegemony Weakening",
    aiBody:
      "Based on collective signals from our global network: BRICS currency initiatives accelerating, central banks diversifying reserves away from USD, CBDCs rolling out in 50+ countries. The crowd's prediction accuracy on currency trends has been 78% over the last 6 months. Here's what sectors are saying worldwide:",
    sectorSignals: [
      { sector: "Banking", signal: "Cautiously optimistic", confidence: 72 },
      { sector: "IT Exports", signal: "Bullish — USD inflows accelerating", confidence: 85 },
      { sector: "Agriculture", signal: "Neutral — waiting for monsoon forecast", confidence: 50 },
      { sector: "Real Estate", signal: "Bearish — regulatory crackdown continuing", confidence: 35 },
    ],
    reactions: { fire: 1234, insight: 2567, concern: 456, strength: 1890, think: 789 },
    comments: [
      {
        user: USER_PROFILES[4],
        text: "Our treasury desk sees de-dollarization accelerating. If tech exports cross $100B globally, emerging market currencies gain strength. Haven't seen this kind of shift in 20 years.",
        time: "3h ago",
        likes: 456,
        replies: [],
      },
      {
        user: USER_PROFILES[5],
        text: "As someone who earns in USD on Upwork — stable currencies matter more than volatility for long-term planning. This truth applies everywhere, not just emerging markets.",
        time: "5h ago",
        likes: 234,
        replies: [],
      },
    ],
    time: "3h ago",
    views: "35.8K",
  },
  {
    id: "p5",
    type: "community_wisdom",
    user: USER_PROFILES[7],
    title: "I moved to a developing megacity. Here's what nobody tells you.",
    body: "Everyone romanticizes rapid development in emerging cities. Here's reality: infrastructure is patchwork, electricity/internet inconsistent, FDI zones are partially occupied. BUT — and this is huge — land prices tripled in 2 years. External powers are building THEIR OWN infrastructure, not local capacity. Displaced communities are everywhere. If you're investing, follow international corridor announcements. NOT traditional downtown areas.",
    reactions: { fire: 2890, insight: 3456, concern: 1234, strength: 567, think: 890 },
    comments: [
      {
        user: USER_PROFILES[1],
        text: "Similar strategic infrastructure plays are unfolding across the Global South. Whoever controls key choke points controls global energy and commerce. This is the defining geopolitical story of 2026.",
        time: "6h ago",
        likes: 1234,
        replies: [],
      },
    ],
    time: "8h ago",
    views: "89.3K",
  },
  {
    id: "p6",
    type: "ai_scenario",
    aiTitle: "The Next Decade: Intelligence + Robotics + Web3 = Autonomous Economies",
    aiBody:
      "The biggest shift ahead is the fusion of intelligence, infrastructure, and ownership.\n\nAI is creating intelligence. Robotics gives that intelligence physical presence. Web3 creates programmable ownership and economic coordination. Together, this moves us from software economies to autonomous economic systems.\n\nAI agents can reason, plan, and automate. Robots can execute in warehouses, factories, farms, and logistics corridors. But these systems still need an economic coordination layer to exchange value, share data, and operate across global infrastructure.\n\nBlockchains provide that layer: programmable ownership, decentralized infrastructure, and global settlement rails that AI agents and robotic fleets can use natively. The result is robotics networks compensated automatically for real-world data, AI agents operating in decentralized compute/storage/bandwidth markets, and tokenized physical assets directing capital into real infrastructure.\n\nThe end state is self-sustained alliances where communities coordinate food, energy, water, transport, and local production with autonomous software + machine networks.",
    aiVerdict: "likely",
    category: "technology",
    severity: "critical",
    reactions: { fire: 1984, insight: 2670, concern: 721, strength: 1458, think: 1102 },
    comments: [
      {
        user: USER_PROFILES[7],
        text: "If this stack is real, cities in the Global South can skip legacy systems and build local autonomous supply chains from day one.",
        time: "1h ago",
        likes: 412,
        replies: [
          {
            user: USER_PROFILES[3],
            text: "Start with food and water. If local production and irrigation are automated and funded transparently, communities become resilient first.",
            time: "42m ago",
            likes: 236,
          },
        ],
      },
      {
        user: USER_PROFILES[0],
        text: "Agent-to-agent payments and verifiable machine outputs could finally make global infrastructure coordination practical at scale.",
        time: "2h ago",
        likes: 529,
        replies: [],
      },
    ],
    poll: {
      question: "What should autonomous community alliances coordinate first?",
      options: [
        { text: "Food + water systems", votes: 3210 },
        { text: "Energy + microgrids", votes: 2874 },
        { text: "Logistics + warehousing", votes: 1642 },
        { text: "Local compute + connectivity", votes: 1390 },
      ],
    },
    time: "2h ago",
    views: "52.7K",
  },
];

// ── TRENDING TOPICS ──
const TRENDING = [
  { tag: "AIJobDisruption", posts: "12.4K", trend: "up" },
  { tag: "ClimateAction2030", posts: "8.7K", trend: "up" },
  { tag: "DeFiRevolution", posts: "23.1K", trend: "up" },
  { tag: "RemoteWorkNation", posts: "6.2K", trend: "stable" },
  { tag: "MindsetOverBorders", posts: "15.8K", trend: "up" },
  { tag: "NewWorldAlliances", posts: "4.5K", trend: "up" },
  { tag: "SolarEverywhere", posts: "9.1K", trend: "up" },
  { tag: "DigitalNomad", posts: "3.2K", trend: "new" },
];

const REWIRE_STACK = [
  {
    id: "intelligence",
    icon: Brain,
    title: "AI empowers individuals",
    detail: "One person with AI can now execute like a full legacy team.",
  },
  {
    id: "infrastructure",
    icon: Bot,
    title: "Robotics powers infrastructure",
    detail: "Physical systems in food, water, logistics, and energy can run continuously.",
  },
  {
    id: "ownership",
    icon: Binary,
    title: "Web3 coordinates ownership",
    detail: "Programmable settlement allows global coordination with local control.",
  },
];

const NUCLEUS_SYSTEMS = [
  { id: "food", emoji: "🌾", label: "Food Loop", detail: "Autonomous growing, storage, and distribution" },
  { id: "water", emoji: "💧", label: "Water Loop", detail: "Sensors, reuse, and resilient irrigation" },
  { id: "energy", emoji: "⚡", label: "Energy Loop", detail: "Local microgrids and autonomous balancing" },
  { id: "logistics", emoji: "📦", label: "Logistics Loop", detail: "Shared fleets, routing, and fulfillment" },
];

const JOULE = {
  name: "Joule",
  ticker: "JOU",
  thesis: "Intelligence + compute + hardware execution",
};

const STARTER_JOULE_GRANT = 220;
const INVITE_JOIN_BONUS = 30;
const MIN_MISSION_REWARD_JOU = 40;
const MAX_MISSION_REWARD_JOU = 800;

const STRATEGY_COMPETITIONS = [
  {
    id: "arena_food_water",
    resource: "Food + Water Networks",
    controlAsset: "regional food reserves and irrigation credits",
    dailyFlow: 2.1,
    winRateA: 63.4,
    sideA: {
      key: "a",
      allianceId: "a5",
      name: "Autonomous Community Grid",
      strategy: "Local AI farming + sensor water loops + on-chain co-op ownership",
      treasury: 8.4,
      whyWinning: [
        "AI routing cuts spoilage and delivery friction",
        "Transparent treasury attracts contributor capital",
        "Local production reduces global supply shocks",
      ],
    },
    sideB: {
      key: "b",
      allianceId: null,
      name: "Legacy Import Coalition",
      strategy: "Centralized import financing + subsidy-heavy distribution",
      treasury: 6.8,
      whyWinning: [
        "Entrenched contracts with distributors",
        "Established political relationships",
        "Large inherited inventory infrastructure",
      ],
    },
  },
  {
    id: "arena_energy",
    resource: "Energy + Microgrid Infrastructure",
    controlAsset: "district microgrid dispatch and peak energy credits",
    dailyFlow: 1.8,
    winRateA: 56.2,
    sideA: {
      key: "a",
      allianceId: "a3",
      name: "Global Solar Army",
      strategy: "Distributed solar + storage + AI load balancing",
      treasury: 7.1,
      whyWinning: [
        "Lower marginal cost per KWh over time",
        "Faster outage recovery via local control",
        "Community-owned payout models improve adoption",
      ],
    },
    sideB: {
      key: "b",
      allianceId: null,
      name: "Central Utility Bloc",
      strategy: "Single-operator grid dependency with delayed modernization",
      treasury: 8.3,
      whyWinning: [
        "Existing legal monopolies",
        "Regulatory complexity slows alternatives",
        "Capital base already deployed in legacy plants",
      ],
    },
  },
  {
    id: "arena_logistics",
    resource: "Logistics + Trade Corridors",
    controlAsset: "routing priority and warehouse throughput capacity",
    dailyFlow: 2.6,
    winRateA: 60.1,
    sideA: {
      key: "a",
      allianceId: "a1",
      name: "Builders Without Borders",
      strategy: "AI dispatch + autonomous fleets + tokenized warehouse access",
      treasury: 9.2,
      whyWinning: [
        "Dynamic pricing allocates capacity efficiently",
        "Machine-to-machine settlement reduces delays",
        "Open infrastructure standards accelerate integration",
      ],
    },
    sideB: {
      key: "b",
      allianceId: null,
      name: "Broker-Led Freight Cartel",
      strategy: "Manual brokerage and closed routing networks",
      treasury: 7.4,
      whyWinning: [
        "Deep incumbent shipper relationships",
        "Opaque fee structures preserve margins",
        "Large existing broker force in key corridors",
      ],
    },
  },
];

// ── PARADIGM SHIFTS ──
const PARADIGMS = [
  {
    id: "money",
    icon: Banknote,
    iconNew: Binary,
    old: "Conventional Banking",
    new_: "Crypto & DeFi",
    readiness: 25,
    oldPoints: ["75% unbanked", "6-month loan approval", "5-8% remittance fees", "Physical branches"],
    newPoints: ["Mobile wallets 80M+", "Instant DeFi lending", "0.5% blockchain transfers", "Phone = bank"],
  },
  {
    id: "intel",
    icon: Eye,
    iconNew: Bot,
    old: "Human Intelligence",
    new_: "AI-Augmented Intel",
    readiness: 40,
    oldPoints: ["Manual surveillance", "Paper reports", "Months to analyze", "Limited scale"],
    newPoints: ["Satellite AI analysis", "Real-time OSINT", "Predictive modeling", "Unlimited scale"],
  },
  {
    id: "edu",
    icon: BookOpen,
    iconNew: Brain,
    old: "Rote Learning",
    new_: "AI-Personalized Education",
    readiness: 30,
    oldPoints: ["Memorize & repeat", "One-size-fits-all", "250M+ children out of school globally", "Degree worship"],
    newPoints: ["AI tutors in local languages", "Personalized paths", "Learn from anywhere", "Skills > degrees"],
  },
  {
    id: "energy",
    icon: Flame,
    iconNew: Waves,
    old: "Fossil Fuel Dependency",
    new_: "Solar & Distributed Energy",
    readiness: 55,
    oldPoints: [
      "Global debt cycles from energy imports",
      "Load shedding across developing world",
      "Import dependent everywhere",
      "State utility monopolies",
    ],
    newPoints: ["Vast global sunny regions", "2-3yr solar ROI everywhere", "Community microgrids rising", "Decentralized energy"],
  },
  {
    id: "gov",
    icon: Building2,
    iconNew: Network,
    old: "Paper Bureaucracy",
    new_: "Digital Democracy",
    readiness: 35,
    oldPoints: ["British-era DC system", "Paper land records", "Corruption tax", "Months for permits"],
    newPoints: ["Blockchain records", "AI tax compliance", "Digital identity", "Instant e-services"],
  },
  {
    id: "work",
    icon: Briefcase,
    iconNew: Sparkles,
    old: "9-to-5 Job Culture",
    new_: "Global Gig Economy",
    readiness: 50,
    oldPoints: ["Govt job obsession", "Local market only", "Seniority > merit", "Physical office"],
    newPoints: ["$800M+ freelance exports", "AI 10x productivity", "Global clients", "Work from anywhere"],
  },
];

// ═══════════════════════════════════════════
// WORLD MAP, ALLIANCES & QI SYSTEM
// ═══════════════════════════════════════════

// ── World clusters (for SVG map) ──
const GEO_CLUSTERS = [
  {
    id: "na",
    label: "North America",
    x: 22,
    y: 32,
    pop: "380M",
    color: "#3b82f6",
    groups: ["Tech Titans", "Wall Street", "Military-Industrial"],
    wealth: 42,
    wealthTrend: "stable",
    influence: 38,
  },
  {
    id: "eu",
    label: "Europe",
    x: 48,
    y: 28,
    pop: "450M",
    color: "#8b5cf6",
    groups: ["Regulators", "Green Economy", "Old Money"],
    wealth: 22,
    wealthTrend: "down",
    influence: 18,
  },
  {
    id: "cn",
    label: "China",
    x: 74,
    y: 35,
    pop: "1.4B",
    color: "#ef4444",
    groups: ["State-Tech Fusion", "Belt & Road", "Manufacturing"],
    wealth: 18,
    wealthTrend: "up",
    influence: 22,
  },
  {
    id: "sa",
    label: "South Asia",
    x: 66,
    y: 45,
    pop: "2B",
    color: "#10b981",
    groups: ["Youth Explosion", "IT Services", "Agriculture"],
    wealth: 4,
    wealthTrend: "up",
    influence: 6,
  },
  {
    id: "me",
    label: "Middle East",
    x: 56,
    y: 42,
    pop: "400M",
    color: "#f59e0b",
    groups: ["Sovereign Wealth", "Energy Transition", "Vision 2030"],
    wealth: 6,
    wealthTrend: "shifting",
    influence: 8,
  },
  {
    id: "af",
    label: "Africa",
    x: 50,
    y: 58,
    pop: "1.4B",
    color: "#ec4899",
    groups: ["Mobile-First", "Resource Rich", "Youngest Population"],
    wealth: 3,
    wealthTrend: "up",
    influence: 4,
  },
  {
    id: "sea",
    label: "SE Asia",
    x: 78,
    y: 52,
    pop: "700M",
    color: "#14b8a6",
    groups: ["Digital Economy", "Manufacturing Hub", "ASEAN Rising"],
    wealth: 4,
    wealthTrend: "up",
    influence: 3,
  },
  {
    id: "sa2",
    label: "Latin America",
    x: 28,
    y: 60,
    pop: "650M",
    color: "#f97316",
    groups: ["Commodities", "Fintech Boom", "Climate Frontline"],
    wealth: 3,
    wealthTrend: "stable",
    influence: 2,
  },
];

// ── WEALTH FLOWS (subtle animated shifts) ──
const WEALTH_FLOWS = [
  { from: "eu", to: "cn", label: "Manufacturing", intensity: 0.6 },
  { from: "na", to: "sa", label: "IT Outsourcing", intensity: 0.4 },
  { from: "me", to: "sea", label: "Investment", intensity: 0.35 },
  { from: "eu", to: "af", label: "Green Energy", intensity: 0.3 },
  { from: "na", to: "me", label: "Defense", intensity: 0.5 },
  { from: "cn", to: "af", label: "Belt & Road", intensity: 0.55 },
  { from: "cn", to: "sa", label: "Infrastructure", intensity: 0.4 },
];

const MINDSET_CLUSTERS = [
  {
    id: "builders",
    label: "The Builders",
    emoji: "🔨",
    color: "#10b981",
    size: 45,
    members: "~340M",
    influence: 32,
    influenceTrend: "rising",
    desc: "People who CREATE things — code, products, businesses, content. They don't consume the future, they build it.",
    beliefs: "Action > words. Ship fast. Learn by doing. The world rewards makers, not talkers.",
    who: "Developers, entrepreneurs, creators, makers, inventors across ALL countries",
    winning: true,
  },
  {
    id: "seekers",
    label: "The Seekers",
    emoji: "🔭",
    color: "#3b82f6",
    size: 38,
    members: "~280M",
    influence: 24,
    influenceTrend: "rising",
    desc: "Lifelong learners obsessed with understanding how things work. Driven by curiosity, not credentials.",
    beliefs: "Knowledge compounds. Question everything. Degrees < skills. Cross-disciplinary thinking wins.",
    who: "Scientists, researchers, autodidacts, curious minds in every field",
    winning: true,
  },
  {
    id: "connectors",
    label: "The Connectors",
    emoji: "🌐",
    color: "#8b5cf6",
    size: 35,
    members: "~220M",
    influence: 18,
    influenceTrend: "rising",
    desc: "People who link ideas, people, and resources across borders. They see relationships others miss.",
    beliefs: "Your network IS your net worth. Collaboration > competition. Bridge cultures, don't build walls.",
    who: "Diplomats, community builders, marketplace creators, translators of ideas",
    winning: true,
  },
  {
    id: "guardians",
    label: "The Guardians",
    emoji: "🛡️",
    color: "#f59e0b",
    size: 30,
    members: "~400M",
    influence: 14,
    influenceTrend: "stable",
    desc: "Protectors of systems — security, health, environment, justice. Without them, builders have no foundation.",
    beliefs: "Stability enables progress. Protect the vulnerable. Long-term thinking > short-term gain.",
    who: "Doctors, soldiers, climate scientists, judges, teachers, caregivers",
    winning: true,
  },
  {
    id: "dreamers",
    label: "The Dreamers",
    emoji: "✨",
    color: "#ec4899",
    size: 25,
    members: "~150M",
    influence: 8,
    influenceTrend: "rising",
    desc: "Visionaries who imagine what doesn't exist yet. Artists, philosophers, and those who dare to think differently.",
    beliefs: "Imagination precedes reality. Art and beauty matter. Dream big, start small.",
    who: "Artists, writers, philosophers, visionary entrepreneurs",
    winning: true,
  },
  {
    id: "anchored",
    label: "The Anchored",
    emoji: "⚓",
    color: "#6b7280",
    size: 55,
    members: "~3B+",
    influence: 4,
    influenceTrend: "falling",
    desc: "People locked into old-world systems — geography, caste, tradition, bureaucracy. Not by choice, but by circumstance.",
    beliefs: "Varies — many want change but are trapped by systems designed to keep them in place.",
    who: "Most of humanity — farmers, factory workers, govt employees, traditional workers",
    winning: false,
  },
];

// ── New World Alliances (user-joinable) ──
const SEED_ALLIANCES = [
  {
    id: "a1",
    name: "Builders Without Borders",
    emoji: "🌍🔨",
    founder: { name: "Aisha Malik", avatar: "👩‍💻", handle: "@aisha_dev" },
    members: 12847,
    founded: "3 months ago",
    worldVision:
      "A world where a brilliant kid anywhere has the same tools, access, and opportunity as one in Silicon Valley. Geography should not determine destiny.",
    commitments: [
      "Build one thing every month",
      "Teach one skill to someone who can't afford it",
      "Share your failures publicly — normalize learning",
      "Help one person outside your country every quarter",
    ],
    philosophy:
      "We believe the next billion-dollar company will come from someone who currently has no internet. Our job is to make sure they get the tools.",
    discussion: [
      {
        user: { name: "Ali Hassan", avatar: "🧑‍💻" },
        text: "Just shipped a free multilingual coding course for rural regions. 2,000 signups in first week. This alliance is why I built it.",
        time: "2h ago",
        likes: 345,
      },
      {
        user: { name: "Nia Okafor", avatar: "👷" },
        text: "From the Global South — we have talent everywhere but mentorship is scarce. Can this alliance create a global mentorship network?",
        time: "5h ago",
        likes: 234,
      },
    ],
    tags: ["tech", "education", "equality", "global"],
    mindsets: ["builders", "seekers"],
  },
  {
    id: "a2",
    name: "The 2050 Parents",
    emoji: "👶🌱",
    founder: { name: "Dr. Fatima Noor", avatar: "👩‍⚕️", handle: "@dr_fatima" },
    members: 34521,
    founded: "6 months ago",
    worldVision:
      "We're raising the generation that will live to 2100. They'll face climate collapse, AI disruption, and a completely different world. Are we preparing them — or preparing them for OUR world that won't exist?",
    commitments: [
      "Teach your children critical thinking, not obedience",
      "Expose them to multiple worldviews, not just yours",
      "Let them fail safely now so they're resilient later",
      "1 hour/week learning alongside your child, not just sending them to school",
    ],
    philosophy:
      "Every parenting decision is a bet on the future. Most parents are betting on 1990. We're betting on 2050. Our children don't need our answers — they need our questions.",
    discussion: [
      {
        user: { name: "Prof. Zainab", avatar: "👩‍🏫" },
        text: "The hardest part isn't teaching kids new things. It's UN-teaching ourselves the old things we pass on unconsciously — obey authority, get a govt job, don't question elders.",
        time: "1d ago",
        likes: 892,
      },
      {
        user: { name: "Sara Ahmed", avatar: "👩‍💼" },
        text: "My 8-year-old just used ChatGPT to write a story about a girl who solves water crisis in Sindh. She didn't learn this in school. She learned it because I let her be curious.",
        time: "8h ago",
        likes: 567,
      },
    ],
    tags: ["parenting", "future", "education", "mindset"],
    mindsets: ["guardians", "dreamers"],
  },
  {
    id: "a3",
    name: "Global Solar Army",
    emoji: "☀️⚡",
    founder: { name: "Eng. Rashid Kamal", avatar: "👷", handle: "@solar_rashid" },
    members: 8932,
    founded: "2 months ago",
    worldVision:
      "150+ countries have 300+ sunny days. Every home should generate its own power. We don't need centralized grids. We need solar panels and the will to install them.",
    commitments: [
      "Install solar on your own home within 6 months",
      "Help 3 neighbors understand solar economics",
      "Document your installation journey for others",
      "Advocate for net-metering policy in your district",
    ],
    philosophy:
      "Energy independence isn't a government program. It's a people's movement. Every rooftop panel is an act of freedom from circular debt, from load shedding, from dependence.",
    discussion: [
      {
        user: { name: "Muhammad Iqbal", avatar: "👨‍🌾" },
        text: "Installed 5KW system on my farm. Electricity bills eliminated. Paid back investment in 2 years. Solar should be universal in sunny regions.",
        time: "3h ago",
        likes: 1234,
      },
    ],
    tags: ["energy", "climate", "independence", "solar"],
    mindsets: ["builders", "guardians"],
  },
  {
    id: "a4",
    name: "Faith & Tech Alliance",
    emoji: "🕌💻",
    founder: { name: "Maulana Tech", avatar: "🧕", handle: "@faith_tech" },
    members: 21453,
    founded: "4 months ago",
    worldVision:
      "All faith traditions emphasize knowledge and wisdom. This alliance bridges faith communities globally with cutting-edge technology. Ethical innovation for all.",
    commitments: [
      "Learn one new digital skill every month",
      "Build tech that serves faith communities — health, education, finance",
      "Create ethically-compliant fintech alternatives",
      "Bridge the traditional-modern education divide through shared learning",
    ],
    philosophy:
      "Our ancestors built the House of Wisdom in Baghdad that preserved and advanced all human knowledge. We can build the digital version. Technology is not haram — ignorance is.",
    discussion: [
      {
        user: { name: "Hafiz Abdullah", avatar: "🧑‍🎓" },
        text: "Built an AI Quran tutor that helps children learn tajweed through voice recognition. 50,000 users in 3 countries. This is what happens when faith meets technology.",
        time: "6h ago",
        likes: 2341,
      },
    ],
    tags: ["faith", "technology", "knowledge", "fintech"],
    mindsets: ["seekers", "builders"],
  },
  {
    id: "a5",
    name: "Autonomous Community Grid",
    emoji: "🤖🌾🔗",
    founder: { name: "Nia Okafor", avatar: "👷", handle: "@nia_builder" },
    members: 11204,
    founded: "1 month ago",
    worldVision:
      "Communities should be able to sustain themselves with local food, water, energy, and logistics systems coordinated by AI, robotics, and programmable ownership. Dependency should be optional, not mandatory.",
    commitments: [
      "Deploy at least one local automation pilot for food, water, or logistics in your district",
      "Open-source operational data so other communities can replicate proven models",
      "Use transparent on-chain accounting for funding and machine output verification",
      "Prioritize essentials first: food, water, energy, then scale to manufacturing and trade",
    ],
    philosophy:
      "AI without physical execution is incomplete. Robotics without ownership rails is fragile. Web3 without real-world infrastructure is abstract. The power is in combining all three to produce resilient, self-sustained local economies.",
    discussion: [
      {
        user: { name: "Sara Ahmed", avatar: "👩‍💼" },
        text: "We are exploring tokenized financing for cold-chain + warehouse robots tied to measurable food loss reduction.",
        time: "3h ago",
        likes: 611,
      },
      {
        user: { name: "Muhammad Iqbal", avatar: "👨‍🌾" },
        text: "If alliances can fund sensors, irrigation bots, and storage together, farms can stabilize output and pricing locally.",
        time: "1h ago",
        likes: 447,
      },
    ],
    tags: ["ai", "robotics", "web3", "food", "infrastructure", "self-sustained"],
    mindsets: ["builders", "connectors", "guardians"],
  },
];

const SEED_MISSIONS = [
  {
    id: "m1",
    allianceId: "a5",
    title: "Deploy Food + Water Sensor Pilot",
    summary:
      "Stand up a minimum viable sensor grid for one local food and water node, with transparent uptime + output tracking.",
    deliverables: [
      "Map one local farm/water site and publish baseline metrics",
      "Deploy at least 5 low-cost sensors and stream readings",
      "Share a public dashboard snapshot + 7-day anomaly report",
    ],
    effort: "4-6 hours",
    rewardUsd: 120,
    rewardPoints: 260,
    participants: 384,
    urgency: "critical",
  },
  {
    id: "m2",
    allianceId: "a3",
    title: "Launch Microgrid Readiness Plan",
    summary:
      "Create a practical plan for one neighborhood microgrid with load assumptions, capex estimate, and first-install timeline.",
    deliverables: [
      "Estimate peak demand for 20-50 homes/businesses",
      "Publish solar + battery sizing assumptions",
      "Present rollout phases with cost, owners, and payback",
    ],
    effort: "3-5 hours",
    rewardUsd: 95,
    rewardPoints: 210,
    participants: 269,
    urgency: "high",
  },
  {
    id: "m3",
    allianceId: "a1",
    title: "Automate One Local Logistics Loop",
    summary:
      "Use AI planning + shared routing to reduce one recurring local delivery cycle by time and cost.",
    deliverables: [
      "Document current route time/cost baseline",
      "Run AI-assisted optimized routing for 7 days",
      "Publish before/after metrics + reusable playbook",
    ],
    effort: "4-7 hours",
    rewardUsd: 140,
    rewardPoints: 300,
    participants: 441,
    urgency: "critical",
  },
];

const SEED_MISSION_PROOFS = [
  {
    id: "proof_1",
    missionId: "m1",
    userName: "Nia Okafor",
    avatar: "👷",
    proof:
      "Installed moisture + flow sensors in two farms and published first 48h telemetry. We already detected one leakage pattern.",
    time: "32m ago",
  },
  {
    id: "proof_2",
    missionId: "m2",
    userName: "Muhammad Iqbal",
    avatar: "👨‍🌾",
    proof:
      "Built load profile for 27 homes + one cold-storage point. Shared capex/payback sheet with local cooperative leaders.",
    time: "1h ago",
  },
  {
    id: "proof_3",
    missionId: "m3",
    userName: "Aisha Malik",
    avatar: "👩‍💻",
    proof:
      "Optimized 6 delivery routes with AI planner. Distance down 18%, on-time delivery up 23%, fuel costs down 12% in week one.",
    time: "2h ago",
  },
];

// ── DAILY ROUTINE SCORING ──
const ROUTINE_QUESTIONS = [
  {
    id: "wake",
    q: "What time do you usually wake up?",
    options: [
      { text: "Before 5 AM", qi: 15, tag: "Discipline is the foundation of Qi" },
      { text: "5-7 AM", qi: 12, tag: "Solid — most high performers here" },
      { text: "7-9 AM", qi: 8, tag: "Average — you're leaving energy on the table" },
      { text: "After 9 AM", qi: 3, tag: "The world has already moved by the time you start" },
    ],
  },
  {
    id: "learn",
    q: "How much time do you spend learning NEW skills daily?",
    options: [
      { text: "2+ hours", qi: 20, tag: "You're building compound knowledge interest" },
      { text: "30 min - 2 hours", qi: 14, tag: "Good — consistency will compound" },
      { text: "Occasionally", qi: 6, tag: "Not enough in a world changing this fast" },
      { text: "None — I use existing skills", qi: 0, tag: "🚨 DANGER: Your skills are depreciating daily" },
    ],
  },
  {
    id: "screen",
    q: "What do you mostly do on your phone?",
    options: [
      { text: "Learn, build, create, earn", qi: 18, tag: "Phone is a tool — you're using it right" },
      { text: "Mix of productive + entertainment", qi: 10, tag: "Cut the entertainment by 50% — watch what happens" },
      { text: "Social media scrolling", qi: 3, tag: "You're making others rich with your attention" },
      { text: "Mostly entertainment/gaming", qi: 0, tag: "Every hour scrolling = 1 Qi burned for someone else's profit" },
    ],
  },
  {
    id: "income",
    q: "How many income streams do you have?",
    options: [
      { text: "3+ streams", qi: 20, tag: "Antifragile. You'll survive any disruption." },
      { text: "2 streams", qi: 14, tag: "Good diversification. Build one more." },
      { text: "1 salary/job", qi: 6, tag: "Single point of failure. One layoff away from crisis." },
      { text: "No reliable income", qi: 0, tag: "Urgent: Build ANY income stream this week" },
    ],
  },
  {
    id: "digital",
    q: "Can you earn money from the internet right now?",
    options: [
      { text: "Yes — actively earning online", qi: 18, tag: "You're connected to the global economy. Huge advantage." },
      { text: "I have the skills but haven't started", qi: 10, tag: "Potential energy → Convert to kinetic. Start TODAY." },
      { text: "I'm learning how", qi: 6, tag: "On the right path. Accelerate." },
      { text: "No — don't know how", qi: 0, tag: "In 2026, this is like not knowing how to read in 1926" },
    ],
  },
  {
    id: "network",
    q: "How often do you connect with people outside your city/country?",
    options: [
      { text: "Daily — global network", qi: 16, tag: "Your network IS your net worth in the new world" },
      { text: "Weekly", qi: 10, tag: "Decent. Increase touchpoints." },
      { text: "Rarely", qi: 4, tag: "You're limited to local opportunities" },
      { text: "Never — only local contacts", qi: 0, tag: "The biggest opportunities are OUTSIDE your zip code" },
    ],
  },
  {
    id: "health",
    q: "Do you exercise or take care of your health?",
    options: [
      { text: "Daily exercise + good diet", qi: 14, tag: "High energy = high output. You get it." },
      { text: "Some exercise, okay diet", qi: 8, tag: "Upgrade this — body is your primary asset" },
      { text: "Rarely", qi: 3, tag: "Low energy = low Qi. Fix this first." },
      { text: "No — health is poor", qi: 0, tag: "Nothing else matters if health fails. Priority #1." },
    ],
  },
  {
    id: "ai_usage",
    q: "How do you use AI tools (ChatGPT, etc.)?",
    options: [
      { text: "Daily power user — it's my co-pilot", qi: 20, tag: "You're already living in the new world. Maximum Qi." },
      { text: "Use it sometimes for work/learning", qi: 12, tag: "Good start. Go deeper — make it your daily partner." },
      { text: "Tried it a few times", qi: 5, tag: "You're falling behind. AI users are 10x faster than you." },
      { text: "Never used / don't know what it is", qi: 0, tag: "🚨 CRITICAL: Start today or be left in the old world permanently" },
    ],
  },
];

// ── REGIONS ──
const REGIONS = [
  "North America",
  "Europe",
  "South Asia",
  "East Asia",
  "Middle East",
  "Africa",
  "SE Asia",
  "Latin America",
];
const SECTORS = [
  "Technology/IT",
  "Agriculture",
  "Healthcare",
  "Education",
  "Finance/Banking",
  "Manufacturing",
  "Military/Defense",
  "Government",
  "Legal",
  "Media",
  "Real Estate",
  "Retail",
  "Logistics",
  "Energy",
  "Freelancing",
  "Student",
  "Unemployed",
];
const CHALLENGES = [
  "Low Income",
  "Unemployment",
  "Skill Gap",
  "No Education Access",
  "No Healthcare",
  "Digital Literacy Gap",
  "Water Crisis",
  "Food Insecurity",
  "Housing Crisis",
  "Heavy Debt",
  "No Business Capital",
  "Security Fears",
  "Climate Damage",
];

const LIVE_ACTIONS = [
  "joined alliance",
  "posted insight on",
  "reacted to",
  "commented on",
  "voted in poll",
  "started discussion",
];

const LIVE_TARGETS = [
  "AI Job Disruption",
  "Future of Money",
  "Water Crisis Thread",
  "Global Solar Army",
  "Digital Democracy Shift",
  "Gig Economy Blueprint",
  "Currency Trends",
  "Builders Without Borders",
];

const LIVE_REGIONS = ["Lagos", "Karachi", "Nairobi", "Berlin", "Jakarta", "Toronto", "Dubai", "Sao Paulo"];

const randomItem = (items) => items[Math.floor(Math.random() * items.length)];
const randomRange = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const createLiveEvent = (ageSec = 0) => {
  const knownUser = Math.random() > 0.35;
  const user = knownUser
    ? randomItem(USER_PROFILES)
    : {
        name: randomItem(["Aria Khan", "Leo Mendes", "Zain Qureshi", "Mina Noor", "Kofi Mensah", "Sana Ali"]),
        avatar: randomItem(AVATARS),
      };

  return {
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: user.name,
    avatar: user.avatar,
    action: randomItem(LIVE_ACTIONS),
    target: randomItem(LIVE_TARGETS),
    location: randomItem(LIVE_REGIONS),
    ageSec,
  };
};

const formatActivityAge = (ageSec) => {
  if (ageSec < 8) return "just now";
  if (ageSec < 60) return `${ageSec}s ago`;
  return `${Math.floor(ageSec / 60)}m ago`;
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value || "").trim());

const calculateAgeFromDob = (dobValue) => {
  if (!dobValue) return 25;
  const birthDate = new Date(dobValue);
  if (Number.isNaN(birthDate.getTime())) return 25;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const birthdayPassed = monthDiff > 0 || (monthDiff === 0 && today.getDate() >= birthDate.getDate());
  if (!birthdayPassed) age -= 1;
  return Math.max(0, age);
};

const sanitizeLoadedProfile = (profile) => {
  if (!profile || typeof profile !== "object") return profile;
  const looksLikeLegacyAutofill =
    profile.email &&
    profile.dob &&
    profile.province === "North America" &&
    profile.sector === "Technology/IT" &&
    profile.type === "civilian";

  if (profile.profileTier !== "basic" && !looksLikeLegacyAutofill) return profile;

  return {
    ...profile,
    profileTier: "basic",
    province: "",
    sector: "",
    type: "",
    education: "",
    income: "",
    challenges: Array.isArray(profile.challenges) ? profile.challenges : [],
  };
};

const createMissionInviteCode = (title = "wire") => {
  const slug = title.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 4) || "MSN";
  const nonce = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${slug}-${nonce}`;
};

const getMissionRewardJou = (mission) => {
  if (Number.isFinite(mission?.rewardJou)) {
    return clamp(Math.round(mission.rewardJou), MIN_MISSION_REWARD_JOU, MAX_MISSION_REWARD_JOU);
  }
  if (Number.isFinite(mission?.rewardUsd)) {
    return clamp(Math.round(mission.rewardUsd * 1.6), MIN_MISSION_REWARD_JOU, MAX_MISSION_REWARD_JOU);
  }
  return 120;
};

const buildSeedMissionThreads = () => {
  const byMission = Object.fromEntries(
    SEED_MISSIONS.map((mission) => [
      mission.id,
      [
        {
          id: `${mission.id}_ai_boot`,
          role: "ai",
          user: { name: "Rewire AI Ops", avatar: "🤖" },
          text: `AI kickoff for wire "${mission.title}". Priority action is to ship one measurable deliverable in the next 24h.`,
          time: "live",
          likes: 0,
        },
      ],
    ]),
  );

  SEED_MISSION_PROOFS.forEach((proof) => {
    if (!byMission[proof.missionId]) byMission[proof.missionId] = [];
    byMission[proof.missionId].push({
      id: `${proof.id}_thread`,
      role: "member",
      user: { name: proof.userName, avatar: proof.avatar },
      text: proof.proof,
      time: proof.time,
      likes: randomRange(4, 29),
    });
  });

  return byMission;
};

const buildSeedAllianceThreads = () =>
  Object.fromEntries(
    SEED_ALLIANCES.map((alliance) => [
      alliance.id,
      [
        {
          id: `${alliance.id}_ai_ops`,
          role: "ai",
          user: { name: "Rewire AI Coordinator", avatar: "🧠" },
          text: `AI action board is live for ${alliance.name}. Members should post measurable updates with location + impact.`,
          time: "live",
          likes: 0,
        },
        ...(alliance.discussion || []).map((message, index) => ({
          id: `${alliance.id}_seed_${index}`,
          role: "member",
          user: message.user,
          text: message.text,
          time: message.time,
          likes: message.likes || 0,
        })),
      ],
    ]),
  );

const createMissionAiReply = (mission, actorName) =>
  `AI next action: ${actorName} now owns checkpoint 1 for wire "${mission.title}". Submit proof with metrics to unlock treasury release.`;

const createAllianceAiReply = (alliance, actorName) =>
  `AI directive: ${actorName}, align your next action with ${alliance.name}'s commitments and publish one measurable outcome in 24h.`;

const normalizeLiveEvent = (event) => ({
  id: event?.id || `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
  name: event?.name || "Guest",
  avatar: event?.avatar || "👤",
  action: event?.action || "joined",
  target: event?.target || "Global Feed",
  location: event?.location || "",
  ageSec: Number.isFinite(event?.ageSec) ? event.ageSec : 0,
});

// ── ISOLATED CLOCK ──
const LiveClock = ({ className }) => {
  const [t, setT] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => setT(new Date()), 60000);
    return () => clearInterval(i);
  }, []);
  return (
    <span className={className}>
      {t.toLocaleDateString("en-PK", { weekday: "short", month: "short", day: "numeric" })}
    </span>
  );
};

// ── BADGE ──
const Badge = ({ text, color = "green" }) => {
  const c = {
    green: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    blue: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    red: "bg-red-500/15 text-red-400 border-red-500/20",
    yellow: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    purple: "bg-purple-500/15 text-purple-400 border-purple-500/20",
    gray: "bg-gray-500/15 text-gray-400 border-gray-500/20",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs border ${c[color] || c.green}`}>
      {text}
    </span>
  );
};

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function MindShift360() {
  const [tab, setTab] = useState("feed");
  const [profile, setProfile] = useState(null);
  const [showOnboard, setShowOnboard] = useState(false);
  const [showLanding, setShowLanding] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const url = new URL(window.location.href);
      return !url.searchParams.get("invite");
    } catch {
      return true;
    }
  });
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [userReactions, setUserReactions] = useState({});
  const [userVotes, setUserVotes] = useState({});
  const [expandedParadigm, setExpandedParadigm] = useState(null);
  const [newPostText, setNewPostText] = useState("");
  const [communityPosts, setCommunityPosts] = useState([]);
  const [bookmarks, setBookmarks] = useState(new Set());
  const [userComments, setUserComments] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    age: 25,
    province: "",
    sector: "",
    education: "",
    income: "",
    type: "",
    challenges: [],
  });
  const [otpInput, setOtpInput] = useState("");
  const [otpSessionToken, setOtpSessionToken] = useState("");
  const [otpIssuedFor, setOtpIssuedFor] = useState("");
  const [otpDebugCode, setOtpDebugCode] = useState("");
  const [otpStatus, setOtpStatus] = useState("idle");
  const [otpMessage, setOtpMessage] = useState("");
  const [landingAuthMode, setLandingAuthMode] = useState("signup");

  // Network stats that grow
  const [networkStats, setNetworkStats] = useState({
    minds: 847293,
    interactions: 2847291,
    accuracy: 78.2,
  });
  const [livePresence, setLivePresence] = useState({
    onlineNow: 12384,
    joiningPerMin: 71,
    postsPerMin: 164,
    activeCountries: 142,
  });
  const [fomoStats, setFomoStats] = useState({
    nextDropInMin: 13,
    seatsLeft: 58,
  });
  const [liveEvents, setLiveEvents] = useState(() =>
    [0, 6, 14, 25, 39, 52].map((age) => createLiveEvent(age)),
  );
  const [apiConnected, setApiConnected] = useState(false);
  const [shiftIdx, setShiftIdx] = useState(0);
  const [mapLayer, setMapLayer] = useState("geo");
  const [showWorldContext, setShowWorldContext] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [selectedAlliance, setSelectedAlliance] = useState(null);
  const [showCreateAlliance, setShowCreateAlliance] = useState(false);
  const [joinedAlliances, setJoinedAlliances] = useState(new Set());
  const [allianceCommentInputs, setAllianceCommentInputs] = useState({});
  const [newAlliance, setNewAlliance] = useState({
    name: "",
    worldVision: "",
    philosophy: "",
    commitments: ["", "", ""],
  });
  const [userAlliances, setUserAlliances] = useState([]);
  const [allianceThreads, setAllianceThreads] = useState(() => buildSeedAllianceThreads());
  const [routineStep, setRoutineStep] = useState(-1);
  const [routineAnswers, setRoutineAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [missionState, setMissionState] = useState({});
  const [missionProofInputs, setMissionProofInputs] = useState({});
  const [missionProofFeed, setMissionProofFeed] = useState(SEED_MISSION_PROOFS);
  const [missionThreads, setMissionThreads] = useState(() => buildSeedMissionThreads());
  const [missionCommentInputs, setMissionCommentInputs] = useState({});
  const [userMissions, setUserMissions] = useState([]);
  const [showMissionBuilder, setShowMissionBuilder] = useState(false);
  const [missionDraft, setMissionDraft] = useState({
    title: "",
    summary: "",
    deliverables: ["", "", ""],
    effort: "3-5 hours",
    rewardJou: 120,
    allianceId: "a5",
  });
  const [inviteCodeInput, setInviteCodeInput] = useState("");
  const [lastInviteCode, setLastInviteCode] = useState("");
  const [walletJoules, setWalletJoules] = useState(0);
  const [starterGrantIssued, setStarterGrantIssued] = useState(false);
  const [strategyBattles, setStrategyBattles] = useState(STRATEGY_COMPETITIONS);
  const [strategySupport, setStrategySupport] = useState({});
  const [allocationAmount, setAllocationAmount] = useState(50);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loadLiveData = async () => {
      try {
        const response = await fetch("/api/live", { cache: "no-store" });
        if (!response.ok) throw new Error(`live api ${response.status}`);
        const payload = await response.json();
        if (cancelled) return;

        setApiConnected(true);

        if (payload?.networkStats) {
          setNetworkStats((stats) => ({
            minds: Math.max(stats.minds, payload.networkStats.minds ?? stats.minds),
            interactions: Math.max(stats.interactions, payload.networkStats.interactions ?? stats.interactions),
            accuracy: Math.max(stats.accuracy, payload.networkStats.accuracy ?? stats.accuracy),
          }));
        }
        if (payload?.livePresence) {
          setLivePresence((presence) => ({
            onlineNow: payload.livePresence.onlineNow ?? presence.onlineNow,
            joiningPerMin: payload.livePresence.joiningPerMin ?? presence.joiningPerMin,
            postsPerMin: payload.livePresence.postsPerMin ?? presence.postsPerMin,
            activeCountries: payload.livePresence.activeCountries ?? presence.activeCountries,
          }));
        }
        if (payload?.fomoStats) {
          setFomoStats((stats) => ({
            nextDropInMin: payload.fomoStats.nextDropInMin ?? stats.nextDropInMin,
            seatsLeft: payload.fomoStats.seatsLeft ?? stats.seatsLeft,
          }));
        }
      } catch {
        if (!cancelled) setApiConnected(false);
      }
    };

    loadLiveData();
    const interval = setInterval(loadLiveData, 4000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveEvents((events) => {
        const aged = events.map((event) => ({ ...event, ageSec: event.ageSec + 4 }));
        return [createLiveEvent(0), ...aged].slice(0, 8).map(normalizeLiveEvent);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ticker = setInterval(() => setShiftIdx((prev) => (prev + 1) % LIVE_SHIFTS.length), 5000);
    return () => clearInterval(ticker);
  }, []);

  useEffect(() => {
    const strategyTicker = setInterval(() => {
      setStrategyBattles((prev) =>
        prev.map((battle) => {
          const supportedSide = strategySupport[battle.id];
          const supportBias =
            supportedSide === "a" ? Math.min(2.5, allocationAmount / 32) : supportedSide === "b" ? -Math.min(2.5, allocationAmount / 32) : 0;
          const volatility = (Math.random() - 0.5) * 1.8;
          const nextWinRateA = clamp(battle.winRateA + supportBias * 0.12 + volatility, 18, 82);

          const treasuryDriftA = battle.dailyFlow * ((nextWinRateA / 100) * 0.06 + 0.015);
          const treasuryDriftB = battle.dailyFlow * (((100 - nextWinRateA) / 100) * 0.06 + 0.015);

          return {
            ...battle,
            winRateA: Number(nextWinRateA.toFixed(1)),
            sideA: { ...battle.sideA, treasury: Number((battle.sideA.treasury + treasuryDriftA).toFixed(2)) },
            sideB: { ...battle.sideB, treasury: Number((battle.sideB.treasury + treasuryDriftB).toFixed(2)) },
          };
        }),
      );
    }, 5000);

    return () => clearInterval(strategyTicker);
  }, [allocationAmount, strategySupport]);

  useEffect(() => {
    if (apiConnected) return undefined;

    const interval = setInterval(() => {
      setNetworkStats((stats) => ({
        ...stats,
        minds: stats.minds + randomRange(0, 3),
        interactions: stats.interactions + randomRange(11, 47),
        accuracy: Math.min(99, stats.accuracy + 0.0007),
      }));

      setLivePresence((presence) => ({
        onlineNow: Math.max(10000, presence.onlineNow + randomRange(-18, 26)),
        joiningPerMin: Math.max(25, presence.joiningPerMin + randomRange(-4, 6)),
        postsPerMin: Math.max(80, presence.postsPerMin + randomRange(-8, 12)),
        activeCountries: Math.max(120, Math.min(190, presence.activeCountries + randomRange(-1, 1))),
      }));

      setFomoStats((stats) => {
        const resetWindow = stats.nextDropInMin <= 1;
        return {
          nextDropInMin: resetWindow ? randomRange(12, 20) : stats.nextDropInMin - 1,
          seatsLeft: resetWindow ? randomRange(40, 85) : Math.max(7, stats.seatsLeft - (Math.random() > 0.45 ? 1 : 0)),
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [apiConnected]);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("rewire_profile");
      const savedJoinedAlliances = localStorage.getItem("rewire_joined_alliances");
      const savedUserAlliances = localStorage.getItem("rewire_user_alliances");
      const savedMissionState = localStorage.getItem("rewire_mission_state");
      const savedMissionProofFeed = localStorage.getItem("rewire_mission_proof_feed");
      const savedMissionThreads = localStorage.getItem("rewire_mission_threads");
      const savedAllianceThreads = localStorage.getItem("rewire_alliance_threads");
      const savedUserMissions = localStorage.getItem("rewire_user_missions");
      const savedWalletJoules = localStorage.getItem("rewire_wallet_joules");
      const savedStarterGrantIssued = localStorage.getItem("rewire_starter_grant_issued");
      const savedStrategyBattles = localStorage.getItem("rewire_strategy_battles");
      const savedStrategySupport = localStorage.getItem("rewire_strategy_support");
      const savedAllocationAmount = localStorage.getItem("rewire_allocation_amount");

      if (savedProfile) setProfile(sanitizeLoadedProfile(JSON.parse(savedProfile)));
      if (savedJoinedAlliances) setJoinedAlliances(new Set(JSON.parse(savedJoinedAlliances)));
      if (savedUserAlliances) setUserAlliances(JSON.parse(savedUserAlliances));
      if (savedMissionState) setMissionState(JSON.parse(savedMissionState));
      if (savedMissionProofFeed) setMissionProofFeed(JSON.parse(savedMissionProofFeed));
      if (savedMissionThreads) setMissionThreads(JSON.parse(savedMissionThreads));
      if (savedAllianceThreads) setAllianceThreads(JSON.parse(savedAllianceThreads));
      if (savedUserMissions) setUserMissions(JSON.parse(savedUserMissions));
      if (savedWalletJoules !== null) setWalletJoules(Number(savedWalletJoules) || 0);
      if (savedStarterGrantIssued !== null) setStarterGrantIssued(savedStarterGrantIssued === "1");
      if (savedStrategyBattles) setStrategyBattles(JSON.parse(savedStrategyBattles));
      if (savedStrategySupport) setStrategySupport(JSON.parse(savedStrategySupport));
      if (savedAllocationAmount) setAllocationAmount(Number(savedAllocationAmount));
    } catch {
      setMissionState({});
      setMissionProofFeed(SEED_MISSION_PROOFS);
      setMissionThreads(buildSeedMissionThreads());
      setAllianceThreads(buildSeedAllianceThreads());
      setUserMissions([]);
      setWalletJoules(0);
      setStarterGrantIssued(false);
      setStrategyBattles(STRATEGY_COMPETITIONS);
      setStrategySupport({});
      setAllocationAmount(50);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rewire_profile", JSON.stringify(profile));
  }, [hydrated, profile]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rewire_joined_alliances", JSON.stringify([...joinedAlliances]));
  }, [hydrated, joinedAlliances]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rewire_user_alliances", JSON.stringify(userAlliances));
  }, [hydrated, userAlliances]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rewire_mission_state", JSON.stringify(missionState));
  }, [hydrated, missionState]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rewire_mission_proof_feed", JSON.stringify(missionProofFeed));
  }, [hydrated, missionProofFeed]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rewire_mission_threads", JSON.stringify(missionThreads));
  }, [hydrated, missionThreads]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rewire_alliance_threads", JSON.stringify(allianceThreads));
  }, [hydrated, allianceThreads]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rewire_user_missions", JSON.stringify(userMissions));
  }, [hydrated, userMissions]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rewire_wallet_joules", String(walletJoules));
  }, [hydrated, walletJoules]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rewire_starter_grant_issued", starterGrantIssued ? "1" : "0");
  }, [hydrated, starterGrantIssued]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rewire_strategy_battles", JSON.stringify(strategyBattles));
  }, [hydrated, strategyBattles]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rewire_strategy_support", JSON.stringify(strategySupport));
  }, [hydrated, strategySupport]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("rewire_allocation_amount", String(allocationAmount));
  }, [hydrated, allocationAmount]);

  const toggleReaction = useCallback((postId, key) => {
    setUserReactions((prev) => {
      const postReactions = prev[postId] || {};
      return { ...prev, [postId]: { ...postReactions, [key]: !postReactions[key] } };
    });
    setNetworkStats((s) => ({
      ...s,
      interactions: s.interactions + 1,
      accuracy: Math.min(99, s.accuracy + 0.001),
    }));
  }, []);

  const castVote = useCallback(
    (postId, optionIdx) => {
      if (userVotes[postId] !== undefined) return;
      setUserVotes((prev) => ({ ...prev, [postId]: optionIdx }));
      setNetworkStats((s) => ({ ...s, interactions: s.interactions + 1 }));
    },
    [userVotes],
  );

  const toggleBookmark = useCallback((postId) => {
    setBookmarks((prev) => {
      const n = new Set(prev);
      n.has(postId) ? n.delete(postId) : n.add(postId);
      return n;
    });
  }, []);

  const addComment = useCallback(
    (postId) => {
      const text = commentInputs[postId]?.trim();
      if (!text || !profile) return;
      setUserComments((prev) => ({
        ...prev,
        [postId]: [
          ...(prev[postId] || []),
          {
            user: {
              name: profile.name,
              handle: `@${profile.name.toLowerCase().replace(/\s/g, "_")}`,
              avatar: AVATARS[profile.name.length % AVATARS.length],
              badge: profile.sector?.split("/")[0],
              verified: false,
            },
            text,
            time: "just now",
            likes: 0,
            replies: [],
          },
        ],
      }));
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
      setNetworkStats((s) => ({
        ...s,
        interactions: s.interactions + 1,
        accuracy: Math.min(99, s.accuracy + 0.005),
      }));
    },
    [commentInputs, profile],
  );

  const submitCommunityPost = useCallback(() => {
    if (!newPostText.trim() || !profile) return;
    setCommunityPosts((prev) => [
      {
        id: `user_${Date.now()}`,
        type: "community_wisdom",
        user: {
          name: profile.name,
          handle: `@${profile.name.toLowerCase().replace(/\s/g, "_")}`,
          avatar: AVATARS[profile.name.length % AVATARS.length],
          badge: profile.sector?.split("/")[0],
          verified: false,
        },
        title: "",
        body: newPostText,
        reactions: { fire: 0, insight: 0, concern: 0, strength: 0, think: 0 },
        comments: [],
        time: "just now",
        views: "0",
      },
      ...prev,
    ]);
    setNewPostText("");
  }, [newPostText, profile]);

  const requestOtp = useCallback(async () => {
    const cleanName = form.name.trim();
    const cleanEmail = form.email.trim().toLowerCase();
    const ageFromDob = calculateAgeFromDob(form.dob);

    if (!cleanName || !form.dob || !isValidEmail(cleanEmail)) {
      setOtpStatus("error");
      setOtpMessage("Enter valid name, date of birth, and email first.");
      return;
    }
    if (ageFromDob < 13) {
      setOtpStatus("error");
      setOtpMessage("Account creation requires age 13 or above.");
      return;
    }

    setOtpStatus("sending");
    setOtpMessage("Sending OTP...");
    setOtpDebugCode("");

    try {
      const response = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: cleanName, email: cleanEmail, dob: form.dob }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.ok) {
        setOtpStatus("error");
        setOtpMessage(data?.message || "Failed to send OTP. Please try again.");
        return;
      }

      setOtpSessionToken(data.sessionToken || "");
      setOtpIssuedFor(cleanEmail);
      setOtpDebugCode(data.debugCode || "");
      setOtpStatus("sent");
      setOtpMessage(data.message || `OTP sent to ${cleanEmail}.`);
    } catch {
      setOtpStatus("error");
      setOtpMessage("OTP request failed. Check connection and try again.");
    }

    setOtpInput("");
  }, [form.dob, form.email, form.name]);

  const verifyOtp = useCallback(async () => {
    const cleanEmail = form.email.trim().toLowerCase();
    if (!otpSessionToken || otpStatus === "idle") {
      setOtpStatus("error");
      setOtpMessage("Request OTP first.");
      return;
    }
    if (cleanEmail !== otpIssuedFor) {
      setOtpStatus("error");
      setOtpMessage("Email changed after OTP request. Request a new OTP.");
      return;
    }

    setOtpStatus("verifying");
    setOtpMessage("Verifying OTP...");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, otp: otpInput.trim(), sessionToken: otpSessionToken }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.ok) {
        setOtpStatus("error");
        setOtpMessage(data?.message || "Invalid OTP. Try again.");
        return;
      }
      setOtpStatus("verified");
      setOtpMessage(data.message || "Email verified. You can create your Rewire account now.");
      return;
    } catch {
      setOtpStatus("error");
      setOtpMessage("OTP verification failed. Try again.");
    }
  }, [form.email, otpInput, otpIssuedFor, otpSessionToken, otpStatus]);

  const handleOnboard = useCallback(() => {
    const cleanName = form.name.trim();
    const cleanEmail = form.email.trim().toLowerCase();
    if (!cleanName || !form.dob || !isValidEmail(cleanEmail) || otpStatus !== "verified") return;

    const normalizedProfile = {
      name: cleanName,
      email: cleanEmail,
      dob: form.dob,
      age: calculateAgeFromDob(form.dob),
      profileTier: "basic",
      province: "",
      sector: "",
      education: "",
      income: "",
      type: "",
      challenges: [],
    };

    setProfile(normalizedProfile);
    setShowOnboard(false);
    setOtpStatus("idle");
    setOtpInput("");
    setOtpSessionToken("");
    setOtpIssuedFor("");
    setOtpDebugCode("");
    setOtpMessage("");
    setNetworkStats((s) => ({ ...s, minds: s.minds + 1 }));
  }, [form, otpStatus]);

  const handleLandingCreateWire = useCallback(() => {
    setShowLanding(false);
    setTab("world");
    setShowMissionBuilder(true);
    if (!profile) setShowOnboard(true);
  }, [profile]);

  const handleLandingJoinWires = useCallback(() => {
    setShowLanding(false);
    setTab("world");
    if (!profile) setShowOnboard(true);
  }, [profile]);

  const handleLandingWatchLive = useCallback(() => {
    setShowLanding(false);
    setTab(profile ? "feed" : "world");
  }, [profile]);

  useEffect(() => {
    if (!profile && tab === "feed") {
      setTab("world");
    }
  }, [profile, tab]);

  const totalQi = useMemo(() => Object.values(routineAnswers).reduce((sum, value) => sum + value, 0), [routineAnswers]);
  const maxQi = useMemo(
    () => ROUTINE_QUESTIONS.reduce((sum, question) => sum + Math.max(...question.options.map((option) => option.qi)), 0),
    [],
  );

  const qiLevel = useMemo(() => {
    if (totalQi >= 100) {
      return { label: "APEX PREDATOR", emoji: "🦅", color: "#10b981", desc: "You're built for the new world. Top 2%." };
    }
    if (totalQi >= 70) {
      return {
        label: "RISING FORCE",
        emoji: "🚀",
        color: "#3b82f6",
        desc: "Strong foundation. A few upgrades and you're untouchable.",
      };
    }
    if (totalQi >= 40) {
      return {
        label: "SLEEPING GIANT",
        emoji: "⏰",
        color: "#f59e0b",
        desc: "Potential wasted. The world rewards action, not potential.",
      };
    }
    return {
      label: "RED ALERT",
      emoji: "🚨",
      color: "#ef4444",
      desc: "Your routine is optimized for a world that no longer exists.",
    };
  }, [totalQi]);

  const allAlliances = useMemo(() => [...SEED_ALLIANCES, ...userAlliances], [userAlliances]);
  const allMissions = useMemo(() => [...userMissions, ...SEED_MISSIONS], [userMissions]);

  useEffect(() => {
    if (!hydrated) return;
    setAllianceThreads((prev) => {
      let changed = false;
      const next = { ...prev };
      allAlliances.forEach((alliance) => {
        if (!next[alliance.id]) {
          changed = true;
          next[alliance.id] = [
            {
              id: `${alliance.id}_boot_ai`,
              role: "ai",
              user: { name: "Rewire AI Coordinator", avatar: "🧠" },
              text: `AI action board initialized for ${alliance.name}. Post one measurable output to activate coordination score.`,
              time: "live",
              likes: 0,
            },
          ];
        }
      });
      return changed ? next : prev;
    });
  }, [allAlliances, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    setMissionThreads((prev) => {
      let changed = false;
      const next = { ...prev };
      allMissions.forEach((mission) => {
        if (!next[mission.id]) {
          changed = true;
          next[mission.id] = [
            {
              id: `${mission.id}_boot_ai`,
              role: "ai",
              user: { name: "Rewire AI Ops", avatar: "🤖" },
              text: `Wire "${mission.title}" is live. Claim role, execute one deliverable, and log proof for treasury release.`,
              time: "live",
              likes: 0,
            },
          ];
        }
      });
      return changed ? next : prev;
    });
  }, [allMissions, hydrated]);

  useEffect(() => {
    if (!hydrated || !profile || starterGrantIssued) return;
    setWalletJoules((current) => current + STARTER_JOULE_GRANT);
    setStarterGrantIssued(true);
  }, [hydrated, profile, starterGrantIssued]);

  useEffect(() => {
    if (showOnboard) return;
    setOtpStatus("idle");
    setOtpInput("");
    setOtpSessionToken("");
    setOtpIssuedFor("");
    setOtpDebugCode("");
    setOtpMessage("");
  }, [showOnboard]);

  useEffect(() => {
    if (otpStatus === "idle") return;
    const currentEmail = form.email.trim().toLowerCase();
    if (!currentEmail || (otpIssuedFor && currentEmail !== otpIssuedFor)) {
      setOtpStatus("idle");
      setOtpInput("");
      setOtpSessionToken("");
      setOtpIssuedFor("");
      setOtpDebugCode("");
      setOtpMessage("");
    }
  }, [form.email, otpIssuedFor, otpStatus]);

  const answerQuestion = useCallback(
    (qi) => {
      const question = ROUTINE_QUESTIONS[routineStep];
      if (!question) return;
      setRoutineAnswers((prev) => ({ ...prev, [question.id]: qi }));
      if (routineStep < ROUTINE_QUESTIONS.length - 1) {
        setRoutineStep(routineStep + 1);
      } else {
        setShowResults(true);
      }
    },
    [routineStep],
  );

  const handleCreateAlliance = useCallback(() => {
    if (!newAlliance.name.trim() || !newAlliance.worldVision.trim()) return;

    const alliance = {
      id: `user_${Date.now()}`,
      name: newAlliance.name,
      emoji: "🌟",
      founder: {
        name: profile?.name || "Anonymous",
        avatar: AVATARS[(profile?.name?.length || 3) % AVATARS.length],
        handle: `@${(profile?.name || "anon").toLowerCase().replace(/\s/g, "_")}`,
      },
      members: 1,
      founded: "just now",
      worldVision: newAlliance.worldVision,
      commitments: newAlliance.commitments.filter((commitment) => commitment.trim()),
      philosophy: newAlliance.philosophy,
      discussion: [],
      tags: [],
      mindsets: ["builders"],
    };

    setUserAlliances((prev) => [alliance, ...prev]);
    setAllianceThreads((prev) => ({
      ...prev,
      [alliance.id]: [
        {
          id: `${alliance.id}_launch_ai`,
          role: "ai",
          user: { name: "Rewire AI Coordinator", avatar: "🧠" },
          text: `Alliance launched. Define one measurable objective and assign owners within 24h.`,
          time: "just now",
          likes: 0,
        },
      ],
    }));
    setJoinedAlliances((prev) => new Set([...prev, alliance.id]));
    setShowCreateAlliance(false);
    setNewAlliance({ name: "", worldVision: "", philosophy: "", commitments: ["", "", ""] });
    setSelectedAlliance(alliance.id);
  }, [newAlliance, profile]);

  const updateMissionDraftDeliverable = useCallback((index, value) => {
    setMissionDraft((draft) => {
      const nextDeliverables = [...draft.deliverables];
      nextDeliverables[index] = value;
      return { ...draft, deliverables: nextDeliverables };
    });
  }, []);

  const handleCreateMission = useCallback(() => {
    if (!profile) {
      setShowOnboard(true);
      return;
    }

    const title = missionDraft.title.trim();
    const summary = missionDraft.summary.trim();
    const deliverables = missionDraft.deliverables.map((item) => item.trim()).filter(Boolean);
    const rewardJou = clamp(Number(missionDraft.rewardJou) || 0, MIN_MISSION_REWARD_JOU, MAX_MISSION_REWARD_JOU);

    if (!title || !summary || deliverables.length < 2) return;

    const escrowStake = Math.max(20, Math.round(rewardJou * 0.3));
    if (walletJoules < escrowStake) return;

    const inviteCode = createMissionInviteCode(title);
    const createdAt = Date.now();
    const missionId = `um_${createdAt}`;
    const mission = {
      id: missionId,
      allianceId: missionDraft.allianceId || "a5",
      title,
      summary,
      deliverables,
      effort: missionDraft.effort || "3-5 hours",
      rewardUsd: Math.max(35, Math.round(rewardJou * 0.62)),
      rewardPoints: Math.max(90, Math.round(rewardJou * 1.8)),
      rewardJou,
      participants: 1,
      urgency: "high",
      inviteCode,
      createdBy: profile.name,
    };

    setWalletJoules((current) => Math.max(0, current - escrowStake));
    setUserMissions((prev) => [mission, ...prev]);
    setMissionState((prev) => ({
      ...prev,
      [mission.id]: { status: "joined", joinedAt: createdAt, proof: "", submittedAt: null, rewardedAt: null },
    }));
    setMissionThreads((prev) => ({
      ...prev,
      [mission.id]: [
        {
          id: `${mission.id}_ai_launch`,
          role: "ai",
          user: { name: "Rewire AI Ops", avatar: "🤖" },
          text: `Wire launched. Escrow locked: ${escrowStake} ${JOULE.ticker}. Share invite code ${inviteCode} to recruit execution partners.`,
          time: "just now",
          likes: 0,
        },
        {
          id: `${mission.id}_founder`,
          role: "member",
          user: { name: profile.name, avatar: AVATARS[(profile.name?.length || 0) % AVATARS.length] },
          text: `I launched "${title}". First checkpoint opens now — looking for builders who can ship in 7 days.`,
          time: "just now",
          likes: 0,
        },
      ],
    }));

    if (mission.allianceId) {
      setJoinedAlliances((prev) => (prev.has(mission.allianceId) ? prev : new Set([...prev, mission.allianceId])));
    }

    setMissionDraft({
      title: "",
      summary: "",
      deliverables: ["", "", ""],
      effort: "3-5 hours",
      rewardJou: 120,
      allianceId: missionDraft.allianceId || "a5",
    });
    setShowMissionBuilder(false);
    setLastInviteCode(inviteCode);
    setInviteCodeInput(inviteCode);
    setNetworkStats((stats) => ({ ...stats, interactions: stats.interactions + 2, accuracy: Math.min(99, stats.accuracy + 0.002) }));
  }, [missionDraft, profile, walletJoules]);

  const copyMissionInviteLink = useCallback(async (inviteCode) => {
    if (!inviteCode || typeof window === "undefined") return;
    const link = `${window.location.origin}?invite=${encodeURIComponent(inviteCode)}`;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(link);
      }
      setLastInviteCode(inviteCode);
    } catch {
      setLastInviteCode(inviteCode);
    }
  }, []);

  const postAllianceComment = useCallback(
    (alliance) => {
      if (!profile) {
        setShowOnboard(true);
        return;
      }
      const text = allianceCommentInputs[alliance.id]?.trim();
      if (!text) return;
      const now = Date.now();
      setAllianceThreads((prev) => {
        const existing = prev[alliance.id] || [];
        return {
          ...prev,
          [alliance.id]: [
            {
              id: `${alliance.id}_user_${now}`,
              role: "member",
              user: { name: profile.name, avatar: AVATARS[(profile.name?.length || 0) % AVATARS.length] },
              text,
              time: "just now",
              likes: 0,
            },
            {
              id: `${alliance.id}_ai_${now}`,
              role: "ai",
              user: { name: "Rewire AI Coordinator", avatar: "🧠" },
              text: createAllianceAiReply(alliance, profile.name),
              time: "just now",
              likes: 0,
            },
            ...existing,
          ].slice(0, 20),
        };
      });
      setAllianceCommentInputs((prev) => ({ ...prev, [alliance.id]: "" }));
      setNetworkStats((stats) => ({ ...stats, interactions: stats.interactions + 1, accuracy: Math.min(99, stats.accuracy + 0.001) }));
    },
    [allianceCommentInputs, profile],
  );

  const postMissionComment = useCallback(
    (mission) => {
      if (!profile) {
        setShowOnboard(true);
        return;
      }
      if (!missionState[mission.id]) return;
      const text = missionCommentInputs[mission.id]?.trim();
      if (!text) return;
      const now = Date.now();
      setMissionThreads((prev) => {
        const existing = prev[mission.id] || [];
        return {
          ...prev,
          [mission.id]: [
            {
              id: `${mission.id}_comment_${now}`,
              role: "member",
              user: { name: profile.name, avatar: AVATARS[(profile.name?.length || 0) % AVATARS.length] },
              text,
              time: "just now",
              likes: 0,
            },
            {
              id: `${mission.id}_comment_ai_${now}`,
              role: "ai",
              user: { name: "Rewire AI Ops", avatar: "🤖" },
              text: createMissionAiReply(mission, profile.name),
              time: "just now",
              likes: 0,
            },
            ...existing,
          ].slice(0, 22),
        };
      });
      setMissionCommentInputs((prev) => ({ ...prev, [mission.id]: "" }));
      setNetworkStats((stats) => ({ ...stats, interactions: stats.interactions + 1, accuracy: Math.min(99, stats.accuracy + 0.001) }));
    },
    [missionCommentInputs, missionState, profile],
  );

  const missionSummary = useMemo(() => {
    let joined = 0;
    let submitted = 0;
    let rewarded = 0;
    let totalUsd = 0;
    let totalPoints = 0;
    let totalJou = 0;

    allMissions.forEach((mission) => {
      const state = missionState[mission.id];
      if (!state) return;
      joined += 1;
      if (state.status === "submitted" || state.status === "rewarded") submitted += 1;
      if (state.status === "rewarded") {
        rewarded += 1;
        totalUsd += mission.rewardUsd || 0;
        totalPoints += mission.rewardPoints || 0;
        totalJou += getMissionRewardJou(mission);
      }
    });

    return { joined, submitted, rewarded, totalUsd, totalPoints, totalJou };
  }, [allMissions, missionState]);

  const treasuryFlow = useMemo(() => {
    const treasuryLocked = strategyBattles.reduce((sum, battle) => sum + battle.sideA.treasury + battle.sideB.treasury, 0);
    const missionEscrow = Number((treasuryLocked * 0.31).toFixed(2));
    const resourceOps = Number((treasuryLocked * 0.29).toFixed(2));
    const builderRewards = Number((treasuryLocked * 0.24 + missionSummary.totalUsd / 1000).toFixed(2));
    const strategicReserve = Number((treasuryLocked - missionEscrow - resourceOps - builderRewards).toFixed(2));
    return {
      treasuryLocked: Number(treasuryLocked.toFixed(2)),
      missionEscrow,
      resourceOps,
      builderRewards,
      strategicReserve,
    };
  }, [missionSummary.totalUsd, strategyBattles]);

  const strategyLeaders = useMemo(
    () =>
      strategyBattles.map((battle) => {
        const leaderIsA = battle.winRateA >= 50;
        const leader = leaderIsA ? battle.sideA : battle.sideB;
        const loser = leaderIsA ? battle.sideB : battle.sideA;
        const leaderWinRate = Number((leaderIsA ? battle.winRateA : 100 - battle.winRateA).toFixed(1));
        const takeoverActive = leaderWinRate >= 60;
        return { battleId: battle.id, leader, loser, leaderWinRate, takeoverActive };
      }),
    [strategyBattles],
  );

  const supportStrategy = useCallback(
    (battle, sideKey) => {
      if (!profile) {
        setShowOnboard(true);
        return;
      }

      const contribution = clamp(Number(allocationAmount) || 0, 10, 500);
      const scoreImpact = Math.min(4.5, contribution / 40);
      const treasuryImpact = contribution / 1000;

      setStrategySupport((prev) => ({ ...prev, [battle.id]: sideKey }));
      setStrategyBattles((prev) =>
        prev.map((entry) => {
          if (entry.id !== battle.id) return entry;
          const nextWinRateA = clamp(entry.winRateA + (sideKey === "a" ? scoreImpact : -scoreImpact), 18, 82);
          if (sideKey === "a") {
            return {
              ...entry,
              winRateA: Number(nextWinRateA.toFixed(1)),
              sideA: { ...entry.sideA, treasury: Number((entry.sideA.treasury + treasuryImpact).toFixed(2)) },
            };
          }
          return {
            ...entry,
            winRateA: Number(nextWinRateA.toFixed(1)),
            sideB: { ...entry.sideB, treasury: Number((entry.sideB.treasury + treasuryImpact).toFixed(2)) },
          };
        }),
      );

      const selectedSide = sideKey === "a" ? battle.sideA : battle.sideB;
      if (selectedSide.allianceId) {
        setJoinedAlliances((prev) => {
          if (prev.has(selectedSide.allianceId)) return prev;
          return new Set([...prev, selectedSide.allianceId]);
        });
      }

      setNetworkStats((stats) => ({ ...stats, interactions: stats.interactions + 1, accuracy: Math.min(99, stats.accuracy + 0.0015) }));
    },
    [allocationAmount, profile],
  );

  const joinMission = useCallback(
    (mission, source = "direct") => {
      if (!profile) {
        setShowOnboard(true);
        return;
      }
      const alreadyJoined = Boolean(missionState[mission.id]);
      if (alreadyJoined) return;

      setMissionState((prev) => {
        if (prev[mission.id]) return prev;
        return {
          ...prev,
          [mission.id]: { status: "joined", joinedAt: Date.now(), proof: "", submittedAt: null, rewardedAt: null },
        };
      });

      setWalletJoules((current) => current + (source === "invite" ? INVITE_JOIN_BONUS : Math.floor(INVITE_JOIN_BONUS / 2)));
      setJoinedAlliances((prev) => {
        if (!mission.allianceId || prev.has(mission.allianceId)) return prev;
        return new Set([...prev, mission.allianceId]);
      });
      setMissionThreads((prev) => {
        const existing = prev[mission.id] || [];
        return {
          ...prev,
          [mission.id]: [
            {
              id: `${mission.id}_join_${Date.now()}`,
              role: "member",
              user: { name: profile.name, avatar: AVATARS[(profile.name?.length || 0) % AVATARS.length] },
              text: `Joined wire execution. ${source === "invite" ? `Invite accepted (+${INVITE_JOIN_BONUS} ${JOULE.ticker}).` : "Ready for first checkpoint."}`,
              time: "just now",
              likes: 0,
            },
            {
              id: `${mission.id}_ai_join_${Date.now()}`,
              role: "ai",
              user: { name: "Rewire AI Ops", avatar: "🤖" },
              text: createMissionAiReply(mission, profile.name),
              time: "just now",
              likes: 0,
            },
            ...existing,
          ].slice(0, 16),
        };
      });
      setNetworkStats((stats) => ({ ...stats, interactions: stats.interactions + 1 }));
    },
    [missionState, profile],
  );

  const joinMissionByInvite = useCallback(() => {
    const code = inviteCodeInput.trim().toUpperCase();
    if (!code) return;
    const mission = allMissions.find((item) => item.inviteCode?.toUpperCase() === code);
    if (!mission) return;
    joinMission(mission, "invite");
    setInviteCodeInput("");
  }, [allMissions, inviteCodeInput, joinMission]);

  useEffect(() => {
    if (!hydrated || !profile || typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const inviteCode = url.searchParams.get("invite");
    if (!inviteCode) return;
    const normalized = inviteCode.trim().toUpperCase();
    if (!normalized) return;
    const mission = allMissions.find((item) => item.inviteCode?.toUpperCase() === normalized);
    if (!mission || missionState[mission.id]) return;

    joinMission(mission, "invite");
    setInviteCodeInput(normalized);
    url.searchParams.delete("invite");
    window.history.replaceState({}, "", `${url.pathname}${url.search ? url.search : ""}${url.hash || ""}`);
  }, [allMissions, hydrated, joinMission, missionState, profile]);

  const submitMissionProof = useCallback(
    (mission) => {
      if (!profile) {
        setShowOnboard(true);
        return;
      }
      const proof = missionProofInputs[mission.id]?.trim();
      if (!proof || proof.length < 24) return;

      const now = Date.now();
      setMissionState((prev) => ({
        ...prev,
        [mission.id]: { ...(prev[mission.id] || {}), status: "submitted", proof, submittedAt: now },
      }));
      setMissionProofInputs((prev) => ({ ...prev, [mission.id]: "" }));
      setMissionProofFeed((prev) => [
        {
          id: `proof_${mission.id}_${now}`,
          missionId: mission.id,
          userName: profile.name,
          avatar: AVATARS[(profile.name?.length || 0) % AVATARS.length],
          proof,
          time: "just now",
        },
        ...prev,
      ]);
      setMissionThreads((prev) => {
        const existing = prev[mission.id] || [];
        return {
          ...prev,
          [mission.id]: [
            {
              id: `${mission.id}_proof_${now}`,
              role: "member",
              user: { name: profile.name, avatar: AVATARS[(profile.name?.length || 0) % AVATARS.length] },
              text: proof,
              time: "just now",
              likes: 0,
            },
            {
              id: `${mission.id}_ai_verify_${now}`,
              role: "ai",
              user: { name: "Rewire AI Verifier", avatar: "🧠" },
              text: `AI verification running for ${mission.title}. If metrics pass, reward escrow will unlock automatically.`,
              time: "just now",
              likes: 0,
            },
            ...existing,
          ].slice(0, 18),
        };
      });
      setNetworkStats((stats) => ({
        ...stats,
        interactions: stats.interactions + 2,
        accuracy: Math.min(99, stats.accuracy + 0.002),
      }));
    },
    [missionProofInputs, profile],
  );

  const claimMissionReward = useCallback(
    (mission) => {
      const state = missionState[mission.id];
      if (!state || state.status !== "submitted") return;
      const rewardJou = getMissionRewardJou(mission);
      setMissionState((prev) => ({
        ...prev,
        [mission.id]: { ...prev[mission.id], status: "rewarded", rewardedAt: Date.now() },
      }));
      setWalletJoules((current) => current + rewardJou);
      setMissionThreads((prev) => {
        const now = Date.now();
        const existing = prev[mission.id] || [];
        return {
          ...prev,
          [mission.id]: [
            {
              id: `${mission.id}_ai_reward_${now}`,
              role: "ai",
              user: { name: "Rewire Treasury AI", avatar: "💠" },
              text: `Reward settled: +${rewardJou} ${JOULE.ticker} to ${profile?.name || "builder"} for verified mission proof.`,
              time: "just now",
              likes: 0,
            },
            ...existing,
          ].slice(0, 18),
        };
      });
      setNetworkStats((stats) => ({ ...stats, interactions: stats.interactions + 1 }));
    },
    [missionState, profile?.name],
  );

  // Advisory
  const advisory = useMemo(() => {
    if (!profile) return null;
    const s = { economic: 50, digital: 50, climate: 50, career: 50, financial: 50 };
    const recs = [];
    const risks = [];
    const opps = [];

    if (["Technology/IT", "Freelancing"].includes(profile.sector)) {
      s.digital += 25;
      s.career += 15;
      opps.push("AI/ML specialization → 3-5x earnings potential");
      opps.push("Single developer + AI tools = 5-person team output");
    } else if (profile.sector === "Agriculture") {
      s.climate -= 20;
      risks.push("Climate change = existential threat to your livelihood");
      recs.push("Switch to drip irrigation + climate-resilient crops NOW");
      opps.push("Organic export market pays 3-5x premium");
    } else if (profile.sector?.includes("Military")) {
      s.career += 15;
      recs.push("Cyber warfare + AI = the future. Get technical training.");
      opps.push("Security consulting market growing 25%/yr post-retirement");
    } else if (profile.sector?.includes("Health")) {
      s.career += 20;
      opps.push("Telemedicine → serve 10,000 patients with AI-assisted diagnosis");
    } else if (profile.sector?.includes("Finance")) {
      s.financial += 15;
      opps.push("Fintech is eating traditional banking — position yourself at the intersection");
    } else if (profile.sector?.includes("Education")) {
      risks.push("Traditional teaching is dying. Digital or die.");
      opps.push("EdTech content in local languages = 1B+ untapped learner market globally");
    }

    if (profile.income === "below_25k") {
      s.financial -= 25;
      recs.push("Coursera: free courses. Upwork: build global income. Accelerators worldwide: get funding. Start today.");
    }
    if (profile.age < 25) {
      opps.push("You ARE Global ");
      s.career += 10;
    }
    (profile.challenges || []).forEach((c) => {
      if (c.includes("Digital")) recs.push("Coursera/Udemy — free/cheap, global, comprehensive");
      if (c.includes("Unemploy")) recs.push("Fiverr + Upwork. Global freelancers earn $200B+/year. Join them.");
      if (c.includes("Debt")) recs.push("Pay high-interest debt first (credit cards). Explore central bank restructuring options.");
    });
    const overall = Math.round(Object.values(s).reduce((a, b) => a + b) / 5);
    return {
      scores: Object.fromEntries(Object.entries(s).map(([k, v]) => [k, Math.max(0, Math.min(100, v))])),
      recs: recs.slice(0, 5),
      risks: risks.slice(0, 3),
      opps: opps.slice(0, 4),
      overall: Math.max(10, Math.min(100, overall)),
    };
  }, [profile]);

  // ── COMPONENTS ──

  const UserAvatar = ({ user, size = "md" }) => {
    const s =
      size === "sm"
        ? "w-8 h-8 text-sm"
        : size === "lg"
          ? "w-12 h-12 text-xl"
          : "w-10 h-10 text-base";
    return (
      <div className={`${s} rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 relative`}>
        <span>{user.avatar}</span>
        {user.verified && (
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <CheckCircle2 size={10} className="text-white" />
          </div>
        )}
      </div>
    );
  };

  const ReactionBar = ({ postId, reactions }) => (
    <div className="flex items-center gap-1 flex-wrap">
      {REACTIONS.map((r) => {
        const isActive = userReactions[postId]?.[r.key];
        const count = reactions[r.key] + (isActive ? 1 : 0);
        return (
          <button
            key={r.key}
            onClick={() => toggleReaction(postId, r.key)}
            className={`reaction-btn flex items-center gap-1 text-xs border border-transparent ${isActive ? "active border-emerald-500/20" : "hover:bg-gray-800"}`}
            title={r.label}
          >
            <span>{r.emoji}</span>
            <span className={isActive ? "text-emerald-400 font-medium" : "text-gray-500"}>
              {count > 0 ? count.toLocaleString() : ""}
            </span>
          </button>
        );
      })}
    </div>
  );

  const PollWidget = ({ postId, poll }) => {
    const voted = userVotes[postId] !== undefined;
    const totalVotes = poll.options.reduce((a, o) => a + o.votes, 0) + (voted ? 1 : 0);
    return (
      <div className="mt-3 p-4 rounded-xl bg-gray-900/50 border border-gray-800">
        <p className="text-white text-sm font-medium mb-3 flex items-center gap-2">
          <BarChart3 size={14} className="text-emerald-400" /> {poll.question}
        </p>
        <div className="space-y-2">
          {poll.options.map((opt, i) => {
            const votes = opt.votes + (userVotes[postId] === i ? 1 : 0);
            const pct = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
            const isMyVote = userVotes[postId] === i;
            return (
              <button
                key={i}
                onClick={() => castVote(postId, i)}
                disabled={voted}
                className={`w-full text-left rounded-xl p-3 transition-all relative overflow-hidden ${voted ? "" : "hover:bg-gray-800 cursor-pointer"} ${isMyVote ? "ring-1 ring-emerald-500/40" : ""}`}
                style={{ background: voted ? "rgba(17,24,39,0.8)" : "rgba(31,41,55,0.5)" }}
              >
                {voted && (
                  <div
                    className="absolute inset-y-0 left-0 rounded-xl transition-all duration-700"
                    style={{
                      width: `${pct}%`,
                      background: isMyVote ? "rgba(16,185,129,0.12)" : "rgba(55,65,81,0.3)",
                    }}
                  />
                )}
                <div className="relative flex items-center justify-between">
                  <span className={`text-sm ${isMyVote ? "text-emerald-400 font-medium" : "text-gray-300"}`}>
                    {isMyVote && <CheckCircle2 size={12} className="inline mr-1.5" />}
                    {opt.text}
                  </span>
                  {voted && (
                    <span className={`text-sm font-mono ${isMyVote ? "text-emerald-400" : "text-gray-500"}`}>
                      {pct}%
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-gray-600 text-xs mt-2">{totalVotes.toLocaleString()} votes</p>
      </div>
    );
  };

  const CommentSection = ({ postId, comments }) => {
    const extraComments = userComments[postId] || [];
    const allComments = [...comments, ...extraComments];
    const isExpanded = expandedPost === postId;
    const shown = isExpanded ? allComments : allComments.slice(0, 2);

    return (
      <div className="mt-3 border-t border-gray-800/50 pt-3">
        {shown.map((c, i) => (
          <div key={i} className="mb-3 slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="flex gap-3">
              {UserAvatar({ user: c.user, size: "sm" })}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-white text-sm font-medium">{c.user.name}</span>
                  <span className="text-gray-600 text-xs">{c.user.handle}</span>
                  {c.user.badge && <Badge text={c.user.badge} color="gray" />}
                  <span className="text-gray-700 text-xs">{c.time}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{c.text}</p>
                <div className="flex items-center gap-4 mt-1.5">
                  <button className="text-gray-600 text-xs hover:text-emerald-400 transition-colors flex items-center gap-1">
                    <ThumbsUp size={11} /> {c.likes || ""}
                  </button>
                  <button className="text-gray-600 text-xs hover:text-blue-400 transition-colors flex items-center gap-1">
                    <MessageCircle size={11} /> Reply
                  </button>
                </div>
                {/* Replies */}
                {c.replies?.length > 0 && (
                  <div className="mt-2 ml-2 pl-3 border-l border-gray-800 space-y-2">
                    {c.replies.map((r, j) => (
                      <div key={j} className="flex gap-2">
                        {UserAvatar({ user: r.user, size: "sm" })}
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-white text-xs font-medium">{r.user.name}</span>
                            <span className="text-gray-700 text-xs">{r.time}</span>
                          </div>
                          <p className="text-gray-400 text-xs leading-relaxed">{r.text}</p>
                          <button className="text-gray-600 text-xs hover:text-emerald-400 transition-colors mt-1 flex items-center gap-1">
                            <ThumbsUp size={10} /> {r.likes || ""}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {allComments.length > 2 && !isExpanded && (
          <button
            onClick={() => setExpandedPost(postId)}
            className="text-emerald-400 text-xs hover:text-emerald-300 transition-colors mb-2"
          >
            View all {allComments.length} comments
          </button>
        )}
        {isExpanded && allComments.length > 2 && (
          <button
            onClick={() => setExpandedPost(null)}
            className="text-gray-500 text-xs hover:text-gray-300 transition-colors mb-2"
          >
            Collapse
          </button>
        )}
        {/* Comment Input */}
        <div className="flex gap-2 mt-2">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 text-sm">
            {profile ? AVATARS[(profile.name?.length || 0) % AVATARS.length] : "👤"}
          </div>
          <div className="flex-1 flex gap-2">
            <input
              value={commentInputs[postId] || ""}
              onChange={(e) => setCommentInputs((p) => ({ ...p, [postId]: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && addComment(postId)}
              placeholder={profile ? "Share your experience..." : "Join to comment..."}
              disabled={!profile}
              className="comment-input flex-1 bg-gray-900/50 border border-gray-800 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/30 disabled:opacity-40"
            />
            <button
              onClick={() => addComment(postId)}
              disabled={!profile || !commentInputs[postId]?.trim()}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-xl transition-all text-sm"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ── FEED CARD ──
  const FeedCard = (post) => {
    const isAI = post.type !== "community_wisdom";
    return (
      <div key={post.id} className="card feed-card p-5 mb-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {isAI ? (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Bot size={18} className="text-white" />
              </div>
            ) : (
              UserAvatar({ user: post.user })
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm">{isAI ? "Rewire AI" : post.user.name}</span>
                {isAI && (
                  <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={10} className="text-white" />
                  </div>
                )}
                {!isAI && post.user.badge && <Badge text={post.user.badge} color="gray" />}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {isAI && <span className="text-emerald-400">AI Analysis</span>}
                {!isAI && <span>{post.user.handle}</span>}
                <span>·</span>
                <span>{post.time}</span>
                {post.views && (
                  <>
                    <span>·</span>
                    <Eye size={10} className="inline" /> <span>{post.views} views</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => toggleBookmark(post.id)}
              className={`p-2 rounded-lg transition-all ${bookmarks.has(post.id) ? "text-yellow-400" : "text-gray-600 hover:text-gray-400"}`}
            >
              <Bookmark size={16} fill={bookmarks.has(post.id) ? "currentColor" : "none"} />
            </button>
            <button className="p-2 rounded-lg text-gray-600 hover:text-gray-400 transition-all">
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* AI Verdict Badge */}
        {post.aiVerdict && (
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium mb-3 ${post.aiVerdict === "critical" ? "bg-red-500/10 text-red-400 border border-red-500/20" : post.aiVerdict === "likely" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`}
          >
            {post.aiVerdict === "critical" ? (
              <AlertTriangle size={12} />
            ) : post.aiVerdict === "likely" ? (
              <TrendingUp size={12} />
            ) : (
              <CheckCircle2 size={12} />
            )}
            AI Assessment:{" "}
            {post.aiVerdict === "critical" ? "CRITICAL" : post.aiVerdict === "likely" ? "HIGHLY LIKELY" : "POSITIVE"}
          </div>
        )}

        {/* Title */}
        <h2 className="text-white text-lg font-bold mb-2 leading-snug">{post.aiTitle || post.title}</h2>

        {/* Body */}
        <p className="text-gray-300 text-sm leading-relaxed mb-3 whitespace-pre-line">{post.aiBody || post.body}</p>

        {/* Paradigm Old vs New */}
        {post.type === "ai_paradigm" && (
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="rounded-xl p-4 bg-red-950/15 border border-red-900/20">
              <div className="flex items-center gap-2 mb-2">
                <Lock size={12} className="text-red-400" />
                <span className="text-red-400 text-xs font-bold uppercase">Old World</span>
              </div>
              <h4 className="text-white text-sm font-medium mb-2">{post.oldWorld.title}</h4>
              {post.oldWorld.points.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <XCircle size={10} className="text-red-400/50 flex-shrink-0" />
                  {p}
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4 bg-emerald-950/15 border border-emerald-900/20">
              <div className="flex items-center gap-2 mb-2">
                <Unlock size={12} className="text-emerald-400" />
                <span className="text-emerald-400 text-xs font-bold uppercase">New World</span>
              </div>
              <h4 className="text-white text-sm font-medium mb-2">{post.newWorld.title}</h4>
              {post.newWorld.points.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-emerald-400/70 mb-1">
                  <Zap size={10} className="text-emerald-400 flex-shrink-0" />
                  {p}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sector Signals */}
        {post.sectorSignals && (
          <div className="mb-3 space-y-2">
            {post.sectorSignals.map((s, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-900/30 rounded-lg p-2.5">
                <span className="text-gray-400 text-xs w-20">{s.sector}</span>
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${s.confidence}%`,
                      background: s.confidence > 60 ? "#10b981" : s.confidence > 40 ? "#f59e0b" : "#ef4444",
                    }}
                  />
                </div>
                <span className="text-gray-300 text-xs w-40 text-right">{s.signal}</span>
                <span
                  className="text-xs font-mono w-10 text-right"
                  style={{
                    color: s.confidence > 60 ? "#10b981" : s.confidence > 40 ? "#f59e0b" : "#ef4444",
                  }}
                >
                  {s.confidence}%
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Poll */}
        {post.poll && PollWidget({ postId: post.id, poll: post.poll })}

        {/* Reactions */}
        <div className="mt-3 flex items-center justify-between">
          {ReactionBar({ postId: post.id, reactions: post.reactions })}
          <button
            onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
            className="text-gray-500 text-xs hover:text-gray-300 transition-colors flex items-center gap-1"
          >
            <MessageCircle size={13} /> {post.comments.length + (userComments[post.id]?.length || 0)}
          </button>
        </div>

        {/* Comments */}
        {CommentSection({ postId: post.id, comments: post.comments })}
      </div>
    );
  };

  // ── PAGES ──

  const LandingPage = () => {
    const canSendOtp = Boolean(form.name.trim() && form.dob && isValidEmail(form.email));
    const otpBusy = otpStatus === "sending" || otpStatus === "verifying";
    const canContinue = canSendOtp && otpStatus === "verified";
    const isSignup = landingAuthMode === "signup";

    return (
      <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden relative">
        <style>{css}</style>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 8% 12%, rgba(16,185,129,0.12), transparent 44%), radial-gradient(circle at 88% 18%, rgba(59,130,246,0.14), transparent 40%), radial-gradient(circle at 50% 100%, rgba(99,102,241,0.12), transparent 50%)",
          }}
        />
        <div className="relative min-h-screen flex items-start md:items-center justify-center px-3 sm:px-4 py-4 sm:py-6 overflow-y-auto">
          <div className="w-full max-w-6xl card p-4 sm:p-5 md:p-8 my-auto" style={{ background: "linear-gradient(135deg, rgba(5,20,35,0.95), rgba(14,28,48,0.9))", borderColor: "rgba(16,185,129,0.24)" }}>
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-4 md:gap-5 items-stretch">
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4 sm:p-5 md:p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <img
                      src="/rewire-logo-192.png"
                      alt="Rewire logo"
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-blue-400/40 shadow-[0_0_18px_rgba(96,165,250,0.45)]"
                    />
                    <div>
                      <h1 className="text-base font-bold leading-none">Rewire</h1>
                      <p className="text-gray-500 text-xs mt-0.5">Work in progress • coordination layer</p>
                    </div>
                  </div>
                  <p className="text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">New coordination layer for the AI world</p>
                  <h2 className="text-2xl md:text-4xl font-black leading-[1.05] mb-4">
                    <span className="block">You wanted to create a better world</span>
                    <span className="block text-gradient-multi mt-1">now you can.</span>
                  </h2>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-2xl mb-4">
                    AI gives individuals intelligence, compute, and automation. Rewire is where people coordinate outcomes:
                    create wires, recruit teams, execute missions, and settle value through {JOULE.ticker}.
                  </p>
                </div>
                <p className="text-xl md:text-2xl font-bold leading-tight">
                  <span className="block">Old social platforms capture attention.</span>
                  <span className="block text-emerald-300">Rewire coordinates action.</span>
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gray-950/70 p-4 sm:p-5 md:p-6">
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setLandingAuthMode("signup")}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${isSignup ? "bg-emerald-600 text-white" : "bg-gray-900 border border-gray-800 text-gray-400 hover:text-white"}`}
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => setLandingAuthMode("login")}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${!isSignup ? "bg-blue-600 text-white" : "bg-gray-900 border border-gray-800 text-gray-400 hover:text-white"}`}
                  >
                    Login
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-gray-500 text-xs mb-1 block">Name</label>
                    <input
                      value={form.name}
                      onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                      placeholder="Your name"
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/30"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs mb-1 block">Email</label>
                    <input
                      type="email"
                      value={form.email || ""}
                      onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                      placeholder="you@email.com"
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/30"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs mb-1 block">Date of Birth</label>
                    <input
                      type="date"
                      max={new Date().toISOString().split("T")[0]}
                      value={form.dob || ""}
                      onChange={(event) => setForm((prev) => ({ ...prev, dob: event.target.value }))}
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/30"
                    />
                  </div>
                  <button
                    onClick={requestOtp}
                    disabled={!canSendOtp || otpBusy}
                    className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 text-white text-sm rounded-xl transition-all"
                  >
                    {otpStatus === "sending" ? "Sending OTP..." : otpStatus === "sent" || otpStatus === "verified" ? "Resend OTP" : "Send OTP"}
                  </button>

                  {(otpStatus === "sent" || otpStatus === "verified" || otpStatus === "error" || otpStatus === "verifying") && (
                    <div>
                      <label className="text-gray-500 text-xs mb-1 block">Email OTP</label>
                      <div className="flex gap-2">
                        <input
                          inputMode="numeric"
                          maxLength={6}
                          value={otpInput}
                          onChange={(event) => setOtpInput(event.target.value.replace(/\D/g, "").slice(0, 6))}
                          placeholder="6-digit OTP"
                          className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/30"
                        />
                        <button
                          onClick={verifyOtp}
                          disabled={otpInput.trim().length !== 6 || otpBusy}
                          className="px-3 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-900 disabled:text-gray-600 text-white text-xs font-medium rounded-xl transition-all"
                        >
                          {otpStatus === "verifying" ? "Verifying..." : "Verify"}
                        </button>
                      </div>
                      {otpMessage && (
                        <p className={`mt-1 text-xs ${otpStatus === "verified" ? "text-emerald-400" : otpStatus === "error" ? "text-red-400" : "text-blue-300"}`}>
                          {otpMessage}
                        </p>
                      )}
                    </div>
                  )}

                  <button
                    onClick={handleOnboard}
                    disabled={!canContinue}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-medium rounded-xl text-sm hover:from-emerald-500 hover:to-blue-500 disabled:opacity-40 transition-all"
                  >
                    {isSignup ? `Sign Up + Claim ${STARTER_JOULE_GRANT} ${JOULE.ticker}` : "Login to Rewire"}
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleLandingCreateWire}
                      className="py-2 border border-white/15 rounded-xl text-xs text-white hover:bg-white/5 transition-all"
                    >
                      Create Wire
                    </button>
                    <button
                      onClick={handleLandingJoinWires}
                      className="py-2 border border-white/15 rounded-xl text-xs text-white hover:bg-white/5 transition-all"
                    >
                      Join Wires
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FeedPage = () => {
    const allPosts = [...communityPosts, ...FEED_POSTS];
    const allianceReach = allAlliances.reduce((total, alliance) => total + (Number(alliance.members) || 0), 0);
    const risingMindsets = MINDSET_CLUSTERS.filter((cluster) => cluster.winning).length;
    const highlightedMissions = SEED_MISSIONS.slice(0, 2);
    const activeTakeovers = strategyLeaders.filter((leader) => leader.takeoverActive).length;
    return (
      <div>
        <div className="card p-5 mb-4 overflow-hidden relative" style={{ background: "linear-gradient(135deg, rgba(4,20,33,0.95), rgba(18,34,58,0.88))", borderColor: "rgba(16,185,129,0.25)" }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at 12% 20%, rgba(16,185,129,0.16), transparent 45%), radial-gradient(circle at 85% 15%, rgba(59,130,246,0.12), transparent 42%)" }}
          />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-soft" />
              <span className="text-emerald-300 text-xs font-semibold uppercase tracking-wider">Rewire is live</span>
              <span className="text-blue-200/70 text-xs ml-auto">New coordination layer for the AI world</span>
            </div>

            <h2 className="text-white text-xl md:text-2xl font-black leading-tight mb-2">
              <span className="block">Old social platforms capture attention.</span>
              <span className="block text-gradient-multi mt-0.5">Rewire coordinates action.</span>
            </h2>
            <p className="text-blue-100/80 text-sm mb-3 max-w-3xl">
              Individuals now have AI leverage. The next step is local nucleus communities with practical systems for food,
              water, energy, and logistics. Join wires, ship proof, and earn reputation.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
              <div className="rounded-xl bg-black/25 border border-white/10 p-2.5">
                <p className="text-[11px] text-blue-200/70 uppercase tracking-wider">Online now</p>
                <p className="text-white text-sm font-mono font-semibold">{livePresence.onlineNow.toLocaleString()}</p>
              </div>
              <div className="rounded-xl bg-black/25 border border-white/10 p-2.5">
                <p className="text-[11px] text-blue-200/70 uppercase tracking-wider">Active wires</p>
                <p className="text-white text-sm font-mono font-semibold">{SEED_MISSIONS.length}</p>
              </div>
              <div className="rounded-xl bg-black/25 border border-white/10 p-2.5">
                <p className="text-[11px] text-blue-200/70 uppercase tracking-wider">Proofs logged</p>
                <p className="text-white text-sm font-mono font-semibold">{missionProofFeed.length}</p>
              </div>
              <div className="rounded-xl bg-black/25 border border-white/10 p-2.5">
                <p className="text-[11px] text-blue-200/70 uppercase tracking-wider">Rewards claimed</p>
                <p className="text-white text-sm font-mono font-semibold">{missionSummary.rewarded}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-lg text-xs bg-emerald-500/10 text-emerald-200 border border-emerald-500/20">
                {allianceReach.toLocaleString()} alliance members active
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs bg-purple-500/10 text-purple-200 border border-purple-500/20">
                {risingMindsets} mindsets driving next-cycle growth
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs bg-blue-500/10 text-blue-200 border border-blue-500/20">
                {livePresence.activeCountries} countries in live coordination
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-2 mb-3">
              <div className="rounded-xl p-3 bg-red-900/20 border border-red-500/20">
                <p className="text-red-300 text-xs font-semibold uppercase tracking-wider mb-1">Old Platforms</p>
                <p className="text-gray-200 text-xs">Scroll, react, forget. High engagement, low real-world outcomes.</p>
              </div>
              <div className="rounded-xl p-3 bg-emerald-900/20 border border-emerald-500/25">
                <p className="text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-1">Rewire</p>
                <p className="text-gray-200 text-xs">Join wire → submit proof → claim reward → build compounding credibility.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-2 mb-3">
              {highlightedMissions.map((mission) => (
                <button
                  key={mission.id}
                  onClick={() => setTab("world")}
                  className="text-left rounded-xl p-3 bg-black/25 border border-white/10 hover:border-emerald-400/40 transition-all"
                >
                  <p className="text-white text-sm font-semibold mb-1">{mission.title}</p>
                  <p className="text-gray-300 text-xs mb-2 line-clamp-2">{mission.summary}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-lg text-[11px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                      ${mission.rewardUsd}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg text-[11px] bg-purple-500/15 text-purple-300 border border-purple-500/25">
                      +{mission.rewardPoints} pts
                    </span>
                    <span className="px-2 py-0.5 rounded-lg text-[11px] bg-blue-500/15 text-blue-300 border border-blue-500/25">
                      {mission.effort}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTab("world")}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-sm font-semibold rounded-xl hover:from-emerald-500 hover:to-blue-500 transition-all"
              >
                Open Wires
              </button>
              {!profile && (
                <button
                  onClick={() => setShowOnboard(true)}
                  className="px-4 py-2 bg-white/10 border border-white/20 text-white text-sm rounded-xl hover:bg-white/15 transition-all"
                >
                  Join Rewire
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="card p-4 mb-4 overflow-hidden relative">
          <div className="absolute inset-0 shimmer opacity-30 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 pulse-soft" />
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Live Now</span>
              <span className="text-gray-600 text-xs ml-auto">{livePresence.activeCountries} countries active</span>
            </div>
            <p className="text-white text-sm leading-relaxed mb-3">
              {livePresence.onlineNow.toLocaleString()} minds are online right now. {livePresence.joiningPerMin}/min are joining and {livePresence.postsPerMin}/min are posting.
              {profile ? " You are in the room while momentum is compounding." : " If you stay out, you miss the network effects as they happen."}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-lg text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20">
                Next global insight drop in {fomoStats.nextDropInMin}m
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs bg-red-500/10 text-red-300 border border-red-500/20">
                {fomoStats.seatsLeft} seats left in live room
              </span>
            </div>
            <button
              onClick={() => (profile ? setTab("world") : setShowOnboard(true))}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-sm font-medium rounded-xl hover:from-emerald-500 hover:to-blue-500 transition-all"
            >
              {profile ? "Open Live Activity" : "Join Before Next Drop"}
            </button>
          </div>
        </div>

        <div className="card p-5 mb-4 overflow-hidden relative" style={{ borderColor: "rgba(59,130,246,0.3)" }}>
          <div className="absolute inset-0 shimmer opacity-15 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Network size={14} className="text-blue-400" />
              <span className="text-blue-300 text-xs font-semibold uppercase tracking-wider">Benefit + Strategy Arena</span>
              <span className="text-gray-600 text-xs ml-auto">{activeTakeovers} takeover races active</span>
            </div>
            <h2 className="text-white text-lg font-bold mb-2 leading-snug">
              <span className="block">Fund winning strategies with {JOULE.name}.</span>
              <span className="block text-blue-300 mt-0.5">Winning alliances gain control over real resources.</span>
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              Practical value: if your strategy wins, your alliance gets leadership over weaker models and governs resource
              execution for food, energy, and logistics loops.
            </p>

            <div className="grid gap-2 mb-3 md:grid-cols-3">
              <div className="rounded-xl bg-emerald-950/15 border border-emerald-500/20 p-3">
                <p className="text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-1">Benefit 01</p>
                <p className="text-gray-200 text-xs">Earn via wire payouts and transparent treasury allocations.</p>
              </div>
              <div className="rounded-xl bg-blue-950/15 border border-blue-500/20 p-3">
                <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1">Benefit 02</p>
                <p className="text-gray-200 text-xs">Get governance weight when your strategy outperforms incumbents.</p>
              </div>
              <div className="rounded-xl bg-purple-950/15 border border-purple-500/20 p-3">
                <p className="text-purple-300 text-xs font-semibold uppercase tracking-wider mb-1">Benefit 03</p>
                <p className="text-gray-200 text-xs">Access shared infrastructure capacity through alliance membership.</p>
              </div>
            </div>

            <div className="grid gap-2 mb-3 md:grid-cols-3">
              {REWIRE_STACK.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="rounded-xl bg-gray-900/55 border border-gray-800 p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon size={13} className="text-emerald-400" />
                      <span className="text-white text-xs font-semibold">{item.title}</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{item.detail}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {NUCLEUS_SYSTEMS.map((system) => (
                <span key={system.id} className="px-2.5 py-1 rounded-lg text-xs bg-blue-950/20 text-blue-200 border border-blue-500/20">
                  {system.emoji} {system.label}
                </span>
              ))}
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-3 mb-3">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                {JOULE.name} Flow ({JOULE.thesis} rails)
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="px-2 py-1 rounded-lg bg-gray-800 text-gray-200">
                  Treasury Locked: {treasuryFlow.treasuryLocked.toLocaleString(undefined, { maximumFractionDigits: 2 })}M
                </span>
                <span className="text-gray-600">→</span>
                <span className="px-2 py-1 rounded-lg bg-blue-900/30 border border-blue-500/20 text-blue-200">
                  Wire Escrow: {treasuryFlow.missionEscrow.toLocaleString(undefined, { maximumFractionDigits: 2 })}M
                </span>
                <span className="text-gray-600">→</span>
                <span className="px-2 py-1 rounded-lg bg-emerald-900/30 border border-emerald-500/20 text-emerald-200">
                  Resource Ops: {treasuryFlow.resourceOps.toLocaleString(undefined, { maximumFractionDigits: 2 })}M
                </span>
                <span className="text-gray-600">→</span>
                <span className="px-2 py-1 rounded-lg bg-purple-900/30 border border-purple-500/20 text-purple-200">
                  Builder Rewards: {treasuryFlow.builderRewards.toLocaleString(undefined, { maximumFractionDigits: 2 })}M
                </span>
                <span className="text-gray-600">→</span>
                <span className="px-2 py-1 rounded-lg bg-yellow-900/30 border border-yellow-500/20 text-yellow-200">
                  Strategic Reserve: {treasuryFlow.strategicReserve.toLocaleString(undefined, { maximumFractionDigits: 2 })}M
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Contribution Size</span>
                <span className="text-emerald-300 text-xs font-mono ml-auto">{allocationAmount} {JOULE.ticker} per strategy vote</span>
              </div>
              <input
                type="range"
                min={10}
                max={500}
                step={10}
                value={allocationAmount}
                onChange={(event) => setAllocationAmount(Number(event.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div className="space-y-3 mb-3">
              {strategyBattles.map((battle) => {
                const winRateA = battle.winRateA;
                const winRateB = Number((100 - winRateA).toFixed(1));
                const leaderIsA = winRateA >= 50;
                const leader = leaderIsA ? battle.sideA : battle.sideB;
                const loser = leaderIsA ? battle.sideB : battle.sideA;
                const leaderWinRate = leaderIsA ? winRateA : winRateB;
                const controlShiftActive = leaderWinRate >= 60;
                const mySupport = strategySupport[battle.id];
                const leaderReasons = leaderIsA ? battle.sideA.whyWinning : battle.sideB.whyWinning;

                return (
                  <div key={battle.id} className="rounded-xl border border-gray-800 bg-gray-900/35 p-3">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-white text-sm font-semibold">{battle.resource}</p>
                        <p className="text-gray-500 text-xs">Competing for {battle.controlAsset}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-lg text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        {battle.dailyFlow.toFixed(1)}M {JOULE.ticker}/day
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-2 mb-2">
                      <button
                        onClick={() => supportStrategy(battle, "a")}
                        className={`text-left rounded-xl p-3 border transition-all ${mySupport === "a" ? "border-emerald-400 bg-emerald-950/25" : "border-gray-800 bg-gray-900/50 hover:border-emerald-500/40"}`}
                      >
                        <p className="text-white text-xs font-semibold mb-0.5">{battle.sideA.name}</p>
                        <p className="text-gray-400 text-xs mb-1">{battle.sideA.strategy}</p>
                        <p className="text-emerald-300 text-xs font-mono">Treasury: {battle.sideA.treasury.toFixed(2)}M</p>
                        <p className="text-gray-500 text-[11px] mt-1">{mySupport === "a" ? "Supported ✓" : "Join this strategy"}</p>
                      </button>
                      <button
                        onClick={() => supportStrategy(battle, "b")}
                        className={`text-left rounded-xl p-3 border transition-all ${mySupport === "b" ? "border-blue-400 bg-blue-950/25" : "border-gray-800 bg-gray-900/50 hover:border-blue-500/40"}`}
                      >
                        <p className="text-white text-xs font-semibold mb-0.5">{battle.sideB.name}</p>
                        <p className="text-gray-400 text-xs mb-1">{battle.sideB.strategy}</p>
                        <p className="text-blue-300 text-xs font-mono">Treasury: {battle.sideB.treasury.toFixed(2)}M</p>
                        <p className="text-gray-500 text-[11px] mt-1">{mySupport === "b" ? "Supported ✓" : "Join this strategy"}</p>
                      </button>
                    </div>

                    <div className="rounded-xl bg-black/20 border border-gray-800 p-2.5 mb-2">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-emerald-300">{battle.sideA.name}: {winRateA.toFixed(1)}%</span>
                        <span className="text-blue-300">{battle.sideB.name}: {winRateB.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all" style={{ width: `${winRateA}%` }} />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-2">
                      <div className="rounded-lg p-2 bg-emerald-950/15 border border-emerald-500/20">
                        <p className="text-emerald-300 text-[11px] font-semibold uppercase tracking-wider mb-1">
                          Why {leader.name} is leading
                        </p>
                        {leaderReasons.slice(0, 2).map((reason, index) => (
                          <p key={index} className="text-gray-300 text-xs leading-relaxed">
                            • {reason}
                          </p>
                        ))}
                      </div>
                      <div className="rounded-lg p-2 bg-blue-950/15 border border-blue-500/20">
                        <p className="text-blue-300 text-[11px] font-semibold uppercase tracking-wider mb-1">
                          Control Outcome
                        </p>
                        <p className="text-gray-300 text-xs leading-relaxed">
                          {controlShiftActive
                            ? `${leader.name} is asserting leadership over ${loser.name}. Resource control is shifting to alliance members backing ${leader.name}.`
                            : `${leader.name} is ahead, but governance transfer has not locked yet. Push above 60% to control this resource layer.`}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTab("world")}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-sm font-medium rounded-xl hover:from-emerald-500 hover:to-blue-500 transition-all"
              >
                Open Community Arena
              </button>
              {!profile && (
                <button
                  onClick={() => setShowOnboard(true)}
                  className="px-4 py-2 bg-gray-800 text-gray-300 text-sm rounded-xl hover:bg-gray-700 transition-all"
                >
                  Join Rewire
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Compose */}
        {profile && (
          <div className="card p-4 mb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-lg">
                {AVATARS[(profile.name?.length || 0) % AVATARS.length]}
              </div>
              <div className="flex-1">
                <textarea
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Share your insight, experience, or question with the world..."
                  className="w-full bg-transparent text-white placeholder-gray-600 text-sm resize-none focus:outline-none min-h-[60px]"
                  rows={2}
                />
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-800/50">
                  <div className="flex gap-2">
                    <button className="text-gray-600 hover:text-emerald-400 transition-colors p-1.5 rounded-lg hover:bg-gray-800">
                      <Image size={16} />
                    </button>
                    <button className="text-gray-600 hover:text-emerald-400 transition-colors p-1.5 rounded-lg hover:bg-gray-800">
                      <BarChart3 size={16} />
                    </button>
                    <button className="text-gray-600 hover:text-emerald-400 transition-colors p-1.5 rounded-lg hover:bg-gray-800">
                      <MapPin size={16} />
                    </button>
                  </div>
                  <button
                    onClick={submitCommunityPost}
                    disabled={!newPostText.trim()}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-800 disabled:text-gray-600 text-white text-sm font-medium rounded-xl transition-all"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!profile && (
          <div className="card p-5 mb-4 text-center">
            <p className="text-gray-400 text-sm mb-3">
              Join {networkStats.minds.toLocaleString()} minds worldwide shaping the future together
            </p>
            <button
              onClick={() => setShowOnboard(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-medium rounded-xl text-sm hover:from-emerald-500 hover:to-blue-500 transition-all"
            >
              <Fingerprint size={14} className="inline mr-2" />
              Join the Conversation
            </button>
          </div>
        )}

        {allPosts.map((post) => FeedCard(post))}
      </div>
    );
  };

  const ParadigmPage = () => (
    <div>
      <div className="card p-5 mb-4">
        <h2 className="text-white text-lg font-bold mb-1">The Great Paradigm Shift</h2>
        <p className="text-gray-400 text-sm">
          Everything the old world was built on is being rewritten. Tap each shift to see Old World vs New World — and
          where humanity stands.
        </p>
      </div>
      <div className="space-y-3">
        {PARADIGMS.map((p) => {
          const OldIcon = p.icon;
          const NewIcon = p.iconNew;
          const isOpen = expandedParadigm === p.id;
          return (
            <div key={p.id} className="card overflow-hidden">
              <div className="p-4 cursor-pointer" onClick={() => setExpandedParadigm(isOpen ? null : p.id)}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/15">
                    <OldIcon size={18} className="text-red-400" />
                  </div>
                  <ChevronRight size={14} className="text-gray-600" />
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/15">
                    <NewIcon size={18} className="text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-medium">
                      {p.old} → {p.new_}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-gray-800 rounded-full max-w-[120px]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${p.readiness}%`,
                            background: p.readiness < 40 ? "#ef4444" : p.readiness < 60 ? "#f59e0b" : "#10b981",
                          }}
                        />
                      </div>
                      <span
                        className="text-xs font-mono"
                        style={{
                          color: p.readiness < 40 ? "#ef4444" : p.readiness < 60 ? "#f59e0b" : "#10b981",
                        }}
                      >
                        {p.readiness}%
                      </span>
                    </div>
                  </div>
                  <ChevronDown size={16} className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </div>
              </div>
              {isOpen && (
                <div className="px-4 pb-4 slide-up">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl p-4 bg-red-950/10 border border-red-900/15">
                      <h4 className="text-red-400 text-xs font-bold uppercase mb-2">Old Order</h4>
                      {p.oldPoints.map((pt, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
                          <div className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
                          {pt}
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl p-4 bg-emerald-950/10 border border-emerald-900/15">
                      <h4 className="text-emerald-400 text-xs font-bold uppercase mb-2">New Order</h4>
                      {p.newPoints.map((pt, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-emerald-400/70 mb-1.5">
                          <Zap size={8} className="text-emerald-400 flex-shrink-0" />
                          {pt}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const MyProfilePage = () => {
    if (!profile || !advisory)
      return (
        <div className="card p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 float-gentle">
            <Fingerprint size={36} className="text-emerald-400" />
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Create Your Profile</h2>
          <p className="text-gray-400 text-sm mb-4 max-w-sm mx-auto">
            Get your personalized Future Readiness Score and join {networkStats.minds.toLocaleString()} minds building
            collective intelligence.
          </p>
          <button
            onClick={() => setShowOnboard(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-medium rounded-xl text-sm"
          >
            Join Now
          </button>
        </div>
      );

    const radarData = Object.entries(advisory.scores).map(([k, v]) => ({
      subject: k.charAt(0).toUpperCase() + k.slice(1),
      score: v,
      fullMark: 100,
    }));
    const scoreColor = advisory.overall >= 70 ? "#10b981" : advisory.overall >= 40 ? "#f59e0b" : "#ef4444";

    return (
      <div className="space-y-4">
        {/* Score Card */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white text-lg font-bold">{profile.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                {profile.email && <Badge text={profile.email} color="gray" />}
                {profile.dob && <Badge text={new Date(profile.dob).toLocaleDateString("en-US")} color="blue" />}
              </div>
            </div>
            <div className="text-center">
              <div className="relative w-20 h-20">
                <svg width="80" height="80" className="-rotate-90">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#1f2937" strokeWidth="6" />
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="none"
                    stroke={scoreColor}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 34}`}
                    strokeDashoffset={`${2 * Math.PI * 34 * (1 - advisory.overall / 100)}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black" style={{ color: scoreColor }}>
                    {advisory.overall}
                  </span>
                </div>
              </div>
              <span className="text-gray-500 text-xs">Readiness</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1f2937" />
              <PolarAngleAxis dataKey="subject" stroke="#6b7280" fontSize={10} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#1f2937" fontSize={9} />
              <Radar dataKey="score" stroke="#10b981" fill="rgba(16,185,129,0.12)" strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Opportunities */}
        {advisory.opps.length > 0 && (
          <div className="card p-5">
            <h3 className="text-emerald-400 font-semibold text-sm mb-3 flex items-center gap-2">
              <Star size={14} /> Your Opportunities
            </h3>
            {advisory.opps.map((o, i) => (
              <div
                key={i}
                className="flex items-start gap-2 mb-2 p-3 rounded-xl bg-emerald-950/10 border border-emerald-900/15"
              >
                <Zap size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{o}</span>
              </div>
            ))}
          </div>
        )}

        {/* Risks */}
        {advisory.risks.length > 0 && (
          <div className="card p-5">
            <h3 className="text-red-400 font-semibold text-sm mb-3 flex items-center gap-2">
              <AlertTriangle size={14} /> Watch Out For
            </h3>
            {advisory.risks.map((r, i) => (
              <div
                key={i}
                className="flex items-start gap-2 mb-2 p-3 rounded-xl bg-red-950/10 border border-red-900/15"
              >
                <AlertTriangle size={12} className="text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{r}</span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {advisory.recs.length > 0 && (
          <div className="card p-5">
            <h3 className="text-blue-400 font-semibold text-sm mb-3 flex items-center gap-2">
              <Compass size={14} /> Your Action Plan
            </h3>
            {advisory.recs.map((r, i) => (
              <div
                key={i}
                className="flex items-start gap-2 mb-2 p-3 rounded-xl bg-blue-950/10 border border-blue-900/15"
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </div>
                <span className="text-gray-300 text-sm">{r}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ── ONBOARDING MODAL ──
  const OnboardModal = () => {
    const u = (k, v) => setForm((f) => ({ ...f, [k]: v }));
    const canSendOtp = Boolean(form.name.trim() && form.dob && isValidEmail(form.email));
    const otpBusy = otpStatus === "sending" || otpStatus === "verifying";
    const canCreateAccount = canSendOtp && otpStatus === "verified";
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
      >
        <div
          className="card w-full max-w-lg max-h-[85vh] overflow-y-auto scrollbar-thin p-6 pop-in"
          style={{ background: "rgba(17,24,39,0.95)" }}
        >
          <h2 className="text-white text-xl font-bold mb-1">Create Rewire Account</h2>
          <p className="text-gray-400 text-sm mb-5">
            Simple start: name, date of birth, and email OTP. New members receive {STARTER_JOULE_GRANT} {JOULE.ticker}. Advanced profile details can be added later.
          </p>
          <div className="space-y-3">
            <div>
              <label className="text-gray-500 text-xs mb-1 block">Name</label>
              <input
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/30"
                value={form.name}
                onChange={(e) => u("name", e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-gray-500 text-xs mb-1 block">Date of Birth</label>
              <input
                type="date"
                max={new Date().toISOString().split("T")[0]}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/30"
                value={form.dob || ""}
                onChange={(e) => u("dob", e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-500 text-xs mb-1 block">Email</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/30"
                  value={form.email || ""}
                  onChange={(e) => u("email", e.target.value)}
                  placeholder="you@email.com"
                />
                <button
                  onClick={requestOtp}
                  disabled={!canSendOtp || otpBusy}
                  className="px-3 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white text-xs font-medium rounded-xl transition-all"
                >
                  {otpStatus === "sending" ? "Sending..." : otpStatus === "sent" || otpStatus === "verified" ? "Resend OTP" : "Send OTP"}
                </button>
              </div>
            </div>
            {(otpStatus === "sent" || otpStatus === "verified" || otpStatus === "error" || otpStatus === "verifying") && (
              <div>
                <label className="text-gray-500 text-xs mb-1 block">Email OTP</label>
                <div className="flex gap-2">
                  <input
                    inputMode="numeric"
                    maxLength={6}
                    className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/30"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                  />
                  <button
                    onClick={verifyOtp}
                    disabled={otpInput.trim().length !== 6 || otpBusy}
                    className="px-3 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-800 disabled:text-gray-600 text-white text-xs font-medium rounded-xl transition-all"
                  >
                    {otpStatus === "verifying" ? "Verifying..." : "Verify"}
                  </button>
                </div>
                {otpMessage && (
                  <p className={`mt-1 text-xs ${otpStatus === "verified" ? "text-emerald-400" : otpStatus === "error" ? "text-red-400" : "text-blue-300"}`}>
                    {otpMessage}
                  </p>
                )}
                <p className="text-gray-600 text-[11px] mt-1">Check inbox/spam. OTP expires in 10 minutes.</p>
                {otpDebugCode && (
                  <p className="text-yellow-300 text-[11px] mt-1">Dev OTP (local fallback): {otpDebugCode}</p>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-5">
            <button
              onClick={() => setShowOnboard(false)}
              className="flex-1 py-2.5 bg-gray-800 text-gray-400 rounded-xl text-sm hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleOnboard}
              disabled={!canCreateAccount}
              className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-medium rounded-xl text-sm hover:from-emerald-500 hover:to-blue-500 disabled:opacity-40 transition-all"
            >
              Create Account + Claim {STARTER_JOULE_GRANT} {JOULE.ticker}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ══════════════════════════════════════
  // PAGE: WORLD SIMULATION & ALLIANCES
  // ══════════════════════════════════════
  const LIVE_SHIFTS = [
    {
      emoji: "🧠",
      text: "AI compute shifting → US & China now control 84% of global GPU power",
      color: "#3b82f6",
    },
    {
      emoji: "☀️",
      text: "Solar investment ↑ $127B flowed into renewables this quarter — China leads",
      color: "#10b981",
    },
    {
      emoji: "💰",
      text: "Sovereign wealth → Nations worldwide pivoting from commodity reserves to tech",
      color: "#f59e0b",
    },
    {
      emoji: "📡",
      text: "Digital infrastructure → India's UPI processed 12.2B transactions last month",
      color: "#8b5cf6",
    },
    {
      emoji: "🌾",
      text: "Agriculture tech → Africa & South Asia attracting 3x more agri-AI investment",
      color: "#ec4899",
    },
    {
      emoji: "🔗",
      text: "Blockchain remittances → Global remittance market saved $5B+ in fees this year",
      color: "#14b8a6",
    },
  ];

  const WealthShiftStrip = () => {
    const s = LIVE_SHIFTS[shiftIdx];
    return (
      <div
        className="mb-3 p-2.5 rounded-xl flex items-center gap-2.5 overflow-hidden"
        style={{ background: "rgba(10,15,25,0.6)", border: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-soft" />
          <span className="text-gray-600 text-xs font-bold uppercase tracking-wider">Live</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="ticker-item" key={shiftIdx}>
            <span className="text-sm mr-1.5">{s.emoji}</span>
            <span className="text-gray-300 text-xs">{s.text}</span>
          </div>
        </div>
        <div className="flex gap-0.5 flex-shrink-0">
          {LIVE_SHIFTS.map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full transition-all"
              style={{ background: i === shiftIdx ? s.color : "rgba(255,255,255,0.08)" }}
            />
          ))}
        </div>
      </div>
    );
  };

  const LiveActivityTicker = () => {
    return (
      <div
        className="p-3 rounded-xl mb-4"
        style={{ background: "rgba(10,15,25,0.5)", border: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 pulse-soft" />
          <span className="text-gray-600 text-xs font-bold uppercase tracking-wider">Global Activity</span>
          <span className="text-gray-700 text-xs ml-auto font-mono">
            {networkStats.interactions.toLocaleString()} interactions
          </span>
        </div>
        <div className="space-y-1.5">
          {liveEvents.slice(0, 4).map((item, i) => (
            <div
              key={item.id}
              className="ticker-item flex items-center gap-2"
              style={{ animationDelay: `${i * 0.1}s`, opacity: 1 - i * 0.2 }}
            >
              <span className="text-sm flex-shrink-0">{item.avatar}</span>
              <span className="text-gray-400 text-xs truncate">
                <span className="text-white font-medium">{item.name}</span> {item.action}{" "}
                <span className="text-emerald-400">{item.target}</span>
              </span>
              <span className="text-gray-700 text-xs flex-shrink-0 ml-auto">
                {item.location ? `${item.location} · ` : ""}
                {formatActivityAge(item.ageSec)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const WorldSimPage = () => {
    const activeTakeovers = strategyLeaders.filter((leader) => leader.takeoverActive).length;

    return (
      <div className="space-y-0">
        <div className="card p-5 mb-4 overflow-hidden relative" style={{ borderColor: "rgba(59,130,246,0.3)" }}>
          <div className="absolute inset-0 shimmer opacity-15 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Network size={14} className="text-blue-400" />
              <span className="text-blue-300 text-xs font-semibold uppercase tracking-wider">World Strategy Arena</span>
              <span className="text-gray-600 text-xs ml-auto">{activeTakeovers} active takeover races</span>
            </div>

            <h2 className="text-white text-lg font-bold mb-2 leading-snug">
              <span className="block">Compete as strategies, not just countries.</span>
              <span className="block text-blue-300 mt-0.5">Winning alliances direct real resource execution.</span>
            </h2>

            <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-3 mb-3">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Live {JOULE.name} Flow ({JOULE.thesis} rails)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <div className="rounded-lg bg-gray-900/70 border border-gray-800 px-2 py-1.5">
                  <p className="text-gray-500 text-[11px]">Treasury</p>
                  <p className="text-white text-xs font-mono">{treasuryFlow.treasuryLocked.toFixed(2)}M</p>
                </div>
                <div className="rounded-lg bg-blue-950/20 border border-blue-500/20 px-2 py-1.5">
                  <p className="text-blue-300 text-[11px]">Escrow</p>
                  <p className="text-white text-xs font-mono">{treasuryFlow.missionEscrow.toFixed(2)}M</p>
                </div>
                <div className="rounded-lg bg-emerald-950/20 border border-emerald-500/20 px-2 py-1.5">
                  <p className="text-emerald-300 text-[11px]">Ops</p>
                  <p className="text-white text-xs font-mono">{treasuryFlow.resourceOps.toFixed(2)}M</p>
                </div>
                <div className="rounded-lg bg-purple-950/20 border border-purple-500/20 px-2 py-1.5">
                  <p className="text-purple-300 text-[11px]">Rewards</p>
                  <p className="text-white text-xs font-mono">{treasuryFlow.builderRewards.toFixed(2)}M</p>
                </div>
                <div className="rounded-lg bg-yellow-950/20 border border-yellow-500/20 px-2 py-1.5">
                  <p className="text-yellow-300 text-[11px]">Reserve</p>
                  <p className="text-white text-xs font-mono">{treasuryFlow.strategicReserve.toFixed(2)}M</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Allocation</span>
                <span className="text-emerald-300 text-xs font-mono ml-auto">{allocationAmount} {JOULE.ticker} / support action</span>
              </div>
              <input
                type="range"
                min={10}
                max={500}
                step={10}
                value={allocationAmount}
                onChange={(event) => setAllocationAmount(Number(event.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div className="space-y-3 mb-3">
              {strategyBattles.map((battle) => {
                const winRateA = battle.winRateA;
                const winRateB = Number((100 - winRateA).toFixed(1));
                const leaderIsA = winRateA >= 50;
                const leader = leaderIsA ? battle.sideA : battle.sideB;
                const loser = leaderIsA ? battle.sideB : battle.sideA;
                const leaderWinRate = leaderIsA ? winRateA : winRateB;
                const controlShiftActive = leaderWinRate >= 60;
                const support = strategySupport[battle.id];
                const leaderReasons = leaderIsA ? battle.sideA.whyWinning : battle.sideB.whyWinning;

                return (
                  <div key={battle.id} className="rounded-xl border border-gray-800 bg-gray-900/35 p-3">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-white text-sm font-semibold">{battle.resource}</p>
                        <p className="text-gray-500 text-xs">{battle.controlAsset}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-lg text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        {battle.dailyFlow.toFixed(1)}M {JOULE.ticker}/day
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-2 mb-2">
                      <button
                        onClick={() => supportStrategy(battle, "a")}
                        className={`text-left rounded-xl p-3 border transition-all ${support === "a" ? "border-emerald-400 bg-emerald-950/20" : "border-gray-800 bg-gray-900/50 hover:border-emerald-500/40"}`}
                      >
                        <p className="text-white text-xs font-semibold">{battle.sideA.name}</p>
                        <p className="text-gray-400 text-xs mt-1">{battle.sideA.strategy}</p>
                        <p className="text-emerald-300 text-xs font-mono mt-1">Treasury {battle.sideA.treasury.toFixed(2)}M</p>
                      </button>
                      <button
                        onClick={() => supportStrategy(battle, "b")}
                        className={`text-left rounded-xl p-3 border transition-all ${support === "b" ? "border-blue-400 bg-blue-950/20" : "border-gray-800 bg-gray-900/50 hover:border-blue-500/40"}`}
                      >
                        <p className="text-white text-xs font-semibold">{battle.sideB.name}</p>
                        <p className="text-gray-400 text-xs mt-1">{battle.sideB.strategy}</p>
                        <p className="text-blue-300 text-xs font-mono mt-1">Treasury {battle.sideB.treasury.toFixed(2)}M</p>
                      </button>
                    </div>

                    <div className="rounded-xl bg-black/20 border border-gray-800 p-2.5 mb-2">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-emerald-300">{battle.sideA.name}: {winRateA.toFixed(1)}%</span>
                        <span className="text-blue-300">{battle.sideB.name}: {winRateB.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all" style={{ width: `${winRateA}%` }} />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-2">
                      <div className="rounded-lg p-2 bg-emerald-950/15 border border-emerald-500/20">
                        <p className="text-emerald-300 text-[11px] font-semibold uppercase tracking-wider mb-1">Why it leads</p>
                        {leaderReasons.slice(0, 2).map((reason, index) => (
                          <p key={index} className="text-gray-300 text-xs">• {reason}</p>
                        ))}
                      </div>
                      <div className="rounded-lg p-2 bg-blue-950/15 border border-blue-500/20">
                        <p className="text-blue-300 text-[11px] font-semibold uppercase tracking-wider mb-1">Control outcome</p>
                        <p className="text-gray-300 text-xs">
                          {controlShiftActive
                            ? `${leader.name} is absorbing execution control from ${loser.name}.`
                            : `${leader.name} is ahead. Reach 60% to trigger governance transfer.`}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowWorldContext((prev) => !prev)}
                className="px-4 py-2 bg-gray-800 text-gray-200 text-sm rounded-xl hover:bg-gray-700 transition-all"
              >
                {showWorldContext ? "Hide World Context" : "Show World Context Map"}
              </button>
              <button
                onClick={() => (profile ? setTab("feed") : setShowOnboard(true))}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-sm rounded-xl hover:from-emerald-500 hover:to-blue-500 transition-all"
              >
                {profile ? "Go To Feed Wires" : "Join Rewire"}
              </button>
            </div>
          </div>
        </div>

        {showWorldContext && (
          <div className="card p-5 mb-4 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(16,185,129,0.06) 0%, transparent 60%)" }}
          />

          {/* Layer Switcher */}
          <div className="relative mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-white font-bold text-base relative">World Context (Secondary)</h2>
              <div className="flex gap-1">
                {[
                  ["geo", "🌍 Geography"],
                  ["mindset", "🧠 Mindset"],
                  ["dissolve", "✨ New World"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setMapLayer(key);
                      setSelectedCluster(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all ${mapLayer === key ? "bg-emerald-600 text-white" : "bg-gray-800/80 text-gray-400 hover:text-white"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-gray-500 text-xs mb-3">
              {mapLayer === "geo"
                ? "Today: The world groups humans by borders they were born inside. Your passport determines your destiny."
                : mapLayer === "mindset"
                  ? "Tomorrow: Borders dissolve. People cluster by HOW THEY THINK — builders find builders, seekers find seekers, across every continent."
                  : 'The future: Geography, caste, nationality mean nothing. Your MINDSET is your tribe. A builder in Balochistan has more in common with a builder in Berlin than with their neighbor.'}
            </p>
          </div>

          {/* SVG MAP */}
          <div
            className="relative rounded-xl overflow-hidden mb-4"
            style={{ background: "rgba(10,15,25,0.8)", border: "1px solid rgba(255,255,255,0.04)" }}
          >
            <svg viewBox="0 0 100 80" className="w-full" style={{ minHeight: 200 }}>
              {/* Grid lines */}
              {[20, 40, 60, 80].map((x) => (
                <line key={`v${x}`} x1={x} y1={0} x2={x} y2={80} stroke="rgba(255,255,255,0.02)" />
              ))}
              {[20, 40, 60].map((y) => (
                <line key={`h${y}`} x1={0} y1={y} x2={100} y2={y} stroke="rgba(255,255,255,0.02)" />
              ))}

              {/* Wealth flow lines */}
              {mapLayer === "geo" &&
                WEALTH_FLOWS.map((f, i) => {
                  const from = GEO_CLUSTERS.find((c) => c.id === f.from);
                  const to = GEO_CLUSTERS.find((c) => c.id === f.to);
                  if (!from || !to) return null;
                  return (
                    <g key={`flow-${i}`}>
                      <line
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke="rgba(255,255,255,0.03)"
                        strokeWidth={f.intensity * 1.2}
                      />
                      <line
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke={to.wealthTrend === "up" ? "#10b981" : "#3b82f6"}
                        strokeWidth={f.intensity * 0.6}
                        className="wealth-flow"
                        style={{ animationDuration: `${1.5 + i * 0.3}s` }}
                      />
                      <circle
                        r={0.6}
                        fill={to.wealthTrend === "up" ? "#10b981" : "#3b82f6"}
                        className="wealth-flow-glow"
                        style={{ animationDelay: `${i * 0.4}s` }}
                      >
                        <animateMotion
                          dur={`${3 + i * 0.5}s`}
                          repeatCount="indefinite"
                          path={`M${from.x},${from.y} L${to.x},${to.y}`}
                        />
                      </circle>
                    </g>
                  );
                })}

              {mapLayer === "geo" &&
                GEO_CLUSTERS.map((c, i) => (
                  <g
                    key={c.id}
                    onClick={() => setSelectedCluster(selectedCluster === c.id ? null : c.id)}
                    className="cursor-pointer"
                  >
                    <circle cx={c.x} cy={c.y} r={2 + c.wealth * 0.12} fill={c.color} opacity={0.07}>
                      <animate
                        attributeName="r"
                        values={`${1.5 + c.wealth * 0.1};${2.5 + c.wealth * 0.14};${1.5 + c.wealth * 0.1}`}
                        dur={`${3 + i * 0.5}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx={c.x} cy={c.y} r={2.5} fill={c.color} opacity={0.6} />
                    <text
                      x={c.x + 3.5}
                      y={c.y - 1}
                      textAnchor="middle"
                      fontSize="2.2"
                      opacity="0.7"
                      fill={c.wealthTrend === "up" ? "#10b981" : c.wealthTrend === "down" ? "#ef4444" : "#f59e0b"}
                    >
                      {c.wealthTrend === "up" ? "↑" : c.wealthTrend === "down" ? "↓" : "→"}
                    </text>
                    <text x={c.x} y={c.y + 6.5} textAnchor="middle" fill={c.color} fontSize="2.5" opacity="0.8">
                      {c.label}
                    </text>
                    <rect x={c.x - 6} y={c.y + 8} width={12} height={1.2} rx={0.6} fill="rgba(255,255,255,0.05)" />
                    <rect
                      x={c.x - 6}
                      y={c.y + 8}
                      width={c.wealth * 0.28}
                      height={1.2}
                      rx={0.6}
                      fill={c.color}
                      opacity={0.5}
                      className="influence-bar"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                    <text x={c.x} y={c.y + 12} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="1.5">
                      {c.wealth}% global wealth
                    </text>
                  </g>
                ))}

              {mapLayer === "mindset" &&
                (() => {
                  const positions = [
                    [20, 25],
                    [50, 18],
                    [80, 25],
                    [35, 50],
                    [65, 50],
                  ];
                  const flows = [
                    [0, 1],
                    [1, 2],
                    [0, 3],
                    [2, 4],
                    [3, 4],
                    [1, 3],
                    [1, 4],
                  ];
                  return flows.map(([a, b], fi) => (
                    <g key={`mf-${fi}`}>
                      <line
                        x1={positions[a][0]}
                        y1={positions[a][1]}
                        x2={positions[b][0]}
                        y2={positions[b][1]}
                        stroke="rgba(255,255,255,0.03)"
                        strokeWidth="0.4"
                      />
                      <line
                        x1={positions[a][0]}
                        y1={positions[a][1]}
                        x2={positions[b][0]}
                        y2={positions[b][1]}
                        stroke="rgba(16,185,129,0.2)"
                        strokeWidth="0.25"
                        className="wealth-flow"
                        style={{ animationDuration: `${2 + fi * 0.3}s` }}
                      />
                    </g>
                  ));
                })()}

              {mapLayer === "mindset" &&
                MINDSET_CLUSTERS.filter((c) => c.winning).map((c, i) => {
                  const positions = [
                    [20, 25],
                    [50, 18],
                    [80, 25],
                    [35, 50],
                    [65, 50],
                  ];
                  const [cx, cy] = positions[i] || [50, 40];
                  return (
                    <g
                      key={c.id}
                      onClick={() => setSelectedCluster(selectedCluster === c.id ? null : c.id)}
                      className="cursor-pointer"
                    >
                      <circle cx={cx} cy={cy} r={c.influence * 0.3} fill={c.color} opacity={0.06}>
                        <animate
                          attributeName="r"
                          values={`${c.influence * 0.28};${c.influence * 0.34};${c.influence * 0.28}`}
                          dur={`${4 + i}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx={cx} cy={cy} r={c.size / 8} fill={c.color} opacity={0.4} />
                      {c.influenceTrend === "rising" && (
                        <text x={cx + c.size / 8 + 1.5} y={cy - 1} fontSize="2" fill="#10b981" className="breathe">
                          ↑
                        </text>
                      )}
                      <text x={cx} y={cy - 1} textAnchor="middle" fontSize="4">
                        {c.emoji}
                      </text>
                      <text x={cx} y={cy + 4} textAnchor="middle" fill={c.color} fontSize="2.2" fontWeight="bold">
                        {c.label}
                      </text>
                      <text x={cx} y={cy + 7} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="1.8">
                        {c.members}
                      </text>
                      <rect x={cx - 5} y={cy + 8.5} width={10} height={1} rx={0.5} fill="rgba(255,255,255,0.04)" />
                      <rect
                        x={cx - 5}
                        y={cy + 8.5}
                        width={c.influence * 0.3}
                        height={1}
                        rx={0.5}
                        fill={c.color}
                        opacity={0.5}
                        className="influence-bar"
                        style={{ animationDelay: `${i * 0.12}s` }}
                      />
                      <text x={cx} y={cy + 12} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="1.3">
                        {c.influence}% influence
                      </text>
                    </g>
                  );
                })}

              {mapLayer === "dissolve" && (
                <g>
                  {MINDSET_CLUSTERS.filter((c) => c.winning).map((c, i) => {
                    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
                    const cx = 50 + Math.cos(angle) * 22;
                    const cy = 38 + Math.sin(angle) * 18;
                    return (
                      <g key={c.id}>
                        <line x1={50} y1={38} x2={cx} y2={cy} stroke={c.color} strokeWidth="0.3" opacity="0.3" />
                        {MINDSET_CLUSTERS.filter((c2) => c2.winning).map((c2, j) => {
                          if (j <= i) return null;
                          const a2 = (j / 5) * Math.PI * 2 - Math.PI / 2;
                          return (
                            <line
                              key={j}
                              x1={cx}
                              y1={cy}
                              x2={50 + Math.cos(a2) * 22}
                              y2={38 + Math.sin(a2) * 18}
                              stroke="rgba(255,255,255,0.05)"
                              strokeWidth="0.2"
                            />
                          );
                        })}
                        <circle cx={cx} cy={cy} r={3} fill={c.color} opacity={0.2}>
                          <animate attributeName="r" values="2.5;3.5;2.5" dur={`${3 + i}s`} repeatCount="indefinite" />
                        </circle>
                        <text x={cx} y={cy + 0.5} textAnchor="middle" fontSize="3.5">
                          {c.emoji}
                        </text>
                        <text x={cx} y={cy + 4.5} textAnchor="middle" fill={c.color} fontSize="1.8">
                          {c.label}
                        </text>
                      </g>
                    );
                  })}
                  <text x="50" y="38" textAnchor="middle" fill="rgba(16,185,129,0.15)" fontSize="5" fontWeight="bold">
                    ONE
                  </text>
                  <text x="50" y="42" textAnchor="middle" fill="rgba(16,185,129,0.1)" fontSize="2.5">
                    Mindset = Your Tribe
                  </text>
                </g>
              )}
            </svg>
          </div>

          {WealthShiftStrip()}

          {selectedCluster &&
            mapLayer === "geo" &&
            (() => {
              const c = GEO_CLUSTERS.find((g) => g.id === selectedCluster);
              if (!c) return null;
              return (
                <div
                  className="p-3 rounded-xl slide-up mb-2"
                  style={{ background: `${c.color}08`, border: `1px solid ${c.color}15` }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-white text-sm font-medium">
                      {c.label} <span className="text-gray-500 text-xs ml-1">{c.pop}</span>
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-gray-600 text-xs">Wealth</span>
                        <div className="flex items-center gap-1">
                          <span className="text-white text-xs font-mono font-bold">{c.wealth}%</span>
                          <span
                            className={`text-xs ${c.wealthTrend === "up" ? "text-emerald-400" : c.wealthTrend === "down" ? "text-red-400" : "text-yellow-400"}`}
                          >
                            {c.wealthTrend === "up" ? "↑" : c.wealthTrend === "down" ? "↓" : "→"}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-600 text-xs">Influence</span>
                        <div className="text-white text-xs font-mono font-bold">{c.influence}%</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {c.groups.map((g, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg text-xs" style={{ color: c.color, background: `${c.color}10` }}>
                        {g}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-xs mt-2 italic">
                    In the new world, these geographic groupings dissolve. Switch to "Mindset" view →
                  </p>
                </div>
              );
            })()}

          {selectedCluster &&
            mapLayer === "mindset" &&
            (() => {
              const c = MINDSET_CLUSTERS.find((m) => m.id === selectedCluster);
              if (!c) return null;
              return (
                <div
                  className="p-4 rounded-xl slide-up mb-2"
                  style={{ background: `${c.color}08`, border: `1px solid ${c.color}15` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{c.emoji}</span>
                      <div>
                        <h4 className="text-white text-sm font-bold">{c.label}</h4>
                        <span className="text-gray-500 text-xs">{c.members} people worldwide</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <span className="text-gray-600 text-xs">Influence</span>
                        <div className="flex items-center gap-1">
                          <span className="text-white text-xs font-mono font-bold">{c.influence}%</span>
                          <span
                            className={`text-xs ${c.influenceTrend === "rising" ? "text-emerald-400" : c.influenceTrend === "falling" ? "text-red-400" : "text-yellow-400"}`}
                          >
                            {c.influenceTrend === "rising" ? "↑" : c.influenceTrend === "falling" ? "↓" : "→"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{c.desc}</p>
                  <div className="p-2.5 rounded-lg bg-gray-900/50 mb-2">
                    <span className="text-gray-500 text-xs">Core belief:</span>
                    <p className="text-gray-200 text-xs italic mt-0.5">"{c.beliefs}"</p>
                  </div>
                  <p className="text-gray-400 text-xs">
                    <span className="text-gray-500">Who:</span> {c.who}
                  </p>
                </div>
              );
            })()}
        </div>
        )}

        {LiveActivityTicker()}

        <div className="card p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-white font-bold text-base flex items-center gap-2">🤝 New World Alliances</h2>
              <p className="text-gray-500 text-xs">
                Movements forming across borders. Not by nationality — by shared vision for the future.
              </p>
            </div>
            {profile && (
              <button
                onClick={() => setShowCreateAlliance(true)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-lg transition-all flex items-center gap-1.5"
              >
                <Sparkles size={12} /> Create Alliance
              </button>
            )}
          </div>

          <div className="space-y-3">
            {allAlliances.map((a) => {
              const isOpen = selectedAlliance === a.id;
              const isJoined = joinedAlliances.has(a.id);
              const discussion = allianceThreads[a.id] || [];
              return (
                <div
                  key={a.id}
                  className={`rounded-xl overflow-hidden transition-all ${isOpen ? "ring-1 ring-emerald-500/20" : ""}`}
                  style={{ background: "rgba(17,24,39,0.5)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="p-4 cursor-pointer" onClick={() => setSelectedAlliance(isOpen ? null : a.id)}>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{a.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-sm">{a.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-gray-500 text-xs">{a.founder.name}</span>
                          <span className="text-gray-700 text-xs">·</span>
                          <span className="text-emerald-400 text-xs font-mono">
                            {typeof a.members === "number" ? a.members.toLocaleString() : a.members} members
                          </span>
                          <span className="text-gray-700 text-xs">·</span>
                          <span className="text-gray-600 text-xs">{a.founded}</span>
                        </div>
                      </div>
                      {isJoined ? (
                        <span className="px-2.5 py-1 bg-emerald-500/15 text-emerald-400 text-xs rounded-lg border border-emerald-500/20">
                          Joined ✓
                        </span>
                      ) : (
                        <ChevronDown size={16} className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="px-4 pb-4 space-y-3 slide-up">
                      <div
                        className="p-4 rounded-xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(16,185,129,0.05), rgba(59,130,246,0.05))",
                          border: "1px solid rgba(16,185,129,0.1)",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Eye size={14} className="text-emerald-400" />
                          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">The World We Want</span>
                        </div>
                        <p className="text-gray-200 text-sm leading-relaxed italic">"{a.worldVision}"</p>
                      </div>

                      {a.philosophy && (
                        <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800/50">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Lightbulb size={12} className="text-yellow-400" />
                            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Philosophy</span>
                          </div>
                          <p className="text-gray-300 text-xs leading-relaxed">{a.philosophy}</p>
                        </div>
                      )}

                      {a.commitments?.length > 0 && (
                        <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-800/50">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 size={12} className="text-blue-400" />
                            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Member Commitments</span>
                          </div>
                          <div className="space-y-1.5">
                            {a.commitments.map((c, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-blue-400 text-xs">{i + 1}</span>
                                </div>
                                <span className="text-gray-300 text-xs leading-relaxed">{c}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {!isJoined && profile && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setJoinedAlliances((prev) => new Set([...prev, a.id]));
                          }}
                          className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white text-sm font-medium rounded-xl transition-all"
                        >
                          Join This Alliance & Accept Commitments
                        </button>
                      )}
                      {!profile && (
                        <button
                          onClick={() => setShowOnboard(true)}
                          className="w-full py-2.5 bg-gray-800 text-gray-400 text-sm rounded-xl hover:bg-gray-700 transition-all"
                        >
                          Create profile to join alliances
                        </button>
                      )}

                      <div className="pt-3 border-t border-gray-800/50">
                        <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Alliance Discussion + AI Actions</span>
                        <div className="mt-2 space-y-2.5">
                          {discussion.slice(0, 5).map((msg) => (
                            <div key={msg.id} className="flex gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-sm flex-shrink-0">
                                {msg.user.avatar}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-white text-xs font-medium">{msg.user.name}</span>
                                  {msg.role === "ai" && (
                                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/15 text-blue-300 border border-blue-500/20">
                                      AI
                                    </span>
                                  )}
                                  <span className="text-gray-700 text-xs">{msg.time}</span>
                                </div>
                                <p className="text-gray-300 text-xs leading-relaxed mt-0.5">{msg.text}</p>
                                <button className="text-gray-600 text-xs hover:text-emerald-400 transition-colors mt-1 flex items-center gap-1">
                                  <ThumbsUp size={10} /> {msg.likes}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        {profile && isJoined && (
                          <div className="flex gap-2 mt-3">
                            <input
                              value={allianceCommentInputs[a.id] || ""}
                              onChange={(e) => setAllianceCommentInputs((prev) => ({ ...prev, [a.id]: e.target.value }))}
                              onKeyDown={(event) => event.key === "Enter" && postAllianceComment(a)}
                              placeholder="Post update. AI will convert it into next action."
                              className="flex-1 bg-gray-900/50 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/30"
                            />
                            <button
                              onClick={() => postAllianceComment(a)}
                              disabled={!allianceCommentInputs[a.id]?.trim()}
                              className="px-3 py-2 bg-emerald-600 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-xl text-xs hover:bg-emerald-500 transition-all"
                            >
                              <Send size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="card p-5 mb-4">
          <div className="flex items-start justify-between mb-3 gap-3">
            <div>
              <h2 className="text-white font-bold text-base flex items-center gap-2">
                <Briefcase size={15} className="text-emerald-400" />
                Wire Launchpad (Create + Invite)
              </h2>
              <p className="text-gray-500 text-xs">
                Build a wire, invite execution partners, coordinate with AI, and settle rewards in {JOULE.ticker}.
              </p>
            </div>
            <div className="text-right">
              <p className="text-emerald-300 text-xs font-mono">{walletJoules.toLocaleString()} {JOULE.ticker}</p>
              <p className="text-gray-500 text-xs">{missionSummary.rewarded} rewards claimed</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
            <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-2.5">
              <p className="text-gray-500 text-[11px] uppercase tracking-wider">Joined</p>
              <p className="text-white text-sm font-mono">{missionSummary.joined}</p>
            </div>
            <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-2.5">
              <p className="text-gray-500 text-[11px] uppercase tracking-wider">Proof Submitted</p>
              <p className="text-blue-300 text-sm font-mono">{missionSummary.submitted}</p>
            </div>
            <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-2.5">
              <p className="text-gray-500 text-[11px] uppercase tracking-wider">USD Rewards</p>
              <p className="text-emerald-300 text-sm font-mono">${missionSummary.totalUsd.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-2.5">
              <p className="text-gray-500 text-[11px] uppercase tracking-wider">JOU Settled</p>
              <p className="text-cyan-300 text-sm font-mono">{missionSummary.totalJou.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-2.5">
              <p className="text-gray-500 text-[11px] uppercase tracking-wider">Points</p>
              <p className="text-purple-300 text-sm font-mono">{missionSummary.totalPoints.toLocaleString()}</p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900/45 p-3 mb-3">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Join Wire by Invite</p>
            <div className="flex gap-2">
              <input
                value={inviteCodeInput}
                onChange={(event) => setInviteCodeInput(event.target.value.toUpperCase())}
                placeholder="Paste invite code (e.g., FARM-A2D4)"
                className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/30"
              />
              <button
                onClick={joinMissionByInvite}
                disabled={!inviteCodeInput.trim()}
                className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white text-xs font-semibold transition-all"
              >
                Join
              </button>
            </div>
            {lastInviteCode && (
              <p className="text-emerald-300 text-[11px] mt-2">
                Last invite: {lastInviteCode} {profile ? `(share link copied on demand)` : ""}
              </p>
            )}
          </div>

          {profile ? (
            <div className="rounded-xl border border-gray-800 bg-gray-900/45 p-3 mb-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Create Wire</p>
                <button
                  onClick={() => setShowMissionBuilder((prev) => !prev)}
                  className="px-2.5 py-1 rounded-lg text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
                >
                  {showMissionBuilder ? "Hide Builder" : "Open Wire Builder"}
                </button>
              </div>

              {showMissionBuilder && (
                <div className="mt-3 space-y-2.5">
                  <input
                    value={missionDraft.title}
                    onChange={(event) => setMissionDraft((draft) => ({ ...draft, title: event.target.value }))}
                    placeholder="Wire title"
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/30"
                  />
                  <textarea
                    value={missionDraft.summary}
                    onChange={(event) => setMissionDraft((draft) => ({ ...draft, summary: event.target.value }))}
                    placeholder="Wire objective and expected measurable outcome"
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/30 resize-none min-h-[66px]"
                  />
                  <div className="grid md:grid-cols-2 gap-2">
                    <select
                      value={missionDraft.allianceId}
                      onChange={(event) => setMissionDraft((draft) => ({ ...draft, allianceId: event.target.value }))}
                      className="bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/30"
                    >
                      {allAlliances.map((alliance) => (
                        <option key={alliance.id} value={alliance.id} className="bg-gray-900">
                          {alliance.name}
                        </option>
                      ))}
                    </select>
                    <select
                      value={missionDraft.effort}
                      onChange={(event) => setMissionDraft((draft) => ({ ...draft, effort: event.target.value }))}
                      className="bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/30"
                    >
                      {["2-3 hours", "3-5 hours", "5-8 hours", "8-12 hours"].map((effort) => (
                        <option key={effort} value={effort} className="bg-gray-900">
                          {effort}
                        </option>
                      ))}
                    </select>
                  </div>
                  {missionDraft.deliverables.map((deliverable, index) => (
                    <input
                      key={index}
                      value={deliverable}
                      onChange={(event) => updateMissionDraftDeliverable(index, event.target.value)}
                      placeholder={`Deliverable ${index + 1}`}
                      className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/30"
                    />
                  ))}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-500 text-[11px] uppercase tracking-wider">Reward Pool ({JOULE.ticker})</span>
                      <span className="text-cyan-300 text-xs font-mono">{Math.round(missionDraft.rewardJou)} {JOULE.ticker}</span>
                    </div>
                    <input
                      type="range"
                      min={MIN_MISSION_REWARD_JOU}
                      max={MAX_MISSION_REWARD_JOU}
                      step={10}
                      value={missionDraft.rewardJou}
                      onChange={(event) =>
                        setMissionDraft((draft) => ({ ...draft, rewardJou: Number(event.target.value) }))
                      }
                      className="w-full accent-emerald-500"
                    />
                    <p className="text-gray-500 text-[11px] mt-1">
                      Escrow lock on launch: {Math.max(20, Math.round((Number(missionDraft.rewardJou) || 0) * 0.3))} {JOULE.ticker}
                    </p>
                  </div>
                  <button
                    onClick={handleCreateMission}
                    disabled={
                      !missionDraft.title.trim() ||
                      !missionDraft.summary.trim() ||
                      missionDraft.deliverables.filter((item) => item.trim()).length < 2 ||
                      walletJoules < Math.max(20, Math.round((Number(missionDraft.rewardJou) || 0) * 0.3))
                    }
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white text-sm font-semibold transition-all"
                  >
                    Launch Wire + Generate Invite
                  </button>
                  {walletJoules < Math.max(20, Math.round((Number(missionDraft.rewardJou) || 0) * 0.3)) && (
                    <p className="text-red-300 text-[11px]">
                      You need more {JOULE.ticker} in wallet to launch this reward pool.
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowOnboard(true)}
              className="w-full mb-3 py-2 bg-gray-800 text-gray-300 rounded-xl text-sm hover:bg-gray-700 transition-all"
            >
              Join to create wires and receive starter {STARTER_JOULE_GRANT} {JOULE.ticker}
            </button>
          )}

          <div className="space-y-3">
            {allMissions.map((mission) => {
              const missionProgress = missionState[mission.id];
              const alliance = allAlliances.find((item) => item.id === mission.allianceId);
              const proofText = missionProofInputs[mission.id] || "";
              const missionChatInput = missionCommentInputs[mission.id] || "";
              const missionThread = missionThreads[mission.id] || [];
              const hasJoined = Boolean(missionProgress);
              const hasSubmitted = missionProgress?.status === "submitted" || missionProgress?.status === "rewarded";
              const isRewarded = missionProgress?.status === "rewarded";
              const rewardJou = getMissionRewardJou(mission);
              return (
                <div
                  key={mission.id}
                  className="rounded-xl border border-gray-800 bg-gray-900/30 p-3"
                  style={{ borderColor: isRewarded ? "rgba(16,185,129,0.35)" : "rgba(255,255,255,0.08)" }}
                >
                  <div className="flex flex-wrap items-start gap-2 justify-between mb-2">
                    <div>
                      <h3 className="text-white text-sm font-semibold">{mission.title}</h3>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {alliance?.name || "Alliance"} · {(mission.participants + (hasJoined ? 1 : 0)).toLocaleString()} builders
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <span className="px-2 py-0.5 rounded-lg text-[11px] bg-blue-500/10 text-blue-300 border border-blue-500/20">
                        {mission.effort}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        ${mission.rewardUsd || 0}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg text-[11px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        +{rewardJou} {JOULE.ticker}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg text-[11px] bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        +{mission.rewardPoints || 0} pts
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-xs mb-2 leading-relaxed">{mission.summary}</p>

                  {mission.inviteCode && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-lg text-[11px] bg-yellow-500/10 text-yellow-300 border border-yellow-500/20">
                        Wire Invite: {mission.inviteCode}
                      </span>
                      <button
                        onClick={() => copyMissionInviteLink(mission.inviteCode)}
                        className="text-[11px] px-2 py-0.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-all"
                      >
                        Copy Link
                      </button>
                    </div>
                  )}

                  <div className="space-y-1 mb-3">
                    {mission.deliverables.map((deliverable, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs">
                        <div className="w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center text-[10px] text-gray-400 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-gray-400">{deliverable}</span>
                      </div>
                    ))}
                  </div>

                  {!hasJoined && (
                    <button
                      onClick={() => joinMission(mission)}
                      className="w-full py-2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white text-xs font-semibold rounded-xl transition-all"
                    >
                      Join Wire (+{Math.floor(INVITE_JOIN_BONUS / 2)} {JOULE.ticker})
                    </button>
                  )}

                  {hasJoined && !hasSubmitted && (
                    <div className="space-y-2">
                      <textarea
                        value={proofText}
                        onChange={(event) =>
                          setMissionProofInputs((prev) => ({ ...prev, [mission.id]: event.target.value }))
                        }
                        placeholder="Submit proof: what you shipped, metrics, link, and next step..."
                        className="w-full bg-gray-900/70 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/30 resize-none min-h-[72px]"
                      />
                      <button
                        onClick={() => submitMissionProof(mission)}
                        disabled={proofText.trim().length < 24}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white text-xs font-semibold rounded-xl transition-all"
                      >
                        Submit Proof
                      </button>
                    </div>
                  )}

                  {hasSubmitted && (
                    <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-2.5">
                      <p className="text-gray-500 text-[11px] mb-1 uppercase tracking-wider">Your Proof</p>
                      <p className="text-gray-300 text-xs leading-relaxed">{missionProgress.proof || "Proof submitted."}</p>
                      {!isRewarded ? (
                        <button
                          onClick={() => claimMissionReward(mission)}
                          className="mt-2 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-all"
                        >
                          Claim Reward (${mission.rewardUsd || 0} + {rewardJou} {JOULE.ticker} + {mission.rewardPoints || 0} pts)
                        </button>
                      ) : (
                        <div className="mt-2 px-2 py-1 rounded-lg text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 inline-flex items-center gap-1.5">
                          <CheckCircle2 size={12} />
                          Reward claimed
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-3 pt-2 border-t border-gray-800/60">
                    <p className="text-gray-500 text-[11px] uppercase tracking-wider mb-1.5">Wire Thread (Human + AI)</p>
                    <div className="space-y-1.5 mb-2">
                      {missionThread.slice(0, 4).map((entry) => (
                        <div key={entry.id} className="rounded-lg bg-gray-900/50 border border-gray-800 px-2.5 py-2">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-xs">{entry.user.avatar}</span>
                            <span className="text-white text-[11px] font-medium">{entry.user.name}</span>
                            {entry.role === "ai" && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/15 text-blue-300 border border-blue-500/20">
                                AI
                              </span>
                            )}
                            <span className="text-gray-600 text-[10px] ml-auto">{entry.time}</span>
                          </div>
                          <p className="text-gray-300 text-[11px] leading-relaxed">{entry.text}</p>
                        </div>
                      ))}
                    </div>
                    {hasJoined && (
                      <div className="flex gap-2">
                        <input
                          value={missionChatInput}
                          onChange={(event) =>
                            setMissionCommentInputs((prev) => ({ ...prev, [mission.id]: event.target.value }))
                          }
                          onKeyDown={(event) => event.key === "Enter" && postMissionComment(mission)}
                          placeholder="Post update. AI will respond with next action."
                          className="flex-1 bg-gray-900/50 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/30"
                        />
                        <button
                          onClick={() => postMissionComment(mission)}
                          disabled={!missionChatInput.trim()}
                          className="px-3 py-2 bg-emerald-600 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-xl text-xs hover:bg-emerald-500 transition-all"
                        >
                          <Send size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-800/60">
            <h3 className="text-gray-300 text-xs font-semibold uppercase tracking-wider mb-2">Recent Proofs</h3>
            <div className="space-y-2">
              {missionProofFeed.slice(0, 4).map((proof) => {
                const mission = allMissions.find((item) => item.id === proof.missionId);
                return (
                  <div key={proof.id} className="rounded-xl border border-gray-800 bg-gray-900/30 p-2.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">{proof.avatar}</span>
                      <span className="text-white text-xs font-medium">{proof.userName}</span>
                      <span className="text-gray-600 text-xs">·</span>
                      <span className="text-gray-500 text-xs">{proof.time}</span>
                    </div>
                    <p className="text-emerald-300 text-[11px] mb-1">{mission?.title || "Wire"}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{proof.proof}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card p-5 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h2 className="text-white font-bold text-base">What's YOUR Qi?</h2>
              <p className="text-gray-500 text-xs">8 questions. 60 seconds. Find out if your daily life builds power or burns it.</p>
            </div>
          </div>

          {routineStep === -1 && !showResults && (
            <div className="text-center py-4">
              <p className="text-gray-300 text-sm mb-3">
                Every human generates <span className="text-emerald-400 font-bold">Qi</span> — life energy that compounds into wealth, health, and influence.
              </p>
              <button
                onClick={() => setRoutineStep(0)}
                className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold rounded-xl transition-all text-sm"
              >
                Discover My Qi ⚡
              </button>
            </div>
          )}

          {routineStep >= 0 && !showResults && (
            <div className="slide-up">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${((routineStep + 1) / ROUTINE_QUESTIONS.length) * 100}%` }}
                  />
                </div>
                <span className="text-gray-500 text-xs font-mono">
                  {routineStep + 1}/{ROUTINE_QUESTIONS.length}
                </span>
              </div>
              <h3 className="text-white text-sm font-medium mb-3">{ROUTINE_QUESTIONS[routineStep].q}</h3>
              <div className="space-y-2">
                {ROUTINE_QUESTIONS[routineStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => answerQuestion(opt.qi)}
                    className="w-full text-left p-3 rounded-xl transition-all hover:border-emerald-500/30 group"
                    style={{ background: "rgba(17,24,39,0.5)", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-200 text-sm">{opt.text}</span>
                      <span className="text-emerald-400 text-xs font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        +{opt.qi} Qi
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs mt-0.5 group-hover:text-gray-400 transition-colors">{opt.tag}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showResults && (
            <div className="slide-up">
              <div className="text-center mb-4">
                <div className="text-4xl mb-1">{qiLevel.emoji}</div>
                <div className="text-3xl font-black font-mono" style={{ color: qiLevel.color }}>
                  {totalQi}
                  <span className="text-base text-gray-500">/{maxQi} Qi</span>
                </div>
                <div className="font-bold text-sm mt-1" style={{ color: qiLevel.color }}>
                  {qiLevel.label}
                </div>
                <p className="text-gray-400 text-xs mt-1">{qiLevel.desc}</p>
              </div>
              <div className="p-3 rounded-xl border mb-3" style={{ background: `${qiLevel.color}08`, borderColor: `${qiLevel.color}20` }}>
                <p className="text-gray-300 text-xs leading-relaxed">
                  {totalQi >= 70
                    ? "Your routine compounds into real power. The gap between you and average is widening in your favor every day."
                    : totalQi >= 40
                      ? "You're leaking Qi through distractions. Fix 2-3 areas and you jump to the top tier."
                      : "Your routine is built for a dead world. Start changing ONE habit today."}
                </p>
              </div>
              <button
                onClick={() => {
                  setRoutineStep(-1);
                  setRoutineAnswers({});
                  setShowResults(false);
                }}
                className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 text-xs rounded-xl transition-all"
              >
                Retake
              </button>
            </div>
          )}
        </div>

        {showCreateAlliance && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
          >
            <div
              className="card w-full max-w-lg max-h-[85vh] overflow-y-auto scrollbar-thin p-6 pop-in"
              style={{ background: "rgba(17,24,39,0.95)" }}
            >
              <h2 className="text-white text-lg font-bold mb-1">🌟 Create a New Alliance</h2>
              <p className="text-gray-400 text-sm mb-4">
                Start a movement. Define the world you want. Others will join if your vision resonates.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">Alliance Name</label>
                  <input
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/30"
                    value={newAlliance.name}
                    onChange={(e) => setNewAlliance((p) => ({ ...p, name: e.target.value }))}
                    placeholder="e.g., 'Digital Farmers Worldwide'"
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-xs mb-1 block flex items-center gap-1.5">
                    <Eye size={12} className="text-emerald-400" /> What world do you want your children to live in?
                  </label>
                  <textarea
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/30 resize-none min-h-[80px]"
                    value={newAlliance.worldVision}
                    onChange={(e) => setNewAlliance((p) => ({ ...p, worldVision: e.target.value }))}
                    placeholder="Describe the future you're building toward..."
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-xs mb-1 block flex items-center gap-1.5">
                    <Lightbulb size={12} className="text-yellow-400" /> Your philosophy in one paragraph
                  </label>
                  <textarea
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/30 resize-none min-h-[60px]"
                    value={newAlliance.philosophy}
                    onChange={(e) => setNewAlliance((p) => ({ ...p, philosophy: e.target.value }))}
                    placeholder="What do you believe that most people don't?"
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-xs mb-2 block flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-blue-400" /> Commitments for members (what they pledge to do)
                  </label>
                  {newAlliance.commitments.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 text-xs">{i + 1}</span>
                      </div>
                      <input
                        className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/30"
                        value={c}
                        onChange={(e) => {
                          const nc = [...newAlliance.commitments];
                          nc[i] = e.target.value;
                          setNewAlliance((p) => ({ ...p, commitments: nc }));
                        }}
                        placeholder={`Commitment ${i + 1}`}
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => setNewAlliance((p) => ({ ...p, commitments: [...p.commitments, ""] }))}
                    className="text-emerald-400 text-xs hover:text-emerald-300 transition-colors"
                  >
                    + Add another commitment
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setShowCreateAlliance(false)}
                  className="flex-1 py-2.5 bg-gray-800 text-gray-400 rounded-xl text-sm hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAlliance}
                  disabled={!newAlliance.name.trim() || !newAlliance.worldVision.trim()}
                  className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-medium rounded-xl text-sm hover:from-emerald-500 hover:to-blue-500 disabled:opacity-40 transition-all"
                >
                  Launch Alliance 🚀
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const tabs = profile
    ? [
        { id: "feed", label: "Feed", icon: Zap },
        { id: "world", label: "Strategy Arena", icon: Globe },
        { id: "paradigm", label: "Shifts", icon: GitBranch },
        { id: "profile", label: "Me", icon: User },
      ]
    : [
        { id: "world", label: "Strategy Arena", icon: Globe },
        { id: "paradigm", label: "Shifts", icon: GitBranch },
      ];

  const currentPage =
    tab === "feed" ? FeedPage() : tab === "world" ? WorldSimPage() : tab === "paradigm" ? ParadigmPage() : MyProfilePage();

  if (showLanding) {
    return LandingPage();
  }

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col overflow-hidden">
      <style>{css}</style>

      <header className="flex-shrink-0 border-b border-gray-800/50 bg-gray-950/90" style={{ backdropFilter: "blur(12px)" }}>
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <button className="flex items-center gap-2.5" onClick={() => setTab(profile ? "feed" : "world")}>
            <img
              src="/rewire-logo-192.png"
              alt="Rewire logo"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-blue-400/40 shadow-[0_0_18px_rgba(96,165,250,0.45)]"
            />
            <div>
              <h1 className="text-sm font-bold text-white leading-none">Rewire</h1>
              <span className="text-gray-600 text-xs leading-none">Collective Intelligence</span>
            </div>
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-soft" />
              <span className="font-mono">{livePresence.onlineNow.toLocaleString()} online</span>
            </div>
            {profile && (
              <div className="px-2 py-1 rounded-lg border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-xs font-mono">
                {walletJoules.toLocaleString()} {JOULE.ticker}
              </div>
            )}
            {profile ? (
              <div
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-sm cursor-pointer hover:ring-2 hover:ring-emerald-500/30 transition-all"
                onClick={() => setTab("profile")}
              >
                {AVATARS[(profile.name?.length || 0) % AVATARS.length]}
              </div>
            ) : (
              <button
                onClick={() => setShowOnboard(true)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-lg transition-all"
              >
                Join
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex-shrink-0 border-b border-gray-800/50 bg-gray-950/85" style={{ backdropFilter: "blur(12px)" }}>
        <div className="max-w-3xl mx-auto px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-thin">
          {tabs.map((t) => (
            <button
              key={`quick-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${tab === t.id ? "bg-emerald-600 text-white" : "bg-gray-900 text-gray-400 hover:text-white border border-gray-800"}`}
            >
              <t.icon size={13} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-2xl mx-auto px-4 py-4">{currentPage}</div>
        </main>
      </div>

      <nav className="flex-shrink-0 border-t border-gray-800/50 bg-gray-950/90" style={{ backdropFilter: "blur(12px)" }}>
        <div className="max-w-3xl mx-auto flex">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all ${tab === t.id ? "text-emerald-400" : "text-gray-600 hover:text-gray-400"}`}
            >
              <t.icon size={20} />
              <span className="text-xs">{t.id === "world" ? "Arena" : t.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {showOnboard && OnboardModal()}
    </div>
  );
}
