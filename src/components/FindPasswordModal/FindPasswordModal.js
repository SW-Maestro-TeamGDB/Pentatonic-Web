import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { LeftOutlined, CheckCircleOutlined } from '@ant-design/icons';

const SEND_AUTH_CODE = gql`
  mutation sendAuthCode($phoneNumber: PhoneNumber!) {
    sendAuthCode(input: { isRegistration: false, phoneNumber: $phoneNumber })
  }
`;

const FIND_ID = gql`
  query findId($phoneNumber: PhoneNumber!, $authCode: Int!) {
    findId(input: { phoneNumber: $phoneNumber, authCode: $authCode }) {
      id
    }
  }
`;

const RESET_PASSWORD = gql`
  mutation resetPassword(
    $phoneNumber: PhoneNumber!
    $authCode: Int!
    $password: String!
  ) {
    resetPassword(
      input: {
        phoneNumber: $phoneNumber
        authCode: $authCode
        user: { password: $password }
      }
    )
  }
`;

const FindPasswordModal = (props) => {
  const { modalToggle, setModalToggle, closeModal, setPageStep } = props;
  const [page, setPage] = useState(0);
  const [tempNumber, setTempNumber] = useState(null);
  const [numberStatus, setNumberStatus] = useState(0);
  const [password, setPassword] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [numberError, setNumberError] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [authCode, setAuthCode] = useState(null);
  const [auth, authResult] = useMutation(SEND_AUTH_CODE, {
    onError: (error) => {
      setNumberStatus(-1);
      setNumberError(error.message);
    },
  });

  const [resetPassword, resetPasswordResult] = useMutation(RESET_PASSWORD, {
    onError: (error) => {
      setPasswordError(error.message);
    },
    onCompleted: (data) => {
      console.log(data);
      setPage(2);
    },
  });

  const [findId] = useLazyQuery(FIND_ID, {
    fetchPolicy: 'network-only',
    onError: (error) => {
      setAuthError(error.message);
    },
    onCompleted: () => {
      setPage(1);
    },
  });

  const passwordCheck = () => {
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요');
      return false;
    } else if (password.length < 6) {
      setPasswordError('6글자 이상의 비밀번호를 입력해주세요');
      return false;
    } else if (password !== passwordValidation) {
      setPasswordError('비밀번호 확인이 일치하지 않습니다');
      return false;
    }

    return true;
  };

  const onClickSubmit = () => {
    if (passwordCheck()) {
      resetPassword({
        variables: {
          password: password,
          phoneNumber: changeNumber(tempNumber),
          authCode: Number(authCode),
        },
      });
    }
  };

  useEffect(() => {
    setNumberStatus(0);
    setNumberError(null);
    setAuthError(null);
  }, []);

  useEffect(() => {
    setPasswordError(null);
  }, [password, passwordValidation]);

  const showContent = () => {
    if (page === 0) {
      return (
        <>
          <CustomTitle>휴대전화 인증</CustomTitle>
          <CustomDescription>
            찾으실 계정의 휴대전화 번호를 입력해주세요
          </CustomDescription>
          <PhoneNumberWrapper>
            <PhoneNumberInput
              placeholder="01012345678"
              maxLength="11"
              value={tempNumber}
              onChange={(e) => setTempNumber(e.target.value)}
              disabled={numberStatus === 1}
            />
            <AuthButton onClick={() => numberCheck()}>인증하기</AuthButton>
          </PhoneNumberWrapper>
          <ErrorContainer>
            {numberStatus === -1 ? (
              <ErrorMessage>{numberError}</ErrorMessage>
            ) : null}
          </ErrorContainer>
          {numberStatus === 1 ? (
            <CustomInput
              value={authCode}
              placeholder="인증번호를 입력해주세요"
              onChange={(e) => setAuthCode(e.target.value)}
              maxLength="6"
            ></CustomInput>
          ) : null}
          <ErrorContainer>
            {authError ? <ErrorMessage>{authError}</ErrorMessage> : null}
          </ErrorContainer>
          <SubmitButton onClick={() => authCodeCheck()}>다음으로</SubmitButton>
        </>
      );
    } else if (page === 1) {
      return (
        <>
          <CustomTitle>비밀번호 변경</CustomTitle>
          <CustomDescription>
            변경하실 비밀번호를 입력해주세요
          </CustomDescription>
          <PasswordInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="새 비밀번호"
          />
          <PasswordInput
            type="password"
            value={passwordValidation}
            onChange={(e) => setPasswordValidation(e.target.value)}
            placeholder="비밀번호 확인"
          />
          <ErrorContainer>
            {passwordError ? (
              <ErrorMessage>{passwordError}</ErrorMessage>
            ) : null}
          </ErrorContainer>
          <SubmitButton onClick={() => onClickSubmit()}>변경하기</SubmitButton>
        </>
      );
    } else if (page === 2) {
      return (
        <>
          <ResultContainer>
            <IconWrapper>
              <CheckCircleOutlined />
            </IconWrapper>
            <TextWrapper>회원님의 비밀번호가</TextWrapper>
            <TextWrapper>성공적으로 변경 되었습니다</TextWrapper>
          </ResultContainer>
          <SubmitButton onClick={() => setPageStep(0)}>로그인하기</SubmitButton>
        </>
      );
    }
  };

  const frontCheck = () => {
    const accept = ['010', '011', '016', '017', '018', '019'];
    return accept.indexOf(tempNumber.substr(0, 3)) == -1;
  };

  // +82 형식으로 변환
  const changeNumber = (num) => {
    return '+82' + num.substr(1);
  };

  const requestAuth = () => {
    auth({ variables: { phoneNumber: changeNumber(tempNumber) } });
  };

  const numberCheck = () => {
    if (
      !tempNumber ||
      tempNumber.length != 11 ||
      frontCheck() ||
      isNaN(Number(tempNumber))
    ) {
      setNumberError('올바르지 않은 번호형식 입니다');
      return setNumberStatus(-1);
    } else {
      setNumberStatus(1);
      return requestAuth();
    }
  };

  const authCodeCheck = () => {
    if (numberStatus !== 1) {
      setNumberStatus(-1);
      setNumberError('휴대전화 인증을 진행해주세요');
      return;
    } else if (
      Number(authCode).toString().length === 6 &&
      !isNaN(Number(tempNumber))
    ) {
      setAuthError(null);
      findId({
        variables: {
          phoneNumber: changeNumber(tempNumber),
          authCode: Number(authCode),
        },
      });
    } else {
      setAuthError('인증번호가 일치하지 않습니다');
    }
  };

  useEffect(() => {
    setNumberStatus(0);
    setNumberError(null);
  }, [tempNumber]);

  useEffect(() => {
    setAuthError(null);
  }, [authCode]);

  return (
    <FindAccountContainer>
      <ModalHeader>
        <BakcwardButton onClick={() => setPageStep(1)}>
          <LeftOutlined />
        </BakcwardButton>
        <HeaderTitle>비밀번호 찾기</HeaderTitle>
      </ModalHeader>
      <ModalContents>{showContent()}</ModalContents>
    </FindAccountContainer>
  );
};

const FindAccountContainer = styled.div`
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CustomTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
`;

const CustomDescription = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin: 0.2rem 0 1rem;
  color: #3d3d3d;
`;

const AuthButton = styled.button`
  background-color: black;
  border: none;
  color: white;
  width: 25%;
  height: 4rem;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all ease 0.3s;
  margin-left: 5%;

  &:hover {
    background-color: #3d3d3d;
  }
`;

const ResultContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 65%;
`;

const TextWrapper = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
`;

const IconWrapper = styled.div`
  font-size: 6rem;
  font-weight: 800;
  color: #50bc6e;
  width: 90%;
  text-align: center;
  padding: 0.5rem 0;
  border-radius: 1rem;
`;

const PhoneNumberWrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ErrorContainer = styled.div`
  height: 1rem;
  width: 100%;
  margin-left: 0.5rem;
`;

const ErrorMessage = styled.span`
  text-align: center;
  color: #cb0000;
`;

const ModalHeader = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5%;
`;

const ModalContents = styled.div`
  position: absolute;
  width: 80%;
  height: 70%;
  bottom: 10%;
`;

const SubmitButton = styled.button`
  border-radius: 0.8rem;
  position: absolute;
  bottom: 0%;
  left: 0;
  background-color: black;
  width: 100%;
  height: 4rem;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  &:hover {
    background-color: rgb(50, 50, 50);
  }
`;

const Divider = styled.div`
  border-bottom: 1px solid lightgray;
  border-radius: 5px;
`;

const BakcwardButton = styled.span`
  position: absolute;
  cursor: pointer;
  z-index: 2;
  font-size: 1.5rem;

  &:hover {
    color: gray;
  }
`;

const SelectDesc = styled.div`
  font-size: 2rem;
  font-weight: 800;
`;

const HeaderTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  position: absolute;
  width: 100%;
`;

const PhoneNumberInput = styled.input`
  width: 70%;
  color: black;
  border: 2px solid lightgray;
  transition: all ease 0.3s;
  outline: none;
  height: 4rem;
  border-radius: 0.8rem;
  margin: 0.5rem 0;
  padding: 0 1rem;
  font-size: 1.2rem;

  &:focus {
    border: 2px solid black;
  }
`;

const CustomInput = styled.input`
  width: 100%;
  color: black;
  border: 2px solid lightgray;
  transition: all ease 0.3s;
  outline: none;
  height: 4rem;
  border-radius: 0.8rem;
  margin: 0.2rem 0;
  padding: 0 1rem;
  font-size: 1.2rem;

  &:focus {
    border: 2px solid black;
  }
`;

const PasswordInput = styled.input.attrs({ type: 'password' })`
  width: 100%;
  color: black;
  border: 2px solid lightgray;
  transition: all ease 0.3s;
  outline: none;
  height: 4rem;
  border-radius: 0.8rem;
  margin: 0.2rem 0;
  padding: 0 1rem;
  font-size: 1.2rem;
  font-family: 'Arial';

  &:focus {
    border: 2px solid black;
  }

  ::placeholder {
    font-family: 'NanumSquare';
  }
`;

export default FindPasswordModal;
