// Each generator returns an array of "frames". A frame is a full snapshot:
// { array, comparing: [i,j] | [], swapped: boolean, sortedIndices: [...] , pivot: index|null }
// The visualizer just steps through these frames — no live recursion in the UI thread.

function cloneFrame(array, extra) {
  return { array: [...array], comparing: [], swapped: false, sortedIndices: [], pivot: null, ...extra };
}

export function bubbleSortSteps(input) {
  const arr = [...input];
  const frames = [cloneFrame(arr)];
  const n = arr.length;
  const sorted = [];

  for (let i = 0; i < n - 1; i++) {
    let swappedAny = false;
    for (let j = 0; j < n - 1 - i; j++) {
      frames.push(cloneFrame(arr, { comparing: [j, j + 1], sortedIndices: [...sorted] }));
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swappedAny = true;
        frames.push(cloneFrame(arr, { comparing: [j, j + 1], swapped: true, sortedIndices: [...sorted] }));
      }
    }
    sorted.unshift(n - 1 - i);
    if (!swappedAny) break;
  }
  frames.push(cloneFrame(arr, { sortedIndices: arr.map((_, i) => i) }));
  return frames;
}

export function selectionSortSteps(input) {
  const arr = [...input];
  const frames = [cloneFrame(arr)];
  const n = arr.length;
  const sorted = [];

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      frames.push(cloneFrame(arr, { comparing: [minIdx, j], sortedIndices: [...sorted] }));
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      frames.push(cloneFrame(arr, { comparing: [i, minIdx], swapped: true, sortedIndices: [...sorted] }));
    }
    sorted.push(i);
  }
  sorted.push(n - 1);
  frames.push(cloneFrame(arr, { sortedIndices: arr.map((_, i) => i) }));
  return frames;
}

export function insertionSortSteps(input) {
  const arr = [...input];
  const frames = [cloneFrame(arr)];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      frames.push(cloneFrame(arr, { comparing: [j - 1, j], sortedIndices: Array.from({ length: i }, (_, k) => k) }));
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        frames.push(cloneFrame(arr, { comparing: [j - 1, j], swapped: true }));
        j--;
      } else {
        break;
      }
    }
  }
  frames.push(cloneFrame(arr, { sortedIndices: arr.map((_, i) => i) }));
  return frames;
}

export function quickSortSteps(input) {
  const arr = [...input];
  const frames = [cloneFrame(arr)];
  const sorted = new Set();

  function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      frames.push(cloneFrame(arr, { comparing: [j, high], pivot: high, sortedIndices: [...sorted] }));
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        frames.push(cloneFrame(arr, { comparing: [i, j], swapped: true, pivot: high, sortedIndices: [...sorted] }));
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    frames.push(cloneFrame(arr, { comparing: [i + 1, high], swapped: true, pivot: i + 1, sortedIndices: [...sorted] }));
    return i + 1;
  }

  function sort(low, high) {
    if (low < high) {
      const p = partition(low, high);
      sorted.add(p);
      sort(low, p - 1);
      sort(p + 1, high);
    } else if (low === high) {
      sorted.add(low);
    }
  }

  sort(0, arr.length - 1);
  frames.push(cloneFrame(arr, { sortedIndices: arr.map((_, i) => i) }));
  return frames;
}

export function mergeSortSteps(input) {
  const arr = [...input];
  const frames = [cloneFrame(arr)];

  function merge(left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      frames.push(cloneFrame(arr, { comparing: [left + i, mid + 1 + j] }));
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i]; i++;
      } else {
        arr[k] = rightArr[j]; j++;
      }
      frames.push(cloneFrame(arr, { comparing: [k], swapped: true }));
      k++;
    }
    while (i < leftArr.length) { arr[k] = leftArr[i]; frames.push(cloneFrame(arr, { comparing: [k], swapped: true })); i++; k++; }
    while (j < rightArr.length) { arr[k] = rightArr[j]; frames.push(cloneFrame(arr, { comparing: [k], swapped: true })); j++; k++; }
  }

  function sort(left, right) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    sort(left, mid);
    sort(mid + 1, right);
    merge(left, mid, right);
  }

  sort(0, arr.length - 1);
  frames.push(cloneFrame(arr, { sortedIndices: arr.map((_, i) => i) }));
  return frames;
}

export const ALGORITHMS = {
  bubble: { label: "Bubble Sort", complexity: "O(n²)", generate: bubbleSortSteps },
  selection: { label: "Selection Sort", complexity: "O(n²)", generate: selectionSortSteps },
  insertion: { label: "Insertion Sort", complexity: "O(n²)", generate: insertionSortSteps },
  quick: { label: "Quick Sort", complexity: "O(n log n) avg", generate: quickSortSteps },
  merge: { label: "Merge Sort", complexity: "O(n log n)", generate: mergeSortSteps },
};
