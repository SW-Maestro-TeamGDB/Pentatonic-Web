import react, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MyMenu = (props) => {
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
  color: black;
  background-color: white;
  width: 8vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const MenuLink = styled(Link)`
  color: black;
  padding: 1vh 0;
  text-align: center;
  font-weight: 400;
  font-size: 16px;

  &:hover {
    background-color: rgb(230, 230, 230);
    color: black;
  }
`;

export default MyMenu;
