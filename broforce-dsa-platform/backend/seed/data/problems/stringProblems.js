export default [
  {
    topicSlug: "strings",
    slug: "reverse-a-string",
    title: "Reverse a String",
    difficulty: "Easy",
    statement: "Given a string, print it reversed using the two-pointer technique (no built-in reverse function).",
    examples: [{ input: "hello", output: "olleh" }],
    constraints: ["1 <= s.length <= 10^4", "Do not call a built-in reverse function"],
    hints: ["Use two pointers, one at each end, swapping characters and moving inward."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static String reverse(String s) {
        char[] arr = s.toCharArray();
        int left = 0, right = arr.length - 1;
        while (left < right) {
            char temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
        return new String(arr);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(reverse(sc.nextLine()));
    }
}`,
      python: `def reverse(s):
    chars = list(s)
    left, right = 0, len(chars) - 1
    while left < right:
        chars[left], chars[right] = chars[right], chars[left]
        left += 1
        right -= 1
    return "".join(chars)

s = input().strip()
print(reverse(s))
`,
      c: `#include <stdio.h>
#include <string.h>

void reverse(char *s) {
    int left = 0, right = strlen(s) - 1;
    while (left < right) {
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
}

int main() {
    char s[10005];
    fgets(s, sizeof(s), stdin);
    s[strcspn(s, "\\n")] = 0;
    reverse(s);
    printf("%s\\n", s);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

string reverseStr(string s) {
    int left = 0, right = (int)s.size() - 1;
    while (left < right) {
        swap(s[left], s[right]);
        left++;
        right--;
    }
    return s;
}

int main() {
    string s;
    getline(cin, s);
    cout << reverseStr(s) << endl;
    return 0;
}
`,
      javascript: `function reverse(s) {
  const arr = s.split("");
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr.join("");
}

console.log(reverse(readLine().trim()));
`,
    },
    testCases: [
      { input: "hello", expectedOutput: "olleh", hidden: false },
      { input: "a", expectedOutput: "a", hidden: false },
      { input: "algoforge", expectedOutput: "egrofogla", hidden: true },
    ],
  },
  {
    topicSlug: "strings",
    slug: "check-palindrome",
    title: "Check Palindrome",
    difficulty: "Easy",
    statement: "Given a string of lowercase letters, print 'true' if it's a palindrome, 'false' otherwise.",
    examples: [{ input: "racecar", output: "true" }, { input: "hello", output: "false" }],
    constraints: ["1 <= s.length <= 10^4"],
    hints: ["Two pointers from both ends; if any pair mismatches, it's not a palindrome."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(isPalindrome(sc.nextLine()));
    }
}`,
      python: `def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

s = input().strip()
print(str(is_palindrome(s)).lower())
`,
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

bool isPalindrome(char *s) {
    int left = 0, right = strlen(s) - 1;
    while (left < right) {
        if (s[left] != s[right]) return false;
        left++;
        right--;
    }
    return true;
}

int main() {
    char s[10005];
    fgets(s, sizeof(s), stdin);
    s[strcspn(s, "\\n")] = 0;
    printf(isPalindrome(s) ? "true\\n" : "false\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

bool isPalindrome(string &s) {
    int left = 0, right = (int)s.size() - 1;
    while (left < right) {
        if (s[left] != s[right]) return false;
        left++;
        right--;
    }
    return true;
}

int main() {
    string s;
    getline(cin, s);
    cout << (isPalindrome(s) ? "true" : "false") << endl;
    return 0;
}
`,
      javascript: `function isPalindrome(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}

console.log(isPalindrome(readLine().trim()));
`,
    },
    testCases: [
      { input: "racecar", expectedOutput: "true", hidden: false },
      { input: "hello", expectedOutput: "false", hidden: false },
      { input: "a", expectedOutput: "true", hidden: true },
    ],
  },
  {
    topicSlug: "strings",
    slug: "count-vowels",
    title: "Count Vowels",
    difficulty: "Easy",
    statement: "Given a string, print the number of vowels (a, e, i, o, u — case-insensitive) it contains.",
    examples: [{ input: "AlgoForge", output: "4" }],
    constraints: ["1 <= s.length <= 10^4"],
    hints: ["Traverse the string once, checking each lowercased character against a small set of vowels."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int countVowels(String s) {
        String vowels = "aeiou";
        int count = 0;
        for (char c : s.toLowerCase().toCharArray()) {
            if (vowels.indexOf(c) != -1) count++;
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(countVowels(sc.nextLine()));
    }
}`,
      python: `def count_vowels(s):
    vowels = set("aeiou")
    return sum(1 for c in s.lower() if c in vowels)

s = input().strip()
print(count_vowels(s))
`,
      c: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int countVowels(char *s) {
    int count = 0;
    for (int i = 0; s[i]; i++) {
        char c = tolower(s[i]);
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') count++;
    }
    return count;
}

int main() {
    char s[10005];
    fgets(s, sizeof(s), stdin);
    s[strcspn(s, "\\n")] = 0;
    printf("%d\\n", countVowels(s));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int countVowels(string &s) {
    string vowels = "aeiou";
    int count = 0;
    for (char c : s) {
        if (vowels.find(tolower(c)) != string::npos) count++;
    }
    return count;
}

int main() {
    string s;
    getline(cin, s);
    cout << countVowels(s) << endl;
    return 0;
}
`,
      javascript: `function countVowels(s) {
  const vowels = new Set("aeiou");
  let count = 0;
  for (const c of s.toLowerCase()) {
    if (vowels.has(c)) count++;
  }
  return count;
}

console.log(countVowels(readLine().trim()));
`,
    },
    testCases: [
      { input: "AlgoForge", expectedOutput: "4", hidden: false },
      { input: "xyz", expectedOutput: "0", hidden: false },
      { input: "AEIOUaeiou", expectedOutput: "10", hidden: true },
    ],
  },
  {
    topicSlug: "strings",
    slug: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Medium",
    statement:
      "Given two strings of lowercase letters, print 'true' if the second is an anagram of the " +
      "first (same characters, same frequencies, any order), 'false' otherwise.\n\n" +
      "Input format: two lines, one string each.",
    examples: [{ input: "listen\nsilent", output: "true" }, { input: "hello\nworld", output: "false" }],
    constraints: ["1 <= s.length <= 10^4"],
    hints: ["Build a frequency count of each string (hash map or 26-slot array) and compare them."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static boolean isAnagram(String a, String b) {
        if (a.length() != b.length()) return false;
        int[] freq = new int[26];
        for (char c : a.toCharArray()) freq[c - 'a']++;
        for (char c : b.toCharArray()) freq[c - 'a']--;
        for (int f : freq) if (f != 0) return false;
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String a = sc.nextLine();
        String b = sc.nextLine();
        System.out.println(isAnagram(a, b));
    }
}`,
      python: `def is_anagram(a, b):
    if len(a) != len(b):
        return False
    freq = {}
    for c in a:
        freq[c] = freq.get(c, 0) + 1
    for c in b:
        freq[c] = freq.get(c, 0) - 1
    return all(v == 0 for v in freq.values())

a = input().strip()
b = input().strip()
print(str(is_anagram(a, b)).lower())
`,
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

bool isAnagram(char *a, char *b) {
    if (strlen(a) != strlen(b)) return false;
    int freq[26] = {0};
    for (int i = 0; a[i]; i++) freq[a[i] - 'a']++;
    for (int i = 0; b[i]; i++) freq[b[i] - 'a']--;
    for (int i = 0; i < 26; i++) if (freq[i] != 0) return false;
    return true;
}

int main() {
    char a[10005], b[10005];
    fgets(a, sizeof(a), stdin); a[strcspn(a, "\\n")] = 0;
    fgets(b, sizeof(b), stdin); b[strcspn(b, "\\n")] = 0;
    printf(isAnagram(a, b) ? "true\\n" : "false\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

bool isAnagram(string &a, string &b) {
    if (a.size() != b.size()) return false;
    int freq[26] = {0};
    for (char c : a) freq[c - 'a']++;
    for (char c : b) freq[c - 'a']--;
    for (int f : freq) if (f != 0) return false;
    return true;
}

int main() {
    string a, b;
    getline(cin, a);
    getline(cin, b);
    cout << (isAnagram(a, b) ? "true" : "false") << endl;
    return 0;
}
`,
      javascript: `function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  const freq = {};
  for (const c of a) freq[c] = (freq[c] || 0) + 1;
  for (const c of b) freq[c] = (freq[c] || 0) - 1;
  return Object.values(freq).every((v) => v === 0);
}

const a = readLine().trim();
const b = readLine().trim();
console.log(isAnagram(a, b));
`,
    },
    testCases: [
      { input: "listen\nsilent", expectedOutput: "true", hidden: false },
      { input: "hello\nworld", expectedOutput: "false", hidden: false },
      { input: "aabbcc\nabcabc", expectedOutput: "true", hidden: true },
    ],
  },
  {
    topicSlug: "strings",
    slug: "first-non-repeating-character",
    title: "First Non-Repeating Character",
    difficulty: "Hard",
    statement:
      "Given a string of lowercase letters, print the index of the first character that never " +
      "repeats anywhere else in the string, or -1 if every character repeats.",
    examples: [{ input: "leetcode", output: "0" }],
    constraints: ["1 <= s.length <= 10^5"],
    hints: [
      "First pass: build a frequency count of every character.",
      "Second pass: return the index of the first character whose count is exactly 1.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int firstNonRepeating(String s) {
        int[] freq = new int[26];
        for (char c : s.toCharArray()) freq[c - 'a']++;
        for (int i = 0; i < s.length(); i++) {
            if (freq[s.charAt(i) - 'a'] == 1) return i;
        }
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(firstNonRepeating(sc.nextLine()));
    }
}`,
      python: `def first_non_repeating(s):
    freq = {}
    for c in s:
        freq[c] = freq.get(c, 0) + 1
    for i, c in enumerate(s):
        if freq[c] == 1:
            return i
    return -1

s = input().strip()
print(first_non_repeating(s))
`,
      c: `#include <stdio.h>
#include <string.h>

int firstNonRepeating(char *s) {
    int freq[26] = {0};
    for (int i = 0; s[i]; i++) freq[s[i] - 'a']++;
    for (int i = 0; s[i]; i++) {
        if (freq[s[i] - 'a'] == 1) return i;
    }
    return -1;
}

int main() {
    char s[100005];
    scanf("%s", s);
    printf("%d\\n", firstNonRepeating(s));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int firstNonRepeating(string &s) {
    int freq[26] = {0};
    for (char c : s) freq[c - 'a']++;
    for (int i = 0; i < (int)s.size(); i++) {
        if (freq[s[i] - 'a'] == 1) return i;
    }
    return -1;
}

int main() {
    string s;
    cin >> s;
    cout << firstNonRepeating(s) << endl;
    return 0;
}
`,
      javascript: `function firstNonRepeating(s) {
  const freq = new Map();
  for (const c of s) freq.set(c, (freq.get(c) || 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (freq.get(s[i]) === 1) return i;
  }
  return -1;
}

console.log(firstNonRepeating(readLine().trim()));
`,
    },
    testCases: [
      { input: "leetcode", expectedOutput: "0", hidden: false },
      { input: "aabb", expectedOutput: "-1", hidden: false },
      { input: "abcabcd", expectedOutput: "6", hidden: true },
    ],
  },
];
