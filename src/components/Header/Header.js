import react, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Dropdown, Drawer } from 'antd';
import { Default, Mobile, media } from '../../lib/Media';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MyMenu from '../MyMenu';
import MobileMenu from '../MobileMenu/MobileMenu';

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const myMenu = (
    <MenuContainer>
      <MenuLink to="/profile">마이페이지</MenuLink>
      <MenuLink to="/liked">좋아요 누른 커버</MenuLink>
      <MenuLink to="/library">라이브러리</MenuLink>
      <MenuLink to="/">로그아웃</MenuLink>
    </MenuContainer>
  );

  const showDrawer = () => {
    setMenuToggle(true);
  };
  const onClose = () => {
    setMenuToggle(false);
  };

  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  return (
    <Fixed>
      <HeaderContainer>
        <Mobile>
          <CustomDrawer
            placement="left"
            closable={false}
            onClose={onClose}
            visible={menuToggle}
          >
            <MobileMenu onClose={onClose} />
          </CustomDrawer>
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
          <CustomDropdown
            overlay={MyMenu}
            trigger={['click']}
            placement="bottomCenter"
          >
            <UserName>USER123</UserName>
          </CustomDropdown>
        </Default>
      </HeaderContainer>
    </Fixed>
  );
};

const Fixed = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 4;
`;

const CustomDropdown = styled(Dropdown)`
  position: absolute;
  right: 2vw;
  height: 100%;
  display: flex;
  align-items: center;
`;

const CustomDrawer = styled(Drawer)``;

const UserImg = styled.img``;

const UserName = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const HeaderContainer = styled.div`
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;

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

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  color: black;
  background-color: white;
  right: 1vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 1.5vh 0;
  width: 10rem;
  transform: translateY(3.5rem);
`;

const MenuLink = styled(Link)`
  color: black;
  padding: 1vh 0;
  text-align: center;
  font-weight: 400;

  &:hover {
    background-color: rgb(230, 230, 230);
  }
`;

export default Header;
