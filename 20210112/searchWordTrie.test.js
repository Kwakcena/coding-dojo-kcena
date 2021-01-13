class Node {
  constructor() {
    this.keys = new Map();
    this.end = false;
    this.total = 0;
  }

  setEnd() {
    this.end = true;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  add(word) {
    let node = this.root;

    node.total++;
    for (const letter of word) {
      if (!node.keys.has(letter)) {
        node.keys.set(letter, new Node());
      }

      node = node.keys.get(letter);
      node.total++;
    }
  }

  getTotal(word) {
    let node = this.root;
    for (const letter of word) {
      if (letter === '?') {
        return node.total;
      }

      if (!node.keys.has(letter)) {
        return 0;
      }
      node = node.keys.get(letter);
    }
  }
}

const solution = (words, queries) => {
  const prefixTrie = {};
  const suffixTrie = {};

  for (const word of words) {
    const { length } = word;
    if (!prefixTrie[length]) {
      prefixTrie[length] = new Trie();
      suffixTrie[length] = new Trie();
    }

    prefixTrie[length].add(word);
    suffixTrie[length].add(reverseString(word));
  }

  return queries.map((q) => {
    const { length } = q;
    if (!prefixTrie[length]) {
      return 0;
    }

    if (q[0] === '?') {
      return suffixTrie[length].getTotal(reverseString(q));
    }
    return prefixTrie[length].getTotal(q);
  });
};

const reverseString = (s) => s.split('').reverse().join('');

describe('Trie 자료구조로 푸는 가사 검색 문제', () => {
  it('solution', () => {
    expect(
      solution(
        ['frodo', 'front', 'frost', 'frozen', 'frame', 'kakao'],
        ['fro??', '????o', 'fr???', 'fro???', 'pro?']
      )
    ).toEqual([3, 2, 4, 1, 0]);
  });

  it('문자열 뒤집기', () => {
    expect(reverseString('????o')).toBe('o????');
    expect(reverseString('abab')).toBe('baba');
  });

  it('일부 단어가 포함된 단어의 개수를 구한다', () => {
    const myTrie = new Trie();
    ['frodo', 'front', 'frost', 'frozen', 'frame', 'kakao'].forEach((word) => {
      myTrie.add(word);
    });

    expect(myTrie.getTotal('fro??')).toBe(4);
  });
});
