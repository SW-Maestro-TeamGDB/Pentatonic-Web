import react, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MobileMenu = (props) => {
  const { onClose } = props;
  return (
    <MenuContents>
      <MenuLink to="/lounge" onClick={() => onClose()}>
        라운지
      </MenuLink>
      <SubMenuLink to="/lounge/weekly" onClick={() => onClose()}>
        위클리 챌린지
      </SubMenuLink>
      <SubMenuLink to="/lounge/band" onClick={() => onClose()}>
        떠오르는 밴드커버
      </SubMenuLink>
      <SubMenuLink to="/lounge/solo" onClick={() => onClose()}>
        떠오르는 솔로커버
      </SubMenuLink>
      <Divider />
      <MenuLink to="/studio" onClick={() => onClose()}>
        스튜디오
      </MenuLink>
      <SubMenuLink to="/studio/band" onClick={() => onClose()}>
        밴드 커버
      </SubMenuLink>
      <SubMenuLink to="/studio/solo" onClick={() => onClose()}>
        솔로 커버
      </SubMenuLink>
      <Divider />
      <MenuLink to="/artist" onClick={() => onClose()}>
        아티스트
      </MenuLink>
      <SubMenuLink to="/artist/rising/band" onClick={() => onClose()}>
        라이징 밴드
      </SubMenuLink>
      <SubMenuLink to="/artist/rising/solo" onClick={() => onClose()}>
        라이징 아티스트
      </SubMenuLink>
      <SubMenuLink to="/artist/rank/band" onClick={() => onClose()}>
        밴드 랭킹
      </SubMenuLink>
      <SubMenuLink to="/artist/rank/solo" onClick={() => onClose()}>
        아티스트 랭킹
      </SubMenuLink>
      <Divider />
      <SubMenuLink to="/profile" onClick={() => onClose()}>
        마이페이지
      </SubMenuLink>
      <SubMenuLink to="/liked" onClick={() => onClose()}>
        좋아요 누른 커버
      </SubMenuLink>
      <SubMenuLink to="/library" onClick={() => onClose()}>
        라이브러리
      </SubMenuLink>
      <SubMenuLink to="/" onClick={() => onClose()}>
        로그아웃
      </SubMenuLink>
    </MenuContents>
  );
};

const MenuContents = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
  align-items: center;
  color: black;
  background-color: white;
  left: 0;
`;

const Divider = styled.div`
  width: 90%;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.3);
  margin: 2vh 0;
`;

const MenuLink = styled(Link)`
  color: black;
  margin: 1vh 0;
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
`;

const SubMenuLink = styled(Link)`
  color: black;
  font-size: 0.8rem;
  font-weight: 500;
  margin: 0.7vh 1rem;
`;

export default MobileMenu;
