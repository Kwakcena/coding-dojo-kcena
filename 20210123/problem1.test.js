const solution = (a, b) => {
  const sortA = a.sort((a, b) => a - b);
  const sortB = b.sort((a, b) => a - b);
  let bIndex = 0,
    result = 0;

  for (let i = 0; i < sortA.length; i++) {
    for (let j = bIndex; j < sortB.length; j++) {
      if (sortA[i] < sortB[j]) {
        result++;
        bIndex = j + 1;
        break;
      }
    }
  }

  return result;
};

test('solution', () => {
  expect(solution([5, 1, 3, 7], [2, 2, 6, 8])).toBe(3);
  expect(solution([2, 2, 2, 2], [1, 1, 1, 1])).toBe(0);
});
