import react, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MyMenu = (props) => {
  const { menuToggle, setMenuToggle, menuRef, onClickMenu } = props;

  return (
    <MenuContainer ref={menuRef}>
      <MenuLink to="/profile" onClick={onClickMenu}>
        마이페이지
      </MenuLink>
      <MenuLink to="/liked" onClick={onClickMenu}>
        좋아요 누른 커버
      </MenuLink>
      <MenuLink to="/library" onClick={onClickMenu}>
        라이브러리
      </MenuLink>
      <MenuLink to="/" onClick={onClickMenu}>
        로그아웃
      </MenuLink>
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

export default MyMenu;
