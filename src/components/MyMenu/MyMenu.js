import react, { useState, useRef, useEffect } from 'react';
import { currentUserVar } from '../../apollo/cache';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MyMenu = (props) => {
  const onClickLogout = () => {
    localStorage.clear();
    currentUserVar(null);
  };
  return (
    <MenuContainer>
      <MenuLink to="/profile">마이페이지</MenuLink>
      <MenuLink to="/liked">좋아요 누른 커버</MenuLink>
      <MenuLink to="/library">라이브러리</MenuLink>
      <MenuButton onClick={onClickLogout}>로그아웃</MenuButton>
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  width: 12em;
  display: flex;
  flex-direction: column;
  color: black;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: fixed;
  z-index: 5;
`;

const MenuLink = styled(Link)`
  color: black;
  padding: 1vh 0;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  z-index: 5;
  &:hover {
    background-color: rgb(230, 230, 230);
    color: black;
  }
`;

const MenuButton = styled.div`
  color: black;
  padding: 1vh 0;
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  z-index: 5;
  cursor: pointer;
  &:hover {
    background-color: rgb(230, 230, 230);
    color: black;
  }
`;

export default MyMenu;
