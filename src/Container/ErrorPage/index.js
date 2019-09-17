import React, { Component } from 'react';
import styled from '@emotion/styled';
import {
  ContainerWrapper,
  ContentWrapper,
  BigLogo
} from '../../Component/StyledComponents';
import { Images, fontSize, Colors } from '../../Theme';

const { secondary } = Colors.colors;
const errorDescription = `We're sorry, the page you requested could not be found. Please go
back to the homepage.`;
const ErrorPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: ${secondary};
`;

const ErrorCode = styled.span`
  ${fontSize(70)};
  vertical-align: middle;
  padding: 0 40px;
`;
const ErrorStatus = styled.p`
  ${fontSize(45)};
  text-align: center;
`;
const ErrorDescription = styled.p`
  ${fontSize(20)};
  text-align: center;
`;
class ErrorPage extends Component {
  render() {
    return (
      <ContainerWrapper>
        <ContentWrapper>
          <ErrorPageWrapper>
            <div>
              <BigLogo src={Images.digii5.logo} height={75} />
              <ErrorCode>404</ErrorCode>
            </div>
            <ErrorStatus>Page not found</ErrorStatus>
            <ErrorDescription>{errorDescription}</ErrorDescription>
          </ErrorPageWrapper>
        </ContentWrapper>
      </ContainerWrapper>
    );
  }
}

export default ErrorPage;
