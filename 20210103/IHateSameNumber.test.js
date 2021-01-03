const solution = (arr) => {
  return zip(arr, arr.slice(1)).reduce((answer, [first, second]) => {
    if(first !== second) {
      answer.push(first);
    }
    return answer;
  }, []);
}

const zip = (a, b) => {
  return a.map((number, index) => [number, b[index]]);
}

test('solution', () => {
  expect(solution([1, 1, 3, 3, 0, 1, 1])).toEqual([1, 3, 0, 1]);
  expect(solution([4, 4, 4, 3, 3])).toEqual([4, 3]);
  expect(solution([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  expect(solution([0])).toEqual([0]);
})

test('zip two arrays', () => {
  expect(zip([1, 2, 3], [2, 3, 4])).toEqual([[1, 2], [2, 3], [3, 4]]);
  expect(zip([1, 1, 3, 3, 0, 1, 1], [1, 3, 3, 0, 1, 1, ''])).toEqual([
    [1, 1], [1, 3], [3, 3], [3, 0], [0, 1], [1, 1], [1, ''],
  ]);
})