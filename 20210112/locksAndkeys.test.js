const solution = (key, lock) => {
  const newLock = expansionLock(lock);
  const n = lock.length;
  const m = key.length;

  for (let r = 0; r < 4; r++) {
    key = rotateKey(key);
    for (let x = 0; x < n * 2; x++) {
      for (let y = 0; y < n * 2; y++) {
        for (let i = 0; i < m; i++) {
          for (let j = 0; j < m; j++) {
            newLock[x + i][y + j] += key[i][j];
          }
        }

        if (isOpen(newLock)) {
          return true;
        }

        for (let i = 0; i < m; i++) {
          for (let j = 0; j < m; j++) {
            newLock[x + i][y + j] -= key[i][j];
          }
        }
      }
    }
  }
  return false;
};

const expansionLock = (lock) => {
  const { length } = lock;
  const newLock = createArrays(length * 3);
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      newLock[i + length][j + length] = lock[i][j];
    }
  }
  return newLock;
};

const rotateKey = (key) => {
  const { length } = key;
  const newKey = createArrays(length);
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      newKey[i][j] = key[length - 1 - j][i];
    }
  }
  return newKey;
};

const createArrays = (n) => {
  return Array(n)
    .fill(null)
    .map(() => Array(n).fill(0));
};

const isOpen = (lock) => {
  const start = parseInt(lock.length / 3);
  for (let i = start; i < start * 2; i++) {
    for (let j = start; j < start * 2; j++) {
      if (lock[i][j] !== 1) {
        return false;
      }
    }
  }
  return true;
};

test('solution', () => {
  expect(
    solution(
      [
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 1],
      ],
      [
        [1, 1, 1],
        [1, 1, 0],
        [1, 0, 1],
      ]
    )
  ).toBe(true);
});

test('n * n 크기의 0으로 채워진 2차원 배열을 생성한다', () => {
  expect(createArrays(3)).toEqual([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
});

test('lock의 크기를 가로 * 세로에 3배가 되는 크기로 확장한다', () => {
  expect(
    expansionLock([
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ])
  ).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('key를 오른쪽으로 90도 회전한다.', () => {
  expect(
    rotateKey([
      [0, 0, 0],
      [1, 0, 0],
      [0, 1, 1],
    ])
  ).toEqual([
    [0, 1, 0],
    [1, 0, 0],
    [1, 0, 0],
  ]);
  expect(
    rotateKey([
      [0, 1, 0],
      [1, 0, 0],
      [1, 0, 0],
    ])
  ).toEqual([
    [1, 1, 0],
    [0, 0, 1],
    [0, 0, 0],
  ]);
});
