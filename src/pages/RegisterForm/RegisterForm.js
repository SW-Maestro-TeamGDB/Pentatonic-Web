import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gql, useMutation, useLazyQuery, useQuery } from '@apollo/client';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';
import { Radio } from 'antd';
import { check } from 'prettier';

// const CHECK_ID = gql`
//   query checkId($id: String!) {
//     checkId(input: { user: { id: $id } })
//   }
// `;

const IS_VALID_ID = gql`
  query isValidId($id: ID!) {
    isValidId(id: $id)
  }
`;

// const CHECK_USERNAME = gql`
//   query checkUsername($username: String!) {
//     checkUsername(input: { user: { username: $username } })
//   }
// `;

const IS_VALID_USERNAME = gql`
  query isValidUsername($username: String!) {
    isValidUsername(username: $username)
  }
`;

const RegisterForm = (props) => {
  const {
    pageStep,
    setPageStep,
    nextPage,
    prevPage,
    userInform,
    setUserInform,
  } = props;

  const [idError, setIdError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState(null);
  const [checkId] = useLazyQuery(IS_VALID_ID, {
    fetchPolicy: 'network-only',
    onError: (error) => {
      window.scrollTo(0, 0);
      setIdError(error.message);
    },
    onCompleted: () => {
      checkUsername({ variables: { username: userInform.username } });
    },
  });

  const [checkUsername] = useLazyQuery(IS_VALID_USERNAME, {
    fetchPolicy: 'network-only',
    onError: (error) => {
      window.scrollTo(0, 0);
      setUsernameError(error.message);
    },
    onCompleted: (data) => {
      if (allErrorCheck()) {
        nextPage();
      }
    },
  });

  const idCheck = () => {
    const id = userInform.id;

    if (!id) {
      setIdError('아이디를 입력해주세요');
      return false;
    } else if (id.length < 6) {
      setIdError('6글자 이상의 아이디를 입력해주세요');
      return false;
    }

    return true;
  };

  const passwordCheck = () => {
    const password = userInform.password;

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

  const usernameCheck = () => {
    const username = userInform.username;

    if (!username) {
      setUsernameError('닉네임을 입력해주세요');
      return false;
    } else if (username.length < 2) {
      setUsernameError('2글자 이상의 닉네임을 입력해주세요');
      return false;
    }

    return true;
  };

  const typeCheck = () => {
    const type = userInform.type;

    if (!type) {
      setTypeError('회원 유형을 선택해주세요');
      return false;
    }

    return true;
  };

  const allErrorCheck = () => {
    return !idError && !passwordError && !usernameError && !typeError;
  };

  const onClickNextButton = () => {
    if (idCheck() && passwordCheck() && usernameCheck() && typeCheck()) {
      checkId({ variables: { id: userInform.id } });
    } else {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (idError) {
      setIdError(null);
    }
  }, [userInform.id]);

  useEffect(() => {
    if (passwordError) {
      setPasswordError(null);
    }
  }, [userInform.password, passwordValidation]);

  useEffect(() => {
    if (usernameError) {
      setUsernameError(null);
    }
  }, [userInform.username]);

  useEffect(() => {
    if (typeError) {
      setTypeError(null);
    }
  }, [userInform.type]);

  return (
    <Container>
      <InputContainer>
        <CustomTitle>아이디</CustomTitle>
        <CustomDescription>
          6글자 이상의 아이디를 입력해주세요
        </CustomDescription>
        <CustomInput
          value={userInform.id}
          onChange={(e) =>
            setUserInform({
              ...userInform,
              id: e.target.value,
            })
          }
          placeholder="아이디"
        />
        <ErrorContainer>
          {idError ? <ErrorMessage>{idError}</ErrorMessage> : null}
        </ErrorContainer>
      </InputContainer>
      <InputContainer>
        <CustomTitle>비밀번호</CustomTitle>
        <CustomDescription>
          6글자 이상의 비밀번호를 입력해주세요
        </CustomDescription>
        <PasswordInput
          value={userInform.password}
          type="password"
          onChange={(e) =>
            setUserInform({
              ...userInform,
              password: e.target.value,
            })
          }
          placeholder="비밀번호"
        />
        <PasswordInput
          type="password"
          value={passwordValidation}
          onChange={(e) => setPasswordValidation(e.target.value)}
          placeholder="비밀번호 확인"
        />
        <ErrorContainer>
          {passwordError ? <ErrorMessage>{passwordError}</ErrorMessage> : null}
        </ErrorContainer>
      </InputContainer>
      <InputContainer>
        <CustomTitle>닉네임</CustomTitle>
        <CustomDescription>
          2글자 이상의 닉네임을 입력해주세요
        </CustomDescription>
        <CustomInput
          value={userInform.username}
          onChange={(e) =>
            setUserInform({
              ...userInform,
              username: e.target.value,
            })
          }
          placeholder="닉네임"
        />
        <ErrorContainer>
          {usernameError ? <ErrorMessage>{usernameError}</ErrorMessage> : null}
        </ErrorContainer>
      </InputContainer>
      <InputContainer>
        <CustomTitle>회원 유형</CustomTitle>
        <CustomDescription>
          당신은 음악을 어떻게 즐기고 계신가요?
        </CustomDescription>
        <CustomRadioGroup
          size="large"
          buttonStyle="solid"
          value={userInform.type}
          onChange={(e) =>
            setUserInform({
              ...userInform,
              type: e.target.value,
            })
          }
        >
          <RadioButtonConatiner>
            <CustomRadio value={1}>직업</CustomRadio>
            <CustomRadio value={2}>취미</CustomRadio>
            <CustomRadio value={3}>리스너</CustomRadio>
          </RadioButtonConatiner>
        </CustomRadioGroup>
        <ErrorContainer>
          {typeError ? <ErrorMessage>{typeError}</ErrorMessage> : null}
        </ErrorContainer>
      </InputContainer>
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
            onClickNextButton();
          }}
        >
          다음으로
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
  min-height: 55vh;
  margin-bottom: 2rem;
`;

const InputContainer = styled.div`
  width: 70%;
  margin-top: 2rem;
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

const CustomRadioGroup = styled(Radio.Group)`
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
`;

const RadioButtonConatiner = styled.div`
  width: 60%;
  position: absolute;
  display: flex;
  justify-content: space-between;
`;

const CustomRadio = styled(Radio)`
  font-size: 1rem;
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

const ErrorContainer = styled.div`
  height: 1rem;
  width: 100%;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
`;

const ErrorMessage = styled.span`
  text-align: center;
  color: #cb0000;
`;

const ButtonConatiner = styled.div`
  width: 50vw;
  min-width: 70%;
  margin-top: 4rem;
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

export default RegisterForm;
