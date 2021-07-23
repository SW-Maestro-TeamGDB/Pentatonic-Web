import react from 'react';
import PageContainer from '../../components/PageContainer';
import { useQuery, gql } from '@apollo/client';
import { GET_CURRENT_USER, currentUserVar } from '../../apollo/cache';

const Profile = () => {
  const { data } = useQuery(GET_CURRENT_USER);
  const user = data.user;

  return (
    <PageContainer>
      <h1>프로필</h1>
      {user ? (
        <>
          <h3>{user.id}</h3>
          <h3>{user.introduce}</h3>
          <h3>{user.phoneNumber}</h3>
          <h3>{user.prime}</h3>
          <img src={user.profileURI} />
          <h3>{user.type}</h3>
          <h3>{user.username}</h3>
        </>
      ) : null}
    </PageContainer>
  );
};

export default Profile;
