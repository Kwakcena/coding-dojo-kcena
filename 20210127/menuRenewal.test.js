const solution = (orders, course) => {
  const menus = singleMenus(orders);
  let count = {};
  const answers = [];
  for (let i = 0; i < course.length; i++) {
    const combination = getMenuCombination(menus, course[i]);
    for (let j = 0; j < combination.length; j++) {
      count[combination[j].join('')] = matchCount(orders, combination[j]);
    }
    answers.push(...getMaxValue(count));
    count = {};
  }
  return answers.sort();
};

const singleMenus = (orders) => [...new Set([...orders.join('')].sort())];

const getMenuCombination = (array, n) => {
  const result = [];
  (function go(start, target) {
    if (target.length === n) {
      result.push(target);
      return;
    }
    for (let i = start; i < array.length; i++) {
      target.push(array[i]);
      go(i + 1, [...target]);
      target.pop();
    }
  })(0, []);

  return result;
};

const matchCount = (orders, menus) => {
  let count = 0;
  const check = Array(orders.length).fill(0);
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    for (let j = 0; j < menus.length; j++) {
      const menu = menus[j];
      if (order.includes(menu)) {
        count++;
      }
    }
    if (count === menus.length) {
      check[i] = 1;
    }
    count = 0;
  }
  return check.reduce((acc, v) => acc + v, 0);
};

const getMaxValue = (obj) => {
  const keys = [];
  const maxValue = Math.max(...Object.values(obj));
  if (maxValue <= 1) {
    return [];
  }
  for (const [key, value] of Object.entries(obj)) {
    if (value === maxValue) {
      keys.push(key);
    }
  }
  return keys;
};

test('solution', () => {
  expect(
    solution(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4])
  ).toEqual(['AC', 'ACDE', 'BCFG', 'CDE']);
  expect(
    solution(['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'], [2, 3, 5])
  ).toEqual(['ACD', 'AD', 'ADE', 'CD', 'XYZ']);
  expect(solution(['XYZ', 'XWY', 'WXA'], [2, 3, 4])).toEqual(['WX', 'XY']);
});

test('orders의 문자들을 모두 이어붙여서 set 자료형에 넣어 중복을 제거한다.', () => {
  expect(singleMenus(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'])).toEqual([
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
  ]);
});

test('n개중 r개를 선택한 조합을 만든다', () => {
  expect(
    getMenuCombination(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], 2)
  ).toEqual([
    ['A', 'B'],
    ['A', 'C'],
    ['A', 'D'],
    ['A', 'E'],
    ['A', 'F'],
    ['A', 'G'],
    ['A', 'H'],
    ['B', 'C'],
    ['B', 'D'],
    ['B', 'E'],
    ['B', 'F'],
    ['B', 'G'],
    ['B', 'H'],
    ['C', 'D'],
    ['C', 'E'],
    ['C', 'F'],
    ['C', 'G'],
    ['C', 'H'],
    ['D', 'E'],
    ['D', 'F'],
    ['D', 'G'],
    ['D', 'H'],
    ['E', 'F'],
    ['E', 'G'],
    ['E', 'H'],
    ['F', 'G'],
    ['F', 'H'],
    ['G', 'H'],
  ]);
});

test('orders에 있는 손님 주문 목록과 일치하는 세트 메뉴가 몇개인지 구한다.', () => {
  expect(
    matchCount(['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'], ['A', 'D'])
  ).toBe(3);
  expect(
    matchCount(['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'], ['C', 'D'])
  ).toBe(3);
  expect(
    matchCount(
      ['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'],
      ['A', 'C', 'D']
    )
  ).toBe(2);
  expect(
    matchCount(
      ['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'],
      ['A', 'D', 'E']
    )
  ).toBe(2);
  expect(
    matchCount(
      ['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'],
      ['X', 'Y', 'Z']
    )
  ).toBe(2);
  expect(
    matchCount(['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'], ['A', 'X'])
  ).toBe(0);
});

test('도출된 결과에서 가장 큰 value에 해당하는 key만 뽑아낸다.', () => {
  expect(
    getMaxValue({
      AB: 2,
      AC: 2,
      AD: 3,
      AE: 2,
      AX: 0,
      AY: 0,
      AZ: 0,
      BC: 1,
      BD: 1,
      BE: 1,
      BX: 0,
      BY: 0,
      BZ: 0,
      CD: 3,
      CE: 1,
      CX: 0,
      CY: 0,
      CZ: 0,
      DE: 2,
      DX: 0,
      DY: 0,
      DZ: 0,
      EX: 0,
      EY: 0,
      EZ: 0,
      XY: 2,
      XZ: 2,
      YZ: 2,
    })
  ).toEqual(['AD', 'CD']);
  expect(
    getMaxValue({
      ABC: 1,
      ABD: 1,
      ABE: 1,
      ABX: 0,
      ABY: 0,
      ABZ: 0,
      ACD: 2,
      ACE: 1,
      ACX: 0,
      ACY: 0,
      ACZ: 0,
      ADE: 2,
      ADX: 0,
      ADY: 0,
      ADZ: 0,
      AEX: 0,
      AEY: 0,
      AEZ: 0,
      AXY: 0,
      AXZ: 0,
      AYZ: 0,
      BCD: 1,
      BCE: 1,
      BCX: 0,
      BCY: 0,
      BCZ: 0,
      BDE: 1,
      BDX: 0,
      BDY: 0,
      BDZ: 0,
      BEX: 0,
      BEY: 0,
      BEZ: 0,
      BXY: 0,
      BXZ: 0,
      BYZ: 0,
      CDE: 1,
      CDX: 0,
      CDY: 0,
      CDZ: 0,
      CEX: 0,
      CEY: 0,
      CEZ: 0,
      CXY: 0,
      CXZ: 0,
      CYZ: 0,
      DEX: 0,
      DEY: 0,
      DEZ: 0,
      DXY: 0,
      DXZ: 0,
      DYZ: 0,
      EXY: 0,
      EXZ: 0,
      EYZ: 0,
      XYZ: 2,
    })
  ).toEqual(['ACD', 'ADE', 'XYZ']);
});
