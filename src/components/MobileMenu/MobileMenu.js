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
        <SubMenuLink to="/lounge/weekly">위클리 챌린지</SubMenuLink>
        <SubMenuLink to="/lounge/band">떠오르는 밴드커버</SubMenuLink>
        <SubMenuLink to="/lounge/solo">떠오르는 솔로커버</SubMenuLink>
        <Divider />
        <MenuLink to="/studio">스튜디오</MenuLink>
        <SubMenuLink to="/studio/band">밴드 커버</SubMenuLink>
        <SubMenuLink to="/studio/solo">솔로 커버</SubMenuLink>
        <Divider />
        <MenuLink to="/artist">아티스트</MenuLink>
        <SubMenuLink to="/artist/rising/band">라이징 밴드</SubMenuLink>
        <SubMenuLink to="/artist/rising/solo">라이징 아티스트</SubMenuLink>
        <SubMenuLink to="/artist/rank/band">밴드 랭킹</SubMenuLink>
        <SubMenuLink to="/artist/rank/solo">아티스트 랭킹</SubMenuLink>
        <Divider />
        <SubMenuLink to="/profile">마이페이지</SubMenuLink>
        <SubMenuLink to="/liked">좋아요 누른 커버</SubMenuLink>
        <SubMenuLink to="/library">라이브러리</SubMenuLink>
        <SubMenuLink to="/">로그아웃</SubMenuLink>
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
  font-weight: 600;
  font-size: 1.1rem;
`;

const SubMenuLink = styled(Link)`
  color: black;
  font-size: 0.8rem;
  font-weight: 500;
  margin: 0.7vh 1rem;
`;

export default MobileMenu;
