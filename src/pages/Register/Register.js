import react, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';

const endPoint = 'https://pentatonic.cdn.ntruss.com/api';

const requestQuery = async () => {
  const id = 'hello!!"\'\'\\!!"""';
  const query = `query{
        checkId(
            id:${JSON.stringify(id)}
        )
    }`;
  const data = await fetch(`${endPoint}?query=${query}`, {
    method: 'GET',
  });
  console.log(await data.json());
};

const requestMutation = async () => {
  const id = 'pukuba',
    pw = '"test123!"""@';
  const query = `mutation{
        login(
            id:${JSON.stringify(id)},
            pw:${JSON.stringify(pw)}
        )
    }`;
  const data = await fetch(endPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  console.log(await data.json());
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  // const { loading, error, data } = useQuery(checkId);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error.message}</p>;
  // if (data) console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('id', { required: true })} />
      <input {...register('pw', { required: true })} />
      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      <input {...register('username', { required: true })} />
      <input {...register('phoneNumber', { required: true })} />
      <input {...register('position', { required: true })} />
      <input {...register('level', { required: true })} />
      <input {...register('type', { required: true })} />
      <input type="submit" />
    </form>
  );
};

export default Register;
