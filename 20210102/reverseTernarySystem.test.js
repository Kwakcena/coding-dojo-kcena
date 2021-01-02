const solution = (n) => {
  return getDecimal(getTernary(n));
}

const getTernary = (n) => {
  const ternary = [];
  while(n) {
    ternary.push(n % 3);
    n = parseInt(n / 3);
  }
  return ternary.join('');
}

const getDecimal = (n) => {
  return n.split('').reverse().reduce((acc, number, index) => {
    acc += (number * Math.pow(3, index));
    return acc;
  }, 0)
}

test('solution', () => {
  expect(solution(45)).toBe(7);
  expect(solution(125)).toBe(229);
})

test('get reverse ternary system', () => {
  expect(getTernary(45)).toBe('0021');
  expect(getTernary(125)).toBe('22111');
})

test('get decimal number', () => {
  expect(getDecimal('0021')).toBe(7);
  expect(getDecimal('22111')).toBe(229);
})