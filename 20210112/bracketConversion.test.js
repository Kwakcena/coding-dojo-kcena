const solution = (p) => {
  if (p === '') {
    return '';
  }
  const [u, v] = getBalanced(p);
  if (isRight(u)) {
    return `${u}${solution(v)}`;
  }
  return `(${solution(v)})${reverse(u)}`;
};

const getBalanced = (w) => {
  let open = 0,
    close = 0;
  for (let i = 0; i < w.length; i++) {
    if (w[i] === '(') {
      open++;
    } else {
      close++;
    }

    if (open === close) {
      return [w.slice(0, i + 1), w.slice(i + 1)];
    }
  }
  return [w, ''];
};

const isRight = (s) => {
  let open = 0,
    close = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      open++;
    } else if (s[i] === ')') {
      close++;
      if (close > open) {
        return false;
      }
    }
  }
  return true;
};

const reverse = (s) => {
  const str = s.slice(1, s.length - 1);
  return str
    .split('')
    .map((value) => {
      if (value === '(') {
        return ')';
      }
      return '(';
    })
    .join('');
};

test('solution', () => {
  expect(solution('(()())()')).toBe('(()())()');
});

test('getBalanced', () => {
  expect(getBalanced('(()())()')).toEqual(['(()())', '()']);
  expect(getBalanced('))((')).toEqual(['))((', '']);
  expect(getBalanced('()')).toEqual(['()', '']);
  expect(getBalanced('()))((()')).toEqual(['()', '))((()']);
  expect(getBalanced('))((()')).toEqual(['))((', '()']);
});

test('isRight', () => {
  expect(isRight('()')).toBe(true);
  expect(isRight(')(')).toBe(false);
  expect(isRight('(())')).toBe(true);
  expect(isRight(')(')).toBe(false);
});

test('reverse', () => {
  expect(reverse('))((')).toBe('()');
  expect(reverse(')))(((')).toBe('(())');
});
