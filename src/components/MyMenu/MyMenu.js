import react, { useState, useRef, useEffect } from 'react';
import { currentUserVar, isLoggedInVar } from '../../apollo/cache';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MyMenu = (props) => {
  const onClickLogout = () => {
    localStorage.clear();
    currentUserVar(null);
    isLoggedInVar(false);
  };

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <MenuContainer>
      <MenuLink to={`/profile/${userInfo.id}`}>마이페이지</MenuLink>
      <MenuLink to="/liked">좋아요 누른 커버</MenuLink>
      <MenuLink to="/library">라이브러리</MenuLink>
      <MenuButton onClick={onClickLogout}>로그아웃</MenuButton>
    </MenuContainer>
  );
};

const MenuSpacing = styled.div`
  height: 1rem;
`;

const MenuContainer = styled.div`
  width: 12em;
  display: flex;
  flex-direction: column;
  color: black;
  background-color: white;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); */
  box-shadow: 0 2px 0px rgba(0, 0, 0, 0.3);
  position: fixed;
  z-index: 5;
  transform: translate(-20%);
  border-radius: 1rem;
  padding: 0.5rem 0;
`;

const MenuLink = styled(Link)`
  color: black;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 10px;
  line-height: 1.13;
  letter-spacing: -0.4px;
  width: 100%;
  text-align: center;
  transition: background-color 0.1s ease-in-out;
  border-radius: 3px;

  &:hover {
    color: rgb(60, 60, 60);
    background-color: rgba(200, 200, 200, 0.5);
  }
`;

const MenuButton = styled.div`
  color: black;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 10px;
  line-height: 1.13;
  letter-spacing: -0.4px;
  width: 100%;
  text-align: center;
  transition: background-color 0.1s ease-in-out;
  border-radius: 3px;

  &:hover {
    color: rgb(60, 60, 60);
    background-color: rgba(200, 200, 200, 0.5);
  }
  cursor: pointer;
`;

export default MyMenu;
