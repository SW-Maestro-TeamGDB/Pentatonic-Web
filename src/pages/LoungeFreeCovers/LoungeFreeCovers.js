import react, { useState, useEffect, useRef } from 'react';
import { Dropdown, Menu } from 'antd';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MakingCoverButton from '../../components/MakingCoverButton';
import PageContainer from '../../components/PageContainer';
import WeeklyBanner from '../../components/WeeklyBanner/WeeklyBanner';
import SearchBar from '../../components/SearchBar';
import CoverGrid from '../../components/CoverGrid';
import MakingIcon from '../../images/MakingIcon.svg';
import PageImage from '../../components/PageImage/PageImage';
import GridContainer from '../../components/GridContainer/GridContainer';

import { useMediaQuery } from 'react-responsive';
import { media, Default } from '../../lib/Media';

import GroupIcon from '../../images/GroupIcon.svg';
import SoloIcon from '../../images/SoloIcon.svg';

const QUERY_BANDS = gql`
  query Query($queryBandFilter: QueryBandInput!, $queryBandFirst: Int!) {
    queryBand(filter: $queryBandFilter, first: $queryBandFirst) {
      bands {
        isFreeBand
        song {
          name
          artist
        }
        backGroundURI
        name
        session {
          position
        }
        likeCount
        viewCount
        bandId
      }
    }
  }
`;

const LoungeBandCovers = ({ match }) => {
  const [genre, setGenre] = useState('전체');
  const [bandFilter, setBandFilter] = useState({
    type: 'ALL',
    content: match.params?.content,
    isFreeSong: true,
  });
  const content = match.params?.content;
  const coverRef = useRef();
  const COVER_WIDTH = useMediaQuery({ maxWidth: 767 }) ? '250px' : '220px';

  const CoverMenu = (
    <SubMenuContainer>
      <SubMenuSpacing />
      <SubMenuLink to={`/studio/solo/free/cover`}>
        <SoloIconContainer src={SoloIcon} />
        솔로 커버
      </SubMenuLink>
      <SubMenuLink to={`/studio/band/free/cover`}>
        <BandIconContainer src={GroupIcon} />
        밴드 커버
      </SubMenuLink>
      <SubMenuSpacing />
    </SubMenuContainer>
  );

  const loadFreeCover = () => {
    if (data) {
      const coverData = data.queryBand.bands;

      if (coverData.length > 0)
        return (
          <GridContainer width="95%" templateColumn={COVER_WIDTH} autoFill>
            {coverData.map((v, i) => {
              return <CoverGrid key={`bandData+${i}`} data={v} />;
            })}
          </GridContainer>
        );
      else {
        return <NoCover>등록된 커버가 없습니다</NoCover>;
      }
    }
  };

  const { data } = useQuery(QUERY_BANDS, {
    variables: {
      queryBandFilter: bandFilter,
      queryBandFirst: 10,
    },
  });

  useEffect(() => {
    if (genre !== '전체') {
      setBandFilter({ ...bandFilter, genre: genre });
    } else {
      let tempFilter = { ...bandFilter };
      delete tempFilter.genre;
      setBandFilter(tempFilter);
    }
  }, [genre]);

  useEffect(() => {
    setBandFilter({ ...bandFilter, content: content });
  }, [content]);

  return (
    <PageContainer>
      <PageImage
        imgUrl="https://images.unsplash.com/photo-1499364615650-ec38552f4f34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80"
        title="자유곡 커버"
        desc="유저들이 자유롭게 녹음한 커버를 감상하고 참여해보세요"
        position="top"
      />
      <PageDesc>
        {content ? (
          <SearchResult>
            <SearchContent>'{content}'</SearchContent>검색 결과입니다
          </SearchResult>
        ) : null}
      </PageDesc>
      <SearchBar
        placeholder="커버 제목, 커버 소개를 입력해주세요"
        sort="free"
        searching={content}
        match={match}
      />
      <SubContainer>
        <Default>
          <Dropdown
            overlay={CoverMenu}
            placement="bottomCenter"
            getPopupContainer={(trigger) => trigger.parentNode}
            trigger={['click']}
          >
            <ButtonContainer>
              새로운 커버 만들기
              <MakingIconImg src={MakingIcon} />
            </ButtonContainer>
          </Dropdown>
        </Default>
      </SubContainer>
      {loadFreeCover()}
      <PageSpacing />
    </PageContainer>
  );
};

const PageSpacing = styled.div`
  height: 1.5rem;
`;

const BandIconContainer = styled.img`
  width: 48px;
  filter: invert(100%);
  padding-right: 10px;
`;

const SoloIconContainer = styled.img`
  width: 36px;
  filter: invert(100%);
  padding-right: 10px;
`;

const MakingIconImg = styled.img`
  width: 1rem;
  margin-left: 0.5rem;
  filter: invert(100%);
`;

const ButtonContainer = styled.div`
  cursor: pointer;
  min-width: 12em;
  padding: 0.8vh 0.7vw;
  color: white;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-weight: 700;
`;

const SubMenuContainer = styled.div`
  border-radius: 1rem;
  min-width: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
  background-color: white;
  position: fixed;
  box-shadow: 0 2px 0px rgba(0, 0, 0, 0.3);
`;

const SubMenuLink = styled(Link)`
  color: black;
  font-size: 15px;
  font-weight: 700;
  padding: 10px 10px;
  line-height: 1.13;
  letter-spacing: -1px;
  width: 100%;
  text-align: center;
  transition: background-color 0.1s ease-in-out;
  border-radius: 3px;

  &:hover {
    color: rgb(60, 60, 60);
    background-color: rgba(200, 200, 200, 0.5);
  }
`;

const SubMenuSpacing = styled.div`
  height: 0.5rem;
`;

const PageDesc = styled.div`
  font-size: 1rem;
  margin: 1.5rem 0;
  width: 80%;
  text-align: center;
`;

const SearchContent = styled.span`
  color: #6236ff;
  font-size: 24px;
  font-weight: 800;
  padding: 0 0.5rem;

  ${media.small} {
    font-size: 20px;
  }
`;

const SearchResult = styled.div`
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -1px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${media.small} {
    font-size: 14px;
  }
`;

const SubContainer = styled.div`
  margin: 4rem 0 1rem;
  position: relative;
  width: 93%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  ${media.small} {
    margin: 1.5rem 0;
  }
`;

const MakingCoverLink = styled(Link)`
  position: absolute;
  right: 1rem;
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CustomButton = styled.span`
  cursor: pointer;
  font-size: 1rem;
`;

const CustomMenu = styled(Menu)`
  min-width: 7rem;
  text-align: center;
`;

const NoCover = styled.div`
  font-size: 1.4rem;
  color: #9b94b3;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 12rem;
  letter-spacing: -0.5px;
  font-weight: 800;
`;

export default LoungeBandCovers;
