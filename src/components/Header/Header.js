import react, { useState } from 'react';
import MyMenu from '../MyMenu';

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  return (
    <>
      <div
        style={{ backgroundColor: 'black', color: 'white', textAlign: 'right' }}
      >
        <div
          onClick={() => {
            setMenuToggle(!menuToggle);
            console.log(menuToggle);
          }}
          style={{ fontSize: '3rem', maxidth: 'auto', fontWeight: 'bold' }}
        >
          USER123
        </div>
      </div>
      {menuToggle ? <MyMenu /> : null}
    </>
  );
};

export default Header;
