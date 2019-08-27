import React from 'react';
import styled from '@emotion/styled';
import Header from './Header';
import Wizard from './Wizard';
import MainWizard from './MainWizard';
import {
  fontSize,
  fontWeight,
  boxShadow,
  fontFilson,
  Colors,
  Images
} from '../../Theme';

const { snow, black } = Colors.colors;

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

const DigiiHeader = styled.div`
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

const NoticeContainer = ({ notice }) => (
  <NoticePopup>
    <DigiiHeader>
      <img src={Images.digii5.DiGiit} alt="Digii-icon" />
      <span>Digii</span>
    </DigiiHeader>
    {notice}
  </NoticePopup>
);

export {
  Header, Wizard, MainWizard, NoticeContainer
};
