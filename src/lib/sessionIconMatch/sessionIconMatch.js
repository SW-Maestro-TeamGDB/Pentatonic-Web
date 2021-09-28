import drum from '../../images/Session/drum.svg';
import guitar from '../../images/Session/guitar.svg';
import piano from '../../images/Session/piano.svg';
import vocal from '../../images/Session/vocal.svg';

const sessionIconMatch = (position) => {
  if (position === 'ACOUSTIC_GUITAR') return guitar;
  else if (position === 'DRUM') return drum;
  else if (position === 'PIANO') return piano;
  else if (position === 'VOCAL') return vocal;
  else return guitar;
};

export { sessionIconMatch };
