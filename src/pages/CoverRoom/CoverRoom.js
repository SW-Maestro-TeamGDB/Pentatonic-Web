import react, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import GridContainer from '../../components/GridContainer/GridContainer';
import CoverRoomSession from '../../components/CoverRoomSession/CoverRoomSession';
import LibraryDrawer from '../../components/LibraryDrawer/LibraryDrawer';
import { Drawer } from 'antd';

import { gql, useQuery } from '@apollo/client';
import {
  currentUserVar,
  isLoggedInVar,
  IS_LOGGED_IN,
} from '../../apollo/cache';

import TameImpala from '../../images/TempData//TameImpala.jpeg';
import Hyukoh from '../../images/TempData//Hyukoh.jpeg';
import Beatles from '../../images/TempData//Beatles.jpeg';
import MenITrust from '../../images/TempData//MenITrust.jpeg';
import NoSurprises from '../../images/TempData//NoSurprises.jpeg';
import TheVolunteers from '../../images/TempData//TheVolunteers.jpeg';
import FixYou from '../../images/TempData/FixYou.png';

import ThumbIcon from '../../images/ThumbIcon.svg';
import ViewIcon from '../../images/ViewIcon.svg';
import UserAvatar from '../../images/UserAvatar.svg';

const CoverRoom = ({ match }) => {
  const idx = match.params.id;
  const { data } = useQuery(IS_LOGGED_IN);
  const [session, setSession] = useState([]);

  // drawer
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const onClose = () => {
    setVisibleDrawer(false);
  };

  const randomTitle = [
    '멋진 밴드',
    '기가막힌 밴드',
    '무지성 합주',
    'On the next level',
    'WarmPlay',
    'Fix Everything',
    '사이키델릭',
    '구름밴드',
    'Cross the road',
    '코리아 락 밴드',
    '실력따윈 필요없어',
    '초보방',
  ];
  const titleSize = randomTitle.length;

  const changeName = (name) => {
    if (name === 'guitar') {
      return '기타';
    } else if (name === 'vocal') {
      return '보컬';
    } else if (name === 'drum') {
      return '드럼';
    } else if (name === 'piano') {
      return '피아노';
    }
  };

  const tempData = [
    {
      cover: `${randomTitle[parseInt(Math.random() * titleSize)]}`,
      title: `Fix You`,
      singer: 'ColdPlay',
      img: FixYou,
      sessions: [
        { session: 'guitar', maxMember: 4, currentMember: 3 },
        { session: 'vocal', maxMember: 3, currentMember: 1 },
        { session: 'drum', maxMember: 2, currentMember: 2 },
      ],
    },
    {
      cover: '사이키델릭',
      title: `Borderline`,
      singer: 'Tame Impala',
      img: TameImpala,
      sessions: [
        { session: 'guitar', maxMember: 3, currentMember: 1 },
        { session: 'piano', maxMember: 2, currentMember: 1 },
        { session: 'vocal', maxMember: 3, currentMember: 0 },
      ],
    },
    {
      cover: '3인 혁오',
      title: `위잉위잉`,
      singer: '혁오',
      img: Hyukoh,
      sessions: [
        { session: 'guitar', maxMember: 2, currentMember: 2 },
        { session: 'vocal', maxMember: 4, currentMember: 4 },
        { session: 'drum', maxMember: 2, currentMember: 2 },
      ],
    },
    {
      cover: 'Cross The Road',
      title: `Hey Jude`,
      singer: 'The Beatles',
      img: Beatles,
      sessions: [
        { session: 'guitar', maxMember: 4, currentMember: 1 },
        { session: 'piano', maxMember: 1, currentMember: 1 },
        { session: 'vocal', maxMember: 4, currentMember: 4 },
        { session: 'drum', maxMember: 2, currentMember: 2 },
      ],
    },
    {
      cover: '구름밴드',
      title: `Numb`,
      singer: 'Men I Trust',
      img: MenITrust,
      sessions: [
        { session: 'guitar', maxMember: 5, currentMember: 4 },
        { session: 'vocal', maxMember: 2, currentMember: 1 },
      ],
    },
    {
      cover: '코리아 톰 요크',
      title: `No Suprises`,
      singer: 'Radio Head',
      img: NoSurprises,
      sessions: [
        { session: 'piano', maxMember: 1, currentMember: 1 },
        { session: 'vocal', maxMember: 3, currentMember: 2 },
        { session: 'drum', maxMember: 2, currentMember: 2 },
      ],
    },
    {
      cover: '실력은 필요없어',
      title: `Summer`,
      singer: 'The Volunteers',
      img: TheVolunteers,
      sessions: [
        { session: 'guitar', maxMember: 4, currentMember: 3 },
        { session: 'vocal', maxMember: 3, currentMember: 1 },
        { session: 'drum', maxMember: 2, currentMember: 2 },
      ],
    },
  ];

  const showCoverRoomSession = () => {
    return tempData[idx].sessions.map((v) => {
      return (
        <CoverRoomSession
          key={`CoverRoom + ${v}`}
          sessionTitle={changeName(v.session)}
          total={v.maxMember}
          now={v.currentMember}
          session={session}
          setSession={setSession}
          setVisibleDrawer={setVisibleDrawer}
        />
      );
    });
  };

  return (
    <PageContainer>
      <CoverBannerContainer>
        <CoverBackground url={tempData[idx].img} />
        <BannerContents>
          <CoverTitle>{tempData[idx].cover}</CoverTitle>
          <CoverDesc>우리 밴드는 {tempData[idx].title}를 연주합니다</CoverDesc>
          <CoverMetaContainer>
            <LikeCount>
              <CustomIcon src={ViewIcon} />{' '}
              {parseInt(Math.random() * 300 + 200)}
            </LikeCount>
            <SpacingSpan />
            <ViewCount>
              <CustomIcon src={ThumbIcon} />{' '}
              {parseInt(Math.random() * 500 + 600)}
            </ViewCount>
            <SpacingSpan />
          </CoverMetaContainer>
        </BannerContents>
        <SubmitButton>감상하기</SubmitButton>
      </CoverBannerContainer>
      <SessionContainer>
        <GridContainer>{showCoverRoomSession()}</GridContainer>
      </SessionContainer>
      <CommentContainer>
        <CommentHeader>
          댓글
          <CurrentComment>{parseInt(Math.random() * 30)}</CurrentComment>
        </CommentHeader>
        <CommentForm>
          {data.isLoggedIn ? (
            <>
              <MyProfileImg
                src={
                  // currentUserVar().profileURI
                  //   ? currentUserVar().profileURI
                  //   : null
                  UserAvatar
                }
              />
              <CustomInput placeholder="게시물의 저작권 등 분쟁, 개인정보 노출로 인한 책임은 작성자 또는 게시자에게 있음을 유의해주세요" />
              <CommentButton>등록</CommentButton>
            </>
          ) : (
            <>
              <MyProfileImg src={UserAvatar} />
              <CustomInput
                placeholder="댓글을 작성하시려면 로그인이 필요합니다"
                disabled
              />
              <CommentButton disabled>등록</CommentButton>
            </>
          )}
        </CommentForm>
      </CommentContainer>
      <Drawer
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visibleDrawer}
        width="35%"
      >
        <LibraryDrawer />
      </Drawer>
    </PageContainer>
  );
};

const SessionContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 2rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #eee;
`;

const MyProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10rem;
`;

const CustomInput = styled.input`
  width: 80%;
  color: black;
  border: 2px solid lightgray;
  transition: all ease 0.3s;
  outline: none;
  height: 100%;
  border-radius: 0.8rem;
  margin: 0.5rem 2rem;
  padding: 0 1rem;
  font-size: 1rem;

  ::placeholder {
    color: #bbbbbb;
    font-size: 16px;
  }

  &:focus {
    border: 2px solid black;
  }
`;

const CommentForm = styled.div`
  width: 100%;
  height: 3rem;
  position: relative;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 1rem 0;
`;

const CommentHeader = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  font-weight: 700;
  align-items: center;
  width: 100%;
`;

const CurrentComment = styled.div`
  margin-left: 0.5rem;
  color: #bbbbbb;
  font-size: 16px;
`;

const CoverBackground = styled.div`
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 15px;
`;

const CoverBannerContainer = styled.div`
  width: 100%;
  height: 25vw;
  position: relative;
  display: flex;
  flex-direction: column;

  ${CoverBackground} {
    filter: brightness(50%);
  }
`;

const BannerContents = styled.div`
  position: absolute;
  bottom: 25%;
  display: flex;
  flex-direction: column;
  right: 3%;
`;

const CoverTitle = styled.span`
  font-weight: 900;
  font-size: 60px;
  color: white;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  line-height: 1.5;
  letter-spacing: 2px;
`;

const CoverDesc = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: white;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  line-height: 1;
`;

const CoverMetaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 3%;
  color: white;
`;

const LikeCount = styled.span`
  font-size: 16px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ViewCount = styled.span`
  font-size: 16px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SpacingSpan = styled.span`
  margin: 0 5px;
`;

const CustomIcon = styled.img`
  width: 16px;
  height: 16px;
  filter: invert(100%);
  margin-right: 10px;
`;

const SubmitButton = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 10%;
  right: 3%;
  width: 200px;
  height: 52px;
  color: white;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  font-weight: 700;
`;

const CommentButton = styled.button`
  border-radius: 10px;
  background-color: black;
  width: 6rem;
  height: 100%;
  border: none;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  &:hover {
    background-color: rgb(50, 50, 50);
  }
`;

export default CoverRoom;
