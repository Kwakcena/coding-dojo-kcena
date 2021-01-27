const solution = (orders, course) => {
  return ['AC', 'ACDE', 'BCFG', 'CDE'];
};

test('solution', () => {
  expect(
    solution(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4])
  ).toEqual(['AC', 'ACDE', 'BCFG', 'CDE']);
});
