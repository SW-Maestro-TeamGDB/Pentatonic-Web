import drum from '../../images/Session/drum.svg';
import guitar from '../../images/Session/guitar.svg';
import piano from '../../images/Session/piano.svg';
import vocal from '../../images/Session/vocal.svg';
import bass from '../../images/Session/bass.svg';
import cello from '../../images/Session/cello.png';
import electric_guitar from '../../images/Session/electric_guitar.png';
import gayaguem from '../../images/Session/gayaguem.png';
import haeguem from '../../images/Session/haeguem.png';
import violin from '../../images/Session/violin.png';

const sessionIconMatch = (position) => {
  if (position === 'ACOUSTIC_GUITAR') return guitar;
  else if (position === 'DRUM') return drum;
  else if (position === 'KEYBOARD') return piano;
  else if (position === 'VOCAL') return vocal;
  else if (position === 'BASS') return bass;
  else if (position === 'CELLO') return cello;
  else if (position === 'ELECTRIC_GUITAR') return electric_guitar;
  else if (position === 'GAYAGEUM') return gayaguem;
  else if (position === 'HAEGEUM') return haeguem;
  else if (position === 'VIOLIN') return violin;
  else return null;
};

export { sessionIconMatch };
