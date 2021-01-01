const { TestScheduler } = require("jest");

const solution = (numbers) => {
  const answers = new Set();
  for(let i = 0; i < numbers.length - 1; i++) {
    for(let j = i + 1; j < numbers.length; j++) {
      let number = numbers[i] + numbers[j];
      answers.add(number);
    }
  }
  return [...answers].sort((a, b) => a - b);
}

test('solution', () => {
  expect(solution([2, 1, 3, 4, 1])).toEqual([2, 3, 4, 5, 6, 7]);
  expect(solution([5, 0, 2, 7])).toEqual([2, 5, 7, 9, 12]);
  expect(solution([1, 1, 1])).toEqual([2]);
  expect(solution([1, 2, 3, 4, 5])).toEqual([3, 4, 5, 6, 7, 8, 9]);
})