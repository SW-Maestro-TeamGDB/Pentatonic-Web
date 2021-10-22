import react from 'react';
import styled from 'styled-components';
import { Space, Dropdown, Menu, Button, Select } from 'antd';
import { changeGenreToKorean } from '../../lib/changeGenreToKorean';
import { Default, media } from '../../lib/Media';

const GenreButton = (props) => {
  const { genre, setGenre } = props;
  const genreMenu = (
    <CustomMenu>
      <CustomMenuItem key={0} onClick={() => setGenre('전체')}>
        전체
      </CustomMenuItem>
      <CustomMenuItem key={1} onClick={() => setGenre('POP')}>
        {changeGenreToKorean('POP')}
      </CustomMenuItem>
      <CustomMenuItem key={2} onClick={() => setGenre('ROCK')}>
        {changeGenreToKorean('ROCK')}
      </CustomMenuItem>
      <CustomMenuItem key={3} onClick={() => setGenre('K_POP')}>
        {changeGenreToKorean('K_POP')}
      </CustomMenuItem>
      <CustomMenuItem key={4} onClick={() => setGenre('DANCE')}>
        {changeGenreToKorean('DANCE')}
      </CustomMenuItem>
      <CustomMenuItem key={5} onClick={() => setGenre('HIP_HOP')}>
        {changeGenreToKorean('HIP_HOP')}
      </CustomMenuItem>
      <CustomMenuItem key={6} onClick={() => setGenre('BALLAD')}>
        {changeGenreToKorean('BALLAD')}
      </CustomMenuItem>
      <CustomMenuItem key={7} onClick={() => setGenre('ELECTRONIC')}>
        {changeGenreToKorean('ELECTRONIC')}
      </CustomMenuItem>
      <CustomMenuItem key={8} onClick={() => setGenre('JAZZ')}>
        {changeGenreToKorean('JAZZ')}
      </CustomMenuItem>
      <CustomMenuItem key={9} onClick={() => setGenre('CLASSICAL')}>
        {changeGenreToKorean('CLASSICAL')}
      </CustomMenuItem>
      <CustomMenuItem key={10} onClick={() => setGenre('BLUES')}>
        {changeGenreToKorean('BLUES')}
      </CustomMenuItem>
    </CustomMenu>
  );

  return (
    <Dropdown overlay={genreMenu} trigger={['click']} placement="bottomLeft">
      <CustomButton>장르: {changeGenreToKorean(genre)}</CustomButton>
    </Dropdown>
  );
};

const CustomButton = styled.span`
  cursor: pointer;
  font-size: 0.9rem;
  border: 1px solid #6236ff;
  color: #6236ff;
  padding: 0.5vh 0.5vw;
  border-radius: 0.5rem;
  font-weight: 700;
  text-align: center;
  min-width: 7rem;
  transition: all ease 0.3s;

  &:hover {
    border: 1px solid rgba(98, 54, 255, 0.8);
  }

  ${media.small} {
    font-size: 0.8rem;
    padding: 5px 10px;
    min-width: 5rem;
  }
`;

const CustomMenu = styled(Menu)`
  min-width: 7rem;
  text-align: center;

  ${media.small} {
    min-width: 5rem;
    font-size: 0.8rem;
  }
`;

const CustomMenuItem = styled(Menu.Item)`
  margin: 0.2rem 0;
  width: 7rem;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  ${media.small} {
    min-width: 5rem;
    font-size: 0.8rem;
  }
`;

export default GenreButton;
