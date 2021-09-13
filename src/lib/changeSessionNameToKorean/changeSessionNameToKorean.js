const changeSessionNameToKorean = (name) => {
  if (name === 'VOCAL') {
    return '보컬';
  } else if (name === 'ACOUSTIC_GUITAR') {
    return '어쿠스틱 기타';
  } else if (name === 'ELECTRIC_GUITAR') {
    return '일렉 기타';
  } else if (name === 'BASS') {
    return '베이스';
  } else if (name === 'DRUM') {
    return '드럼';
  } else if (name === 'KEYBOARD') {
    return '키보드';
  } else if (name === 'VIOLIN') {
    return '바이올린';
  } else if (name === 'CELLO') {
    return '첼로';
  } else if (name === 'GAYAGEUM') {
    return '가야금';
  } else if (name === 'HAEGEUM') {
    return '해금';
  } else if (name === 'GEOMUNGO') {
    return '거문고';
  } else {
    return '알 수 없는 악기';
  }
};

export { changeSessionNameToKorean };
