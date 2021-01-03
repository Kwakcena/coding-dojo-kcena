const solution = (arr) => {
  const stack = [];
  stack.push(arr[0]);

  for(let i = 1; i < arr.length; i++) {
    if(stack[stack.length - 1] !== arr[i]) {
      stack.push(arr[i]);
    }
  }

  return stack;
}

test('solution', () => {
  expect(solution([1, 1, 3, 3, 0, 1, 1])).toEqual([1, 3, 0, 1]);
  expect(solution([4, 4, 4, 3, 3])).toEqual([4, 3]);
  expect(solution([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  expect(solution([0])).toEqual([0]);
})