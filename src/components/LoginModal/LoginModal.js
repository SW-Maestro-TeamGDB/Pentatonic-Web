import react, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import { set } from 'react-hook-form';

const LOGIN = gql`
  mutation login($id: String!, $password: String!) {
    login(input: { user: { id: $id, password: $password } })
  }
`;

const LoginModal = (props) => {
  const { modalToggle, setModalToggle } = props;
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [login, loginResult] = useMutation(LOGIN, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data) alert(data);
    },
  });

  useEffect(() => {
    setID('');
    setPassword('');
    setError('');
  }, [modalToggle]);

  useEffect(() => {
    if (loginResult.data) {
      alert('로그인에 성공했습니다.');
    } else if (loginResult.error) {
      setError(loginResult.error.message);
    }
  }, [loginResult.data]);

  useEffect(() => {
    if (error) setError(null);
  }, [id, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id || !password) {
      return setError('아이디와 비밀번호를 입력해주세요');
    }

    login({ variables: { id, password } });
    setID('');
    setPassword('');
  };

  const closeModal = () => {
    setModalToggle(false);
  };

  return (
    <CustomModal
      visible={modalToggle}
      onCancel={closeModal}
      footer={null}
      centered
    >
      <LoginContainer>
        <LoginTitle>로그인</LoginTitle>
        <CustomForm onSubmit={handleSubmit}>
          <CustomInput
            placeholder="아이디"
            value={id}
            onChange={(e) => setID(e.target.value)}
            type="text"
          />
          <PasswordInput
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error ? <ErrorMessage>{error}</ErrorMessage> : null}
          <SubmitButton type="submit">로그인</SubmitButton>
        </CustomForm>
        <SubContainer>
          <CustomLink to="/account" onClick={closeModal}>
            ID/PW찾기
          </CustomLink>
          <CustomLink to="/register" onClick={closeModal}>
            회원가입
          </CustomLink>
        </SubContainer>
      </LoginContainer>
    </CustomModal>
  );
};

const CustomModal = styled(Modal)`
  border-radius: 1rem;
  overflow: hidden;
`;

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
