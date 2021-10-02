import react from 'react';
import styled from 'styled-components';
import { media } from '../../lib/Media';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Slider } from 'antd';

const RecordEditSlider = (props) => {
  const {
    value,
    setValue,
    title,
    desc,
    max,
    min,
    onAfterChange,
    unit = 1,
  } = props;

  const onChangeValue = (value) => {
    setValue(value);
  };

  const onClickPlus = () => {
    setValue((value) => (value + unit <= max ? value + unit : max));
    onAfterChange(value);
  };

  const onClickMinus = () => {
    setValue((value) => (value - unit >= min ? value - unit : 0));
    onAfterChange(value);
  };

  return (
    <Container>
      <SliderContainer>
        <SliderHeader>
          <SliderTitle>{title}</SliderTitle>
          <SliderValue>{desc}</SliderValue>
        </SliderHeader>
        <SliderWrapper>
          <SliderMinusIcon onClick={onClickMinus} />
          <CustomSlider
            value={value}
            onChange={onChangeValue}
            max={max}
            min={min}
            tipFormatter={(value) => `${desc}`}
            onAfterChange={onAfterChange}
          />
          <SliderPlusIcon onClick={onClickPlus} />
        </SliderWrapper>
      </SliderContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 1.5rem 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
`;

const CustomSlider = styled(Slider)`
  width: 80%;
`;

const SliderPlusIcon = styled(PlusOutlined)`
  width: 10%;
  cursor: pointer;
  color: gray;
  transition: all 0.3s ease-in-out;
  font-size: 1.5em;

  &:hover {
    color: #000000;
  }
`;

const SliderMinusIcon = styled(MinusOutlined)`
  width: 10%;
  cursor: pointer;
  color: gray;
  transition: all 0.3s ease-in-out;
  font-size: 1.5em;
  &:hover {
    color: #000000;
  }
`;

const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  box-sizing: border-box;
`;

const SliderTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
`;

const SliderValue = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;

export default RecordEditSlider;
