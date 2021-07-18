import React, { useState } from 'react';
import { CREATE_USER_MUTATION } from '../GraphQL/Mutations';
import { useMutation } from '@apollo/client';

const CreateUsers = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const [createUser, { error }] = useMutation(CREATE_USER_MUTATION);

  const addUser = () => {
    createUser({
      variables: {
        name: 'lingyiaoyang',
        color: 'brown',
      },
    });
    if (error) {
      console.log('error');
    }
  };

  return (
    <div>
      <button onClick={() => addUser()}>click me</button>
    </div>
  );
};

export default CreateUsers;
