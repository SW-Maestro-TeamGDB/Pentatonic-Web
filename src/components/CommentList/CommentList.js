import react, { useState } from 'react';
import styled from 'styled-components';
import { media } from '../../lib/Media';
import { Link } from 'react-router-dom';
import {
  EllipsisOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import QuestionModal from '../QuestionModal';

import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { changeDateToString } from '../../lib/changeDateToString/changeDateToString';

import ThumbIcon from '../../images/ThumbIcon.svg';
import HeartIcon from '../../images/HeartIcon.svg';

const DELETE_COMMENT = gql`
  mutation Mutation($deleteCommentInput: DeleteCommentInput!) {
    deleteComment(input: $deleteCommentInput)
  }
`;

const CommentList = (props) => {
  const { data, edit, getComment } = props;
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const onClickEditToggle = () => {};

  const onClickEditButton = () => {};

  const onClickDeleteButton = () => {};

  const editMenu = (
    <CustomMenu>
      <Menu.Item key={0} onClick={() => () => onClickEditToggle()}>
        <EditOutlined style={{ marginRight: '10px' }} />
        수정하기
      </Menu.Item>
      <Menu.Item key={1} onClick={() => setDeleteModal(true)}>
        <DeleteOutlined style={{ marginRight: '10px' }} />
        삭제하기
      </Menu.Item>
    </CustomMenu>
  );

  return (
    <CommentListContainer>
      <CustomLink to={`/profile/${data.user.id}`}>
        <CommentUserWrapper>
          <UserProfile src={data.user.profileURI} />
        </CommentUserWrapper>
      </CustomLink>
      <CommentContentsContainer>
        <ContentsMetaWrapper>
          <CustomLink to={`/profile/${data.user.id}`}>
            <UserName>{data.user.username}</UserName>
          </CustomLink>
          <CommentTime>{changeDateToString(data.createdAt)}</CommentTime>
        </ContentsMetaWrapper>
        <CommentContent>{data.content}</CommentContent>
      </CommentContentsContainer>
      <CommentEditContainer>
        <EditDropdown
          overlay={editMenu}
          trigger={['click']}
          placement="bottomLeft"
        >
          <CustomEditIcon />
        </EditDropdown>
      </CommentEditContainer>
    </CommentListContainer>
  );
};

const CustomMenu = styled(Menu)`
  margin-top: 8px;
  min-width: 7rem;
  text-align: center;
`;

const CustomEditIcon = styled(EllipsisOutlined)`
  font-size: 20px;
  transform: rotate(90deg);
  visibility: hidden;
  transition: all 0.3s ease-in-out;
  opacity: 0;

  &:focus {
    visibility: visible;
    opacity: 100;
  }
`;

const CommentListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;

  margin-bottom: 1.8rem;
  color: black;

  &:hover {
    ${CustomEditIcon} {
      visibility: visible;
      opacity: 100;
    }
  }
`;

const CommentUserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CommentContent = styled.div`
  margin-top: 3px;
`;

const UserProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10rem;
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 700;

  &:hover {
    color: #333;
  }
`;

const CommentTime = styled.div`
  font-size: 14px;
  margin-left: 6px;
  color: #999;
`;

const ContentsMetaWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const CommentContentsContainer = styled.div`
  width: 80%;
  margin: 0 2rem;
  height: auto;

  display: flex;
  flex-direction: column;
`;

const CommentEditContainer = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditDropdown = styled(Dropdown)``;

const CustomLink = styled(Link)`
  color: black;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #333;
  }
`;

const EditIconWrapper = styled.div`
  margin-right: 3px;
`;

export default CommentList;
