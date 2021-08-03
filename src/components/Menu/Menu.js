import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';
import { Dropdown } from 'antd';

const Menu = () => {
  const LoungeMenu = (
    <SubMenuContainer>
      <SubMenuSpacing />
      <SubMenuLink to="/lounge/weekly">위클리 챌린지</SubMenuLink>
      <SubMenuLink to="/lounge/band">떠오르는 밴드커버</SubMenuLink>
      <SubMenuLink to="/lounge/solo">떠오르는 솔로커버</SubMenuLink>
      <SubMenuSpacing />
    </SubMenuContainer>
  );

  const StudioMenu = (
    <SubMenuContainer>
      <SubMenuSpacing />
      <SubMenuLink to="/studio/band">밴드 커버</SubMenuLink>
      <SubMenuLink to="/studio/solo">솔로 커버</SubMenuLink>
      <SubMenuSpacing />
    </SubMenuContainer>
  );

  const ArtistMenu = (
    <SubMenuContainer>
      <SubMenuSpacing />
      <SubMenuLink to="/artist/rising/band">라이징 밴드</SubMenuLink>
      <SubMenuLink to="/artist/rising/solo">라이징 아티스트</SubMenuLink>
      <SubMenuLink to="/artist/rank/band">밴드 랭킹</SubMenuLink>
      <SubMenuLink to="/artist/rank/solo">아티스트 랭킹</SubMenuLink>
      <SubMenuSpacing />
    </SubMenuContainer>
  );

  return (
    <Default>
      <MenuContainer>
        <MenuWrapper>
          <div style={{ position: 'relative' }}>
            <Dropdown
              overlay={LoungeMenu}
              placement="bottomLeft"
              getPopupContainer={(trigger) => trigger.parentNode}
            >
              <MenuLink to="/lounge">라운지</MenuLink>
            </Dropdown>
          </div>
          <Dropdown
            overlay={StudioMenu}
            placement="bottomLeft"
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            <MenuLink to="/studio">스튜디오</MenuLink>
          </Dropdown>
          <Dropdown
            overlay={ArtistMenu}
            placement="bottomLeft"
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            <MenuLink to="/artist">아티스트</MenuLink>
          </Dropdown>
        </MenuWrapper>
      </MenuContainer>
    </Default>
  );
};

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  padding: 35px 0 35px;
  top: 50px;
  width: 100%;
  z-index: 3;
  height: 50px;
  background-color: white;
  border-bottom: 1px solid rgb(220, 220, 220);
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 65%;
`;

const SubMenuSpacing = styled.div`
  height: 1rem;
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

const SubMenuContainer = styled.div`
  border-radius: 1rem;
  width: 13rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
  background-color: white;
  position: fixed;
  box-shadow: 0 2px 0px rgba(0, 0, 0, 0.3);
  transform: translateX(-30%);
`;

const SubMenuLink = styled(Link)`
  color: black;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0.5rem;
  width: 100%;
  text-align: center;
  transition: background-color 0.1s ease-in-out;
  border-radius: 3px;

  &:hover {
    color: rgb(60, 60, 60);
    background-color: rgba(200, 200, 200, 0.5);
  }
`;

export default Menu;
