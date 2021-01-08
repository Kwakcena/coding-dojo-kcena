const solution = (s) => {
  let answer = s.length;
  for(let i = 1; i <= s.length; i++) {
    const { length } = compress(process(sliceString(s, i)));
    if(answer > length) {
      answer = length;
    }
  }
  return answer;
}

const sliceString = (s, n) => {
  return Array(Math.ceil(s.length / n))
    .fill(0)
    .map((_, i) => ({ string: s.slice(i * n, i * n + n), count: 1 }))
}

const compress = (arrays) => {
  return arrays.reduce((acc, { string, count }) => (
    acc + `${count !== 1 ? count : ''}${string}`
  ), '')
}

const process = (arrays) => {
  for(let i = 1; i < arrays.length; i++) {
    if(arrays[i].string === arrays[i - 1].string) {
      arrays[i - 1].string = '';
      arrays[i].count = arrays[i - 1].count + 1;
    }
  }
  return arrays.filter(({ string }) => string);
}

test('solution', () => {
  expect(solution('aabbaccc')).toBe(7);
  expect(solution('ababcdcdababcdcd')).toBe(9);
  expect(solution('abcabcdede')).toBe(8);
  expect(solution('abcabcabcabcdededededede')).toBe(14);
  expect(solution('xababcdcdababcdcd')).toBe(17);
})

test('slice', () => {
  expect(sliceString('aabbaccc', 2)).toEqual([
    { string: 'aa', count: 1 }, 
    { string: 'bb', count: 1 }, 
    { string: 'ac', count: 1 }, 
    { string: 'cc', count: 1 },
  ])
  expect(sliceString('aabbaccc', 3)).toEqual([
    { string: 'aab', count: 1 }, 
    { string: 'bac', count: 1 }, 
    { string: 'cc', count: 1 },
  ])
})

test('process', () => {
  expect(process([
    { string: 'a', count: 1 }, 
    { string: 'a', count: 1 }, 
    { string: 'b', count: 1 }, 
    { string: 'b', count: 1 },
    { string: 'a', count: 1 },
    { string: 'c', count: 1 },
    { string: 'c', count: 1 },
    { string: 'c', count: 1 },
  ])).toEqual([
    { string: 'a', count: 2 }, 
    { string: 'b', count: 2 },
    { string: 'a', count: 1 },
    { string: 'c', count: 3 },
  ])
})

test('compress', () => {
  expect(compress([
    { string: 'a', count: 2 }, 
    { string: 'b', count: 2 },
    { string: 'a', count: 1 },
    { string: 'c', count: 3 },
  ])).toBe('2a2ba3c');
})