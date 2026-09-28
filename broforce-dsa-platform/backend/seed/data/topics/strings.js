export default {
  slug: "strings",
  title: "Strings",
  module: "MODULE 3 — STRINGS",
  order: 3,
  visualizerType: "StringVisualizer",
  prerequisites: [],

  whatIsIt:
    "A String is a sequence of characters — in most languages, effectively an array of characters " +
    "with extra conveniences built on top (concatenation, comparison, searching). Because a string " +
    "IS a character array underneath, every array pattern you already know — indexing, traversal, " +
    "two pointers — applies directly, plus string-specific patterns like palindrome checking, " +
    "anagram detection, and substring search.",

  whyNeeded:
    "Text processing is everywhere: validating user input, parsing files, searching documents, " +
    "comparing usernames, checking passwords. A huge fraction of interview problems are string " +
    "problems specifically because they test whether you can combine array techniques (two pointers, " +
    "sliding window, hashing) with careful edge-case handling (empty strings, case sensitivity, " +
    "Unicode) — the algorithmic ideas are simple, but correctness requires precision.",

  howItWorks:
    "TRAVERSAL visits each character once, O(n). CHARACTER ACCESS by index is O(1), same as an " +
    "array. COMPARISON checks two strings character by character — Java's/Python's/JS's built-in " +
    "equality already does this, but interview problems often want you to implement custom " +
    "comparison logic (case-insensitive, ignoring whitespace, etc). REVERSE uses the same two-pointer " +
    "swap technique as reversing an array: one pointer at each end, swap and move inward. PALINDROME " +
    "CHECKING is a direct application of that same two-pointer idea — compare s[left] to s[right] " +
    "and move both pointers inward; if they ever mismatch, it's not a palindrome. CHARACTER FREQUENCY " +
    "counting (how many times does each character appear?) uses a hash map or a fixed-size array " +
    "(26 slots for lowercase English letters) — this single pattern solves anagram detection, first " +
    "unique character, and many more problems.",

  example:
    "Checking if 'racecar' is a palindrome with two pointers:\n" +
    "left=0 ('r'), right=6 ('r') — match, move inward.\n" +
    "left=1 ('a'), right=5 ('a') — match, move inward.\n" +
    "left=2 ('c'), right=4 ('c') — match, move inward.\n" +
    "left=3, right=3 — pointers meet (middle character 'e'), done.\n" +
    "All pairs matched -> 'racecar' is a palindrome.",

  codeExamples: [
    {
      language: "java",
      explanation: "Palindrome check using the two-pointer technique — O(n) time, O(1) extra space.",
      code: `public class PalindromeCheck {
    static boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}`,
    },
    {
      language: "java",
      explanation: "Character frequency counting — the pattern behind anagram checks, first-unique-character, and more.",
      code: `import java.util.*;

public class CharFrequency {
    static Map<Character, Integer> countFrequency(String s) {
        Map<Character, Integer> freq = new HashMap<>();
        for (char c : s.toCharArray()) {
            freq.put(c, freq.getOrDefault(c, 0) + 1);
        }
        return freq;
    }

    static boolean areAnagrams(String a, String b) {
        if (a.length() != b.length()) return false;
        return countFrequency(a).equals(countFrequency(b));
    }
}`,
    },
  ],

  complexity: {
    time: "Traversal/comparison/reverse: O(n). Substring search (naive): O(n*m). Character frequency: O(n)",
    space: "O(1) for in-place reversal/palindrome check. O(k) for frequency counting, where k is the alphabet size",
    best: "O(1) — comparing the first characters immediately reveals a mismatch",
    average: "O(n) — most traversal-based string operations",
    worst: "O(n*m) — naive substring search where the pattern almost-matches at every position",
  },

  quiz: [
    {
      question: "Why do array techniques like two-pointer and sliding window also apply to strings?",
      options: [
        "They don't — strings need entirely different algorithms",
        "Because a string is fundamentally a sequence/array of characters",
        "Because strings are always sorted",
        "Because strings have a fixed length",
      ],
      correctIndex: 1,
      explanation: "A string is a character array underneath, so index-based array techniques transfer directly.",
    },
    {
      question: "What technique does an efficient palindrome check use?",
      options: ["Sorting", "Two pointers moving inward from both ends", "Binary search", "Recursion only, never iteration"],
      correctIndex: 1,
      explanation: "Comparing s[left] to s[right] and moving both pointers inward checks a palindrome in one O(n) pass.",
    },
    {
      question: "What data structure is most commonly used for character frequency counting?",
      options: ["A stack", "A hash map (or a fixed-size array for a known alphabet)", "A linked list", "A binary tree"],
      correctIndex: 1,
      explanation: "A hash map (or 26-slot array for lowercase letters) gives O(1) increment/lookup per character.",
    },
    {
      question: "Two strings are anagrams of each other if:",
      options: [
        "They are the same length",
        "They contain exactly the same characters with the same frequencies, in any order",
        "They start with the same letter",
        "They are palindromes",
      ],
      correctIndex: 1,
      explanation: "Anagrams are rearrangements of the same multiset of characters — same frequency count for every character.",
    },
    {
      question: "What is the time complexity of the naive substring search algorithm?",
      options: ["O(n)", "O(log n)", "O(n * m) where n and m are the text and pattern lengths", "O(1)"],
      correctIndex: 2,
      explanation: "Naively trying every starting position and comparing up to m characters each time gives O(n*m) in the worst case.",
    },
  ],
};
