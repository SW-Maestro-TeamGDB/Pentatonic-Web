import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { Link } from 'react-router-dom';

const WeeklyBanner = () => {
  return (
    <BannerContainer>
      <Link to="/lounge/weekly">
        <BannerBackground>
          <BannerTitle>Weekly Challenge</BannerTitle>
          <SongContainer>
            <SongInform>Tame Impala</SongInform>
            <SongInform>'Cause I'm a man</SongInform>
          </SongContainer>
        </BannerBackground>
      </Link>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 30em;
  width: 80%;
  border-radius: 1em;
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
  position: relative;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1em;
  height: 100%;
  width: 100%;
  position: absolute;
`;

const BannerTitle = styled.div`
  color: white;
  position: absolute;
  font-size: 1.5vw;
  font-weight: 800;
  padding: 2vh 2vw;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
`;

const SongContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SongInform = styled.div`
  font-size: 3.5vw;
  font-weight: 900;
  color: white;
  letter-spacing: -0.2rem;
`;

export default WeeklyBanner;
