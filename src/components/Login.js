import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import image from '../img/logoyus.png';

import { auth, provider } from '../firebase/firebase';

function Login() {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src={image} />
        <h3>Sign In to the App</h3>
        <Button variant="contained" color="primary" onClick={signIn}>
          Sign in with Google
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 100px;
  background-color: white;
  text-align: center;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  > img {
    height: 50px;
    object-fit: contain;
    margin-bottom: 40px;
  }
  > h3 {
    margin-bottom: 20px;
  }
`;
