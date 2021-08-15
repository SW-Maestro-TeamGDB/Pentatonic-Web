import react from 'react';
import styled from 'styled-components';
import { Space, Dropdown, Menu, Button, Select } from 'antd';
import { Default } from '../../lib/Media';

const DifficultyButton = (props) => {
  const { difficulty, setDifficulty } = props;
  const DifficultyMenu = (
    <CustomMenu>
      <Menu.Item key={0} onClick={() => setDifficulty('전체')}>
        전체
      </Menu.Item>
      <Menu.Item key={1} onClick={() => setDifficulty(1)}>
        1
      </Menu.Item>
      <Menu.Item key={2} onClick={() => setDifficulty(2)}>
        2
      </Menu.Item>
      <Menu.Item key={3} onClick={() => setDifficulty(3)}>
        3
      </Menu.Item>
      <Menu.Item key={4} onClick={() => setDifficulty(4)}>
        4
      </Menu.Item>
      <Menu.Item key={5} onClick={() => setDifficulty(5)}>
        5
      </Menu.Item>
    </CustomMenu>
  );

  return (
    <Dropdown
      overlay={DifficultyMenu}
      trigger={['click']}
      placement="bottomLeft"
    >
      <CustomButton>난이도: {difficulty}</CustomButton>
    </Dropdown>
  );
};

const CustomButton = styled.span`
  cursor: pointer;
  font-size: 0.9rem;
  background-color: black;
  color: white;
  padding: 0.5vh 0.5vw;
  border-radius: 0.5rem;
  font-weight: 500;
  text-align: center;
  min-width: 7rem;
  transition: all ease 0.3s;

  &:hover {
    background-color: #3d3d3d;
  }
`;

const CustomMenu = styled(Menu)`
  min-width: 7rem;
  text-align: center;
`;

export default DifficultyButton;
