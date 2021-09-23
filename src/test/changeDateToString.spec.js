const { changeDateToString } = require('../lib/changeDateToString');

test('change session name to Korean', () => {
  expect(changeDateToString(new Date())).toBe('방금전');
});
