export default {
  slug: "hashing",
  title: "Hashing",
  module: "MODULE 10 — HASHING",
  order: 9,
  visualizerType: "HashVisualizer",
  prerequisites: [],

  whatIsIt:
    "Hashing maps a KEY to an array index using a HASH FUNCTION, so a HASH TABLE can store and " +
    "retrieve values in close to O(1) time — without scanning the whole collection like a linear " +
    "search would. Java's HashMap, Python's dict, and JavaScript's Map/Object are all hash tables " +
    "under the hood. A simple hash function for integer keys is 'key % tableSize'; for string keys, " +
    "it's typically a weighted sum of character codes, also reduced modulo the table size.",

  whyNeeded:
    "Many problems boil down to 'have I seen this value before?' or 'what's associated with this " +
    "key?'. Without hashing, answering that means scanning every element — O(n) per lookup. A hash " +
    "table answers it in expected O(1): compute the hash, jump straight to that bucket. This is why " +
    "hashing is the backbone of duplicate detection, frequency counting, caching, and the classic " +
    "'Two Sum' pattern (trading O(n²) brute force for an O(n) hash-map solution).",

  howItWorks:
    "INSERT computes hash(key) to find a bucket index, then places the key-value pair there. SEARCH " +
    "computes the same hash and checks that bucket. Because different keys can map to the SAME " +
    "index — a COLLISION — every hash table needs a collision strategy. CHAINING stores a small " +
    "list at each bucket, appending new colliding entries to it; lookup then scans that (usually " +
    "short) list. OPEN ADDRESSING instead finds a different empty slot in the main array itself " +
    "when a collision happens (e.g. linear probing: try the next slot, then the next, until an " +
    "empty one is found). The LOAD FACTOR (number of entries / table size) matters a lot: as it " +
    "climbs, collisions become more frequent and performance degrades toward O(n) — which is why " +
    "hash tables automatically 'resize' (grow the array and re-hash everything) once the load " +
    "factor crosses a threshold, typically around 0.75.",

  example:
    "Table size 7, hash(key) = key % 7.\n" +
    "INSERT 10 -> hash(10) = 3 -> bucket 3: [10]\n" +
    "INSERT 21 -> hash(21) = 0 -> bucket 0: [21]\n" +
    "INSERT 17 -> hash(17) = 3 -> COLLISION with 10! Chained -> bucket 3: [10, 17]\n" +
    "SEARCH 17 -> hash(17) = 3 -> scan bucket 3's chain -> found.\n" +
    "SEARCH 5 -> hash(5) = 5 -> bucket 5 is empty -> not found, without touching any other bucket.",

  codeExamples: [
    {
      language: "java",
      explanation: "A minimal hash table with chaining, built from scratch to show what HashMap does internally.",
      code: `import java.util.*;

public class SimpleHashTable {
    private LinkedList<int[]>[] buckets; // each entry: {key, value}
    private int capacity;

    @SuppressWarnings("unchecked")
    public SimpleHashTable(int capacity) {
        this.capacity = capacity;
        buckets = new LinkedList[capacity];
        for (int i = 0; i < capacity; i++) buckets[i] = new LinkedList<>();
    }

    private int hash(int key) {
        return Math.floorMod(key, capacity); // handles negative keys correctly
    }

    public void insert(int key, int value) {
        LinkedList<int[]> bucket = buckets[hash(key)];
        for (int[] entry : bucket) {
            if (entry[0] == key) { entry[1] = value; return; } // update existing
        }
        bucket.add(new int[]{key, value}); // new entry, possibly a collision
    }

    public Integer search(int key) {
        for (int[] entry : buckets[hash(key)]) {
            if (entry[0] == key) return entry[1];
        }
        return null; // not found
    }
}`,
    },
    {
      language: "java",
      explanation: "The classic Two Sum pattern — trading an O(n^2) brute force for O(n) using a hash map.",
      code: `import java.util.*;

public class TwoSumHashing {
    static int[] twoSum(int[] arr, int target) {
        Map<Integer, Integer> seen = new HashMap<>(); // value -> index
        for (int i = 0; i < arr.length; i++) {
            int complement = target - arr[i];
            if (seen.containsKey(complement)) {
                return new int[]{seen.get(complement), i};
            }
            seen.put(arr[i], i);
        }
        return new int[]{-1, -1};
    }
}`,
    },
  ],

  complexity: {
    time: "Insert/Search/Delete: expected O(1), worst case O(n) if many keys collide into one bucket",
    space: "O(n) to store n key-value pairs, plus the table's allocated capacity",
    best: "O(1) — no collision",
    average: "O(1) — assuming a reasonable hash function and load factor",
    worst: "O(n) — every key hashes to the same bucket (pathological hash function or adversarial input)",
  },

  quiz: [
    {
      question: "What does a hash function do?",
      options: [
        "Sorts the keys",
        "Maps a key to an array index",
        "Encrypts the data",
        "Removes duplicate keys automatically",
      ],
      correctIndex: 1,
      explanation: "A hash function converts a key into an index into the underlying array, so lookups can jump straight there.",
    },
    {
      question: "What is a 'collision' in a hash table?",
      options: [
        "When two hash tables are merged",
        "When two different keys hash to the same bucket index",
        "When the table runs out of memory",
        "When a key is inserted twice with the same value",
      ],
      correctIndex: 1,
      explanation: "Collisions happen because the space of possible keys is usually far larger than the number of buckets.",
    },
    {
      question: "How does chaining resolve a collision?",
      options: [
        "It stores a small list of entries at each bucket",
        "It deletes the older entry",
        "It doubles the table size immediately",
        "It throws an error",
      ],
      correctIndex: 0,
      explanation: "Chaining keeps a list (or similar structure) per bucket, so multiple keys can share a bucket safely.",
    },
    {
      question: "What is the 'load factor' of a hash table?",
      options: [
        "The number of collisions so far",
        "The ratio of stored entries to the table's capacity",
        "The time it takes to hash one key",
        "The number of buckets that are empty",
      ],
      correctIndex: 1,
      explanation: "Load factor = entries / capacity. As it rises, collisions become more likely and performance degrades.",
    },
    {
      question: "Why does the Two Sum problem run in O(n) with a hash map instead of O(n²)?",
      options: [
        "Because the array gets sorted first",
        "Because checking 'have I seen (target - current value) before?' is O(1) per element with a hash map",
        "Because hash maps only work on sorted data",
        "It doesn't — both approaches are O(n²)",
      ],
      correctIndex: 1,
      explanation: "A hash map turns the 'has this complement appeared already?' check into an O(1) lookup instead of an inner loop.",
    },
  ],
};
