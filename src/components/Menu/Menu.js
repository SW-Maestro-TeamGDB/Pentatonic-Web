import react from 'react';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <Default>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Link to="/lounge">
          <h2>라운지</h2>
        </Link>
        <Link to="/studio">
          <h2>연습실</h2>
        </Link>
        <Link to="/artist">
          <h2>아티스트</h2>
        </Link>
      </div>
    </Default>
  );
};

export default Menu;
