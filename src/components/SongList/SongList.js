import react from 'react';
import styled from 'styled-components';
import { media } from '../../lib/Media';
import { Link } from 'react-router-dom';

const SongList = (props) => {
  const { link } = props;
  const weekly = true;

  return (
    <SongInformLink to={link}>
      <SongImg />
      <SongTitleContainer>
        Fix You
        {weekly ? <WeeklyBanner>Weekly</WeeklyBanner> : null}
      </SongTitleContainer>
      <ArtistContainer>ColdPlay</ArtistContainer>
      <SessionContainer>보컬,기타,드럼,베이스</SessionContainer>
      <DifficultyContainer>난이도 ● ○ ○ ○ ○</DifficultyContainer>
    </SongInformLink>
  );
};

const SongInformLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 7rem;
  position: relative;

  color: black;

  &:hover {
    color: black;
  }
`;

const WeeklyBanner = styled.div`
  width: auto;
  padding: 0.6vh 1vw;
  color: white;
  font-size: 0.8rem;
  border-radius: 1rem;
  background-image: linear-gradient(to right, #6236ff, #9b66ff);
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SongImg = styled.div`
  background-image: url('https://media.pitchfork.com/photos/608a33343bbb6032f540a222/2:1/w_2912,h_1456,c_limit/coldplay.jpg');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  border-radius: 15px;
  width: 15%;
  height: 80%;
  box-sizing: border-box;
`;

const SongTitleContainer = styled.div`
  width: 30%;
  height: 100%;
  text-align: left;
  font-size: 1.5rem;
  font-weight: 700;
  padding-left: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;

const ArtistContainer = styled.div`
  width: 20%;
  text-align: left;
  font-size: 1.2rem;
  color: #222222;
  font-weight: 700;
  padding-left: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SessionContainer = styled.div`
  width: 25%;
  font-size: 1rem;
  color: #222222;
  font-weight: 700;
  padding-left: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DifficultyContainer = styled.div`
  width: 20%;
  font-size: 1rem;
  color: #222222;
  font-weight: 700;
  padding-left: 2.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
`;

export default SongList;