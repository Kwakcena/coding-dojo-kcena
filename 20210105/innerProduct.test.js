const solution = (a, b) => {
  return a.map((value, index) => value * b[index])
    .reduce((total, number) => (total + number), 0);
}

test('solution', () => {
  expect(solution([1, 2, 3, 4], [-3, -1, 0, 2])).toBe(3);
})