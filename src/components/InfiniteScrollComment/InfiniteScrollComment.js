import react, { useState, useEffect, useRef } from 'react';
import CoverGrid from '../CoverGrid';
import SongGrid from '../SongGrid';
import GridContainer from '../GridContainer';
import styled from 'styled-components';
import CommentList from '../CommentList/CommentList';
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import { throttle } from 'lodash';
import { useMediaQuery } from 'react-responsive';
import { media, Default, Mobile } from '../../lib/Media';

import UserAvatar from '../../images/UserAvatar.svg';

const QUERY_COMMENTS = gql`
  query Query($bandId: ObjectID!, $first: Int!, $after: ObjectID) {
    queryComments(bandId: $bandId, first: $first, after: $after) {
      comments {
        user {
          username
          profileURI
          id
        }
        content
        createdAt
        commentId
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation UserMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      user {
        id
        profileURI
        username
      }
      content
      createdAt
      commentId
    }
  }
`;

const InfiniteScrollComment = (props) => {
  const { bandId, currentUser, length } = props;
  const [comment, setComment] = useState('');
  const [lastComment, setLastComment] = useState();
  const [isEnd, setIsEnd] = useState(false);
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [commentLength, setCommentLength] = useState(length);

  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  const [createComment, createCommentResult] = useMutation(CREATE_COMMENT, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setComment('');
      setIsEnd(false);
      setCommentLength(commentLength + 1);
      setCommentData([data.createComment, ...commentData]);
    },
    onError: (error) => {
      alert(error);
    },
  });

  const [loadComment, { loading, error, data }] = useLazyQuery(QUERY_COMMENTS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setCommentData([...commentData, ...data.queryComments.comments]);
      setLastComment(data.queryComments.pageInfo.endCursor);

      if (data.queryComments.pageInfo.hasNextPage === false) {
        setIsEnd(true);
      }
    },
  });

  const [
    initComment,
    { loading: initLoading, error: initError, data: initData },
  ] = useLazyQuery(QUERY_COMMENTS, {
    fetchPolicy: 'network-only',
    variables: { bandId: bandId, first: 3 },
    onCompleted: (data) => {
      setCommentData(data.queryComments.comments);
      setLastComment(data.queryComments.pageInfo.endCursor);

      if (data.queryComments.pageInfo.hasNextPage === false) {
        setIsEnd(true);
      } else {
        setIsEnd(false);
      }
    },
  });

  const [refreshComment] = useLazyQuery(QUERY_COMMENTS, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setCommentData(data.queryComments.comments);
      setLastComment(data.queryComments.pageInfo.endCursor);
      setIsEnd(false);

      if (data.queryComments.pageInfo.hasNextPage === false) {
        setIsEnd(true);
      } else {
        setIsEnd(false);
      }
    },
  });

  const onClickCommentButton = () => {
    if (comment.length > 0) {
      setComment('');
      createComment({
        variables: {
          input: {
            comment: {
              content: comment,
              bandId: bandId,
            },
          },
        },
      });
    }
  };

  const handleScroll = throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      setIsScrollBottom(true);
    }
  }, 300);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isScrollBottom && length > commentData.length) {
      loadComment({
        variables: {
          bandId: bandId,
          first: 3,
          after: lastComment,
        },
      });
      setIsScrollBottom(false);
    }
  }, [isScrollBottom]);

  useEffect(() => {
    if (bandId) {
      setCommentData([]);
      initComment();
    }
  }, []);

  const showCommentList = () => {
    if (commentData.length > 0) {
      return commentData.map((v, i) => {
        return (
          <CommentList
            bandId={bandId}
            data={v}
            commentData={commentData}
            setCommentData={setCommentData}
            key={`comment+${v.commentId}`}
            edit={currentUser && v.user.id === currentUser.id}
            queryComments={refreshComment}
            commentLength={commentLength}
            setCommentLength={setCommentLength}
          />
        );
      });
    } else if (data && commentData.length === 0) {
      return null;
    }
  };

  return (
    <CommentContainer>
      <CommentHeader>
        댓글
        <CurrentComment>{commentLength}</CurrentComment>
      </CommentHeader>
      <CommentForm>
        {currentUser ? (
          <>
            <MyProfileImg src={currentUser?.profileURI} />
            <CustomInput
              placeholder={
                isMobile
                  ? '댓글 입력'
                  : '게시물의 저작권 등 분쟁, 개인정보 노출로 인한 책임은 작성자 또는 게시자에게 있음을 유의해주세요'
              }
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <CommentButton
              onClick={() => onClickCommentButton()}
              disabled={comment.length === 0}
            >
              등록
            </CommentButton>
          </>
        ) : (
          <>
            <MyProfileImg src={UserAvatar} />
            <CustomInput
              placeholder="댓글을 작성하시려면 로그인이 필요합니다"
              disabled
            />
            <CommentButton disabled>등록</CommentButton>
          </>
        )}
      </CommentForm>
      <CommentWrapper>
        {showCommentList()}
        {loading && length > commentData.length && !initLoading ? (
          <LoadingContainer>
            <LoadingOutlined />
          </LoadingContainer>
        ) : null}
      </CommentWrapper>
    </CommentContainer>
  );
};

const InfiniteScrollGridContainer = styled.div`
  width: 100%;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 6rem;
  color: #6236ff;
`;

const NoCover = styled.div`
  font-size: 1.4rem;
  color: #9b94b3;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 12rem;
  letter-spacing: -0.5px;
  font-weight: 800;
`;

const CustomInput = styled.input`
  width: 80%;
  color: black;
  border: 2px solid #ddd;
  transition: all ease 0.3s;
  outline: none;
  height: 100%;
  border-radius: 0.8rem;
  margin: 0.5rem 2rem;
  padding: 0 1rem;
  font-size: 1rem;

  ::placeholder {
    color: #bbbbbb;
    font-size: 16px;
  }

  &:focus {
    border: 2px solid black;
  }

  ${media.small} {
    margin: 0 0.7rem;
    width: 90%;
    font-size: 0.8rem;

    ::placeholder {
      color: #bbbbbb;
      font-size: 0.8rem;
    }
  }
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const CommentForm = styled.div`
  width: 100%;
  height: 3rem;
  position: relative;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 1rem 0;

  ${media.small} {
    padding: 1rem 1rem;
  }
`;

const MyProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10rem;
`;

const CommentHeader = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  font-weight: 700;
  align-items: center;
  width: 100%;

  ${media.small} {
    font-size: 1rem;
  }
`;

const CurrentComment = styled.div`
  margin-left: 0.5rem;
  color: #bbbbbb;
  font-size: 16px;

  ${media.small} {
    font-size: 0.9rem;
  }
`;

const CommentButton = styled.button`
  border-radius: 10px;
  background-color: rgba(98, 54, 255, 0.9);
  width: 6rem;
  height: 100%;
  border: none;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all ease-in-out 0.3s;

  &:hover {
    background-color: rgba(98, 54, 255, 1);
  }

  &:disabled {
    background-color: #666;
    color: #eee;
    cursor: not-allowed;
  }

  ${media.small} {
    width: 5rem;
    font-size: 0.9rem;
  }
`;

export default InfiniteScrollComment;
