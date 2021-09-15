import react, { useState, useEffect } from 'react';
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

const UPDATE_COMMENT = gql`
  mutation UpdateCommentMutation($updateCommentInput: UpdateCommentInput!) {
    updateComment(input: $updateCommentInput) {
      commentId
    }
  }
`;

const CommentList = (props) => {
  const { data, edit, getComment } = props;
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [comment, setComment] = useState('');

  // 댓글 수정
  const [updateComment, updateCommentResult] = useMutation(UPDATE_COMMENT, {
    onCompleted: (data) => {
      setComment('');
      setEditToggle(false);
      setEditModal(false);
      getComment();
    },
    onError: (error) => {
      console.log(error);
      alert('댓글을 삭제하지 못했습니다');
      setEditModal(false);
    },
  });

  // 댓글 삭제
  const [deleteComment, deleteCommentResult] = useMutation(DELETE_COMMENT, {
    variables: {
      deleteCommentInput: {
        comment: {
          commentId: data.commentId,
        },
      },
    },
    onCompleted: (data) => {
      setDeleteModal(false);
      getComment();
    },
    onError: (error) => {
      console.log(error);
      alert('댓글을 삭제하지 못했습니다');
      setDeleteModal(false);
    },
  });

  const onClickEditSubmit = () => {
    updateComment({
      variables: {
        updateCommentInput: {
          comment: {
            commentId: data.commentId,
            content: comment,
          },
        },
      },
    });
  };

  const onClickCancleEdit = () => {
    setComment('');
    setEditToggle(false);
  };

  useEffect(() => {
    if (editToggle && data.content) {
      setComment(data.content);
    }
  }, [editToggle]);

  const editMenu = (
    <CustomMenu>
      <Menu.Item key={0} onClick={() => setEditToggle(true)}>
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
      {editToggle ? (
        <EditContainer>
          <CustomInput
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <EditButtonWrapper>
            <EditCancleButton onClick={() => onClickCancleEdit()}>
              취소
            </EditCancleButton>
            <EditSubmitButton
              onClick={() => setEditModal(true)}
              disabled={comment.length === 0}
            >
              수정
            </EditSubmitButton>
          </EditButtonWrapper>
        </EditContainer>
      ) : (
        <CommentContentsContainer>
          <ContentsMetaWrapper>
            <CustomLink to={`/profile/${data.user.id}`}>
              <UserName>{data.user.username}</UserName>
            </CustomLink>
            <CommentTime>{changeDateToString(data.createdAt)}</CommentTime>
          </ContentsMetaWrapper>
          <CommentContent>{data.content}</CommentContent>
        </CommentContentsContainer>
      )}
      {edit && !editToggle ? (
        <CommentEditContainer>
          <EditDropdown
            overlay={editMenu}
            trigger={['click']}
            placement="bottomLeft"
          >
            <CustomEditIcon />
          </EditDropdown>
        </CommentEditContainer>
      ) : null}
      <QuestionModal
        modalToggle={editModal}
        setModalToggle={setEditModal}
        text="댓글을 수정하시겠습니까?"
        afterRequest={onClickEditSubmit}
      />
      <QuestionModal
        modalToggle={deleteModal}
        setModalToggle={setDeleteModal}
        text="댓글을 삭제하시겠습니까?"
        afterRequest={deleteComment}
      />
    </CommentListContainer>
  );
};

const CustomMenu = styled(Menu)`
  margin-top: 8px;
  min-width: 7rem;
  text-align: center;
`;

const EditButtonWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const EditContainer = styled.div`
  width: 93%;
  margin-left: 2rem;
`;

const EditCancleButton = styled.div`
  width: 60px;
  height: 30px;
  margin-right: 8px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;

  transition: background-color 0.3s ease-in-out;

  &:hover {
    color: #666;
  }
`;

const EditSubmitButton = styled.button`
  width: 60px;
  height: 30px;
  cursor: pointer;
  font-weight: 700;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.3s ease-in-out;

  background-color: #000;
  color: white;
  border-radius: 8px;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #666;
    color: #eee;
    cursor: not-allowed;
  }
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

const CustomInput = styled.input`
  width: 100%;
  color: black;
  border: 2px solid lightgray;
  transition: all ease 0.3s;
  outline: none;
  height: 45px;
  border-radius: 0.8rem;
  margin: 3px 0;
  padding: 0 1rem;
  font-size: 1em;

  &:focus {
    border: 2px solid black;
  }
`;

const EditIconWrapper = styled.div`
  margin-right: 3px;
`;

export default CommentList;