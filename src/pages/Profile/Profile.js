import react, { useState, useEffect } from 'react';
import PageContainer from '../../components/PageContainer';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER, currentUserVar } from '../../apollo/cache';
import { SettingFilled, PlusCircleFilled } from '@ant-design/icons';
import GridContainer from '../../components/GridContainer';
import CoverGrid from '../../components/CoverGrid';
import QuestionModal from '../../components/QuestionModal/QuestionModal';
import styled from 'styled-components';

const GET_USER_INFO = gql`
  query Query($getUserInfoUserId: Id) {
    getUserInfo(userId: $getUserInfoUserId) {
      id
      username
      profileURI
      introduce
      followerCount
      followingCount
      followingStatus
      band {
        name
        backGroundURI
        likeCount
        bandId
      }
    }
  }
`;

const FOLLOW = gql`
  mutation Mutation($followInput: FollowInput!) {
    follow(input: $followInput)
  }
`;

const Profile = ({ match }) => {
  const currentUser = JSON.parse(localStorage.getItem('userInfo'));
  const ID = match.params.id;
  const [userData, setUserData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [unfollowModal, setUnfollowModal] = useState(false);

  const [getUserInfo] = useLazyQuery(GET_USER_INFO, {
    fetchPolicy: 'network-only',
    variables: {
      getUserInfoUserId: ID,
    },
    onCompleted: (data) => {
      console.log(data);
      if (data.getUserInfo) {
        setUserData(data.getUserInfo);
        setLoading(false);
        setError(false);
      } else {
        setError(true);
        setLoading(false);
      }
    },
    onError: (error) => {
      setError(true);
      setLoading(false);
    },
  });

  const [follow, followResult] = useMutation(FOLLOW, {
    variables: {
      followInput: {
        following: ID,
      },
    },
    onCompleted: (data) => {
      getUserInfo();
    },
  });

  const showCoverHistory = () => {
    return userData.band.map((v) => {
      return <CoverGrid key={v.bandId} title={v.name} img={v.backGroundURI} />;
    });
  };

  const onClickFollowing = () => {
    follow();
  };

  const onClickUnfollow = () => {
    setUnfollowModal(true);
  };

  const unfollow = () => {
    setUnfollowModal(false);
    follow();
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <PageContainer width="55%">
      {!error ? (
        !loading && userData ? (
          <>
            <UserInfoContainer>
              <UserImageContainer>
                <UserImage src={userData.profileURI} />
              </UserImageContainer>
              <UserInfo>
                <UserName>{userData.username}</UserName>
                <UserIntroduce>{userData.introduce}</UserIntroduce>
              </UserInfo>
              <MetaContainer>
                <FollowContainer>
                  <FollowWrapper>
                    {userData.followerCount}
                    <FollowContainerTitle>팔로워</FollowContainerTitle>
                  </FollowWrapper>
                  <FollowWrapper>
                    {userData.followingCount}
                    <FollowContainerTitle>팔로우</FollowContainerTitle>
                  </FollowWrapper>
                </FollowContainer>
                <FollowButtonContainer>
                  {currentUser.id === userData.id ? (
                    <FollowButton>
                      <CustomSettingIcon /> 프로필 수정
                    </FollowButton>
                  ) : userData.followingStatus ? (
                    <FollowingButton onClick={onClickUnfollow}>
                      팔로잉
                    </FollowingButton>
                  ) : (
                    <FollowButton onClick={onClickFollowing}>
                      <CustomFollowIcon />
                      팔로우
                    </FollowButton>
                  )}
                </FollowButtonContainer>
              </MetaContainer>
            </UserInfoContainer>
            <UserSessionContainer>
              <BoardTitle>포지션</BoardTitle>
              <UserSession> </UserSession>
            </UserSessionContainer>
            <CoverHistoryContainer>
              <BoardTitle>커버 히스토리</BoardTitle>
              {userData.band.length === 0 ? (
                <NoCoverText>참여한 밴드가 없습니다</NoCoverText>
              ) : (
                <GridContainer templateColumn="250px">
                  {showCoverHistory()}
                </GridContainer>
              )}
            </CoverHistoryContainer>
            <QuestionModal
              modalToggle={unfollowModal}
              setModalToggle={setUnfollowModal}
              text={`${userData.username}님의 팔로잉을 취소하시겠습니까?`}
              afterRequest={unfollow}
            />
          </>
        ) : null
      ) : (
        '존재하지 않는 유저입니다'
      )}
    </PageContainer>
  );
};

const NoCoverText = styled.div`
  font-size: 1rem;
  width: 100%;
  height: 12rem;
  margin-top: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomSettingIcon = styled(SettingFilled)`
  font-size: 1.2rem;
  padding-right: 0.5rem;
`;

const CustomFollowIcon = styled(PlusCircleFilled)`
  font-size: 1.1rem;
  padding-right: 0.5rem;
`;

const FollowButtonContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const FollowingButton = styled.div`
  cursor: pointer;
  min-width: 6rem;
  height: 2.5rem;

  padding: 0 1rem;

  color: #999;
  border-radius: 1vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #666;
  color: white;

  font-size: 1rem;
  font-weight: 700;

  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #555;
  }
`;

const FollowButton = styled.div`
  cursor: pointer;
  min-width: 6rem;
  height: 2.5rem;

  padding: 0 1rem;

  color: #999;
  border: 1px solid #999;
  border-radius: 1vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1rem;
  font-weight: 700;

  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: #666;
    color: #666;
  }
`;

const FollowContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  padding-top: 0.5rem;
`;

const UserSessionContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const UserSession = styled.div`
  width: 100%;
  height: 12rem;
  border-radius: 10px;
  background-color: #f7f4ff;

  margin-top: 1rem;
`;

const CoverHistoryContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  position: relative;

  margin-top: 1rem;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  height: 12rem;
  border-radius: 10px;
  width: 100%;
`;

const UserImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  margin: 0 5%;
`;

const UserImage = styled.div`
  width: 9rem;
  height: 9rem;

  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;

  border-radius: 10px;
`;

const UserInfo = styled.div`
  width: 50%;
  height: 8.5rem;

  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.6px;
`;

const UserIntroduce = styled.div`
  margin-top: 1.3rem;
  font-size: 1rem;

  // 자기소개 텍스트 최대 3줄표시
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.2rem;
`;

const MetaContainer = styled.div`
  width: 25%;
  height: 8.5rem;

  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

const FollowWrapper = styled.div`
  font-size: 1.4rem;
  color: #999999;
  font-weight: 800;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FollowContainerTitle = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
`;

const BoardTitle = styled.nav`
  font-size: 20px;
  font-weight: 600;
  width: 100%;
  color: black;
`;

export default Profile;
