import react, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import {
  currentUserVar,
  isLoggedInVar,
  GET_USER_INFORM,
} from '../../apollo/cache';
import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const LOGIN = gql`
  mutation login($id: Id!, $password: Password!) {
    login(input: { user: { id: $id, password: $password } })
  }
`;

const LoginModal = (props) => {
  const { modalToggle, setModalToggle, closeModal, setPageStep } = props;
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [FormError, setFormError] = useState(null);
  const [login, loginResult] = useMutation(LOGIN, {
    errorPolicy: 'all',
    onError: (errors) => {
      setFormError('로그인에 실패했습니다');
    },
    onCompleted: (data) => {
      getUserInform({
        variables: {
          getUserInfoUserId: id,
        },
      });
    },
  });

  const [getUserInform, getUserInformResult] = useLazyQuery(GET_USER_INFORM, {
    fetchPolicy: 'no-cache',
    // 여기에 variables 넣으면 id값 바뀔때마다 query 실행됨
    onCompleted: (data) => {
      localStorage.setItem('userInfo', JSON.stringify(data.getUserInfo));
      currentUserVar(data.getUserInfo);
      setID('');
      setPassword('');
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    setID('');
    setPassword('');
    setFormError('');
  }, [modalToggle]);

  useEffect(() => {
    if (loginResult.data?.login) {
      localStorage.setItem('token', loginResult.data.login);
      setModalToggle(false);
      isLoggedInVar(true);
    } else if (loginResult.error) {
      setFormError(loginResult.error.message);
    }
  }, [loginResult.data]);

  useEffect(() => {
    if (FormError) setFormError(null);
  }, [id, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id || !password) {
      return setFormError('아이디와 비밀번호를 입력해주세요');
    }

    login({ variables: { id, password } });
  };

  return (
    <LoginContainer>
      <LoginTitle>로그인</LoginTitle>
      <CustomForm onSubmit={handleSubmit}>
        <CustomInput
          placeholder="아이디"
          value={id}
          onChange={(e) => setID(e.target.value)}
          type="text"
          maxLength="14"
        />
        <PasswordInput
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {FormError ? <ErrorMessage>{FormError}</ErrorMessage> : null}
        <SubmitButton type="submit">로그인</SubmitButton>
      </CustomForm>
      <SubContainer>
        <CustomButton onClick={() => setPageStep(1)}>ID/PW찾기</CustomButton>
        <CustomLink to="/register" onClick={closeModal}>
          회원가입
        </CustomLink>
      </SubContainer>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 5%;
`;

const SubContainer = styled.div`
  position: absolute;
  bottom: 15%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CustomLink = styled(Link)`
  color: black;
  font-size: 1rem;
  margin: 0 1rem;
`;

const CustomButton = styled.div`
  color: black;
  font-size: 1rem;
  margin: 0 1rem;
  cursor: pointer;
`;

const CustomForm = styled.form`
  display: flex;
  width: 80%;
  flex-direction: column;
  margin-top: 10%;
`;

const CustomInput = styled.input`
  width: 100%;
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

const ErrorMessage = styled.span`
  text-align: center;
  color: #cb0000;
`;

const PasswordInput = styled.input.attrs({ type: 'password' })`
  width: 100%;
  color: black;
  border: 2px solid lightgray;
  transition: all ease 0.3s;
  outline: none;
  height: 4rem;
  border-radius: 0.8rem;
  margin: 0.5rem 0;
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

const SubmitButton = styled.button`
  border-radius: 0.8rem;
  background-color: black;
  margin: 0.5rem 0;
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

export default LoginModal;
