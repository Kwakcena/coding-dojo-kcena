const solution = (s) => {
  let answer = s.length;
  for(let n = 1; n <= s.length; n++) {
    const { length } = getString(compress(sliceString(s, n)));
    if(length < answer) {
      answer = length;
    }
  }
  return answer;
}

const sliceString = (s, n) => {
  const array = [];
  for(let start = 0; start < s.length; start += n) {
    array.push(s.slice(start, start + n));
  }
  return array;
}

const compress = (array) => {
  const stack = [[1, array[0]]];
  for(let i = 1; i < array.length; i++) {
    const current = [1, array[i]];
    if(isEqual(getTopValue(stack), array[i])) {
      stack[stack.length - 1][0] += 1;
    } else {
      stack.push(current);
    }
  }

  return stack;
}

const isEqual = (a, b) => {
  return a === b;
}

const getTopValue = (array) => {
  return array[array.length - 1][1];
}

const getString = (arrays) => {
  return arrays
    .reduce((acc, array) => [...acc, ...array], [])
    .filter((value) => value !== 1)
    .join('');
}

test('solution', () => {
  expect(solution("aabbaccc")).toBe(7);
  expect(solution("ababcdcdababcdcd")).toBe(9);
  expect(solution("abcabcdede")).toBe(8);
  expect(solution("abcabcabcabcdededededede")).toBe(14);
  expect(solution("xababcdcdababcdcd")).toBe(17);
})

test('slice to n units', () => {
  expect(sliceString('aabbaccc', 1)).toEqual(['a', 'a', 'b', 'b', 'a', 'c', 'c', 'c']);
  expect(sliceString('aabbaccc', 2)).toEqual(['aa', 'bb', 'ac', 'cc']);
  expect(sliceString('aabbaccc', 3)).toEqual(['aab', 'bac', 'cc']);
  expect(sliceString('aabbaccc', 4)).toEqual(['aabb', 'accc']);
  expect(sliceString('ababcdcdababcdcd', 8)).toEqual(['ababcdcd', 'ababcdcd']);
})

test('compress', () => {
  expect(compress(['a', 'a', 'b', 'b', 'a', 'c', 'c', 'c'])).toEqual([[2, "a"], [2, "b"], [1, "a"], [3, "c"]]);
  expect(compress(['aa', 'bb', 'ac', 'cc'])).toEqual([[1, "aa"], [1, "bb"], [1, "ac"], [1, "cc"]]);
  expect(compress(['ababcdcd', 'ababcdcd'])).toEqual([[2, "ababcdcd"]]);
})

test('getString', () => {
  expect(getString([[2, "a"], [2, "b"], [1, "a"], [3, "c"]])).toBe('2a2ba3c');
  expect(getString([[1, "aa"], [1, "bb"], [1, "ac"], [1, "cc"]])).toBe('aabbaccc');
  expect(getString([[2, "ababcdcd"]])).toBe('2ababcdcd');
})
