const solution = (s, n) => {
  const lowerCases = createList(26, 97);
  const upperCases = createList(26, 65);

  return s.split('').reduce((code, char) => {
    const array = upperCases.includes(char) ? upperCases : lowerCases;
    return code + getCaesarCode(array, char, n);
  }, '')
}

const createList = (length, startAscii) => {
  return Array(length)
    .fill(0).map((_, i) => String.fromCharCode(i + startAscii));
}

const getCaesarCode = (array, find, n) => {
  if(find === ' ') {
    return ' ';
  }
  return array[(array.findIndex((value) => value === find) + n) % array.length];
}

test('solution', () => {
  expect(solution('AB', 1)).toBe('BC');
  expect(solution('z', 1)).toBe('a');
  expect(solution('z', 3)).toBe('c');
  expect(solution('Z', 2)).toBe('B');
  expect(solution('a B z', 4)).toBe('e F d');
  expect(solution('    ', 4)).toBe('    ');
  expect(solution('z', 25)).toBe('y');
  expect(solution('y', 25)).toBe('x');
  expect(solution('AaZz', 25)).toBe('ZzYy');
})

test('Create alpabet list', () => {
  expect(createList(26, 97)).toEqual([
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  ])
  expect(createList(26, 65)).toEqual([ 
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  ]);
})

test('Get caesar code when lowercase', () => {
  expect(getCaesarCode(createList(26, 97), 'z', 1)).toBe('a');
  expect(getCaesarCode(createList(26, 97), 'a', 1)).toBe('b');
  expect(getCaesarCode(createList(26, 97), 'y', 1)).toBe('z');
  expect(getCaesarCode(createList(26, 97), 'y', 2)).toBe('a');
})

test('Get caesar code when uppercase', () => {
  expect(getCaesarCode(createList(26, 65), 'A', 1)).toBe('B');
  expect(getCaesarCode(createList(26, 65), 'B', 1)).toBe('C');
  expect(getCaesarCode(createList(26, 65), 'Z', 1)).toBe('A');
  expect(getCaesarCode(createList(26, 65), 'Y', 2)).toBe('A');
})

test('Get caesar code when character empty space', () => {
  expect(getCaesarCode(createList(26, 65), ' ', 1)).toBe(' ');
  expect(getCaesarCode(createList(26, 97), ' ', 1)).toBe(' ');

})