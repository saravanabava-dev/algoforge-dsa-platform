export default [
  {
    topicSlug: "greedy",
    slug: "coin-change-greedy",
    title: "Minimum Coins (Greedy)",
    difficulty: "Easy",
    statement:
      "Given an amount and the denominations {50, 20, 10, 5, 2, 1} (which greedy handles optimally), " +
      "print the minimum number of coins needed to make that amount.\n\n" +
      "Input format: a single line containing the amount.",
    examples: [{ input: "93", output: "5", explanation: "50 + 20 + 20 + 2 + 1 = 93, using 5 coins." }],
    constraints: ["0 <= amount <= 10^6"],
    hints: ["At each step, use the largest coin that doesn't exceed the remaining amount."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int minCoins(int amount) {
        int[] coins = {50, 20, 10, 5, 2, 1};
        int count = 0;
        for (int coin : coins) {
            count += amount / coin;
            amount %= coin;
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int amount = Integer.parseInt(sc.nextLine().trim());
        System.out.println(minCoins(amount));
    }
}`,
      python: `def min_coins(amount):
    coins = [50, 20, 10, 5, 2, 1]
    count = 0
    for coin in coins:
        count += amount // coin
        amount %= coin
    return count

amount = int(input().strip())
print(min_coins(amount))
`,
      c: `#include <stdio.h>

int minCoins(int amount) {
    int coins[] = {50, 20, 10, 5, 2, 1};
    int count = 0;
    for (int i = 0; i < 6; i++) {
        count += amount / coins[i];
        amount %= coins[i];
    }
    return count;
}

int main() {
    int amount;
    scanf("%d", &amount);
    printf("%d\\n", minCoins(amount));
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int minCoins(int amount) {
    vector<int> coins = {50, 20, 10, 5, 2, 1};
    int count = 0;
    for (int coin : coins) {
        count += amount / coin;
        amount %= coin;
    }
    return count;
}

int main() {
    int amount;
    cin >> amount;
    cout << minCoins(amount) << endl;
    return 0;
}
`,
      javascript: `function minCoins(amount) {
  const coins = [50, 20, 10, 5, 2, 1];
  let count = 0;
  for (const coin of coins) {
    count += Math.floor(amount / coin);
    amount %= coin;
  }
  return count;
}

const amount = Number(readLine().trim());
console.log(minCoins(amount));
`,
    },
    testCases: [
      { input: "93", expectedOutput: "5", hidden: false },
      { input: "0", expectedOutput: "0", hidden: false },
      { input: "7", expectedOutput: "2", hidden: true },
    ],
  },
  {
    topicSlug: "greedy",
    slug: "activity-selection",
    title: "Activity Selection",
    difficulty: "Medium",
    statement:
      "Given n activities with start and end times, find the maximum number of activities a single " +
      "person can perform, assuming a person can only work on one activity at a time (activities " +
      "may not overlap, but one can start exactly when another ends).\n\n" +
      "Input format: first line is n, followed by n lines each with 'start end'.",
    examples: [
      { input: "6\n1 4\n3 5\n0 6\n5 7\n8 9\n5 9", output: "3", explanation: "(1,4), (5,7), (8,9) — or another set of 3 non-overlapping activities." },
    ],
    constraints: ["1 <= n <= 10^5"],
    hints: ["Sort activities by end time; greedily pick each activity whose start is >= the last picked activity's end."],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int maxActivities(int[][] activities) {
        Arrays.sort(activities, (a, b) -> a[1] - b[1]);
        int count = 1;
        int lastEnd = activities[0][1];
        for (int i = 1; i < activities.length; i++) {
            if (activities[i][0] >= lastEnd) {
                count++;
                lastEnd = activities[i][1];
            }
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[][] activities = new int[n][2];
        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(sc.nextLine());
            activities[i][0] = Integer.parseInt(st.nextToken());
            activities[i][1] = Integer.parseInt(st.nextToken());
        }
        System.out.println(maxActivities(activities));
    }
}`,
      python: `def max_activities(activities):
    activities.sort(key=lambda a: a[1])
    count = 1
    last_end = activities[0][1]
    for start, end in activities[1:]:
        if start >= last_end:
            count += 1
            last_end = end
    return count

n = int(input().strip())
activities = [tuple(map(int, input().split())) for _ in range(n)]
print(max_activities(activities))
`,
      c: `#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) {
    return ((int*)a)[1] - ((int*)b)[1];
}

int main() {
    int n;
    scanf("%d", &n);
    int activities[n][2];
    for (int i = 0; i < n; i++) scanf("%d %d", &activities[i][0], &activities[i][1]);

    qsort(activities, n, sizeof(activities[0]), cmp);

    int count = 1;
    int lastEnd = activities[0][1];
    for (int i = 1; i < n; i++) {
        if (activities[i][0] >= lastEnd) {
            count++;
            lastEnd = activities[i][1];
        }
    }
    printf("%d\\n", count);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<pair<int,int>> activities(n);
    for (auto &a : activities) cin >> a.first >> a.second;

    sort(activities.begin(), activities.end(), [](auto &a, auto &b) { return a.second < b.second; });

    int count = 1;
    int lastEnd = activities[0].second;
    for (int i = 1; i < n; i++) {
        if (activities[i].first >= lastEnd) {
            count++;
            lastEnd = activities[i].second;
        }
    }
    cout << count << endl;
    return 0;
}
`,
      javascript: `function maxActivities(activities) {
  activities.sort((a, b) => a[1] - b[1]);
  let count = 1;
  let lastEnd = activities[0][1];
  for (let i = 1; i < activities.length; i++) {
    if (activities[i][0] >= lastEnd) {
      count++;
      lastEnd = activities[i][1];
    }
  }
  return count;
}

const n = Number(readLine().trim());
const activities = [];
for (let i = 0; i < n; i++) activities.push(readLine().trim().split(/\\s+/).map(Number));
console.log(maxActivities(activities));
`,
    },
    testCases: [
      { input: "6\n1 4\n3 5\n0 6\n5 7\n8 9\n5 9", expectedOutput: "3", hidden: false },
      { input: "1\n0 1", expectedOutput: "1", hidden: false },
      { input: "3\n1 2\n2 3\n3 4", expectedOutput: "3", hidden: true },
    ],
  },
  {
    topicSlug: "greedy",
    slug: "minimum-platforms",
    title: "Minimum Platforms",
    difficulty: "Hard",
    statement:
      "Given the arrival and departure times of n trains at a station, find the minimum number of " +
      "platforms needed so that no train has to wait.\n\n" +
      "Input format: first line is n, second line has n space-separated arrival times, third line " +
      "has n space-separated departure times (times are given as comparable integers, e.g. HHMM).",
    examples: [
      {
        input: "6\n900 940 950 1100 1500 1800\n910 1200 1120 1130 1900 2000",
        output: "3",
      },
    ],
    constraints: ["1 <= n <= 10^5"],
    hints: [
      "Sort arrivals and departures separately.",
      "Walk through both sorted lists together: an arrival needs a new platform, a departure frees one up — track the running count and its maximum.",
    ],
    starterCode: {
      java: `import java.util.*;

public class Main {
    static int minPlatforms(int[] arr, int[] dep) {
        Arrays.sort(arr);
        Arrays.sort(dep);
        int platforms = 0, maxPlatforms = 0;
        int i = 0, j = 0;
        while (i < arr.length && j < dep.length) {
            if (arr[i] <= dep[j]) {
                platforms++;
                maxPlatforms = Math.max(maxPlatforms, platforms);
                i++;
            } else {
                platforms--;
                j++;
            }
        }
        return maxPlatforms;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        int[] arr = new int[n];
        StringTokenizer st1 = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(st1.nextToken());
        int[] dep = new int[n];
        StringTokenizer st2 = new StringTokenizer(sc.nextLine());
        for (int i = 0; i < n; i++) dep[i] = Integer.parseInt(st2.nextToken());
        System.out.println(minPlatforms(arr, dep));
    }
}`,
      python: `def min_platforms(arr, dep):
    arr = sorted(arr)
    dep = sorted(dep)
    platforms = max_platforms = 0
    i = j = 0
    while i < len(arr) and j < len(dep):
        if arr[i] <= dep[j]:
            platforms += 1
            max_platforms = max(max_platforms, platforms)
            i += 1
        else:
            platforms -= 1
            j += 1
    return max_platforms

n = int(input().strip())
arr = list(map(int, input().split()))
dep = list(map(int, input().split()))
print(min_platforms(arr, dep))
`,
      c: `#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }

int main() {
    int n;
    scanf("%d", &n);
    int arr[n], dep[n];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    for (int i = 0; i < n; i++) scanf("%d", &dep[i]);

    qsort(arr, n, sizeof(int), cmp);
    qsort(dep, n, sizeof(int), cmp);

    int platforms = 0, maxPlatforms = 0, i = 0, j = 0;
    while (i < n && j < n) {
        if (arr[i] <= dep[j]) {
            platforms++;
            if (platforms > maxPlatforms) maxPlatforms = platforms;
            i++;
        } else {
            platforms--;
            j++;
        }
    }
    printf("%d\\n", maxPlatforms);
    return 0;
}
`,
      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n), dep(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    for (int i = 0; i < n; i++) cin >> dep[i];

    sort(arr.begin(), arr.end());
    sort(dep.begin(), dep.end());

    int platforms = 0, maxPlatforms = 0, i = 0, j = 0;
    while (i < n && j < n) {
        if (arr[i] <= dep[j]) {
            platforms++;
            maxPlatforms = max(maxPlatforms, platforms);
            i++;
        } else {
            platforms--;
            j++;
        }
    }
    cout << maxPlatforms << endl;
    return 0;
}
`,
      javascript: `function minPlatforms(arr, dep) {
  arr = [...arr].sort((a, b) => a - b);
  dep = [...dep].sort((a, b) => a - b);
  let platforms = 0, maxPlatforms = 0, i = 0, j = 0;
  while (i < arr.length && j < dep.length) {
    if (arr[i] <= dep[j]) {
      platforms++;
      maxPlatforms = Math.max(maxPlatforms, platforms);
      i++;
    } else {
      platforms--;
      j++;
    }
  }
  return maxPlatforms;
}

const n = Number(readLine().trim());
const arr = readLine().trim().split(/\\s+/).map(Number);
const dep = readLine().trim().split(/\\s+/).map(Number);
console.log(minPlatforms(arr, dep));
`,
    },
    testCases: [
      { input: "6\n900 940 950 1100 1500 1800\n910 1200 1120 1130 1900 2000", expectedOutput: "3", hidden: false },
      { input: "1\n900\n1000", expectedOutput: "1", hidden: false },
      { input: "3\n100 100 100\n200 200 200", expectedOutput: "3", hidden: true },
    ],
  },
];
