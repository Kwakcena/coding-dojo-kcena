const solution = (newId) => {
  return deduplication(
    sliceId(
      newId
        .toLowerCase()
        .replace(/[~!@#$%^&*()=+\[{\]}:?,<>/A-Z]/g, '')
        .replace(/\.{2,}/g, '.')
        .replace(/^\.|\.$/g, '')
    )
  );
};

const sliceId = (id) => {
  if (id.length === 0) {
    return 'a';
  }
  return id.slice(0, 15).replace(/^\.|\.$/g, '');
};

const deduplication = (id) => {
  while (id.length <= 2) {
    id += id[id.length - 1];
  }
  return id;
};

test('solution', () => {
  expect(solution('...!@BaT#*..y.abcdefghijklm')).toBe('bat.y.abcdefghi');
  expect(solution('z-+.^.')).toBe('z--');
  expect(solution('=.=')).toBe('aaa');
  expect(solution('123_.def')).toBe('123_.def');
  expect(solution('abcdefghijklmn.p')).toBe('abcdefghijklmn');
});
