import react from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import SearchIcon from '../../images/SearchIcon.svg';

const SearchBar = (props) => {
  const { placeholder } = props;
  return (
    <SearchBarContainer>
      <CustomInput placeholder={placeholder ? placeholder : null} />
      <CustomIcon src={SearchIcon} />
    </SearchBarContainer>
  );
};

const CustomInput = styled.input`
  border: none;
  width: 90%;
  height: 80%;
  outline: none;
  margin-left: 1rem;
  font-family: 'NanumSquare';
  font-size: 16px;
  font-weight: 400;
  background-color: transparent;

  ::placeholder {
    font-size: 16px;
  }
`;

const SearchBarContainer = styled.div`
  padding-left: 0.5rem;
  display: flex;
  flex-direction: row;
  width: 70%;
  border-radius: 1rem;
  border: 3px solid rgba(98, 54, 255, 0.1);
  background-color: rgba(98, 54, 255, 0.03);
  height: 3.5rem;
  align-items: center;
  justify-content: space-between;

  ${CustomInput} ::foucs {
    background-color: red;
  }
`;

const CustomIcon = styled.img`
  width: 1.2rem;
  margin-right: 2rem;
  cursor: pointer;
  filter: invert(38%) sepia(91%) saturate(5568%) hue-rotate(241deg)
    brightness(101%) contrast(101%);
  opacity: 0.3;
`;

export default SearchBar;
