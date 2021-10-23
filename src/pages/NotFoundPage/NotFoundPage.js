import react from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';
import { StopOutlined } from '@ant-design/icons';
import { media } from '../../lib/Media';

const NotFoundPage = (props) => {
  const { desc = '찾을 수 없는 페이지입니다', icon = false } = props;
  return (
    <Container>
      {icon ? <CustomStopOutlined /> : <Title>404</Title>}
      <Description>
        {desc}
        <HomeButton to="/">홈으로</HomeButton>
      </Description>
    </Container>
  );
};

const Container = styled.div`
  width: 50%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;

  ${media.medium} {
    width: 80%;
    height: 80vh;
  }
`;

const Title = styled.div`
  font-size: 8rem;
  font-weight: 900;
  letter-spacing: -0.2rem;
  line-height: 1.2;
  border-bottom: 8px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 0.5rem;
`;

const Description = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: -0.1rem;
  padding-top: 1rem;
  text-align: center;

  ${media.medium} {
    font-size: 1.5rem;
  }
`;

const HomeButton = styled(Link)`
  border-radius: 10px;
  width: 100%;
  min-height: 3.5rem;
  border: none;
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.1rem;
  cursor: pointer;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  background-size: 500%;
  margin-top: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    animation: gradient 3s ease infinite;
    color: white;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const CustomStopOutlined = styled(StopOutlined)`
  font-size: 12rem;
  color: #bbb;

  ${media.medium} {
    font-size: 8rem;
    margin-bottom: 2rem;
  }
`;

export default NotFoundPage;
