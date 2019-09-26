import React from 'react';
import styled from '@emotion/styled';
import Header from './Header';
import { Wizard, MainWizard } from './Wizard';
// import MainWizard from './MainWizard';
import {
  fontSize,
  fontWeight,
  boxShadow,
  fontFilson,
  Colors,
  Images
} from '../../Theme';

const { snow } = Colors.colors;

const NoticePopup = styled.div`
  position: absolute;
  top: 0;
  background: red;
  transform: translate(75%, -75%);
  padding: 20px !important;
  background: transparent linear-gradient(249deg, #61bbf7 0%, #9a4bf5 100%) 0%
    0% no-repeat padding-box;
  ${boxShadow()};
  border-radius: 42px;
  color: ${snow};
  text-align: left;
`;

const DigiiHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  img {
    height: 22px;
    margin-right: 10px;
  }
  span {
    ${fontSize(18)};
    ${fontFilson()};
    ${fontWeight('bold')}
  }
`;

const Points = styled.div`
  text-align: right;
  img {
    margin-left: 10px;
  }
`;
const DigiiPopupHeader = ({ points }) => (
  <DigiiHeaderContainer>
    <div>
      <img src={Images.digii5.DiGiit} alt="Digii-icon" />
      <span>DiGii</span>
    </div>
    <Points>
      {points}
      <img src={Images.digii5.DiGiit} alt="Digii-icon" />
    </Points>
  </DigiiHeaderContainer>
);

const NoticeContainer = ({ notice }) => (
  <NoticePopup>
    <DigiiPopupHeader />
    {notice}
  </NoticePopup>
);

export {
  Header, Wizard, MainWizard, NoticeContainer, DigiiPopupHeader
};
