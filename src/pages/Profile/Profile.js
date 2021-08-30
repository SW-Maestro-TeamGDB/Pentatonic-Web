import react, { useState, useEffect } from 'react';
import PageContainer from '../../components/PageContainer';
import { useQuery, gql } from '@apollo/client';
import { GET_CURRENT_USER, currentUserVar } from '../../apollo/cache';

const GET_USER_INFO = gql`
  query Query($getUserInfoUserId: Id) {
    getUserInfo(userId: $getUserInfoUserId) {
      id
      username
      profileURI
      introduce
      followerCount
      followingCount
      followingStatus
      band {
        name
        backGroundURI
        likeCount
        bandId
      }
    }
  }
`;

const Profile = ({ match }) => {
  const currentUser = localStorage.getItem('UserInfo');
  const id = match.params.id;
  const [userData, setUserData] = useState();
  const [error, setError] = useState(false);
  const getUserInfo = useQuery(GET_USER_INFO, {
    variables: {
      getUserInfoUserId: id,
    },
    onCompleted: (data) => {
      if (data.getUserInfo) setUserData(data.getUserInfo);
      else setError(true);
    },
    onError: (error) => {
      setError(true);
    },
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <PageContainer>
      {!error ? <h1>프로필</h1> : '존재하지 않는 유저입니다'}
    </PageContainer>
  );
};

export default Profile;
