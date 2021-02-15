const solution = (s) =>
  `${Math.min(...s.split(' '))} ${Math.max(...s.split(' '))}`;

test('solution', () => {
  expect(solution('1 2 3 4')).toBe('1 4');
  expect(solution('-1 -2 -3 -4')).toBe('-4 -1');
  expect(solution('-1 -1')).toBe('-1 -1');
});
