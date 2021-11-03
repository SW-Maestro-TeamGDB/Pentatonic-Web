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
  } else if (name === 'FREE') {
    return '그 외 악기';
  } else if (name === 'PIANO') {
    return '피아노';
  } else if (name === 'TRUMPET') {
    return '트럼펫';
  } else if (name === 'CLARINET') {
    return '클라리넷';
  } else if (name === 'FLUTE') {
    return '플룻';
  } else {
    return '알 수 없는 악기';
  }
};

export { changeSessionNameToKorean };
