import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';

const WeeklyBanner = () => {
  return (
    <BannerContainer>
      <BannerBackground>
        <Link to="/lounge/weekly">
          <BannerTitle>Weekly Challenge</BannerTitle>
          <SongContainer>
            <SongInform>Tame Impala</SongInform>
            <SongInform>'Cause I'm a man</SongInform>
          </SongContainer>
        </Link>
      </BannerBackground>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 25rem;
  width: 80%;
  border-radius: 1rem;
  position: relative;
  cursor: pointer;

  background-image: url('https://media.pitchfork.com/photos/6064da2beef32a677ce9dbfc/2:1/w_2560%2Cc_limit/Tame-Impala.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;

  &:hover {
    background-size: 115%;
    transition: all ease 0.5s;
  }
`;

const BannerBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  height: 100%;
  width: 100%;
  position: absolute;
`;

const BannerTitle = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 800;
  padding: 1rem 2rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

const SongImage = styled.img`
  width: 10rem;
  height: 10rem;
`;

const SongContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

const SongInform = styled.div`
  font-size: 5em;
  font-weight: 900;
  color: white;
  letter-spacing: -0.2rem;
`;

export default WeeklyBanner;
