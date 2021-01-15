const solution = (n, frames) => {
  let answer = [];
  for (const [x, y, a, command] of frames) {
    if (command === 1) {
      answer.push([x, y, a]);
      if (!isPossibleBuild(answer)) {
        answer.pop();
      }
    } else {
      answer = answer.filter((array) => !isEqual(array, [x, y, a, command]));
      if (!isPossibleBuild(answer)) {
        answer.push([x, y, a]);
      }
    }
  }
  return sortAnswer(answer);
};

const isEqual = (a, b) => {
  return a.every((v, i) => v === b[i]);
};

const isPossibleBuild = (arrays) => {
  for (const [x, y, item] of arrays) {
    if (item === 0) {
      if (isPossibleColumn(arrays, [x, y])) {
        continue;
      } else return false;
    } else {
      if (isPossibleCeil(arrays, [x, y])) {
        continue;
      } else return false;
    }
  }
  return true;
};

const isPossibleColumn = (arrays, build) => {
  const [x, y] = build;
  if (y === 0) {
    return true;
  }
  if (
    isIncludes(arrays, [x - 1, y, 1, 1]) ||
    isIncludes(arrays, [x, y, 1, 1])
  ) {
    return true;
  }
  if (isIncludes(arrays, [x, y - 1, 0, 1])) {
    return true;
  }
  return false;
};

const isPossibleCeil = (arrays, build) => {
  const [x, y] = build;
  if (
    isIncludes(arrays, [x, y - 1, 0, 1]) ||
    isIncludes(arrays, [x + 1, y - 1, 0, 1])
  ) {
    return true;
  }
  if (
    isIncludes(arrays, [x - 1, y, 1, 1]) &&
    isIncludes(arrays, [x + 1, y, 1, 1])
  ) {
    return true;
  }
  return false;
};

const isIncludes = (arrays, findArray) => {
  return arrays.find((array) => array.every((v, i) => v === findArray[i]))
    ? true
    : false;
};

const sortAnswer = (arrays) => {
  function process(a, b) {
    return a[0] < b[0]
      ? -1
      : a[0] > b[0]
      ? 1
      : a[1] < b[1]
      ? -1
      : a[1] > b[1]
      ? 1
      : a[2] === 0
      ? -1
      : 0;
  }
  return arrays.sort(process);
};

test('solution', () => {
  expect(
    solution(5, [
      [0, 0, 0, 1],
      [2, 0, 0, 1],
      [4, 0, 0, 1],
      [0, 1, 1, 1],
      [1, 1, 1, 1],
      [2, 1, 1, 1],
      [3, 1, 1, 1],
      [2, 0, 0, 0],
      [1, 1, 1, 0],
      [2, 2, 0, 1],
    ])
  ).toEqual([
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 1],
    [2, 1, 1],
    [3, 1, 1],
    [4, 0, 0],
  ]);
  expect(
    solution(5, [
      [1, 0, 0, 1],
      [1, 1, 1, 1],
      [2, 1, 0, 1],
      [2, 2, 1, 1],
      [5, 0, 0, 1],
      [5, 1, 0, 1],
      [4, 2, 1, 1],
      [3, 2, 1, 1],
    ])
  ).toEqual([
    [1, 0, 0],
    [1, 1, 1],
    [2, 1, 0],
    [2, 2, 1],
    [3, 2, 1],
    [4, 2, 1],
    [5, 0, 0],
    [5, 1, 0],
  ]);
});

test('정렬하기', () => {
  expect(
    sortAnswer([
      [0, 0, 0],
      [4, 0, 0],
      [0, 1, 1],
      [2, 1, 1],
      [3, 1, 1],
      [1, 1, 1],
    ])
  ).toEqual([
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 1],
    [2, 1, 1],
    [3, 1, 1],
    [4, 0, 0],
  ]);
  expect(
    sortAnswer([
      [1, 0, 1],
      [1, 0, 0],
      [0, 0, 1],
      [0, 0, 0],
    ])
  ).toEqual([
    [0, 0, 0],
    [0, 0, 1],
    [1, 0, 0],
    [1, 0, 1],
  ]);
});

test('같은지 검사한다', () => {
  expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
  expect(isEqual([1, 2, 3], [1, 2, 2])).toBe(false);
});

describe('기둥을 설치하려면', () => {
  it('바닥 위에 있어야 한다', () => {
    expect(isPossibleColumn([[]], [1, 0, 0, 1])).toBe(true);
  });

  it('다른 보 위에 있어야 한다.', () => {
    expect(
      isPossibleColumn(
        [
          [0, 0, 0, 1],
          [2, 0, 0, 1],
          [4, 0, 0, 1],
          [0, 1, 1, 1],
          [1, 1, 1, 1],
          [2, 1, 1, 1],
          [3, 1, 1, 1],
        ],
        [1, 1, 0, 1]
      )
    ).toBe(true);
  });

  it('다른 기둥 위에 있어야 한다', () => {
    expect(
      isPossibleColumn(
        [
          [0, 0, 0, 1],
          [2, 0, 0, 1],
          [4, 0, 0, 1],
        ],
        [2, 1, 0, 1]
      )
    ).toBe(true);
  });
});

test('2차원 배열 내에서 배열 찾기', () => {
  expect(
    isIncludes(
      [
        [0, 0, 0, 1],
        [2, 0, 0, 1],
        [4, 0, 0, 1],
        [0, 1, 1, 1],
        [1, 1, 1, 1],
        [2, 1, 1, 1],
        [3, 1, 1, 1],
      ],
      [0, 1, 1, 1]
    )
  ).toBe(true);
});

describe('보를 설치하려면', () => {
  it('한쪽 끝 부분이 기둥 위에 있어야 한다', () => {
    expect(
      isPossibleCeil(
        [
          [0, 0, 0, 1],
          [2, 0, 0, 1],
          [4, 0, 0, 1],
        ],
        [0, 1, 1, 1]
      )
    ).toBe(true);
    expect(
      isPossibleCeil(
        [
          [0, 0, 0, 1],
          [2, 0, 0, 1],
          [4, 0, 0, 1],
        ],
        [1, 1, 1, 1]
      )
    ).toBe(true);
    expect(
      isPossibleCeil(
        [
          [0, 0, 0, 1],
          [2, 0, 0, 1],
          [4, 0, 0, 1],
        ],
        [2, 2, 1, 1]
      )
    ).toBe(false);
  });

  it('양쪽 끝 부분이 다른 보와 동시에 연결되어 있어야 한다', () => {
    expect(
      isPossibleCeil(
        [
          [0, 0, 0, 1],
          [0, 1, 1, 1],
          [3, 0, 0, 1],
          [2, 1, 1, 1],
        ],
        [1, 1, 1, 1]
      )
    ).toBe(true);
    expect(
      isPossibleCeil(
        [
          [0, 0, 0, 1],
          [0, 1, 1, 1],
          [3, 0, 0, 1],
        ],
        [1, 1, 1, 1]
      )
    ).toBe(false);
  });
});

test('현재까지 추가한 구조물이 가능한 구조물인지 검사한다', () => {
  expect(isPossibleBuild([[0, 0, 0]])).toBe(true);
  expect(
    isPossibleBuild([
      [0, 0, 0, 1],
      [2, 0, 0, 1],
    ])
  ).toBe(true);
  expect(
    isPossibleBuild([
      [0, 0, 0],
      [2, 0, 0],
      [4, 0, 0],
      [0, 1, 1],
      [1, 1, 1],
      [2, 1, 1],
      [3, 1, 1],
    ])
  ).toBe(true);
  expect(
    isPossibleBuild([
      [0, 0, 0],
      [4, 0, 0],
      [0, 1, 1],
      [1, 1, 1],
      [2, 1, 1],
      [3, 1, 1],
    ])
  ).toBe(true);
  expect(
    isPossibleBuild([
      [0, 0, 0],
      [4, 0, 0],
      [0, 1, 1],
      [2, 1, 1],
      [3, 1, 1],
    ])
  ).toBe(false);
});
