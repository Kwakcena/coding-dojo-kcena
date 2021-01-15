const solution = (s) => {
  const range = [...Array(s.length)].map((_, i) => i + 1);
  return Math.min(...range.map((i) => compress(s, i).length));
};

const chunk = (s, n) =>
  s.length <= n ? [s] : [s.slice(0, n), ...chunk(s.slice(n), n)];

const compress = (s, n) => {
  const make = ([acc, l, c]) => `${acc}${c > 1 ? c : ''}${l}`;
  return make(
    chunk(s, n).reduce(
      ([acc, l, c], v) => {
        return l === v ? [acc, v, c + 1] : [make([acc, l, c]), v, 1];
      },
      ['', '', 0]
    )
  );
};

test('solution', () => {
  expect(solution('aabbaccc')).toBe(7);
});

test('문자열을 n 단위로 자르기', () => {
  expect(chunk('aabbaccc', 1)).toEqual([
    'a',
    'a',
    'b',
    'b',
    'a',
    'c',
    'c',
    'c',
  ]);
  expect(chunk('aabbaccc', 2)).toEqual(['aa', 'bb', 'ac', 'cc']);
  expect(chunk('aabbaccc', 3)).toEqual(['aab', 'bac', 'cc']);
  expect(chunk('aabbaccc', 7)).toEqual(['aabbacc', 'c']);
});

test('자른 문자열을 압축하기', () => {
  expect(compress('aabbaccc', 1)).toBe('2a2ba3c');
});
