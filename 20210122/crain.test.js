const solution = (boards, moves) => {
  const newBoards = zeroFilter(rotate(boards));
  const stack = [];
  const getTop = (array) => (array.length ? array[array.length - 1] : 0);

  let count = 0;
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    const doll = newBoards[move - 1].shift() || 0;

    if (getTop(stack) === 0) {
      stack.push(doll);
    } else if (doll !== 0) {
      if (getTop(stack) !== doll) {
        stack.push(doll);
      } else {
        stack.pop();
        count += 1;
      }
    }
  }

  return count * 2;
};

const rotate = (boards) => {
  const len = boards.length;
  const newBoards = [...Array(len)].map(() => []);

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      newBoards[j][len - i - 1] = boards[i][j];
    }
  }

  return newBoards;
};

const zeroFilter = (boards) => {
  return boards.reduce(
    (acc, board) => [...acc, board.filter((value) => value !== 0).reverse()],
    []
  );
};

test('solution', () => {
  expect(
    solution(
      [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 3],
        [0, 2, 5, 0, 1],
        [4, 2, 4, 4, 2],
        [3, 5, 1, 3, 1],
      ],
      [1, 5, 3, 5, 1, 2, 1, 4]
    )
  ).toBe(4);
});

test('rotate 90 degree', () => {
  expect(
    rotate([
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [4, 2, 4, 4, 2],
      [3, 5, 1, 3, 1],
    ])
  ).toEqual([
    [3, 4, 0, 0, 0],
    [5, 2, 2, 0, 0],
    [1, 4, 5, 1, 0],
    [3, 4, 0, 0, 0],
    [1, 2, 1, 3, 0],
  ]);
});

test('filter zero value in new boards', () => {
  expect(
    zeroFilter([
      [3, 4, 0, 0, 0],
      [5, 2, 2, 0, 0],
      [1, 4, 5, 1, 0],
      [3, 4, 0, 0, 0],
      [1, 2, 1, 3, 0],
    ])
  ).toEqual([
    [4, 3],
    [2, 2, 5],
    [1, 5, 4, 1],
    [4, 3],
    [3, 1, 2, 1],
  ]);
});
