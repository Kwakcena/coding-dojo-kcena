const solution = (arr) => arr.filter((number, index) => number !== arr[index + 1]);

test('solution', () => {
  expect(solution([1, 1, 3, 3, 0, 1, 1])).toEqual([1, 3, 0, 1]);
  expect(solution([4, 4, 4, 3, 3])).toEqual([4, 3]);
  expect(solution([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  expect(solution([0])).toEqual([0]);
})