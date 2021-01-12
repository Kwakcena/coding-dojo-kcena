const solution = (p) => {
  if (p === '') {
    return '';
  }
  const [u, v] = getBalanced(p);
  return isRight(u) ? `${u}${solution(v)}` : `(${solution(v)})${reverse(u)}`;
};

const getBalanced = (w) => {
  let count = 0;
  for (let i = 0; i < w.length; i++) {
    w[i] === '(' ? count++ : count--;
    if (count === 0) {
      return [w.slice(0, i + 1), w.slice(i + 1)];
    }
  }
  return [w, ''];
};

const isRight = (p) => {
  let open = 0,
    close = 0;
  for (let i = 0; i < p.length; i++) {
    if (p[i] === ')') {
      close++;
      if (close > open) {
        return false;
      }
    } else {
      open++;
    }
  }
  return true;
};

const reverse = (s) => {
  return s
    .slice(1, s.length - 1)
    .split('')
    .map((value) => (value === '(' ? ')' : '('))
    .join('');
};

test('solution', () => {
  expect(solution('(()())()')).toBe('(()())()');
  expect(solution(')(')).toBe('()');
  expect(solution('()))((()')).toBe('()(())()');
});

test('p에 대해서 u와 v를 구한다.', () => {
  expect(getBalanced('(()())()')).toEqual(['(()())', '()']);
  expect(getBalanced('))((')).toEqual(['))((', '']);
  expect(getBalanced('()')).toEqual(['()', '']);
  expect(getBalanced('()))((()')).toEqual(['()', '))((()']);
  expect(getBalanced('))((()')).toEqual(['))((', '()']);
});

test('올바른 괄호 문자열인가?', () => {
  expect(isRight('()')).toBe(true);
  expect(isRight(')(')).toBe(false);
  expect(isRight('(())')).toBe(true);
  expect(isRight(')(')).toBe(false);
});

test('u의 첫 번째와 마지막 문자를 제거하고 나머지 문자열의 괄호 방향을 뒤집는다.', () => {
  expect(reverse('))((')).toBe('()');
  expect(reverse(')))(((')).toBe('(())');
});
