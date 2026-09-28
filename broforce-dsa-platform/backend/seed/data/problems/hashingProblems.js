export default [
  {
    topicSlug: "hashing",
    slug: "frequency-counter",
    title: "Frequency Counter",
    difficulty: "Easy",
    statement:
      "Given n integers, print the frequency of each distinct value, one per line, in the order the " +
      "value FIRST appears in the input. Format each line as 'value count'.\n\n" +
      "Input format: first line is n, second line has n space-separated integers.",
    examples: [{ input: "6\n1 2 2 3 1 1", output: "1 3\n2 2\n3 1" }],
    constraints: ["1 <= n <= 10^5"],
    hints: ["Use a hash map from value to count, and a separate list to remember first-appearance order."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());

        // TODO: count frequencies with a HashMap, print "value count" per line
        // in first-appearance order.
    }
}`,
      python: `n = int(input().strip())
arr = list(map(int, input().split()))

# TODO: count frequencies with a dict, print "value count" per line
# in first-appearance order.
`,
      c: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    // TODO: count frequencies (a simple array indexed by value works if values
    // are small/non-negative; otherwise use a basic hash approach), print
    // "value count" per line in first-appearance order.
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];

    // TODO: count frequencies with an unordered_map, print "value count" per
    // line in first-appearance order.
    return 0;
}
`,
      javascript: `const n = Number(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);

// TODO: count frequencies with a Map, print "value count" per line
// in first-appearance order.
`,
    },
    testCases: [
      { input: "6\n1 2 2 3 1 1", expectedOutput: "1 3\n2 2\n3 1", hidden: false },
      { input: "1\n7", expectedOutput: "7 1", hidden: false },
      { input: "4\n5 5 5 5", expectedOutput: "5 4", hidden: true },
    ],
  },
  {
    topicSlug: "hashing",
    slug: "find-duplicate",
    title: "Find the Duplicate Element",
    difficulty: "Easy",
    statement:
      "Given n integers, print the first value that appears more than once (the duplicate that is " +
      "encountered soonest as you scan left to right), or -1 if there are no duplicates.\n\n" +
      "Input format: first line is n, second line has n space-separated integers.",
    examples: [{ input: "6\n4 2 7 2 4 9", output: "2" }],
    constraints: ["1 <= n <= 10^5"],
    hints: ["Use a hash set. As you scan, if a value is already in the set, that's your answer immediately."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int findDuplicate(int[] arr) {
        // TODO: return the first repeated value using a HashSet, or -1 if none
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());
        System.out.println(findDuplicate(arr));
    }
}`,
      python: `def find_duplicate(arr):
    # TODO: return the first repeated value using a set, or -1 if none
    return -1

n = int(input().strip())
arr = list(map(int, input().split()))
print(find_duplicate(arr))
`,
      c: `#include <stdio.h>

int findDuplicate(int *arr, int n) {
    // TODO: return the first repeated value, or -1 if none
    return -1;
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\\n", findDuplicate(arr, n));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int findDuplicate(vector<int> &arr) {
    // TODO: return the first repeated value using an unordered_set, or -1 if none
    return -1;
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << findDuplicate(arr) << endl;
    return 0;
}
`,
      javascript: `function findDuplicate(arr) {
  // TODO: return the first repeated value using a Set, or -1 if none
  return -1;
}

const n = Number(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);
console.log(findDuplicate(arr));
`,
    },
    testCases: [
      { input: "6\n4 2 7 2 4 9", expectedOutput: "2", hidden: false },
      { input: "3\n1 2 3", expectedOutput: "-1", hidden: false },
      { input: "5\n1 1 2 2 3", expectedOutput: "1", hidden: true },
    ],
  },
  {
    topicSlug: "hashing",
    slug: "two-sum-hashing",
    title: "Two Sum (Hash Map Approach)",
    difficulty: "Medium",
    statement:
      "Given n integers and a target, find the indices of two numbers that add up to the target, " +
      "using a hash map for O(n) time (not the O(n²) brute force). Print the two indices ascending, " +
      "space-separated. Assume exactly one valid answer exists.\n\n" +
      "Input format: first line is n, second line has n space-separated integers, third line is the target.",
    examples: [{ input: "4\n2 7 11 15\n9", output: "0 1" }],
    constraints: ["2 <= n <= 10^5", "Expected time complexity: O(n)"],
    hints: ["For each element, check whether (target - element) has already been seen using a hash map from value to index."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int[] twoSum(int[] arr, int target) {
        // TODO: O(n) hash map approach — return the two indices ascending
        return new int[]{-1, -1};
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st.nextToken());
        int target = Integer.parseInt(sc.nextLine().trim());
        int[] result = twoSum(arr, target);
        System.out.println(result[0] + " " + result[1]);
    }
}`,
      python: `def two_sum(arr, target):
    # TODO: O(n) hash map approach — return (i, j) ascending
    return (-1, -1)

n = int(input().strip())
arr = list(map(int, input().split()))
target = int(input().strip())
i, j = two_sum(arr, target)
print(i, j)
`,
      c: `#include <stdio.h>

void twoSum(int *arr, int n, int target, int *outI, int *outJ) {
    // TODO: O(n) hash-based approach (a simple open-addressing table works too)
    *outI = -1;
    *outJ = -1;
}

int main() {
    int n;
    scanf("%d", &n);
    int arr[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    int i, j;
    twoSum(arr, n, target, &i, &j);
    printf("%d %d\\n", i, j);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

pair<int,int> twoSum(vector<int> &arr, int target) {
    // TODO: O(n) unordered_map approach — return {i, j} ascending
    return {-1, -1};
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int target;
    cin >> target;
    auto [i, j] = twoSum(arr, target);
    cout << i << " " << j << endl;
    return 0;
}
`,
      javascript: `function twoSum(arr, target) {
  // TODO: O(n) Map-based approach — return [i, j] ascending
  return [-1, -1];
}

const n = Number(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);
const target = Number(readLine().trim());
const [i, j] = twoSum(arr, target);
console.log(i + " " + j);
`,
    },
    testCases: [
      { input: "4\n2 7 11 15\n9", expectedOutput: "0 1", hidden: false },
      { input: "3\n3 2 4\n6", expectedOutput: "1 2", hidden: false },
      { input: "5\n1 5 3 8 2\n10", expectedOutput: "3 4", hidden: true },
    ],
  },
  {
    topicSlug: "hashing",
    slug: "first-unique-character",
    title: "First Unique Character",
    difficulty: "Medium",
    statement:
      "Given a string of lowercase letters, print the index of the first character that does not " +
      "repeat anywhere else in the string. Print -1 if every character repeats.\n\n" +
      "Input format: a single line containing the string.",
    examples: [{ input: "leetcode", output: "0", explanation: "'l' never repeats and is the first such character." }],
    constraints: ["1 <= s.length <= 10^5", "s contains only lowercase English letters"],
    hints: [
      "First pass: build a frequency count of every character using a hash map (or a 26-slot array).",
      "Second pass: return the index of the first character whose count is exactly 1.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int firstUniqueChar(String s) {
        // TODO: return the index of the first non-repeating character, or -1
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(firstUniqueChar(s));
    }
}`,
      python: `def first_unique_char(s):
    # TODO: return the index of the first non-repeating character, or -1
    return -1

s = input().strip()
print(first_unique_char(s))
`,
      c: `#include <stdio.h>
#include <string.h>

int firstUniqueChar(char *s) {
    // TODO: return the index of the first non-repeating character, or -1
    // (a 26-slot frequency array works well here)
    return -1;
}

int main() {
    char s[100005];
    scanf("%s", s);
    printf("%d\\n", firstUniqueChar(s));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int firstUniqueChar(string &s) {
    // TODO: return the index of the first non-repeating character, or -1
    return -1;
}

int main() {
    string s;
    cin >> s;
    cout << firstUniqueChar(s) << endl;
    return 0;
}
`,
      javascript: `function firstUniqueChar(s) {
  // TODO: return the index of the first non-repeating character, or -1
  return -1;
}

const s = readLine().trim();
console.log(firstUniqueChar(s));
`,
    },
    testCases: [
      { input: "leetcode", expectedOutput: "0", hidden: false },
      { input: "aabb", expectedOutput: "-1", hidden: false },
      { input: "abcabcd", expectedOutput: "6", hidden: true },
    ],
  },
  {
    topicSlug: "hashing",
    slug: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Hard",
    statement:
      "Given n lowercase words, group the ones that are anagrams of each other. Print each group on " +
      "its own line, words space-separated, in the order each group's first word originally " +
      "appeared. Within a group, preserve the original relative order of the words.\n\n" +
      "Input format: first line is n, second line has n space-separated words.",
    examples: [
      {
        input: "6\neat tea tan ate nat bat",
        output: "eat tea ate\ntan nat\nbat",
        explanation: "eat/tea/ate share letters {a,e,t}; tan/nat share {a,n,t}; bat is alone.",
      },
    ],
    constraints: ["1 <= n <= 10^4", "1 <= word.length <= 20"],
    hints: [
      "The sorted letters of a word (its 'signature') are identical for every anagram of that word.",
      "Use a hash map from signature to the list of original words sharing it.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static List<List<String>> groupAnagrams(String[] words) {
        // TODO: group words by their sorted-letters signature using a HashMap,
        // preserving first-appearance order of groups and words within a group.
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        String[] words = sc.nextLine().split(" ");

        List<List<String>> groups = groupAnagrams(words);
        StringBuilder out = new StringBuilder();
        for (List<String> g : groups) out.append(String.join(" ", g)).append("\\n");
        System.out.print(out.toString().trim());
    }
}`,
      python: `def group_anagrams(words):
    # TODO: group words by their sorted-letters signature using a dict,
    # preserving first-appearance order of groups and words within a group.
    return []

n = int(input().strip())
words = input().split()
groups = group_anagrams(words)
print("\\n".join(" ".join(g) for g in groups))
`,
      c: `#include <stdio.h>
#include <string.h>

int main() {
    int n;
    scanf("%d", &n);
    char words[10000][21];
    for (int i = 0; i < n; i++) scanf("%s", words[i]);

    // TODO: group words by sorted-letters signature and print each group on
    // its own line, space-separated, preserving first-appearance order.
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

vector<vector<string>> groupAnagrams(vector<string> &words) {
    // TODO: group words by their sorted-letters signature using an
    // unordered_map, preserving first-appearance order.
    return {};
}

int main() {
    int n;
    cin >> n;
    vector<string> words(n);
    for (int i = 0; i < n; i++) cin >> words[i];

    auto groups = groupAnagrams(words);
    for (auto &g : groups) {
        for (int i = 0; i < (int)g.size(); i++) cout << g[i] << (i + 1 < (int)g.size() ? " " : "\\n");
    }
    return 0;
}
`,
      javascript: `function groupAnagrams(words) {
  // TODO: group words by their sorted-letters signature using a Map,
  // preserving first-appearance order.
  return [];
}

const n = Number(readLine().trim());
const words = readLine().trim().split(/\\s+/);
const groups = groupAnagrams(words);
console.log(groups.map(g => g.join(" ")).join("\\n"));
`,
    },
    testCases: [
      { input: "6\neat tea tan ate nat bat", expectedOutput: "eat tea ate\ntan nat\nbat", hidden: false },
      { input: "1\nabc", expectedOutput: "abc", hidden: false },
      { input: "3\nabc bca cab", expectedOutput: "abc bca cab", hidden: true },
    ],
  },
];
