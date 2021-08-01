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
  position: fixed;
  padding: 40px 0 40px;
  top: 50px;
  width: 100%;
  z-index: 3;
  height: 50px;
  background-color: white;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 65%;
`;

const MenuLink = styled(Link)`
  font-size: 1.4rem;
  letter-spacing: 4px;
  color: black;
  font-weight: 800;

  &:hover {
    color: rgb(60, 60, 60);
  }
`;

export default Menu;
