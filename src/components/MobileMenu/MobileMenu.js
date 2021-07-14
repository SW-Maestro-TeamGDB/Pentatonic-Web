import react, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MobileMenu = (props) => {
  const { setMenuToggle } = props;
  return (
    <MenuContainer onClick={() => setMenuToggle(false)}>
      <MenuBackGround>
        <Divider />
        <MenuLink to="/lounge">라운지</MenuLink>
        <MenuLink to="/studio">스튜디오</MenuLink>
        <MenuLink to="/artist">아티스트</MenuLink>
        <Divider />
        <MenuLink to="/profile">마이페이지</MenuLink>
        <MenuLink to="/liked">좋아요 누른 커버</MenuLink>
        <MenuLink to="/library">라이브러리</MenuLink>
        <MenuLink to="/">로그아웃</MenuLink>
      </MenuBackGround>
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const MenuBackGround = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
  position: absolute;
  color: black;
  background-color: white;
  left: 0;
  width: 40%;
  height: 100%;
  border: 1px solid lightgray;
  align-items: center;
`;

const Divider = styled.div`
  width: 80%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.3);
  margin: 2vh 0;
`;

const MenuLink = styled(Link)`
  color: black;
  margin: 1vh 0;
  text-align: center;
  font-weight: 400;
  font-size: 0.8rem;
`;

export default MobileMenu;
