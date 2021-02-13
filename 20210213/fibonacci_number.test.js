// F(n) = F(n-1) + F(n-2)
const solution = (n) => {
  let before = 0;
  let next = 1;
  for (; n > 0; n--) {
    let temp = before;
    before = next;
    next = (temp + next) % 1234567;
  }
  return before;
};

test('solution', () => {
  expect(solution(2)).toBe(1);
  expect(solution(3)).toBe(2);
  expect(solution(5)).toBe(5);
});
