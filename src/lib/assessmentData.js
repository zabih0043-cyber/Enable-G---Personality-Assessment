export const SECTIONS = [
  {
    id: 1,
    title: "Daily Mindset",
    description:
      "Reflect on your daily outlook, motivation, self-care habits, and attitude towards healthy risk-taking.",
    measures: ["Outlook", "Motivation", "Self-care", "Healthy risk attitude"],
  },
  {
    id: 2,
    title: "Challenges & Growth",
    description:
      "Consider how you respond to setbacks, pursue success, receive feedback, and balance your personal growth.",
    measures: [
      "Resilience",
      "Success mindset",
      "Feedback reception",
      "Growth balance",
    ],
  },
  {
    id: 3,
    title: "Relationships & Development",
    description:
      "Think about your curiosity, decision-making, learning attitude, relationship values, and happiness habits.",
    measures: [
      "Curiosity",
      "Decision-making",
      "Learning attitude",
      "Relationship values",
      "Happiness habits",
    ],
  },
  {
    id: 4,
    title: "Adaptability & Future Vision",
    description:
      "Assess your adaptability, creativity, feedback maturity, courage, and clarity of future direction.",
    measures: [
      "Adaptability",
      "Creativity",
      "Feedback maturity",
      "Courage",
      "Future direction",
    ],
  },
];

export const QUESTIONS = [
  { id: 1, section: 1, text: "I start most days with a positive and intentional mindset." },
  { id: 2, section: 1, text: "I feel genuinely motivated to pursue my goals on a daily basis." },
  { id: 3, section: 1, text: "I make time for activities that support my physical and mental well-being." },
  { id: 4, section: 1, text: "I am willing to step outside my comfort zone when opportunities arise." },
  { id: 5, section: 1, text: "I focus more on what I can control than on what I cannot." },
  { id: 6, section: 2, text: "I recover well from setbacks and use them as learning experiences." },
  { id: 7, section: 2, text: "I believe that consistent effort leads to meaningful success over time." },
  { id: 8, section: 2, text: "I am open to receiving constructive feedback without becoming defensive." },
  { id: 9, section: 2, text: "I regularly set personal or professional development goals for myself." },
  { id: 10, section: 2, text: "I maintain a healthy balance between pushing forward and resting when needed." },
  { id: 11, section: 3, text: "I remain genuinely curious and eager to learn new things." },
  { id: 12, section: 3, text: "I make thoughtful decisions rather than acting purely on impulse." },
  { id: 13, section: 3, text: "I see every experience as an opportunity to grow, even difficult ones." },
  { id: 14, section: 3, text: "I invest meaningful time and energy into my important relationships." },
  { id: 15, section: 3, text: "I regularly engage in activities that bring me genuine happiness." },
  { id: 16, section: 4, text: "I adapt well when plans change or unexpected challenges arise." },
  { id: 17, section: 4, text: "I enjoy finding creative solutions to problems I encounter." },
  { id: 18, section: 4, text: "I use feedback as a tool for growth rather than seeing it as criticism." },
  { id: 19, section: 4, text: "I have the courage to pursue what matters to me, even when it feels difficult." },
  { id: 20, section: 4, text: "I have a clear sense of direction for where I want my life to go." },
];

export const ANSWER_OPTIONS = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

export function getOverallLabel(score) {
  if (score >= 80) return "Thriving";
  if (score >= 60) return "Strong";
  if (score >= 40) return "Developing";
  return "Emerging";
}

export function getSectionLabel(score) {
  if (score >= 21) return "Strong";
  if (score >= 16) return "Good";
  if (score >= 11) return "Developing";
  return "Needs Attention";
}

export function getOverallDescription(score) {
  if (score >= 80) {
    return "You demonstrate a strong personal development profile. Your mindset, resilience, and future orientation are well-aligned for continued growth.";
  }
  if (score >= 60) {
    return "You have a good foundation with clear strengths. There are some areas where focused attention could accelerate your personal development journey.";
  }
  if (score >= 40) {
    return "You are developing with some inconsistent areas. Targeted reflection and intentional habits can help you build a stronger foundation.";
  }
  return "You would benefit from greater support and structured reflection. Small, consistent steps can lead to meaningful progress over time.";
}

export const SECTION_RECOMMENDATIONS = {
  1: {
    low: [
      "Build more intentional daily routines that set a positive tone for your day.",
      "Strengthen your positive focus by practising gratitude or journalling.",
      "Protect dedicated self-care time in your schedule each week.",
    ],
    high: [
      "Your daily mindset is a real strength — continue nurturing these habits.",
      "Consider mentoring others in building positive daily routines.",
    ],
  },
  2: {
    low: [
      "Work on receiving feedback with curiosity rather than defensiveness.",
      "Reframe setbacks as learning moments rather than failures.",
      "Set smaller, achievable growth goals to build momentum.",
    ],
    high: [
      "Your resilience and growth mindset are impressive — keep challenging yourself.",
      "Look for opportunities to support others through their challenges.",
    ],
  },
  3: {
    low: [
      "Strengthen meaningful connections by investing more quality time in relationships.",
      "Invest more in reflective growth and happiness habits.",
      "Practice active listening to deepen your relationships.",
    ],
    high: [
      "Your relationship skills and curiosity are excellent — keep deepening connections.",
      "Explore new areas of learning to continue fuelling your development.",
    ],
  },
  4: {
    low: [
      "Clarify your long-term goals by writing down your vision for the next 1–3 years.",
      "Practise flexibility and problem-solving under pressure with small challenges.",
      "Seek creative outlets that encourage innovative thinking.",
    ],
    high: [
      "Your adaptability and future vision are strong — keep refining your direction.",
      "Use your clarity to inspire and guide those around you.",
    ],
  },
};

export function calculateSectionScore(answers, sectionId) {
  const sectionQuestions = QUESTIONS.filter((q) => q.section === sectionId);
  let total = 0;
  let answered = 0;

  sectionQuestions.forEach((q) => {
    if (answers[q.id] !== undefined) {
      total += answers[q.id];
      answered++;
    }
  });

  return { total, answered, max: sectionQuestions.length * 5 };
}

export function calculateTotalScore(answers) {
  let total = 0;
  let answered = 0;

  QUESTIONS.forEach((q) => {
    if (answers[q.id] !== undefined) {
      total += answers[q.id];
      answered++;
    }
  });

  return { total, answered, max: QUESTIONS.length * 5 };
}
