// F(n) = F(n-1) + F(n-2)
const solution = (n) => {
  const memo = [0, 1];
  const fibonacci = (number) => {
    if (number <= 1) return number;
    if (!memo[number]) {
      memo[number] = fibonacci(number - 1) + fibonacci(number - 2);
    }
    return memo[number] % 1234567;
  };
  return fibonacci(n);
};

test('solution', () => {
  // expect(solution(2)).toBe(1);
  // expect(solution(3)).toBe(2);
  expect(solution(100000)).toBe(5);
});
