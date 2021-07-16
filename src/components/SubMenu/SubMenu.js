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
  min-height: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SubMenuLink = styled(Link)`
  color: black;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 1rem;

  &:hover {
    color: rgb(60, 60, 60);
  }
`;

export default SubMenu;
