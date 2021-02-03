const solution = (s) => {
  let answer = 1;
  for (let i = 0; i < s.length; i++) {
    let j = 1;
    let temp = 1;
    while (i - j >= 0 && i + j < s.length && s[i - j] === s[i + j]) {
      temp += 2;
      j++;
    }
    if (temp > answer) {
      answer = temp;
    }
  }
  return answer;
};

test('solution', () => {
  expect(solution('abcdcba')).toBe(7);
  expect(solution('abacde')).toBe(3);
  expect(solution('abcabcdcbae')).toBe(7);
  expect(solution('aaaa')).toBe(4);
  expect(solution('abcde')).toBe(1);
  expect(solution('a')).toBe(1);
  expect(solution('abcbaqwertrewqq')).toBe(9);
  expect(solution('abcbaqwqabcba')).toBe(13);
  expect(solution('abba')).toBe(4);
  expect(solution('abaabaaaaaaa')).toBe(7);
});
