const solution = (newId) => {
  const id = newId
    .toLowerCase()
    .replace(/[^\w\d-_.]/g, '')
    .replace(/\.{2,}/g, '.')
    .replace(/^\.|\.$/g, '')
    .padEnd(1, 'a')
    .slice(0, 15)
    .replace(/^\.|\.$/g, '');

  return id.padEnd(3, id[id.length - 1]);
};

test('solution', () => {
  expect(solution('...!@BaT#*..y.abcdefghijklm')).toBe('bat.y.abcdefghi');
  expect(solution('z-+.^.')).toBe('z--');
  expect(solution('=.=')).toBe('aaa');
  expect(solution('123_.def')).toBe('123_.def');
  expect(solution('abcdefghijklmn.p')).toBe('abcdefghijklmn');
});
