const pailndrome = (s, l, r) => {
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++;
  }
  return r - l - 1;
};

const solution = (s) => {
  return s
    .split('')
    .reduce(
      (answer, _, i) =>
        Math.max(
          answer,
          Math.max(pailndrome(s, i, i), pailndrome(s, i, i + 1))
        ),
      0
    );
};

test('solution 문자열의 길이가 홀수인 경우', () => {
  expect(solution('abcba')).toBe(5);
  expect(solution('abcdcba')).toBe(7);
  expect(solution('abacde')).toBe(3);
  expect(solution('abcabcdcbae')).toBe(7);
  expect(solution('abcde')).toBe(1);
  expect(solution('a')).toBe(1);
  expect(solution('abcbaqwertrewqq')).toBe(9);
  expect(solution('abcbaqwqabcba')).toBe(13);
  expect(solution('abaabaaaaaaa')).toBe(7);
});

test('solution 문자열의 길이가 짝수인 경우', () => {
  expect(solution('aaaa')).toBe(4);
  expect(solution('aaab')).toBe(3);
  expect(solution('aaba')).toBe(3);
  expect(solution('abba')).toBe(4);
  expect(solution('bcba')).toBe(3);
});
