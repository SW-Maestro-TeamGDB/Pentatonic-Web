import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';

const WeeklyBanner = () => {
  return (
    <BannerContainer>
      <Link to="/lounge/weekly">
        <Background />
        <BannerContents>
          <WeeklyChallengeTitleContainer>
            <WeeklyChallengeTitle>Weekly Challenge</WeeklyChallengeTitle>
          </WeeklyChallengeTitleContainer>
          <SongTitle>'Cause I'm a man</SongTitle>
          <Singer>Tame Impala</Singer>
        </BannerContents>
      </Link>
    </BannerContainer>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url('https://media.pitchfork.com/photos/6064da2beef32a677ce9dbfc/2:1/w_2560%2Cc_limit/Tame-Impala.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  border-radius: 15px;

  &:hover {
    background-size: 115%;
    transition: all ease 0.5s;
  }
`;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 25vw;
  width: 100%;
  border-radius: 10px;
  position: relative;
  cursor: pointer;

  ${Background} {
    filter: brightness(70%);
  }
`;

const BannerContents = styled.div`
  position: absolute;
  bottom: 5%;
  display: flex;
  flex-direction: column;
  right: 3%;
`;

const WeeklyChallengeTitleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const WeeklyChallengeTitle = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 800;
  padding: 10px 15px;
  width: 200px;
  height: 40px;
  border-radius: 30px;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SongTitle = styled.span`
  font-weight: 900;
  font-size: 48px;
  color: white;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Singer = styled.span`
  font-weight: 900;
  font-size: 24px;
  color: white;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export default WeeklyBanner;
