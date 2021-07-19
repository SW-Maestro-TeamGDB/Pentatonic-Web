import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';

const SubMenu = (props) => {
  const { page } = props;
  const SubMenuContents = () => {
    if (page === 'Lounge') {
      return (
        <>
          <SubMenuLink to="/lounge/weekly">위클리 챌린지</SubMenuLink>
          <SubMenuLink to="/lounge/band">떠오르는 밴드커버</SubMenuLink>
          <SubMenuLink to="/lounge/solo">떠오르는 솔로커버</SubMenuLink>
        </>
      );
    } else if (page === 'Studio') {
      return (
        <>
          <SubMenuLink to="/studio/band">밴드 커버</SubMenuLink>
          <SubMenuLink to="/studio/solo">솔로 커버</SubMenuLink>
        </>
      );
    } else if (page === 'Artist') {
      return (
        <>
          <SubMenuLink to="/artist/rising/band">라이징 밴드</SubMenuLink>
          <SubMenuLink to="/artist/rising/solo">라이징 아티스트</SubMenuLink>
          <SubMenuLink to="/artist/rank/band">밴드 랭킹</SubMenuLink>
          <SubMenuLink to="/artist/rank/solo">아티스트 랭킹</SubMenuLink>
        </>
      );
    }
  };

  return (
    <Default>
      <SubMenuContainer>{SubMenuContents()}</SubMenuContainer>
    </Default>
  );
};

const SubMenuContainer = styled.div`
  min-height: 1.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  position: fixed;
  top: 120px;
  padding-bottom: 20px;
  z-index: 4;
  background-color: white;
  width: 100%;
  border-bottom: 1.5px solid rgb(200, 200, 200, 0.5);
`;

const SubMenuLink = styled(Link)`
  color: black;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 1rem;

  &:hover {
    color: rgb(60, 60, 60);
  }
`;

export default SubMenu;
