import react from 'react';
import styled from 'styled-components';
import { Space, Dropdown, Menu, Button, Select } from 'antd';
import { Default } from '../../lib/Media';

const DifficultyIcon = (props) => {
  const { value } = props;
  const last = 5 - value;

  const showFilledIcons = () => {
    return [...Array(value)].map((v, i) => {
      return (
        <div key={`Filled+${i}`}>
          <IconWrapper>
            <FilledIcon>ㅤ</FilledIcon>
          </IconWrapper>
        </div>
      );
    });
  };

  const showEmptyIcons = () => {
    return [...Array(last)].map((v, i) => {
      return (
        <div key={`Empty+${i}`}>
          <IconWrapper>
            <EmptyIcon>ㅤ</EmptyIcon>
          </IconWrapper>
        </div>
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
  width: 1em;
  height: 1em;
  background-color: #6236ff;
  border-radius: 100%;
`;

const EmptyIcon = styled.div`
  width: 1em;
  height: 1em;
  background-color: #dddddd;
  border-radius: 100%;
`;

export default DifficultyIcon;
