import react, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Default } from '../../lib/Media';
import { Upload, Collapse, Select } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { changeSessionNameToKorean } from '../../lib/changeSessionNameToKorean';

import sessionType from '../../data/sessionType.json';

const { Panel } = Collapse;
const { Option } = Select;

const SessionAddPanel = (props) => {
  const { session, setSession, sessionSet, setSessionSet } = props;
  const [sessionError, setSessionError] = useState(null);
  const [inputSession, setInputSession] = useState({
    session: '세션 선택',
    maxMember: '인원 선택',
  });

  useEffect(() => {
    setSessionError(null);
  }, [session]);

  const onClickSessionAdd = () => {
    if (sessionSet.has(inputSession.session)) {
      return setSessionError('이미 등록된 세션입니다');
    } else if (inputSession.session === '세션 선택') {
      return setSessionError('세션을 선택해주세요');
    } else if (inputSession.maxMember === '인원 선택') {
      return setSessionError('인원을 선택해주세요');
    }

    let temp = sessionSet;
    temp.add(inputSession.session);

    setSession([...session, inputSession]);
    setSessionSet(temp);
  };

  const showSessionType = () => {
    return sessionType.map((v, i) => {
      return (
        <Option key={v.session}>
          <Centered>{changeSessionNameToKorean(v.session)}</Centered>
        </Option>
      );
    });
  };

  useEffect(() => {
    setSessionError(null);
  }, [inputSession]);

  return (
    <CustomCollapse
      expandIcon={({ isActive }) => <PlusCircleFilled />}
      ghost={true}
      accordion={true}
    >
      <Panel header={'추가하기'} key="1">
        <SessionAddContainer>
          <SessionFormContainer>
            <SessionSelect
              defaultValue="세션 선택"
              value={inputSession.session}
              dropdownMatchSelectWidth="100%"
              onChange={(value) => {
                setInputSession({ ...inputSession, session: value });
              }}
            >
              {showSessionType()}
            </SessionSelect>
            <MemberSelect
              defaultValue="인원 선택"
              value={inputSession.maxMember}
              onChange={(value) => {
                setInputSession({ ...inputSession, maxMember: value });
              }}
              dropdownMatchSelectWidth="100%"
            >
              <Option value={1}>
                <Centered>1</Centered>
              </Option>
              <Option value={2}>
                <Centered>2</Centered>
              </Option>
              <Option value={3}>
                <Centered>3</Centered>
              </Option>
              <Option value={4}>
                <Centered>4</Centered>
              </Option>
              <Option value={5}>
                <Centered>5</Centered>
              </Option>
            </MemberSelect>
            <SessionSubmitButton onClick={() => onClickSessionAdd()}>
              추가하기
            </SessionSubmitButton>
          </SessionFormContainer>
          <ErrorContainer>
            {sessionError ? <ErrorMessage>{sessionError}</ErrorMessage> : null}
          </ErrorContainer>
        </SessionAddContainer>
      </Panel>
    </CustomCollapse>
  );
};

const CustomCollapse = styled(Collapse)`
  background-color: white;
  border: none;
  width: 100%;
  text-align: center;
`;

const SessionAddContainer = styled.div`
  background-color: transparent;
  border: 1px solid lightgray;
  border-radius: 0.8rem;
  padding: 2.5rem 0 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const SessionFormContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const SessionSelect = styled(Select)`
  width: 40%;
  margin: 0 3%;
`;

const MemberSelect = styled(Select)`
  width: 20%;
`;

const Centered = styled.span`
  display: flex;
  justify-content: center;
`;

const SessionSubmitButton = styled.button`
  border-radius: 0.5rem;
  background-color: rgba(98, 54, 255, 0.9);
  width: 15%;
  margin-right: 3%;
  height: 2.5rem;
  border: none;
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: rgba(98, 54, 255, 1);
  }
`;

const ErrorContainer = styled.div`
  height: 1rem;
  width: 100%;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
`;

const ErrorMessage = styled.span`
  text-align: center;
  color: #cb0000;
`;

export default SessionAddPanel;
