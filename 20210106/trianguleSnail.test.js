const solution  = (n) => {
  const arrays = createArrays(n);
  moveSnail(arrays, n);
  return convert(arrays);
}

const createArrays = (n) =>
  Array.from(Array(n), () => Array(n).fill(0));

const convert = (arrays) => {
  return arrays.
    reduce((acc, array) => [...acc, ...array])
    .filter((value) => value !== 0);
}

const moveSnail = (arrays, n) => {
  const dy = [1, 0, -1];
  const dx = [0, 1, -1];

  let value = 1;
  let i = -1, j = 0;

  for(let r = 0; r < n; r += 1) {
    let repeat = n - r;
    while(repeat) {
      i += dy[r % 3];
      j += dx[r % 3];

      arrays[i][j] = value;
      value++;
      repeat--;
    }
  }
}

test('solution', () => {
  expect(solution(4)).toEqual([1, 2, 9, 3, 10, 8, 4, 5, 6, 7])
  expect(solution(5)).toEqual([1, 2, 12, 3, 13, 11, 4, 14, 15, 10, 5, 6, 7, 8, 9])
  expect(solution(6)).toEqual([1, 2, 15, 3, 16, 14, 4, 17, 21, 13, 5, 18, 19, 20, 12, 6, 7, 8, 9, 10, 11])
})