import react, { useState } from 'react';
import { Default, Mobile } from '../../lib/Media';
import MyMenu from '../MyMenu';
import MobileMyMenu from '../MobileMyMenu/MobileMyMenu';

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <>
      <Default>
        <div
          style={{
            backgroundColor: 'black',
            color: 'white',
            textAlign: 'right',
          }}
        >
          <div
            onClick={() => {
              setMenuToggle(!menuToggle);
            }}
            style={{ fontSize: '3rem', maxidth: 'auto', fontWeight: 'bold' }}
          >
            USER123
          </div>
        </div>
        {menuToggle ? <MyMenu /> : null}
      </Default>
      <Mobile>
        {menuToggle ? (
          <MobileMyMenu menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
        ) : null}
        <div
          style={{
            color: 'black',
            textAlign: 'right',
            display: 'flex',
            height: '8vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ position: 'absolute', left: '5vw' }}>
            <button
              onClick={() => {
                setMenuToggle(!menuToggle);
                console.log(menuToggle);
              }}
            >
              =
            </button>
          </div>
          <div
            style={{ fontSize: '2rem', maxidth: 'auto', fontWeight: 'bold' }}
          >
            Pentatonic
          </div>
        </div>
      </Mobile>
    </>
  );
};

export default Header;
