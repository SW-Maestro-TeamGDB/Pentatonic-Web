import react, { useEffect, useState, useMutation } from 'react';
import styled from 'styled-components';
import { Steps } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import PageContainer from '../../components/PageContainer';
import RegisterForm from '../RegisterForm';
import RegisterPhoneAuth from '../RegisterPhoneAuth';
import RegisterTermsOfService from '../RegisterTermsOfService';

const { Step } = Steps;

const Register = () => {
  const userInit = {
    id: null,
    password: null,
    type: null,
    username: null,
  };
  const [pageStep, setPageStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [authCode, setAuthCode] = useState(null);
  const [userInform, setUserInform] = useState(userInit);

  const nextPage = () => {
    setPageStep(pageStep + 1);
  };
  const prevPage = () => {
    setPageStep(pageStep - 1);
    setUserInform(userInit);
  };

  useEffect(() => {
    console.log(userInform);
  }, userInform);

  const pages = [
    {
      description: '펜타토닉 이용약관 동의',
      content: (
        <RegisterTermsOfService
          pageStep={pageStep}
          setPageStep={setPageStep}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      ),
    },
    {
      description: '개인정보 입력',
      content: (
        <RegisterForm
          pageStep={pageStep}
          setPageStep={setPageStep}
          nextPage={nextPage}
          prevPage={prevPage}
          userInform={userInform}
          setUserInform={setUserInform}
        />
      ),
    },
    {
      description: '휴대전화 인증',
      content: (
        <RegisterPhoneAuth
          pageStep={pageStep}
          setPageStep={setPageStep}
          nextPage={nextPage}
          prevPage={prevPage}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          authCode={authCode}
          setAuthCode={setAuthCode}
          userInform={userInform}
        />
      ),
    },
  ];

  return (
    <PageContainer>
      <CustomSteps progressDot current={pageStep}>
        {pages.map((item) => (
          <Step
            progressDot
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </CustomSteps>
      <StepContents>{pages[pageStep].content}</StepContents>
    </PageContainer>
  );
};

const StepContents = styled.div`
  width: 70%;
  margin-top: 5%;
`;

const CustomSteps = styled(Steps)`
  width: 70%;
`;

export default Register;
