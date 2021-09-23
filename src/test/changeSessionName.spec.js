const {
  changeSessionNameToKorean,
} = require('../lib/changeSessionNameToKorean');

test('change session name to Korean', () => {
  expect(changeSessionNameToKorean('VOCAL')).toBe('보컬');
  expect(changeSessionNameToKorean('ELECTRIC_GUITAR')).toBe('일렉 기타');
  expect(changeSessionNameToKorean('ACOUSTIC_GUITAR')).toBe('어쿠스틱 기타');
  expect(changeSessionNameToKorean('BASS')).toBe('베이스');
  expect(changeSessionNameToKorean('DRUM')).toBe('드럼');
  expect(changeSessionNameToKorean('KEYBOARD')).toBe('키보드');
  expect(changeSessionNameToKorean('VIOLIN')).toBe('바이올린');
  expect(changeSessionNameToKorean('CELLO')).toBe('첼로');
  expect(changeSessionNameToKorean('GAYAGEUM')).toBe('가야금');
  expect(changeSessionNameToKorean('HAEGEUM')).toBe('해금');
  expect(changeSessionNameToKorean('GEOMUNGO')).toBe('거문고');
  expect(changeSessionNameToKorean('JONGMINFIRE')).toBe('알 수 없는 악기');
});
