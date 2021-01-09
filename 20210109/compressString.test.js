const solution = (s) => {
  const range = [...Array(s.length)].map((_, i) => i + 1);
  return Math.min(...range.map((i) => compress(s, i).length));
  return 7;
};

const make = ([acc, letter, count]) =>
  `${acc}${count > 1 ? count : ''}${letter}`;

test('make', () => {
  expect(make(['', 'a', 2])).toBe('2a');
  expect(make(['2a', 'b', 2])).toBe('2a2b');
  expect(make(['2a2b', 'a', 1])).toBe('2a2ba');
  expect(make(['2a2ba', 'c', 3])).toBe('2a2ba3c');
});

const compress = (s, n) => {
  return make(
    chunk(s, n).reduce(
      ([acc, letter, count], current) =>
        current === letter
          ? [acc, letter, count + 1]
          : [make([acc, letter, count]), current, 1],
      ['', '', 0]
    )
  );
};

const chunk = (s, n) =>
  s.length <= n ? [s] : [s.slice(0, n), ...chunk(s.slice(n), n)];

test('solution', () => {
  expect(solution('aabbaccc')).toBe(7);
});

test('chunk', () => {
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
});

test('compress', () => {
  expect(compress('aabbaccc', 1)).toEqual('2a2ba3c');
  expect(compress('aabbaccc', 2)).toEqual('aabbaccc');
  expect(compress('aaabbb', 1)).toEqual('3a3b');
});
