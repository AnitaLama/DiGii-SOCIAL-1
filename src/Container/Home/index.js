import React from 'react';
import styled from '@emotion/styled';
import { BrandLogo, LoginForm } from '../../Component/Home';
import './App.css';
import { flexCentering } from '../../Theme';

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  min-height: 100vh;
  @media (max-width: 720px) {
    ${flexCentering('column')};
  }
`;

function Home(props) {
  return (
    <HomeContainer>
      <BrandLogo />
      <LoginForm />
    </HomeContainer>
  );
}

export default Home;
