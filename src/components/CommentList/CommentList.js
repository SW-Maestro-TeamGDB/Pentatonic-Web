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
      content
    }
  }
`;

const CommentList = (props) => {
  const {
    bandId,
    data,
    edit,
    commentData,
    setCommentData,
    commentLength,
    setCommentLength,
  } = props;
  const [commentNow, setCommentNow] = useState(data);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [comment, setComment] = useState('');

  // 댓글 수정
  const [updateComment, updateCommentResult] = useMutation(UPDATE_COMMENT, {
    onCompleted: (data) => {
      setComment('');
      setEditToggle(false);
      setCommentNow({ ...commentNow, content: data.updateComment.content });
    },
    onError: (error) => {
      console.log(error);
      alert('댓글을 삭제하지 못했습니다');
    },
  });

  // 댓글 삭제
  const [deleteComment, deleteCommentResult] = useMutation(DELETE_COMMENT, {
    variables: {
      deleteCommentInput: {
        comment: {
          commentId: commentNow.commentId,
        },
      },
    },
    onCompleted: (data) => {
      const filtered = commentData.filter(
        (v) => v.commentId !== commentNow.commentId,
      );
      setDeleteModal(false);
      setCommentData(filtered);
      setCommentLength(commentLength > 0 ? commentData.length - 1 : 0);
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
            commentId: commentNow.commentId,
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
    if (editToggle && commentNow.content) {
      setComment(commentNow.content);
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
      <CustomLink to={`/profile/${commentNow.user.id}`}>
        <CommentUserWrapper>
          <UserProfile src={commentNow.user.profileURI} />
        </CommentUserWrapper>
      </CustomLink>
      {editToggle ? (
        <EditContainer>
          <CustomInput
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength="200"
          />
          <EditButtonWrapper>
            <EditCancleButton onClick={() => onClickCancleEdit()}>
              취소
            </EditCancleButton>
            <EditSubmitButton
              onClick={() => onClickEditSubmit()}
              disabled={comment.length === 0}
            >
              수정
            </EditSubmitButton>
          </EditButtonWrapper>
        </EditContainer>
      ) : (
        <CommentContentsContainer>
          <ContentsMetaWrapper>
            <CustomLink to={`/profile/${commentNow.user.id}`}>
              <UserName>{commentNow.user.username}</UserName>
            </CustomLink>
            <CommentTime>
              {changeDateToString(commentNow.createdAt)}
            </CommentTime>
          </ContentsMetaWrapper>
          <CommentContent>{commentNow.content}</CommentContent>
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
      {/* <QuestionModal
        modalToggle={editModal}
        setModalToggle={setEditModal}
        text="댓글을 수정하시겠습니까?"
        afterRequest={onClickEditSubmit}
      /> */}
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

  ${media.small} {
    width: 100%;
    margin-left: 0.6rem;
  }
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

  ${media.small} {
    font-size: 0.8rem;
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

  background-color: rgba(98, 54, 255, 0.9);
  color: white;
  border-radius: 8px;

  &:hover {
    background-color: rgba(98, 54, 255, 1);
  }

  &:disabled {
    background-color: #666;
    color: #eee;
    cursor: not-allowed;
  }

  ${media.small} {
    font-size: 0.8rem;
  }
`;

const CustomEditIcon = styled(EllipsisOutlined)`
  font-size: 20px;
  transform: rotate(90deg);

  transition: all 0.3s ease-in-out;
  opacity: 0.3;

  &:focus {
    opacity: 1;
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

  ${media.small} {
    font-size: 0.8rem;
  }
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

  ${media.small} {
    font-size: 0.8rem;
  }
`;

const CommentTime = styled.div`
  font-size: 14px;
  margin-left: 6px;
  color: #999;

  ${media.small} {
    font-size: 0.8rem;
  }
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

  ${media.small} {
    margin: 0 1rem;
  }
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
  border: 2px solid #ddd;
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

  ${media.small} {
    width: 100%;
    font-size: 0.8rem;
    margin: 0 0 5px;

    ::placeholder {
      color: #bbbbbb;
      font-size: 0.8rem;
    }
  }
`;

const EditIconWrapper = styled.div`
  margin-right: 3px;
`;

export default CommentList;
