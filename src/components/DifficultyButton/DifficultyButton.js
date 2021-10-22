import react from 'react';
import styled from 'styled-components';
import DifficultyIcon from '../DifficultyIcon';
import { Space, Dropdown, Menu, Button, Select } from 'antd';
import { Default, media } from '../../lib/Media';

const { Option } = Select;

const DifficultyButton = (props) => {
  const { difficulty, setDifficulty } = props;
  const DifficultyMenu = (
    <CustomMenu>
      <CustomMenuItem key={0} onClick={() => setDifficulty('전체')}>
        전체
      </CustomMenuItem>
      <CustomMenuItem key={1} onClick={() => setDifficulty(1)}>
        <DifficultyIcon value={1} />
      </CustomMenuItem>
      <CustomMenuItem key={2} onClick={() => setDifficulty(2)}>
        <DifficultyIcon value={2} />
      </CustomMenuItem>
      <CustomMenuItem key={3} onClick={() => setDifficulty(3)}>
        <DifficultyIcon value={3} />
      </CustomMenuItem>
      <CustomMenuItem key={4} onClick={() => setDifficulty(4)}>
        <DifficultyIcon value={4} />
      </CustomMenuItem>
      <CustomMenuItem key={5} onClick={() => setDifficulty(5)}>
        <DifficultyIcon value={5} />
      </CustomMenuItem>
    </CustomMenu>
  );

  return (
    <>
      <Dropdown
        overlay={DifficultyMenu}
        trigger={['click']}
        placement="bottomLeft"
      >
        <CustomButton>
          <TextContainer>난이도:</TextContainer>
          {difficulty === '전체' ? (
            <TotalContainer>전체</TotalContainer>
          ) : (
            <IconContainer>
              <DifficultyIcon value={difficulty} />
            </IconContainer>
          )}
        </CustomButton>
      </Dropdown>
    </>
  );
};

const CustomButton = styled.span`
  box-sizing: border-box;
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

  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 1;
  justify-content: space-around;

  &:hover {
    border: 1px solid rgba(98, 54, 255, 0.8);
  }

  ${media.small} {
    font-size: 0.8rem;
    padding: 5px 10px;
    min-width: 5rem;
  }
`;

const TotalContainer = styled.div`
  width: 40%;
  text-align: left;
`;

const TextContainer = styled.div`
  width: 40%;
  min-width: 3rem;
`;

const IconContainer = styled.div`
  width: 60%;
  min-width: 7rem;
  padding: 0 0.3rem;
`;

const CustomMenu = styled(Menu)`
  min-width: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export default DifficultyButton;
