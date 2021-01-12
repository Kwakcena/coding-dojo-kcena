const solution = (words, queries) => {
  const answer = [];
  const perfix = getTwoDimensionalArray(10001);
  const suffix = getTwoDimensionalArray(10001);

  for (const word of words) {
    perfix[word.length].push(word);
    suffix[word.length].push(reverseString(word));
  }

  for (let i = 0; i < 10001; i++) {
    perfix[i].sort();
    suffix[i].sort();
  }

  for (const q of queries) {
    let range = 0;
    if (q[0] === '?') {
      range = countByRange(
        suffix[q.length],
        reverseString(q).replace(/\?/g, 'a'),
        reverseString(q).replace(/\?/g, 'z')
      );
    } else {
      range = countByRange(
        perfix[q.length],
        q.replace(/\?/g, 'a'),
        q.replace(/\?/g, 'z')
      );
    }
    answer.push(range);
  }
  return answer;
};

const binarySearch = (target, array) => {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    let mid = Math.floor((high + low) / 2);
    let value = array[mid];

    if (target === value) {
      return mid;
    } else if (value > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return high;
};

const getTwoDimensionalArray = (n) => [...Array(n)].map(() => []);

const countByRange = (data, left, right) =>
  binarySearch(right, data) - binarySearch(left, data);

const reverseString = (string) => string.split('').reverse().join('');

test('solution', () => {
  expect(
    solution(
      ['frodo', 'front', 'frost', 'frozen', 'frame', 'kakao'],
      ['fro??', '????o', 'fr???', 'fro???', 'pro?']
    )
  ).toEqual([3, 2, 4, 1, 0]);
});

test('빈 값으로 채워진 2차원 배열을 만든다', () => {
  expect(getTwoDimensionalArray(5)).toEqual([[], [], [], [], []]);
});

test('이진탐색으로 근사값의 인덱스를 반환한다.', () => {
  expect(binarySearch(4, [2, 3, 5, 10, 11, 16, 21])).toBe(1);
  expect(binarySearch(8, [2, 3, 5, 10, 11, 16, 21])).toBe(2);
  expect(binarySearch(17, [2, 3, 5, 10, 11, 16, 21])).toBe(5);
  expect(
    binarySearch('froaa', ['frame', 'frodo', 'front', 'frost', 'kakao'])
  ).toBe(0);
  expect(
    binarySearch('frozz', ['frame', 'frodo', 'front', 'frost', 'kakao'])
  ).toBe(3);
  expect(
    binarySearch('froda', ['frame', 'frodo', 'front', 'frost', 'kakao'])
  ).toBe(0);
  expect(
    binarySearch('oaaaa', ['emarf', 'oakak', 'odorf', 'tnorf', 'tsorf'])
  ).toBe(0);
  expect(
    binarySearch('ozzzz', ['emarf', 'oakak', 'odorf', 'tnorf', 'tsorf'])
  ).toBe(2);
});

test('범위에 해당하는 단어가 몇개인지 구하는 함수', () => {
  expect(
    countByRange(
      ['frame', 'frodo', 'front', 'frost', 'kakao'],
      'froaa',
      'frozz'
    )
  ).toBe(3);
});

test('문자열을 뒤집는다', () => {
  expect(reverseString('abc')).toBe('cba');
});
