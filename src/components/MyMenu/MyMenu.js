import react, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MyMenu = () => {
  return (
    <MenuContainer>
      <MenuLink to="/profile">마이페이지</MenuLink>
      <MenuLink to="/liked">좋아요 누른 커버</MenuLink>
      <MenuLink to="/library">라이브러리</MenuLink>
      <MenuLink to="/">로그아웃</MenuLink>
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  position: absolute;
  color: black;
  background-color: white;
  right: 1vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 1.5vh 1vw;
  width: 10rem;
  transform: translateY(3.5rem);
`;

const MenuLink = styled(Link)`
  color: black;
  margin: 1vh 0;
  text-align: center;
  font-weight: 400;
`;

export default MyMenu;
