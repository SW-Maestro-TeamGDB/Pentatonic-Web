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
          <SongTitle>Fix You</SongTitle>
          <Singer>Coldplay</Singer>
        </BannerContents>
      </Link>
    </BannerContainer>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url('https://w.namu.la/s/8f16d9ad8ac378b6d2339ce927bbc9d6431dbf5277b241bf363ffa61cf5496caf1611f471aca282ff14bd8e544135b8f5edbbfebb6f942603cc9563f130a548cf40005956d405598ed3f6067522ad7b6aaf067e05dbc1e79085d5b90fb90ab5f9947a0cd3108efda6f8008666a1627cc');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  border-radius: 15px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
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
  overflow: hidden;

  ${Background} {
    filter: brightness(50%);

    &:hover {
      filter: brightness(70%);
    }
  }
`;

const BannerContents = styled.div`
  position: absolute;
  bottom: 10%;
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
  line-height: 1;
  letter-spacing: -0.4px;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SongTitle = styled.span`
  font-weight: 900;
  font-size: 60px;
  color: white;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  line-height: 1.3;
  letter-spacing: 2px;
`;

const Singer = styled.span`
  font-weight: 900;
  font-size: 24px;
  color: white;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  line-height: 1;
`;

export default WeeklyBanner;
