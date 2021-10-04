import react, { useState, useEffect } from 'react';
import PageContainer from '../../components/PageContainer';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER, currentUserVar } from '../../apollo/cache';
import {
  SettingFilled,
  PlusCircleFilled,
  PictureOutlined,
} from '@ant-design/icons';
import GridContainer from '../../components/GridContainer';
import CoverGrid from '../../components/CoverGrid';
import QuestionModal from '../../components/QuestionModal/QuestionModal';
import NotFoundPage from '../NotFoundPage';
import PositionGrid from '../../components/PositionGrid';
import { Upload, notification } from 'antd';
import styled from 'styled-components';

const GET_USER_INFO = gql`
  query Query($getUserInfoUserId: Id!) {
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
      position {
        position
        likeCount
      }
    }
  }
`;

const CHANGE_PROFILE = gql`
  mutation ChangeProfileMutation($changeProfileInput: ChangeProfileInput!) {
    changeProfile(input: $changeProfileInput) {
      id
    }
  }
`;

const UPLOAD_IMAGE_FILE = gql`
  mutation Mutation($uploadImageFileInput: UploadImageInput!) {
    uploadImageFile(input: $uploadImageFileInput)
  }
`;

const FOLLOW = gql`
  mutation Mutation($followInput: FollowInput!) {
    follow(input: $followInput)
  }
`;

const { Dragger } = Upload;

const Profile = ({ match }) => {
  const { data } = useQuery(GET_CURRENT_USER);
  const ID = match.params.id;
  const [userData, setUserData] = useState();
  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState();
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [editUserData, setEditUserData] = useState({
    introduce: null,
    profileURI: null,
    username: null,
  });

  const [unfollowModal, setUnfollowModal] = useState(false);
  const [editUserDataModal, setEditUserDataModal] = useState(false);

  const [uploadImage, uploadImageResult] = useMutation(UPLOAD_IMAGE_FILE, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      // console.log(error);
    },
    onCompleted: (data) => {
      setEditUserData({ ...editUserData, profileURI: data.uploadImageFile });
    },
  });

  const [changeProfile] = useMutation(CHANGE_PROFILE, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      setNameError(error.message);
      setEditUserDataModal(false);
    },
    onCompleted: (data) => {
      getUserInfo();
      setEditUserDataModal(false);
      setEdit(false);
    },
  });

  const [getUserInfo] = useLazyQuery(GET_USER_INFO, {
    fetchPolicy: 'network-only',
    variables: {
      getUserInfoUserId: ID,
    },
    onCompleted: (data) => {
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
      console.log(error);
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
      return <CoverGrid key={v.bandId} data={v} />;
    });
  };

  const onClickFollowing = () => {
    if (data.user) follow();
  };

  const onClickUnfollow = () => {
    setUnfollowModal(true);
  };

  const unfollow = () => {
    setUnfollowModal(false);
    follow();
  };

  const usernameCheck = () => {
    const username = editUserData.username;

    if (!username) {
      setNameError('닉네임을 입력해주세요');
      return false;
    } else if (username.length < 2) {
      setNameError('2글자 이상의 닉네임을 입력해주세요');
      return false;
    }

    return true;
  };

  const imageFileCheck = (file) => {
    const acceptType = ['image/png', 'image/jpeg', 'image/bmp'];

    if (acceptType.indexOf(file.type) == -1) {
      notification['warning']({
        key: 'imagFilyTypeNotification',
        message: '이미지 파일 형식 오류',
        description: `png , jpeg , bmp 형식의 파일만 업로드 할 수 있습니다`,
        placement: 'bottomRight',
        duration: 5,
        style: {
          width: '30rem',
        },
      });
      return false;
    }
    return true;
  };

  const submitImageFile = (data) => {
    if (imageFileCheck(data.file)) {
      uploadImage({
        variables: {
          uploadImageFileInput: { file: data.file },
        },
      });
    }
  };

  const onClickProfileChange = () => {
    if (usernameCheck()) {
      // 이름 변경하지 않는 경우 이름 프로퍼티 제외
      if (editUserData.username === userData.username) {
        let temp = editUserData;
        delete temp.username;
        setEditUserData(temp);
      }

      changeProfile({
        variables: {
          changeProfileInput: {
            user: editUserData,
          },
        },
      });
    }
  };

  // 임시데이터
  const showPosition = () => {
    return userData.position.map((v, i) => {
      return (
        <PositionGrid
          position={v.position}
          like={v.likeCount}
          key={`${ID}+${i}`}
        />
      );
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (userData)
      setEditUserData({
        introduce: userData.introduce,
        profileURI: userData.profileURI,
        username: userData.username,
      });
  }, [userData]);

  useEffect(() => {
    setNameError();
  }, [editUserData.username]);

  useEffect(() => {
    getUserInfo();
  }, [data]);

  return (
    <PageContainer width="55%">
      {!error ? (
        !loading && userData ? (
          <>
            <UserInfoContainer>
              <UserImageContainer>
                {edit ? (
                  <CustomDragger
                    maxCount={1}
                    showUploadList={false}
                    customRequest={(data) => submitImageFile(data)}
                  >
                    {editUserData.profileURI === userData.profileURI ? (
                      <>
                        <EditProfile src={userData.profileURI} opacity="0.3" />
                        <CustomPictureIcon />
                      </>
                    ) : (
                      <DraggerContents>
                        <EditProfile src={editUserData.profileURI} />
                        <CustomUnvisiblePictureIcon />
                      </DraggerContents>
                    )}
                  </CustomDragger>
                ) : (
                  <UserImage src={userData.profileURI} />
                )}
              </UserImageContainer>
              <UserInfo>
                {edit ? (
                  <>
                    <CustomInput
                      placeholder="닉네임을 입력해주세요"
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          username: e.target.value,
                        })
                      }
                      value={editUserData.username}
                      defaultValue={editUserData.username}
                      maxLength="14"
                    />
                    {nameError ? (
                      <ErrorMessage>{nameError}</ErrorMessage>
                    ) : null}
                    <CustomTextArea
                      placeholder="자기소개를 입력해주세요"
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          introduce: e.target.value,
                        })
                      }
                      value={editUserData.introduce}
                      defaultValue={editUserData.introduce}
                      maxLength="100"
                    />
                  </>
                ) : (
                  <>
                    <UserName>{userData.username}</UserName>
                    <UserIntroduce>{userData.introduce}</UserIntroduce>
                  </>
                )}
              </UserInfo>
              <MetaContainer>
                <FollowContainer>
                  {edit ? null : (
                    <>
                      <FollowWrapper>
                        {userData.followerCount}
                        <FollowContainerTitle>팔로워</FollowContainerTitle>
                      </FollowWrapper>
                      <FollowWrapper>
                        {userData.followingCount}
                        <FollowContainerTitle>팔로우</FollowContainerTitle>
                      </FollowWrapper>
                    </>
                  )}
                </FollowContainer>
                <FollowButtonContainer>
                  {data.user && data.user.id === userData.id ? (
                    edit ? (
                      <FollowButton onClick={() => setEditUserDataModal(true)}>
                        수정 완료
                      </FollowButton>
                    ) : (
                      <FollowButton onClick={() => setEdit(true)}>
                        <CustomSettingIcon />
                        프로필 수정
                      </FollowButton>
                    )
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
              <UserSession>
                {userData.band.length > 0 ? (
                  <Padding>
                    <GridContainer
                      templateColumn="180px"
                      rowGap="1.5rem"
                      columnGap="1.5rem"
                      autoFill
                    >
                      {showPosition()}
                    </GridContainer>
                  </Padding>
                ) : (
                  <NoPosition>참여한 포지션이 없습니다</NoPosition>
                )}
              </UserSession>
            </UserSessionContainer>
            <CoverHistoryContainer>
              <BoardTitle>커버 히스토리</BoardTitle>
              {userData.band.length === 0 ? (
                <NoCoverText>참여한 커버가 없습니다</NoCoverText>
              ) : (
                <GridContainer templateColumn="250px" autoFill>
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
            <QuestionModal
              modalToggle={editUserDataModal}
              setModalToggle={setEditUserDataModal}
              text="프로필을 수정하시겠습니까?"
              afterRequest={onClickProfileChange}
            />
          </>
        ) : null
      ) : (
        <NotFoundPage desc="존재하지 않는 유저입니다" />
      )}
    </PageContainer>
  );
};

const ErrorMessage = styled.div`
  color: #cb0000;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  padding-left: 3%;
`;

const NoPosition = styled.div`
  font-size: 1.4rem;
  color: #9b94b3;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 12rem;
  letter-spacing: -0.5px;
  font-weight: 800;
`;

const CustomPictureIcon = styled(PictureOutlined)`
  font-size: 4.5rem;
  transition: all 0.3s ease-in-out !important;
  color: #444;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const CustomUnvisiblePictureIcon = styled(PictureOutlined)`
  font-size: 4rem;
  transition: all 0.3s ease-in-out !important;
  color: white;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;

  visibility: hidden;
`;

const EditProfile = styled.img`
  width: 9rem;
  height: 9rem;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;

  opacity: ${(props) => (props.opacity ? props.opacity : 1)};
`;

const DraggerContents = styled.div`
  width: 9rem;
  height: 9rem;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;

  &:hover ${CustomUnvisiblePictureIcon} {
    visibility: visible;
    font-size: 3.5rem;
    opacity: 1;
  }

  &:hover ${EditProfile} {
    filter: brightness(70%);
  }
`;

const CustomDragger = styled(Dragger)`
  background-color: transparent !important;
  border: 2px solid lightgray !important;
  border-radius: 0.8rem !important;
  padding: 1rem 0 !important;

  width: 9rem !important;
  height: 9rem !important;

  transition: all 0.3s ease-in-out !important;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border: 2px solid #999 !important;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  }
`;

/* ${CustomPictureIcon} {
      color: #444444;
    }

    ${UploadText} {
      color: #444444;
    } */

const NoCoverText = styled.div`
  font-size: 1.4rem;
  width: 100%;
  height: 12rem;
  margin-top: 1rem;
  letter-spacing: -0.5px;
  font-weight: 800;
  color: #9b94b3;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomInput = styled.input`
  width: 100%;
  color: #222;
  border: 2px solid #ddd;
  transition: all ease 0.3s;
  outline: none;
  height: 2.8rem;
  border-radius: 0.8rem;
  margin: 0 0 0.5rem;
  padding: 0 0.8rem;
  font-size: 0.9rem;

  &:focus {
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  }

  ::placeholder {
    font-size: 0.8rem;
    color: #777;
  }
`;

const CustomTextArea = styled.textarea`
  width: 100%;
  color: #222;
  border: 2px solid lightgray;
  transition: all ease 0.3s;
  outline: none;
  height: 5.5rem;
  border-radius: 0.8rem;
  margin: 0;
  padding: 0.5rem 0.8rem;
  font-size: 0.9rem;

  resize: none;

  &:focus {
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  }

  ::placeholder {
    font-size: 0.8rem;
    color: #777;
  }

  ::-webkit-scrollbar {
    display: none;
  }
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

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;

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
  height: auto;
  border-radius: 10px;
  background-color: rgba(153, 127, 249, 0.15);

  margin-top: 1rem;
  min-height: 12rem;
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

  width: 9rem;
  height: 9rem;

  margin: 0 5%;
`;

const UserImage = styled.div`
  width: 100%;
  height: 100%;

  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;

  border-radius: 10px;
`;

const UserInfo = styled.div`
  width: 50%;
  min-height: 8.5rem;

  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.6px;
`;

const UserIntroduce = styled.pre`
  margin-top: 1.3rem;
  font-size: 1rem;
  font-family: 'NanumSquare';

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

const Padding = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  padding: 1.5rem 1.5rem;
`;

export default Profile;
