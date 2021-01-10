const solution = (s) => {
  const array = [...Array(s.length)].map((_, i) => i + 1);
  return Math.min(...array.map((i) => compress(chunk(s, i)).length));
};

const chunk = (s, n) => {
  return s.length <= n ? [s] : [s.slice(0, n), ...chunk(s.slice(n), n)];
};

const compress = (array) => {
  return make(
    array.reduce(
      ([acc, letter, count], current) => {
        if (letter === current) {
          return [acc, current, count + 1];
        }
        return [make([acc, letter, count]), current, 1];
      },
      ['', '', 0]
    )
  );
};

const make = ([acc, letter, count]) => {
  return `${acc}${count > 1 ? count : ''}${letter}`;
};

test('solution', () => {
  expect(solution('aabbaccc')).toBe(7);
});

test('문자열을 n개 단위로 자른다', () => {
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
  expect(compress(['aa', 'bb', 'ac', 'cc'])).toBe('aabbaccc');
});

test('make', () => {
  expect(make(['', 'a', 2])).toBe('2a');
  expect(make(['2a', 'b', 2])).toBe('2a2b');
  expect(make(['2a2b', 'a', 1])).toBe('2a2ba');
  expect(make(['2a2ba', 'c', 3])).toBe('2a2ba3c');
});
