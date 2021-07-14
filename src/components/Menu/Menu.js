import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <Default>
      <MenuContainer>
        <MenuWrapper>
          <MenuLink to="/lounge">라운지</MenuLink>
          <MenuLink to="/studio">스튜디오</MenuLink>
          <MenuLink to="/artist">아티스트</MenuLink>
        </MenuWrapper>
      </MenuContainer>
    </Default>
  );
};

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 12vh;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 65%;
`;

const MenuLink = styled(Link)`
  font-size: 2rem;
  letter-spacing: 4px;
  color: black;
  font-family: 'NanumSquare';
  font-weight: 800;
`;

export default Menu;
