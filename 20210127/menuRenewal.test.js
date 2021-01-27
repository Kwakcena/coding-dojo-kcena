const solution = (orders, courses) => {
  const setMenus = getSetMenus(
    orders.reduce((acc, order) => [...acc, ...combination(order)], [])
  );
  return courses
    .reduce((acc, course) => [...acc, ...getCourseMenus(setMenus, course)], [])
    .sort();
};

const combination = (order) => {
  const result = [];
  const sortedOrder = [...order].sort();
  function go(index, target, n) {
    if (target.length === n) {
      result.push(target.join(''));
      return;
    }
    for (let i = index; i < sortedOrder.length; i++) {
      target.push(sortedOrder[i]);
      go(i + 1, [...target], n);
      target.pop();
    }
  }

  for (let i = 2; i <= sortedOrder.length; i++) {
    go(0, [], i);
  }

  return result;
};

const getSetMenus = (menus) => {
  return menus.reduce(
    (acc, menu) => ({ ...acc, [menu]: (acc[menu] || 0) + 1 }),
    {}
  );
};

const getCourseMenus = (menus, n) => {
  const maxValue = Math.max(
    ...Object.entries(menus).map(([key, value]) => {
      return key.length === n ? value : 0;
    })
  );

  const answer = [];
  if (maxValue < 2) {
    return answer;
  }
  for (const [key, value] of Object.entries(menus)) {
    if (key.length === n && value === maxValue) {
      answer.push(key);
    }
  }
  return answer;
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

test('주문 목록 하나로 나올 수 있는 조합을 모두 구한다', () => {
  expect(combination('ABCFG')).toEqual([
    'AB',
    'AC',
    'AF',
    'AG',
    'BC',
    'BF',
    'BG',
    'CF',
    'CG',
    'FG',
    'ABC',
    'ABF',
    'ABG',
    'ACF',
    'ACG',
    'AFG',
    'BCF',
    'BCG',
    'BFG',
    'CFG',
    'ABCF',
    'ABCG',
    'ABFG',
    'ACFG',
    'BCFG',
    'ABCFG',
  ]);
});

test('세트 목록과 그 목록이 나온 개수를 key - value로 하는 객체를 구한다', () => {
  expect(
    getSetMenus([
      'AB',
      'AC',
      'AF',
      'AG',
      'BC',
      'BF',
      'BG',
      'CF',
      'CG',
      'FG',
      'ABC',
      'ABF',
      'ABG',
      'ACF',
      'ACG',
      'AFG',
      'BCF',
      'BCG',
      'BFG',
      'CFG',
      'ABCF',
      'ABCG',
      'ABFG',
      'ACFG',
      'BCFG',
      'ABCFG',
    ])
  ).toEqual({
    AB: 1,
    AC: 1,
    AF: 1,
    AG: 1,
    BC: 1,
    BF: 1,
    BG: 1,
    CF: 1,
    CG: 1,
    FG: 1,
    ABC: 1,
    ABF: 1,
    ABG: 1,
    ACF: 1,
    ACG: 1,
    AFG: 1,
    BCF: 1,
    BCG: 1,
    BFG: 1,
    CFG: 1,
    ABCF: 1,
    ABCG: 1,
    ABFG: 1,
    ACFG: 1,
    BCFG: 1,
    ABCFG: 1,
  });
});

test('n개의 길이를 갖는 order 중 가장 큰 값의 value를 찾아 반환한다', () => {
  const count = {
    AB: 1,
    AC: 4,
    AF: 1,
    AG: 1,
    BC: 2,
    BF: 2,
    BG: 2,
    CF: 2,
    CG: 2,
    FG: 2,
    ABC: 1,
    ABF: 1,
    ABG: 1,
    ACF: 1,
    ACG: 1,
    AFG: 1,
    BCF: 2,
    BCG: 2,
    BFG: 2,
    CFG: 2,
    ABCF: 1,
    ABCG: 1,
    ABFG: 1,
    ACFG: 1,
    BCFG: 2,
    ABCFG: 1,
    CD: 3,
    CE: 3,
    DE: 3,
    CDE: 3,
    AD: 2,
    AE: 2,
    ACD: 2,
    ACE: 2,
    ADE: 2,
    ACDE: 2,
    AH: 1,
    CH: 1,
    DH: 1,
    EH: 1,
    ACH: 1,
    ADH: 1,
    AEH: 1,
    CDH: 1,
    CEH: 1,
    DEH: 1,
    ACDH: 1,
    ACEH: 1,
    ADEH: 1,
    CDEH: 1,
    ACDEH: 1,
  };
  expect(getCourseMenus(count, 2)).toEqual(['AC']);
  expect(getCourseMenus(count, 3)).toEqual(['CDE']);
  expect(getCourseMenus(count, 4)).toEqual(['BCFG', 'ACDE']);
});
