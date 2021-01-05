const solution = (a, b) => {
  return a.reduce((acc, value, index) => acc += value * b[index], 0);
}

test('solution', () => {
  expect(solution([1, 2, 3, 4], [-3, -1, 0, 2])).toBe(3);
})