import react, { useEffect, useState, useMutation } from 'react';
import styled from 'styled-components';
import { Steps } from 'antd';
import { GET_CURRENT_USER } from '../../apollo/cache';
import { gql, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import PageContainer from '../../components/PageContainer';
import RegisterForm from '../RegisterForm';
import RegisterPhoneAuth from '../RegisterPhoneAuth';
import RegisterTermsOfService from '../RegisterTermsOfService';
import { Default, Mobile, media } from '../../lib/Media';

const { Step } = Steps;

const Register = ({ history }) => {
  const userInit = {
    id: null,
    password: null,
    type: null,
    username: null,
  };
  const { data } = useQuery(GET_CURRENT_USER);
  const [pageStep, setPageStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [authCode, setAuthCode] = useState(null);
  const [userInform, setUserInform] = useState(userInit);

  // 회원가입 중 로그인 할 시 메인화면으로 이동
  useEffect(() => {
    if (data.user) {
      history.push('/');
    }
  }, [data]);

  const nextPage = () => {
    setPageStep(pageStep + 1);
  };
  const prevPage = () => {
    setPageStep(pageStep - 1);
    setUserInform(userInit);
  };

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
          history={history}
        />
      ),
    },
  ];

  return (
    <PageContainer>
      <Default>
        <CustomSteps progressDot current={pageStep}>
          {pages.map((item, i) => (
            <Step
              progressDot
              key={`registerStep - ${i}`}
              title={item.title}
              description={item.description}
            />
          ))}
        </CustomSteps>
      </Default>
      <Mobile>
        <MobileDescription>{pages[pageStep].description}</MobileDescription>
      </Mobile>
      <StepContents>{pages[pageStep].content}</StepContents>
    </PageContainer>
  );
};

const StepContents = styled.div`
  width: 100%;
  margin-top: 3%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  padding: 3rem 0;
  min-height: 75vh;
  position: relative;

  ${media.small} {
    margin-top: 0;
    box-shadow: none;
    padding: 1rem 0;
  }
`;

const MobileDescription = styled.div`
  margin: 3vh 0 2vh;
  font-size: 1.2rem;
  font-weight: 800;
`;

const CustomSteps = styled(Steps)`
  width: 80%;
  margin-top: 1.5rem;
`;

export default Register;
