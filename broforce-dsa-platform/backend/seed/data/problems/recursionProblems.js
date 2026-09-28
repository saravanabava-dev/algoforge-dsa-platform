export default [
  {
    topicSlug: "recursion",
    slug: "sum-of-digits-recursive",
    title: "Sum of Digits (Recursive)",
    difficulty: "Easy",
    statement:
      "Given a non-negative integer n, compute the sum of its digits using recursion (no loops).\n\n" +
      "Input format: a single integer n.",
    examples: [{ input: "12345", output: "15" }],
    constraints: ["0 <= n <= 10^9", "Must use recursion, not a loop"],
    hints: ["Base case: a single-digit number's digit sum is itself.", "Recursive case: (n % 10) + sumOfDigits(n / 10)."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int sumOfDigits(int n) {
        if (n < 10) return n; // base case
        return n % 10 + sumOfDigits(n / 10); // recursive case
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        System.out.println(sumOfDigits(n));
    }
}`,
      python: `def sum_of_digits(n):
    if n < 10:
        return n  # base case
    return n % 10 + sum_of_digits(n // 10)  # recursive case

n = int(input().strip())
print(sum_of_digits(n))
`,
      c: `#include <stdio.h>

int sumOfDigits(int n) {
    if (n < 10) return n; // base case
    return n % 10 + sumOfDigits(n / 10); // recursive case
}

int main() {
    int n;
    scanf("%d", &n);
    printf("%d\\n", sumOfDigits(n));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int sumOfDigits(int n) {
    if (n < 10) return n; // base case
    return n % 10 + sumOfDigits(n / 10); // recursive case
}

int main() {
    int n;
    cin >> n;
    cout << sumOfDigits(n) << endl;
    return 0;
}
`,
      javascript: `function sumOfDigits(n) {
  if (n < 10) return n; // base case
  return (n % 10) + sumOfDigits(Math.floor(n / 10)); // recursive case
}

const n = Number(readLine().trim());
console.log(sumOfDigits(n));
`,
    },
    testCases: [
      { input: "12345", expectedOutput: "15", hidden: false },
      { input: "7", expectedOutput: "7", hidden: false },
      { input: "0", expectedOutput: "0", hidden: true },
    ],
  },
  {
    topicSlug: "recursion",
    slug: "power-function-recursive",
    title: "Power Function (Fast Exponentiation)",
    difficulty: "Medium",
    statement:
      "Compute base^exponent using recursive fast exponentiation, in O(log exponent) time rather " +
      "than O(exponent) repeated multiplication.\n\n" +
      "Input format: two integers, base and exponent, space-separated. exponent >= 0.",
    examples: [{ input: "2 10", output: "1024" }],
    constraints: ["0 <= exponent <= 30"],
    hints: [
      "Base case: anything to the power 0 is 1.",
      "If exponent is even: base^exp = (base^(exp/2))^2. If odd: base^exp = base * base^(exp-1).",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static long power(long base, int exp) {
        if (exp == 0) return 1; // base case
        long half = power(base, exp / 2);
        if (exp % 2 == 0) return half * half;
        return base * half * half;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StringTokenizer st = new StringTokenizer(sc.nextLine());
        long base = Long.parseLong(st.nextToken());
        int exp = Integer.parseInt(st.nextToken());
        System.out.println(power(base, exp));
    }
}`,
      python: `def power(base, exp):
    if exp == 0:
        return 1  # base case
    half = power(base, exp // 2)
    if exp % 2 == 0:
        return half * half
    return base * half * half

base, exp = map(int, input().split())
print(power(base, exp))
`,
      c: `#include <stdio.h>

long long power(long long base, int exp) {
    if (exp == 0) return 1; // base case
    long long half = power(base, exp / 2);
    if (exp % 2 == 0) return half * half;
    return base * half * half;
}

int main() {
    long long base;
    int exp;
    scanf("%lld %d", &base, &exp);
    printf("%lld\\n", power(base, exp));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

long long power(long long base, int exp) {
    if (exp == 0) return 1; // base case
    long long half = power(base, exp / 2);
    if (exp % 2 == 0) return half * half;
    return base * half * half;
}

int main() {
    long long base;
    int exp;
    cin >> base >> exp;
    cout << power(base, exp) << endl;
    return 0;
}
`,
      javascript: `function power(base, exp) {
  if (exp === 0) return 1n; // base case (use BigInt to be safe for larger results)
  const half = power(base, Math.floor(exp / 2));
  if (exp % 2 === 0) return half * half;
  return BigInt(base) * half * half;
}

const [base, exp] = readLine().trim().split(/\\s+/).map(Number);
console.log(power(BigInt(base), exp).toString());
`,
    },
    testCases: [
      { input: "2 10", expectedOutput: "1024", hidden: false },
      { input: "5 0", expectedOutput: "1", hidden: false },
      { input: "3 5", expectedOutput: "243", hidden: true },
    ],
  },
  {
    topicSlug: "recursion",
    slug: "reverse-string-recursive",
    title: "Reverse a String Recursively",
    difficulty: "Easy",
    statement:
      "Reverse a string using recursion — no loops, and no built-in reverse function.\n\n" +
      "Input format: a single line containing the string.",
    examples: [{ input: "hello", output: "olleh" }],
    constraints: ["1 <= s.length <= 1000"],
    hints: ["Base case: a string of length 0 or 1 reverses to itself.", "Recursive case: reverse(s) = reverse(s[1:]) + s[0]."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static String reverse(String s) {
        if (s.length() <= 1) return s; // base case
        return reverse(s.substring(1)) + s.charAt(0); // recursive case
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(reverse(s));
    }
}`,
      python: `def reverse(s):
    if len(s) <= 1:
        return s  # base case
    return reverse(s[1:]) + s[0]  # recursive case

s = input()
print(reverse(s))
`,
      c: `#include <stdio.h>
#include <string.h>

void reverse(const char *s, char *out) {
    int len = strlen(s);
    if (len == 0) { out[0] = '\\0'; return; } // base case
    reverse(s + 1, out); // recurse on the rest first
    int outLen = strlen(out);
    out[outLen] = s[0];
    out[outLen + 1] = '\\0';
}

int main() {
    char s[1005], out[1005] = "";
    scanf("%s", s);
    reverse(s, out);
    printf("%s\\n", out);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

string reverse(const string &s) {
    if (s.size() <= 1) return s; // base case
    return reverse(s.substr(1)) + s[0]; // recursive case
}

int main() {
    string s;
    cin >> s;
    cout << reverse(s) << endl;
    return 0;
}
`,
      javascript: `function reverse(s) {
  if (s.length <= 1) return s; // base case
  return reverse(s.slice(1)) + s[0]; // recursive case
}

const s = readLine().trim();
console.log(reverse(s));
`,
    },
    testCases: [
      { input: "hello", expectedOutput: "olleh", hidden: false },
      { input: "a", expectedOutput: "a", hidden: false },
      { input: "recursion", expectedOutput: "noisrucer", hidden: true },
    ],
  },
  {
    topicSlug: "recursion",
    slug: "check-palindrome-recursive",
    title: "Check Palindrome Recursively",
    difficulty: "Medium",
    statement:
      "Determine whether a string is a palindrome using recursion (comparing characters from the " +
      "outside in), not by reversing it and comparing.\n\n" +
      "Input format: a single line containing the string.",
    examples: [{ input: "racecar", output: "true" }, { input: "hello", output: "false" }],
    constraints: ["1 <= s.length <= 1000"],
    hints: [
      "Base case: a string of length 0 or 1 is always a palindrome.",
      "Recursive case: check the first and last characters match, then recurse on the substring between them.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static boolean isPalindrome(String s, int left, int right) {
        if (left >= right) return true; // base case
        if (s.charAt(left) != s.charAt(right)) return false;
        return isPalindrome(s, left + 1, right - 1); // recursive case
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(isPalindrome(s, 0, s.length() - 1));
    }
}`,
      python: `def is_palindrome(s, left, right):
    if left >= right:
        return True  # base case
    if s[left] != s[right]:
        return False
    return is_palindrome(s, left + 1, right - 1)  # recursive case

s = input()
print(str(is_palindrome(s, 0, len(s) - 1)).lower())
`,
      c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

bool isPalindrome(const char *s, int left, int right) {
    if (left >= right) return true; // base case
    if (s[left] != s[right]) return false;
    return isPalindrome(s, left + 1, right - 1); // recursive case
}

int main() {
    char s[1005];
    scanf("%s", s);
    printf(isPalindrome(s, 0, strlen(s) - 1) ? "true\\n" : "false\\n");
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

bool isPalindrome(const string &s, int left, int right) {
    if (left >= right) return true; // base case
    if (s[left] != s[right]) return false;
    return isPalindrome(s, left + 1, right - 1); // recursive case
}

int main() {
    string s;
    cin >> s;
    cout << (isPalindrome(s, 0, s.size() - 1) ? "true" : "false") << endl;
    return 0;
}
`,
      javascript: `function isPalindrome(s, left, right) {
  if (left >= right) return true; // base case
  if (s[left] !== s[right]) return false;
  return isPalindrome(s, left + 1, right - 1); // recursive case
}

const s = readLine().trim();
console.log(isPalindrome(s, 0, s.length - 1) ? "true" : "false");
`,
    },
    testCases: [
      { input: "racecar", expectedOutput: "true", hidden: false },
      { input: "hello", expectedOutput: "false", hidden: false },
      { input: "a", expectedOutput: "true", hidden: true },
    ],
  },
  {
    topicSlug: "recursion",
    slug: "fibonacci-recursive",
    title: "Fibonacci Number (Recursive)",
    difficulty: "Hard",
    statement:
      "Compute the nth Fibonacci number (F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)) using plain recursion, " +
      "then note the performance cliff: this naive version is O(2^n) because it recomputes the same " +
      "subproblems repeatedly — the Dynamic Programming topic later fixes exactly this.\n\n" +
      "Input format: a single integer n.",
    examples: [{ input: "10", output: "55" }],
    constraints: ["0 <= n <= 30 (kept small because naive recursion is exponential)"],
    hints: ["Base cases: F(0) = 0, F(1) = 1.", "Recursive case: F(n) = F(n-1) + F(n-2)."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static long fib(int n) {
        if (n == 0) return 0; // base case
        if (n == 1) return 1; // base case
        return fib(n - 1) + fib(n - 2); // recursive case
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        System.out.println(fib(n));
    }
}`,
      python: `def fib(n):
    if n == 0:
        return 0  # base case
    if n == 1:
        return 1  # base case
    return fib(n - 1) + fib(n - 2)  # recursive case

n = int(input().strip())
print(fib(n))
`,
      c: `#include <stdio.h>

long long fib(int n) {
    if (n == 0) return 0; // base case
    if (n == 1) return 1; // base case
    return fib(n - 1) + fib(n - 2); // recursive case
}

int main() {
    int n;
    scanf("%d", &n);
    printf("%lld\\n", fib(n));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

long long fib(int n) {
    if (n == 0) return 0; // base case
    if (n == 1) return 1; // base case
    return fib(n - 1) + fib(n - 2); // recursive case
}

int main() {
    int n;
    cin >> n;
    cout << fib(n) << endl;
    return 0;
}
`,
      javascript: `function fib(n) {
  if (n === 0) return 0; // base case
  if (n === 1) return 1; // base case
  return fib(n - 1) + fib(n - 2); // recursive case
}

const n = Number(readLine().trim());
console.log(fib(n));
`,
    },
    testCases: [
      { input: "10", expectedOutput: "55", hidden: false },
      { input: "0", expectedOutput: "0", hidden: false },
      { input: "1", expectedOutput: "1", hidden: true },
    ],
  },
];
