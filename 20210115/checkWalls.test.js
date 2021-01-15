const solution = (n, weak, dist) => {
  const expansion = (weak) => [...weak, ...weak.map((x) => x + n)];
  const minCount = Math.min(
    ...weak.map((_, start, { length }) =>
      Math.min(
        ...getPermutation(dist).map((friend) =>
          checkWall(expansion(weak).slice(start, start + length), friend)
        )
      )
    )
  );

  return minCount > dist.length ? -1 : minCount;
};

const getPermutation = (array) => {
  const check = Array(100).fill(false);
  const permutation = [];

  (function go(source, target) {
    if (target.length === array.length) {
      permutation.push(target);
      return;
    }
    for (let i = 0; i < source.length; i++) {
      if (check[i - 1]) {
        continue;
      }
      target.push(source[i]);
      check[i - 1] = true;
      go(source, [...target]);
      target.pop();
      check[i - 1] = false;
    }
  })(array, []);
  return permutation;
};

const checkWall = (weaks, dist) => {
  let count = 1;
  let lastPosition = weaks[0] + dist[count - 1];

  for (const weak of weaks) {
    if (lastPosition < weak) {
      count++;
      if (count > dist.length) {
        break;
      }
      lastPosition = weak + dist[count - 1];
    }
  }

  return count;
};

test('solution', () => {
  expect(solution(12, [1, 5, 6, 10], [1, 2, 3, 4])).toBe(2);
  expect(solution(12, [1, 3, 4, 9, 10], [3, 5, 7])).toBe(1);
  expect(solution(12, [10, 0], [1, 2])).toBe(1);
  expect(solution(200, [0, 100], [1, 1])).toBe(2);
});

test('dist 배열에 대한 순열을 구한다.', () => {
  expect(getPermutation([1, 2, 3, 4])).toEqual([
    [1, 2, 3, 4],
    [1, 2, 4, 3],
    [1, 3, 2, 4],
    [1, 3, 4, 2],
    [1, 4, 2, 3],
    [1, 4, 3, 2],
    [2, 1, 3, 4],
    [2, 1, 4, 3],
    [2, 3, 1, 4],
    [2, 3, 4, 1],
    [2, 4, 1, 3],
    [2, 4, 3, 1],
    [3, 1, 2, 4],
    [3, 1, 4, 2],
    [3, 2, 1, 4],
    [3, 2, 4, 1],
    [3, 4, 1, 2],
    [3, 4, 2, 1],
    [4, 1, 2, 3],
    [4, 1, 3, 2],
    [4, 2, 1, 3],
    [4, 2, 3, 1],
    [4, 3, 1, 2],
    [4, 3, 2, 1],
  ]);
  expect(getPermutation([1, 1])).toEqual([
    [1, 1],
    [1, 1],
  ]);
});

test('첫 번째 구간에 대해서 친구들을 점검에 투입하고 몇명의 사람이 필요한지 구한다.', () => {
  expect(checkWall([1, 5, 6, 10], [1, 2, 3, 4])).toBe(3);
  expect(checkWall([10, 13, 17, 18], [4, 3, 2, 1])).toBe(2);
});
