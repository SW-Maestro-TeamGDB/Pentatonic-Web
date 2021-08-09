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
          <Dropdown
            overlay={LoungeMenu}
            placement="bottomCenter"
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            <MenuLink to="/lounge">라운지</MenuLink>
          </Dropdown>
          <Dropdown
            overlay={StudioMenu}
            placement="bottomCenter"
            getPopupContainer={(trigger) => trigger.parentNode}
          >
            <MenuLink to="/studio">스튜디오</MenuLink>
          </Dropdown>
          <Dropdown
            overlay={ArtistMenu}
            placement="bottomCenter"
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
  align-items: center;
  position: fixed;
  z-index: 3;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 70%;
`;

const SubMenuSpacing = styled.div`
  height: 1rem;
`;

const MenuLink = styled(Link)`
  font-size: 18px;
  letter-spacing: 4px;
  color: black;
  font-weight: 800;
  line-height: 1.13;
  letter-spacing: -0.4px;

  &:hover {
    color: rgb(60, 60, 60);
  }
`;

const SubMenuContainer = styled.div`
  border-radius: 1rem;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
  background-color: white;
  position: fixed;
  box-shadow: 0 2px 0px rgba(0, 0, 0, 0.3);
  transform: translateX(-34%);
`;

const SubMenuLink = styled(Link)`
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

export default Menu;
