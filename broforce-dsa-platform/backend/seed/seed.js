import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";

import User from "../models/User.js";
import Topic from "../models/Topic.js";
import Problem from "../models/Problem.js";
import Badge from "../models/Badge.js";
import Progress from "../models/Progress.js";
import Submission from "../models/Submission.js";
import UserBadge from "../models/UserBadge.js";
import Activity from "../models/Activity.js";

import stackTopic from "./data/topics/stack.js";
import sortingTopic from "./data/topics/sorting.js";
import treesTopic from "./data/topics/trees.js";
import arraysTopic from "./data/topics/arrays.js";
import linkedListsTopic from "./data/topics/linkedLists.js";
import queueTopic from "./data/topics/queue.js";
import searchingTopic from "./data/topics/searching.js";
import hashingTopic from "./data/topics/hashing.js";
import recursionTopic from "./data/topics/recursion.js";
import backtrackingTopic from "./data/topics/backtracking.js";
import stringsTopic from "./data/topics/strings.js";
import binarySearchTreeTopic from "./data/topics/binarySearchTree.js";
import heapTopic from "./data/topics/heapPriorityQueue.js";
import graphsTopic from "./data/topics/graphs.js";
import greedyTopic from "./data/topics/greedy.js";
import dynamicProgrammingTopic from "./data/topics/dynamicProgramming.js";

import stackProblems from "./data/problems/stackProblems.js";
import sortingProblems from "./data/problems/sortingProblems.js";
import treesProblems from "./data/problems/treesProblems.js";
import arrayProblems from "./data/problems/arrayProblems.js";
import linkedListProblems from "./data/problems/linkedListProblems.js";
import queueProblems from "./data/problems/queueProblems.js";
import searchingProblems from "./data/problems/searchingProblems.js";
import hashingProblems from "./data/problems/hashingProblems.js";
import recursionProblems from "./data/problems/recursionProblems.js";
import backtrackingProblems from "./data/problems/backtrackingProblems.js";
import stringProblems from "./data/problems/stringProblems.js";
import bstProblems from "./data/problems/bstProblems.js";
import heapProblems from "./data/problems/heapProblems.js";
import graphProblems from "./data/problems/graphProblems.js";
import greedyProblems from "./data/problems/greedyProblems.js";
import dpProblems from "./data/problems/dpProblems.js";

import badges from "./data/badges.js";

const topics = [
  arraysTopic,
  linkedListsTopic,
  stackTopic,
  queueTopic,
  searchingTopic,
  hashingTopic,
  treesTopic,
  sortingTopic,
  recursionTopic,
  backtrackingTopic,
  stringsTopic,
  binarySearchTreeTopic,
  heapTopic,
  graphsTopic,
  greedyTopic,
  dynamicProgrammingTopic,
];
const problems = [
  ...arrayProblems,
  ...linkedListProblems,
  ...stackProblems,
  ...queueProblems,
  ...searchingProblems,
  ...hashingProblems,
  ...treesProblems,
  ...sortingProblems,
  ...recursionProblems,
  ...backtrackingProblems,
  ...stringProblems,
  ...bstProblems,
  ...heapProblems,
  ...graphProblems,
  ...greedyProblems,
  ...dpProblems,
];

async function seed() {
  await connectDB();
  console.log("[seed] Connected. Clearing existing content collections...");

  await Promise.all([
    Topic.deleteMany({}),
    Problem.deleteMany({}),
    Badge.deleteMany({}),
    Progress.deleteMany({}),
    Submission.deleteMany({}),
    UserBadge.deleteMany({}),
    Activity.deleteMany({}),
    User.deleteMany({ isDemo: true }), // only wipe demo accounts, keep any real accounts
  ]);

  console.log(`[seed] Inserting ${topics.length} topics...`);
  await Topic.insertMany(topics);

  console.log(`[seed] Inserting ${problems.length} problems...`);
  await Problem.insertMany(problems);

  console.log(`[seed] Inserting ${badges.length} badges...`);
  await Badge.insertMany(badges);

  console.log("[seed] Creating demo accounts...");
  const student = await User.create({
    name: "Demo Student",
    email: "student@broforce.local",
    password: "student123",
    role: "student",
    college: "BroForce Demo College",
    department: "Computer Science",
    batch: "2026",
    isDemo: true,
  });

  const admin = await User.create({
    name: "Demo Admin",
    email: "admin@broforce.local",
    password: "admin123",
    role: "admin",
    college: "BroForce Demo College",
    isDemo: true,
  });

  const staff = await User.create({
    name: "Demo Staff",
    email: "staff@broforce.local",
    password: "staff123",
    role: "staff",
    college: "BroForce Demo College",
    department: "Computer Science",
    isDemo: true,
  });

  // Give the demo student a little starting progress + activity so the
  // dashboard looks alive on first login instead of an empty state.
  const stackProgress = await Progress.create({
    userId: student._id,
    topicSlug: "stack",
    theoryCompleted: true,
    visualizationCompleted: true,
    problemsSolved: ["valid-parentheses"],
  });
  const stackProblemCount = await Problem.countDocuments({ topicSlug: "stack" });
  stackProgress.recalculate(stackProblemCount);
  await stackProgress.save();

  student.xp = 45;
  student.recalculateLevel();
  student.streak = 3;
  student.lastActiveDate = new Date();
  await student.save();

  await Activity.create([
    {
      userId: student._id,
      type: "problem_solved",
      message: "Solved: Valid Parentheses",
      xpEarned: 20,
    },
    {
      userId: student._id,
      type: "topic_completed",
      message: "Completed theory & visualization: Stack",
      xpEarned: 25,
    },
  ]);

  await UserBadge.create({ userId: student._id, badgeCode: "FIRST_PROBLEM" });

  console.log("\n[seed] Done! Summary:");
  console.log(`  Topics:   ${topics.length} (${topics.map((t) => t.title).join(", ")})`);
  console.log(`  Problems: ${problems.length}`);
  console.log(`  Badges:   ${badges.length}`);
  console.log("\n  Demo Student -> student@broforce.local / student123");
  console.log("  Demo Admin   -> admin@broforce.local / admin123");
  console.log("  Demo Staff   -> staff@broforce.local / staff123\n");

  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error("[seed] Failed:", err);
  process.exit(1);
});
