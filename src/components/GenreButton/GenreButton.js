import react from 'react';
import styled from 'styled-components';
import { Space, Dropdown, Menu, Button, Select } from 'antd';
import { Default } from '../../lib/Media';

const GenreButton = (props) => {
  const { genre, setGenre } = props;
  const genreMenu = (
    <CustomMenu>
      <Menu.Item key={0} onClick={() => setGenre('전체')}>
        전체
      </Menu.Item>
      <Menu.Item key={1} onClick={() => setGenre('락')}>
        락
      </Menu.Item>
      <Menu.Item key={2} onClick={() => setGenre('R&B')}>
        R&B
      </Menu.Item>
      <Menu.Item key={3} onClick={() => setGenre('발라드')}>
        발라드
      </Menu.Item>
      <Menu.Item key={4} onClick={() => setGenre('댄스')}>
        댄스
      </Menu.Item>
      <Menu.Item key={5} onClick={() => setGenre('POP')}>
        POP
      </Menu.Item>
    </CustomMenu>
  );

  return (
    <Dropdown overlay={genreMenu} trigger={['click']} placement="bottomLeft">
      <CustomButton>장르: {genre}</CustomButton>
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
`;

const CustomMenu = styled(Menu)`
  min-width: 7rem;
  text-align: center;
`;

export default GenreButton;
