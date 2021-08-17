import react from 'react';
import styled from 'styled-components';
import { Space, Dropdown, Menu, Button, Select } from 'antd';
import { Default } from '../../lib/Media';

const DifficultyIcon = (props) => {
  const { value } = props;
  const last = 5 - value;

  console.log(value);

  const showFilledIcons = () => {
    return [...Array(value)].map((v, i) => {
      return (
        <>
          <IconWrapper>
            <FilledIcon>ㅤ</FilledIcon>
          </IconWrapper>
        </>
      );
    });
  };

  const showEmptyIcons = () => {
    return [...Array(last)].map((v, i) => {
      return (
        <>
          <IconWrapper>
            <EmptyIcon>ㅤ</EmptyIcon>
          </IconWrapper>
        </>
      );
    });
  };

  return (
    <IconContainer>
      <CustomGrid>
        {showFilledIcons()}
        {showEmptyIcons()}
      </CustomGrid>
    </IconContainer>
  );
};

const CustomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const IconContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilledIcon = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: #6236ff;
  border-radius: 100%;
`;

const EmptyIcon = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: #dddddd;
  border-radius: 100%;
`;

export default DifficultyIcon;