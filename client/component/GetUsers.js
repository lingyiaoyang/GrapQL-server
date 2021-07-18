import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { LOAD_USERS } from '../GraphQL/Queries';

const GetUsers = () => {
  const { error, loading, data } = useQuery(LOAD_USERS);
  const [users, setUsers] = useState([]);
  // console.log(data);
  // console.log(data);
  useEffect(() => {
    if (data) {
      console.log(data.getAllUser);
      setUsers(data);
    }
  }, [data]);

  // console.log(users);

  return <div>hello</div>;
};

export default GetUsers;
