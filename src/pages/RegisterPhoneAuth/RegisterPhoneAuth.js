import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';
import { Checkbox } from 'antd';

const SEND_AUTH_CODE = gql`
  mutation sendAuthCode($phoneNumber: PhoneNumber!) {
    sendAuthCode(input: { isRegistration: true, phoneNumber: $phoneNumber })
  }
`;

const REGISTER = gql`
  mutation register(
    $username: String!
    $id: String!
    $password: String!
    $type: Int!
    $phoneNumber: PhoneNumber!
    $authCode: Int!
  ) {
    register(
      input: {
        user: { username: $username, id: $id, password: $password, type: $type }
        phoneNumber: $phoneNumber
        authCode: $authCode
      }
    )
  }
`;

const RegisterPhoneAuth = (props) => {
  const {
    pageStep,
    setPageStep,
    nextPage,
    prevPage,
    phoneNumber,
    setPhoneNumber,
    authCode,
    setAuthCode,
    userInform,
  } = props;

  const [check, setCheck] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [numberStatus, setNumberStatus] = useState(0);
  const [numberError, setNumberError] = useState(null);
  const [tempNumber, setTempNumber] = useState(null);
  const [auth, authResult] = useMutation(SEND_AUTH_CODE, {
    onError: (error) => {
      setNumberStatus(-1);
      setNumberError(error.message);
    },
  });
  const [register, registerResult] = useMutation(REGISTER, {
    onError: (error) => {
      setAuthError(error.message);
    },
    onCompleted: (data) => {
      localStorage.setItem('token', data.register);
      window.location.href = '/';
    },
  });

  const onClickNextButton = () => {
    if (!check) {
      return setAuthError(true);
    } else {
      return nextPage();
    }
  };

  // 번호 맨 앞자리 예외검사
  const frontCheck = () => {
    const accept = ['010', '011', '016', '017', '018', '019'];
    return accept.indexOf(tempNumber.substr(0, 3)) == -1;
  };

  // 번호 예외검사
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
      return requestAuth();
    }
  };

  // +82 형식으로 변환
  const changeNumber = (num) => {
    return '+82' + num.substr(1);
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
      submitRegister();
    } else {
      setAuthError('인증번호가 일치하지 않습니다');
    }
  };

  const requestAuth = () => {
    auth({ variables: { phoneNumber: changeNumber(tempNumber) } });
  };

  const submitRegister = () => {
    register({
      variables: {
        username: userInform.username,
        id: userInform.id,
        password: userInform.password,
        type: userInform.type,
        phoneNumber: phoneNumber,
        authCode: Number(authCode),
      },
    });
  };

  useEffect(() => {
    if (authResult?.data?.sendAuthCode) {
      setNumberStatus(1);
      setPhoneNumber(changeNumber(tempNumber));
    }
  }, [authResult.data]);

  useEffect(() => {
    setNumberStatus(0);
    setNumberError(null);
    setPhoneNumber(null);
  }, [tempNumber]);

  useEffect(() => {
    setAuthError(null);
  }, [authCode]);

  return (
    <Container>
      <PhoneNumberContainer>
        <CustomTitle>휴대전화 인증</CustomTitle>
        <CustomDescription>휴대폰번호 11자리를 입력해주세요</CustomDescription>
        <PhoneNumberInput
          placeholder="01012345678"
          maxLength="11"
          value={tempNumber}
          onChange={(e) => setTempNumber(e.target.value)}
        />
        <AuthButton onClick={() => numberCheck()}>인증번호 받기</AuthButton>
        <ErrorContainer>
          {numberStatus === -1 ? (
            <ErrorMessage>{numberError}</ErrorMessage>
          ) : null}
        </ErrorContainer>
        {numberStatus === 1 ? (
          <AuthNumberInput
            value={authCode}
            placeholder="인증번호를 입력해주세요"
            onChange={(e) => setAuthCode(e.target.value)}
            maxLength="6"
          ></AuthNumberInput>
        ) : null}
        <ErrorContainer>
          {authError ? <ErrorMessage>{authError}</ErrorMessage> : null}
        </ErrorContainer>
      </PhoneNumberContainer>

      <ButtonConatiner>
        <CustomButton
          onClick={() => {
            prevPage();
          }}
        >
          뒤로가기
        </CustomButton>
        <CustomButton
          onClick={() => {
            authCodeCheck();
          }}
        >
          가입하기
        </CustomButton>
      </ButtonConatiner>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 55vh;
`;

const PhoneNumberContainer = styled.div`
  width: 70%;
`;

const CustomTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
`;

const CustomDescription = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0.2rem 0 1rem;
  color: #3d3d3d;
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

const AuthNumberInput = styled.input`
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

const ErrorContainer = styled.div`
  height: 1rem;
  width: 100%;
  margin-left: 0.5rem;
`;

const CustomCheckbox = styled(Checkbox)`
  margin: 0 1rem;
`;

const ErrorMessage = styled.span`
  text-align: center;
  color: #cb0000;
`;

const ButtonConatiner = styled.div`
  position: absolute;
  width: 50vw;
  min-width: 70%;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const AuthButton = styled.button`
  background-color: black;
  border: none;
  color: white;
  width: 25%;
  height: 4rem;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all ease 0.3s;
  margin-left: 5%;

  &:hover {
    background-color: #3d3d3d;
  }
`;

const CustomButton = styled.button`
  background-color: black;
  border: none;
  color: white;
  width: 10rem;
  height: 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    background-color: #3d3d3d;
  }
`;

export default RegisterPhoneAuth;
