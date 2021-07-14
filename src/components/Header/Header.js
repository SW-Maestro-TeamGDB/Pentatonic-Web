import react, { useState } from 'react';
import { Default, Mobile } from '../../lib/Media';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MyMenu from '../MyMenu';
import MobileMyMenu from '../MobileMyMenu/MobileMyMenu';

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <>
      <Default>
        <HeaderContainer>
          <LogoContainer>
            <LogoLink to="/">Pentatonic</LogoLink>
          </LogoContainer>
          <LoginContainer
            onClick={() => {
              setMenuToggle(!menuToggle);
            }}
          >
            USER123
          </LoginContainer>
        </HeaderContainer>
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
              ☰
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

const HeaderContainer = styled.div`
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 8vh;

  // 드래그 방지
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;

const LogoContainer = styled.div`
  margin-left: 1.5vw;
`;

const LogoLink = styled(Link)`
  font-size: 2.5rem;
  font-weight: bolder;
  color: white;
`;

const LoginContainer = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-right: 1.5vw;
  cursor: pointer;
`;

export default Header;
