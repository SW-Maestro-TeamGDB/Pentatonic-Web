import react from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageContainer from '../../components/PageContainer';

const NotFoundPage = (props) => {
  const { desc = '찾을 수 없는 페이지입니다' } = props;
  return (
    <Container>
      <Title>404</Title>
      <Description>
        {desc}
        <HomeButton to="/">홈으로</HomeButton>
      </Description>
    </Container>
  );
};

const Container = styled.div`
  width: 40%;
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
`;

const Title = styled.div`
  font-size: 8rem;
  font-weight: 900;
  letter-spacing: -0.2rem;
  line-height: 1.2;
`;

const Description = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: -0.1rem;
  border-top: 8px solid rgba(0, 0, 0, 0.05);
  padding-top: 1rem;
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

export default NotFoundPage;
