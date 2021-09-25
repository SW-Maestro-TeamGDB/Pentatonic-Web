const changeGenreToKorean = (name) => {
  if (name === 'HIP_HIP') {
    return '힙합';
  } else if (name === 'ELECTRONIC') {
    return '일렉트로닉';
  } else if (name === 'BLUES') {
    return '블루스';
  } else if (name === 'POP') {
    return '팝';
  } else if (name === 'JAZZ') {
    return '재즈';
  } else if (name === 'CALLSICAL') {
    return '클래식';
  } else if (name === 'ROCK') {
    return '락';
  } else if (name === 'DANCE') {
    return '댄스';
  } else if (name === 'BALLAD') {
    return '발라드';
  } else if (name === 'K_POP') {
    return 'KPOP';
  } else {
    return '알 수 없는 장르';
  }
};

export { changeGenreToKorean };
