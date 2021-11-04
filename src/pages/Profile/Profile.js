import react, { useState, useEffect, useRef, useCallback } from 'react';
import PageContainer from '../../components/PageContainer';
import { Link } from 'react-router-dom';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER, currentUserVar } from '../../apollo/cache';
import {
  SettingFilled,
  PlusCircleFilled,
  PictureOutlined,
  CopyrightOutlined,
  CreditCardFilled,
  CheckCircleFilled,
} from '@ant-design/icons';

import GridContainer from '../../components/GridContainer';
import CoverGrid from '../../components/CoverGrid';
import QuestionModal from '../../components/QuestionModal/QuestionModal';
import NotFoundPage from '../NotFoundPage';
import PositionGrid from '../../components/PositionGrid';
import ResponsiveCoverGrid from '../../components/ResponsiveCoverGrid/ResponsiveCoverGrid';
import CropModal from '../../components/CropModal';
import SNSModal from '../../components/SNSModal';
import dotenv from 'dotenv';

import ic_facebook from '../../images/SNS/ic_facebook.png';
import ic_instagram from '../../images/SNS/ic_instagram.png';
import ic_kakao from '../../images/SNS/ic_kakao.png';
import ic_twitter from '../../images/SNS/ic_twitter.png';

import { useMediaQuery } from 'react-responsive';
import { Upload, notification } from 'antd';
import styled from 'styled-components';
import { file } from '@babel/types';
import { media, Default, Mobile } from '../../lib/Media';

const GET_USER_INFO = gql`
  query Query($getUserInfoUserId: Id!) {
    getUserInfo(userId: $getUserInfoUserId) {
      id
      prime
      username
      profileURI
      phoneNumber
      introduce
      followerCount
      followingCount
      followingStatus
      social {
        facebook
        twitter
        instagram
        kakao
      }
      band {
        song {
          name
          artist
        }
        name
        backGroundURI
        likeCount
        viewCount
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
      username
      profileURI
      prime
      type
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

const PAYMENT = gql`
  mutation PaymentMutation($input: PaymentInput!) {
    payment(input: $input)
  }
`;

dotenv.config();
const { Dragger } = Upload;

const Profile = ({ match }) => {
  const { data } = useQuery(GET_CURRENT_USER);
  const ID = match.params.id;
  const [beforeCropImage, setBeforeCropImage] = useState();
  const [userData, setUserData] = useState();
  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [editUserName, setEditUserName] = useState();
  const [editUserData, setEditUserData] = useState({
    introduce: null,
    profileURI: null,
    username: null,
  });

  const coverRef = useRef();
  const COVER_WIDTH = useMediaQuery({ maxWidth: 767 }) ? '160px' : '200px';
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  const [cropModal, setCropModal] = useState(false);
  const [unfollowModal, setUnfollowModal] = useState(false);
  const [editUserDataModal, setEditUserDataModal] = useState(false);
  const [SNSModifyModal, setSNSModifyModal] = useState(false);

  const [payment, paymentMutation] = useMutation(PAYMENT, {
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      notification['success']({
        key: 'chargeSuccess',
        message: '결제 완료',
        description: '펜타토닉 프리미엄 회원이 되신걸 환영합니다',
        placement: 'bottomRight',
        duration: 5,
        style: {
          width: '30rem',
        },
      });
      getUserInfo();
    },
  });

  const [uploadImage, uploadImageResult] = useMutation(UPLOAD_IMAGE_FILE, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      alert('이미지 업로드가 실패하였습니다.');
      console.log(error.message);
    },
    onCompleted: (data) => {
      setEditUserData({ ...editUserData, profileURI: data.uploadImageFile });
      setCropModal(false);
    },
  });

  const [changeProfile] = useMutation(CHANGE_PROFILE, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      setNameError(error.message);
      setEditUserDataModal(false);
    },
    onCompleted: (data) => {
      currentUserVar(data.changeProfile);
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

  const submitImageFile = (file) => {
    if (file)
      uploadImage({
        variables: {
          uploadImageFileInput: { file: file },
        },
      });
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
    } else {
      setEditUserDataModal(false);
    }
  };

  // 임시데이터
  const showPosition = () => {
    return userData.position.map((v, i) => {
      return (
        <PositionGrid
          position={v.position}
          like={v.likeCount ? v.likeCount : 0}
          key={`${ID}+${i}`}
        />
      );
    });
  };

  const checkUploadImageFile = (data) => {
    if (imageFileCheck(data.file)) {
      const file = data.file;
      file.arrayBuffer().then((arrayBuffer) => {
        let blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
        let url = URL.createObjectURL(blob);
        setBeforeCropImage(url);
      });
      setCropModal(true);
    }
  };

  const onClickCreditChargeButton = () => {
    notification['warning']({
      key: 'errorCreditCharge',
      message: '',
      description: '현재는 크레딧 충전이 불가능 합니다',
      placement: 'bottomRight',
      duration: 3,
    });
  };

  useEffect(() => {
    if (editUserDataModal && editUserName) {
      setEditUserData({ ...editUserData, username: editUserName });
    }
  }, [editUserDataModal]);

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
    setEditUserName(userData?.username);
  }, [userData]);

  useEffect(() => {
    setNameError();
  }, [editUserData.username]);

  useEffect(() => {
    getUserInfo();
  }, [data]);

  const onClickPayment = () => {
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init(process.env.REACT_APP_IMPORT_KEY);

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: 'html5_inicis', // PG사
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 3900, // 결제금액
      name: '펜타토닉 프리미엄 회원 결제', // 주문명
      buyer_name: userData.username, // 구매자 이름
      buyer_tel: userData.phoneNumber, // 구매자 전화번호
      m_redirect_url: `https://penta-tonic.com${match.url}`,
    };

    const callback = (response) => {
      const { success, merchant_uid, error_msg } = response;

      if (success) {
        payment({
          variables: {
            input: {
              cardNumber: '1',
              expiry: '1',
              birth: '1',
              buyerName: '1',
              buyerEmail: '1',
              password2Digit: '1',
            },
          },
        });
      } else {
        alert(`결제 실패: ${error_msg}`);
      }
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  };

  return (
    <PageContainer width="55%" minWidth="1000px">
      {!error ? (
        !loading && userData ? (
          <>
            <UserInfoContainer>
              <UserImageContainer>
                {edit ? (
                  <>
                    <CustomDragger
                      maxCount={1}
                      showUploadList={false}
                      customRequest={(data) => {
                        checkUploadImageFile(data);
                        // submitImageFile(data.file);
                      }}
                    >
                      {editUserData.profileURI === userData.profileURI ? (
                        <>
                          <EditProfile
                            src={userData.profileURI}
                            opacity="0.3"
                          />
                          <CustomPictureIcon />
                        </>
                      ) : (
                        <DraggerContents>
                          <EditProfile src={editUserData.profileURI} />
                          <CustomUnvisiblePictureIcon />
                        </DraggerContents>
                      )}
                    </CustomDragger>
                    <CropModal
                      modalToggle={cropModal}
                      setModalToggle={setCropModal}
                      image={beforeCropImage}
                      afterRequest={submitImageFile}
                    />
                  </>
                ) : (
                  <UserImage src={userData.profileURI} prime={userData.prime} />
                )}
              </UserImageContainer>
              <UserInfo>
                {edit ? (
                  <>
                    <CustomInput
                      placeholder="닉네임을 입력해주세요"
                      onChange={(e) => {
                        setEditUserName(e.target.value);
                        setEditUserData({
                          ...editUserData,
                          username: e.target.value,
                        });
                      }}
                      value={editUserName}
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
                      maxLength="100"
                    />
                  </>
                ) : (
                  <>
                    <UserNameContainer>
                      <UserNameWrapper>
                        <UserName> {userData.username.repeat(10)}</UserName>
                        {userData.prime ? <PrimeText>PRIME</PrimeText> : null}
                      </UserNameWrapper>
                      <Default>
                        <SNSAccountContainer>
                          {userData?.social?.facebook ? (
                            <SNSIcon
                              src={ic_facebook}
                              onClick={() =>
                                window.open(userData.social.facebook, '_blank')
                              }
                            />
                          ) : null}
                          {userData?.social?.instagram ? (
                            <SNSIcon
                              src={ic_instagram}
                              onClick={() =>
                                window.open(userData.social.instagram, '_blank')
                              }
                            />
                          ) : null}
                          {userData?.social?.twitter ? (
                            <SNSIcon
                              src={ic_twitter}
                              onClick={() =>
                                window.open(userData.social.twitter, '_blank')
                              }
                            />
                          ) : null}
                          {userData?.social?.kakao ? (
                            <SNSIcon
                              src={ic_kakao}
                              onClick={() =>
                                window.open(userData.social.kakao, '_blank')
                              }
                            />
                          ) : null}
                        </SNSAccountContainer>
                      </Default>
                    </UserNameContainer>
                    <UserIntroduce>{userData.introduce}</UserIntroduce>
                  </>
                )}
              </UserInfo>
              <MetaContainer>
                <FollowContainer>
                  {edit ? (
                    <SNSModifyButton onClick={() => setSNSModifyModal(true)}>
                      <PlusCircleFilled style={{ marginRight: '6px' }} /> SNS
                      계정 추가
                    </SNSModifyButton>
                  ) : (
                    <>
                      <FollowWrapper>
                        <FollowCounter>{userData.followerCount}</FollowCounter>
                        <FollowContainerTitle>팔로워</FollowContainerTitle>
                      </FollowWrapper>
                      <FollowWrapper>
                        <FollowCounter>{userData.followingCount}</FollowCounter>
                        <FollowContainerTitle>팔로잉</FollowContainerTitle>
                      </FollowWrapper>
                      {isMobile ? (
                        <SNSAccountContainer>
                          {userData?.social?.facebook ? (
                            <SNSIcon
                              src={ic_facebook}
                              onClick={() =>
                                window.open(userData.social.facebook, '_blank')
                              }
                            />
                          ) : null}
                          {userData?.social?.instagram ? (
                            <SNSIcon
                              src={ic_instagram}
                              onClick={() =>
                                window.open(userData.social.instagram, '_blank')
                              }
                            />
                          ) : null}
                          {userData?.social?.twitter ? (
                            <SNSIcon
                              src={ic_twitter}
                              onClick={() =>
                                window.open(userData.social.twitter, '_blank')
                              }
                            />
                          ) : null}
                          {userData?.social?.kakao ? (
                            <SNSIcon
                              src={ic_kakao}
                              onClick={() =>
                                window.open(userData.social.kakao, '_blank')
                              }
                            />
                          ) : null}
                        </SNSAccountContainer>
                      ) : null}
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
                        <Default>프로필 수정</Default>
                      </FollowButton>
                    )
                  ) : userData.followingStatus ? (
                    <FollowingButton onClick={unfollow}>팔로잉</FollowingButton>
                  ) : (
                    <FollowButton onClick={onClickFollowing}>
                      <CustomFollowIcon />
                      팔로우
                    </FollowButton>
                  )}
                </FollowButtonContainer>
              </MetaContainer>
            </UserInfoContainer>
            {data.user && data.user.id === userData.id ? (
              <PaymentContainer>
                <PaymentWrapper>
                  <BoardTitle>보유 크레딧</BoardTitle>
                  <CreditContainer>
                    <CreditWrapper>
                      <CopyrightOutlined />
                      <CreditText> 0</CreditText>
                    </CreditWrapper>
                    <CreditButton>
                      <CreditCardFilled />
                      <ButtonText onClick={onClickCreditChargeButton}>
                        충전하기
                      </ButtonText>
                    </CreditButton>
                  </CreditContainer>
                </PaymentWrapper>
                <PrimeWrapper>
                  <BoardTitle>프리미엄</BoardTitle>
                  {userData.prime ? (
                    <PurchasedButton>
                      <CheckCircleFilled style={{ marginRight: '0.5rem' }} />
                      프리미엄 회원입니다
                    </PurchasedButton>
                  ) : (
                    <PrimeButton onClick={onClickPayment}>
                      프리미엄 결제하기
                    </PrimeButton>
                  )}
                </PrimeWrapper>
              </PaymentContainer>
            ) : null}
            <UserSessionContainer>
              <BoardTitle>포지션 뱃지</BoardTitle>
              <UserSession>
                {userData.band.length > 0 ? (
                  <>
                    <Default>
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
                    </Default>
                    <Mobile>
                      <Padding>
                        <GridContainer
                          templateColumn="120px"
                          rowGap="15px"
                          columnGap="15px"
                          autoFill
                        >
                          {showPosition()}
                        </GridContainer>
                      </Padding>
                    </Mobile>
                  </>
                ) : (
                  <NoPosition>참여한 포지션이 없습니다</NoPosition>
                )}
              </UserSession>
            </UserSessionContainer>
            <CoverHistoryContainer ref={coverRef}>
              <BoardHeader>
                <BoardTitle>커버 히스토리</BoardTitle>
                <BoardLink to={`/profile/${userData.id}/history`}>
                  더보기
                </BoardLink>
              </BoardHeader>
              {userData.band.length === 0 ? (
                <NoCoverText>참여한 커버가 없습니다</NoCoverText>
              ) : (
                <ResponsiveCoverGrid
                  coverWidth={COVER_WIDTH}
                  coverData={userData?.band}
                  reversed
                />
              )}
            </CoverHistoryContainer>
            <SNSModal
              modalToggle={SNSModifyModal}
              setModalToggle={setSNSModifyModal}
              data={userData.social}
              setData={setEditUserData}
              getUserInfo={getUserInfo}
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

const UserNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

const SNSIcon = styled.img`
  width: 1.5rem;
  cursor: pointer;
  margin-left: 12px;
  filter: invert(28%) sepia(21%) saturate(0%) hue-rotate(240deg)
    brightness(101%) contrast(80%);
  transition: filter 0.3s ease-in-out;

  ${media.medium} {
    width: 1.2rem;
  }

  ${media.small} {
    width: 1.4rem;
    margin-left: 10px;
    transition: none;
  }

  &:hover {
    filter: none;
  }
`;

const SNSModifyButton = styled.div`
  color: #999;
  cursor: pointer;
  font-weight: 700;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #666;
  }

  ${media.small} {
    transition: none;
    margin-top: 1rem;

    &:hover {
      color: #999;
    }
  }
`;

const PurchasedButton = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;

  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin: 1.5rem 0 2.5rem;
  height: 3rem;

  color: white;
  background-color: #ccc;
  border: 2px solid #aaa;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;

  &:hover {
    color: white;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  ${media.small} {
    width: 100%;
    margin: 1rem 0 3rem;
  }
`;

const PrimeButton = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;

  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin: 1.5rem 0 2.5rem;
  height: 3rem;

  cursor: pointer;
  color: white;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: white;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  ${media.small} {
    width: 100%;
    margin: 1rem 0 3rem;
  }
`;

const CreditText = styled.div`
  font-size: 0.9rem;
  margin-left: 1.5rem;

  width: 100%;
  text-align: right;

  color: #555;
  font-weight: 700;
  background-color: #eee;
  padding: 0.3rem 1rem 0.3rem 0;
  border-radius: 10px;
`;

const ButtonText = styled.div`
  font-size: 0.9rem;
  margin-left: 0.5rem;
  width: 100%;
  text-align: right;
`;

const PrimeText = styled.span`
  font-size: 0.8rem;
  padding-left: 0.5rem;
  color: #6236ff;

  ${media.small} {
    font-size: 0.5rem;
  }
`;

const CreditContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  height: 6rem;
  width: 100%;

  ${media.small} {
    height: 4rem;
  }
`;

const CreditWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1.1rem;
`;

const CreditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 6.5rem;
  padding: 0.5rem 0.8rem;
  margin-left: 2rem;
  background-color: transparent;

  cursor: pointer;
  color: #999;
  border: 1px solid #999;
  border-radius: 1vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;
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

const FollowCounter = styled.div`
  color: #666;

  ${media.small} {
    padding-right: 5px;
  }
`;

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

  ${media.small} {
    font-size: 1.2rem;
  }
`;

const CustomPictureIcon = styled(PictureOutlined)`
  font-size: 4.5rem;
  transition: all 0.3s ease-in-out !important;
  color: #444;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  ${media.small} {
    font-size: 2rem;
  }
`;

const BoardHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;

  ${media.small} {
    margin-bottom: 1rem;
  }
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

  ${media.small} {
    font-size: 2rem;
  }
`;

const BoardLink = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  color: #bbbbbb;
  position: absolute;
  right: 0;

  &:hover {
    color: rgb(150, 150, 150);
  }
`;

const EditProfile = styled.img`
  width: 9rem;
  height: 9rem;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;

  opacity: ${(props) => (props.opacity ? props.opacity : 1)};

  ${media.small} {
    width: 5rem;
    height: 5rem;
  }
`;

const DraggerContents = styled.div`
  width: 9rem;
  height: 9rem;
  border-radius: 10px;

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

  ${media.small} {
    width: 5rem;
    height: 5rem;
  }
`;

const CustomDragger = styled(Dragger)`
  background-color: transparent !important;
  border: 2px solid lightgray !important;
  border-radius: 10px !important;
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

  ${media.small} {
    width: 5rem !important;
    height: 5rem !important;
    padding: 0 !important;

    &:hover {
      border: none;
      box-shadow: none;
    }
  }
`;

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

  ${media.small} {
    font-size: 1.2rem;
  }
`;

const CustomInput = styled.input`
  width: 100%;
  color: #222;
  border: 2px solid #ddd;
  transition: all ease 0.3s;
  outline: none;
  height: 2.8rem;
  border-radius: 10px;
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

  ${media.small} {
    font-size: 0.9rem;
    margin: 0.5rem 0;
  }
`;

const CustomTextArea = styled.textarea`
  width: 100%;
  color: #222;
  border: 2px solid lightgray;
  transition: all ease 0.3s;
  outline: none;
  height: 5.5rem;
  border-radius: 10px;
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

  ${media.small} {
    font-size: 0.9rem;
  }
`;

const CustomSettingIcon = styled(SettingFilled)`
  font-size: 1.2rem;
  padding-right: 0.5rem;

  ${media.small} {
    font-size: 1.2rem;
    color: #666;
    padding-right: 0;
  }
`;

const CustomFollowIcon = styled(PlusCircleFilled)`
  font-size: 1.1rem;
  padding-right: 0.5rem;
`;

const FollowButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.small} {
    min-width: 8em;
  }
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

  background-color: rgba(98, 54, 255, 0.9);

  color: white;

  font-size: 1rem;
  font-weight: 700;

  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: rgba(98, 54, 255, 1);
  }

  ${media.small} {
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    width: auto;
    justify-content: center;
    align-items: center;
    height: 1.8rem;
    min-width: 70px;
    font-size: 14px;
  }
`;

const FollowButton = styled.div`
  cursor: pointer;
  min-width: 8rem;
  height: 2.5rem;

  padding: 0 0.8rem;

  color: #999;
  border: 1px solid #999;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;
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

  ${media.small} {
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    width: auto;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
    min-width: auto;
    height: 1.8rem;
  }
`;

const FollowContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding-top: 0.5rem;
  position: relative;

  ${media.small} {
    justify-content: flex-start;
    align-items: center;
    padding-top: 0;
    width: 100%;
  }
`;

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  ${media.small} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const PrimeWrapper = styled.div`
  width: 40%;
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.small} {
    width: 90%;
    margin-top: 0;
  }
`;

const PaymentWrapper = styled.div`
  width: 55%;
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.small} {
    width: 90%;
    margin-top: 2rem;
  }
`;

const UserSessionContainer = styled.div`
  width: 100%;
  margin-top: 1rem;

  ${media.small} {
    width: 90%;
    margin-top: 0rem;
  }
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
  margin: 2rem 0 1rem;

  ${media.small} {
    width: 90%;
    margin: 1rem 0;
  }
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

  ${media.small} {
    width: 90%;
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    box-shadow: none;
    margin-top: 1.2rem;
  }
`;

const UserImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  width: 9rem;
  height: 9rem;

  margin: 0 5%;

  ${media.small} {
    width: 5rem;
    height: 5rem;
    margin: 0;
  }
`;

const UserImage = styled.div`
  width: 100%;
  height: 100%;

  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;

  border-radius: 10px;
  border: ${(props) => (props.prime ? '4px solid #6236ff' : 'none')};

  ${media.small} {
    border: ${(props) => (props.prime ? '5px solid #6236ff' : 'none')};
  }
`;

const UserInfo = styled.div`
  width: 50%;
  min-height: 8.5rem;

  display: flex;
  flex-direction: column;

  ${media.small} {
    width: 100%;
    min-height: auto;
  }
`;

const UserName = styled.div`
  max-width: 20rem;

  position: relative;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.small} {
    max-width: 100%;
  }
`;

const UserNameWrapper = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.6px;
  margin-top: 0.5rem;

  max-width: 65%;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  line-height: 0.9;

  ${media.medium} {
    max-width: 60%;
  }

  ${media.small} {
    font-size: 1.3rem;
    margin-top: 1rem;
    max-width: 100%;
  }
`;

const SNSAccountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;

  height: 100%;
  min-width: 20%;
  margin-left: 1.5rem;

  ${media.small} {
    align-items: center;
    position: absolute;
    right: -95%;
  }
`;

const UserIntroduce = styled.pre`
  margin-top: 1.3rem;
  font-size: 1rem;
  font-family: 'NanumSquare';

  ${media.small} {
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }

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

  ${media.small} {
    width: 100%;
    flex-direction: row;
    height: auto;
  }
`;

const FollowWrapper = styled.div`
  font-size: 1.4rem;
  color: #999999;
  font-weight: 800;
  margin: 0 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.medium} {
    margin: 0 0.5rem;
  }

  ${media.small} {
    font-size: 0.8rem;
    flex-direction: row;
    padding-right: 8px;
    min-width: 4rem;
    margin: 0;
  }
`;

const FollowContainerTitle = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
`;

const BoardTitle = styled.nav`
  font-size: 20px;
  font-weight: 700;
  width: 100%;
  color: black;
  letter-spacing: -1.5px;

  ${media.small} {
    font-size: 1rem;
  }
`;

const Padding = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  padding: 1.5rem 1.5rem;
`;

export default Profile;
