import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import { QuestionCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { media } from '../../lib/Media';

import ic_facebook from '../../images/SNS/ic_facebook.png';
import ic_instagram from '../../images/SNS/ic_instagram.png';
import ic_kakao from '../../images/SNS/ic_kakao.png';
import ic_twitter from '../../images/SNS/ic_twitter.png';

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

const SNSModal = (props) => {
  const { modalToggle, setModalToggle, data, getUserInfo } = props;
  const [tempSNSData, setTempSNSData] = useState({
    facebook: null,
    twitter: null,
    instagram: null,
    kakao: null,
  });
  const [kakaoError, setKakaoError] = useState(null);
  const [facebookError, setFacebookError] = useState(null);
  const [twitterError, setTwitterError] = useState(null);
  const [instagramError, setInstagramError] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const [changeSNSData] = useMutation(CHANGE_PROFILE, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      setSubmitError(error.message);
    },
    onCompleted: (data) => {
      setSubmitError(null);
      getUserInfo();
    },
  });

  const closeModal = () => {
    if (!checkURL()) {
      setTempSNSData({
        facebook: facebookError ? null : tempSNSData.facebook,
        twitter: twitterError ? null : tempSNSData.twitter,
        instagram: instagramError ? null : tempSNSData.instagram,
        kakao: kakaoError ? null : tempSNSData.kakao,
      });
    }

    setModalToggle(false);

    setKakaoError(null);
    setFacebookError(null);
    setTwitterError(null);
    setInstagramError(null);
  };

  const checkURL = () => {
    let check = true;
    const regex =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

    if (tempSNSData.facebook) {
      if (
        regex.test(tempSNSData.facebook) === false ||
        tempSNSData.facebook.indexOf('facebook.com/') === -1
      ) {
        setFacebookError('잘못된 페이스북 주소 입니다.');
        check = false;
      } else {
        setFacebookError(null);
      }
    } else {
      setFacebookError(null);
    }
    if (tempSNSData.twitter) {
      if (
        regex.test(tempSNSData.twitter) === false ||
        tempSNSData.twitter.indexOf('twitter.com/') === -1
      ) {
        setTwitterError('잘못된 트위터 주소 입니다.');
        check = false;
      } else {
        setTwitterError(null);
      }
    } else {
      setTwitterError(null);
    }
    if (tempSNSData.instagram) {
      if (
        regex.test(tempSNSData.instagram) === false ||
        tempSNSData.instagram.indexOf('instagram.com/') === -1
      ) {
        setInstagramError('잘못된 인스타그램 주소 입니다.');
        check = false;
      } else {
        setInstagramError(null);
      }
    } else {
      setInstagramError(null);
    }
    if (tempSNSData.kakao) {
      if (
        regex.test(tempSNSData.kakao) === false ||
        tempSNSData.kakao.indexOf('open.kakao.com/o/') === -1
      ) {
        setKakaoError('잘못된 카카오톡 오픈채팅 주소 입니다.');
        check = false;
      } else {
        setKakaoError(null);
      }
    } else {
      setKakaoError(null);
    }

    return check;
  };

  const setSNSData = () => {
    let temp = {};

    if (tempSNSData.facebook) temp.facebook = tempSNSData.facebook;
    if (tempSNSData.twitter) temp.twitter = tempSNSData.twitter;
    if (tempSNSData.instagram) temp.instagram = tempSNSData.instagram;
    if (tempSNSData.kakao) temp.kakao = tempSNSData.kakao;

    changeSNSData({
      variables: {
        changeProfileInput: {
          user: { social: temp },
        },
      },
    });
  };

  useEffect(() => {
    if (data) {
      setTempSNSData(data);
    }
  }, []);

  return (
    <CustomModal
      visible={modalToggle}
      onCancel={closeModal}
      footer={null}
      centered
      closable={true}
      maskClosable={true}
    >
      <ModalContainer>
        <TextWrapper>SNS 계정등록</TextWrapper>
        <SNSFormContainer>
          <SNSFormWrapper>
            <SNSICon src={ic_facebook} />
            <CustomInput
              value={tempSNSData.facebook || ''}
              onChange={(e) => {
                setTempSNSData({ ...tempSNSData, facebook: e.target.value });
              }}
              placeholder="https://facebook.com/example"
            />
          </SNSFormWrapper>
          {facebookError ? <ErrorMessage>{facebookError}</ErrorMessage> : null}
          <SNSFormWrapper>
            <SNSICon src={ic_twitter} />
            <CustomInput
              value={tempSNSData.twitter || ''}
              onChange={(e) => {
                setTempSNSData({ ...tempSNSData, twitter: e.target.value });
              }}
              placeholder="https://twitter.com/example"
            />
          </SNSFormWrapper>
          {twitterError ? <ErrorMessage>{twitterError}</ErrorMessage> : null}
          <SNSFormWrapper>
            <SNSICon src={ic_instagram} />
            <CustomInput
              value={tempSNSData.instagram || ''}
              onChange={(e) => {
                setTempSNSData({ ...tempSNSData, instagram: e.target.value });
              }}
              placeholder="https://instagram.com/example"
            />
          </SNSFormWrapper>
          {instagramError ? (
            <ErrorMessage>{instagramError}</ErrorMessage>
          ) : null}
          <SNSFormWrapper>
            <SNSICon src={ic_kakao} />
            <CustomInput
              value={tempSNSData.kakao || ''}
              onChange={(e) => {
                setTempSNSData({ ...tempSNSData, kakao: e.target.value });
              }}
              placeholder="https://open.kakao.com/o/example"
            />
          </SNSFormWrapper>
          {kakaoError ? <ErrorMessage>{kakaoError}</ErrorMessage> : null}
        </SNSFormContainer>
        <SubmitButton
          onClick={() => {
            if (checkURL()) {
              setSNSData(tempSNSData);
              closeModal();
            }
          }}
        >
          등록하기
        </SubmitButton>
      </ModalContainer>
    </CustomModal>
  );
};

const ErrorMessage = styled.div`
  text-align: center;
  color: #cb0000;

  font-size: 0.7rem;
  margin: 0.1rem 0 0.3rem;
`;

const CustomModal = styled(Modal)`
  border-radius: 1rem;
  overflow: hidden;
`;

const SNSFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  width: 80%;

  ${media.small} {
    width: 95%;
  }
`;

const SNSFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.25rem 0;

  width: 100%;
`;

const SNSICon = styled.img`
  width: 1.8rem;
  margin-right: 2rem;

  ${media.small} {
    margin-right: 1rem;
    width: 1.5rem;
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
  margin: 0;
  padding: 0 0.8rem;
  font-size: 0.9rem;

  &:focus {
    border: 2px solid #aaa;
  }

  ::placeholder {
    font-size: 0.8rem;
    color: #777;
  }

  ${media.small} {
    font-size: 0.8rem;
  }
`;

const UploadText = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 7vh;
`;

const CustomLoadingIcon = styled(LoadingOutlined)`
  font-size: 8rem;
  color: #6236ff;
`;

const ModalContainer = styled.div`
  display: flex;

  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 25rem;
  padding-bottom: 1rem;
`;

const CustomCheckIcon = styled(QuestionCircleOutlined)`
  font-size: 8vh;
  color: #6236ff;
`;

const TextWrapper = styled.div`
  font-size: 1.4rem;
  font-weight: 900;
  margin-top: 1rem;

  ${media.small} {
    font-size: 1.1rem;
  }
`;

const DescWrapper = styled.div`
  font-size: 1rem;
  margin-top: 3rem;
  font-weight: 500;

  ${media.small} {
    font-size: 0.8rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  padding-top: 5rem;
`;

const SubmitButton = styled.div`
  cursor: pointer;
  width: 80%;
  padding: 0.5rem 0.5rem;
  color: white;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  border-radius: 0.5rem;
  margin-top: 2.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;

  &:hover {
    color: white;
  }

  ${media.small} {
    font-size: 0.8rem;
    padding: 0.8rem 0.5rem;
    width: 95%;
  }
`;

export default SNSModal;
