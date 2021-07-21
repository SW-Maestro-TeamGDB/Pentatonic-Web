import react, { useState } from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import PageContainer from '../../components/PageContainer';

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
    <PageContainer>
      <h2>회원가입 페이지</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <CustomInput {...register('id', { required: true })} />
        <CustomInput {...register('pw', { required: true })} />
        {/* {errors.exampleRequired && <span>This field is required</span>} */}
        <CustomInput {...register('username', { required: true })} />
        <CustomInput {...register('phoneNumber', { required: true })} />
        <CustomInput {...register('position', { required: true })} />
        <CustomInput {...register('level', { required: true })} />
        <CustomInput {...register('type', { required: true })} />
        <CustomInput type="submit" />
      </form>
    </PageContainer>
  );
};

const CustomInput = styled.input`
  width: 100%;
  color: black;
  border: 2px solid lightgray;
  transition: all ease 0.3s;
  outline: none;
  height: 4rem;
  border-radius: 0.8rem;
  margin: 0.5rem 0;
  padding: 0 1rem;
  font-size: 1.2rem;

  &:focus {
    border: 2px solid black;
  }
`;

export default Register;
