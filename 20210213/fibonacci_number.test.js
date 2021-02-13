// F(n) = F(n-1) + F(n-2)
const solution = (n) => {
  const fibonacci = (number, before, next) => {
    if (number === 0) return before;
    return fibonacci(number - 1, next, (before + next) % 1234567);
  };
  return fibonacci(n, 0, 1);
};

test('solution', () => {
  expect(solution(2)).toBe(1);
  expect(solution(3)).toBe(2);
  expect(solution(100000)).toBe(5);
});
