// Badge criteria are evaluated in services/gamification.js (BADGE_EVALUATORS).
// This file is pure data so admins can edit names/icons/descriptions without
// touching server logic.
export default [
  {
    code: "FIRST_PROBLEM",
    name: "First Problem",
    icon: "🔥",
    description: "Solve your very first practice problem.",
    criteria: "Accepted at least 1 submission",
  },
  {
    code: "RECURSION_MASTER",
    name: "Recursion Master",
    icon: "🧠",
    description: "Complete the Recursion topic fully.",
    criteria: "100% progress on 'recursion' topic",
  },
  {
    code: "TREE_EXPLORER",
    name: "Tree Explorer",
    icon: "🌳",
    description: "Complete the Trees topic fully.",
    criteria: "100% progress on 'trees' topic",
  },
  {
    code: "BITWISE_BEGINNER",
    name: "Bitwise Beginner",
    icon: "⚡",
    description: "Complete the Bitwise Algorithms topic fully.",
    criteria: "100% progress on 'bitwise-algorithms' topic",
  },
  {
    code: "GRAPH_MASTER",
    name: "Graph Master",
    icon: "🕸",
    description: "Complete the Graph topic fully.",
    criteria: "100% progress on 'graph' topic",
  },
  {
    code: "DSA_WARRIOR",
    name: "DSA Warrior",
    icon: "🏆",
    description: "Complete 10 topics across the roadmap.",
    criteria: "10 or more topics marked completed",
  },
];
