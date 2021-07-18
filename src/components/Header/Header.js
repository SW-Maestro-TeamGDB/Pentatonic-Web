import react, { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Default, Mobile, media } from '../../lib/Media';
import { Link } from 'react-router-dom';
import { Drawer } from 'antd-mobile';
import styled from 'styled-components';
import MyMenu from '../MyMenu';
import MobileMenu from '../MobileMenu/MobileMenu';

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const onClickMenu = () => {
    setMenuToggle(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuToggle(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const showMenu = () => {
    console.log(isMobile);
    if (!isMobile) {
      return (
        <MyMenu
          menuToggle={menuToggle}
          setMenuToggle={setMenuToggle}
          menuRef={menuRef}
          onClickMenu={onClickMenu}
        />
      );
    } else {
      return (
        <MobileMenu
          menuToggle={menuToggle}
          setMenuToggle={setMenuToggle}
          menuRef={menuRef}
          onClickMenu={onClickMenu}
        />
      );
    }
  };

  return (
    <>
      {menuToggle ? showMenu() : null}
      <HeaderContainer>
        <Mobile>
          <MobileMenuButton
            onClick={() => {
              setMenuToggle(!menuToggle);
            }}
          >
            ☰
          </MobileMenuButton>
        </Mobile>
        <LogoContainer>
          <LogoLink to="/">Pentatonic</LogoLink>
        </LogoContainer>
        <Default>
          <LoginContainer
            onClick={() => {
              setMenuToggle(!menuToggle);
            }}
            ref={buttonRef}
          >
            USER123
          </LoginContainer>
        </Default>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.div`
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;

  // 드래그 방지
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;

  ${media.small} {
    background-color: white;
    text-align: right;
    display: flex;
    height: 8vh;
    justify-content: center;
    align-items: center;
    color: black;
  }
`;

const MobileMenuButton = styled.div`
  position: absolute;
  left: 5vw;
  font-size: 1.5rem;
  color: black;
`;

const LogoContainer = styled.div`
  margin-left: 1.5vw;
`;

const LogoLink = styled(Link)`
  font-size: 1.8rem;
  font-weight: bolder;
  color: white;

  ${media.small} {
    color: black;
    font-size: 2rem;
    font-weight: 900;
  }
`;

const LoginContainer = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-right: 1.5vw;
  cursor: pointer;
`;

export default Header;
