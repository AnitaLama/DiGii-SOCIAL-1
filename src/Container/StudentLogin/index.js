import React from 'react';
import styled from '@emotion/styled';
import { BrandLogo, StudentLoginForm } from '../../Component/Home';
import { flexCentering } from '../../Theme';
import { SessionHOC } from '../HOC';

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  min-height: 100vh;
  @media (max-width: 720px) {
    ${flexCentering('column')};
  }
`;

function Home() {
  return (
    <HomeContainer>
      <BrandLogo />
      <StudentLoginForm />
    </HomeContainer>
  );
}

export default Home;
