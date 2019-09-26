import React from 'react';
import styled from '@emotion/styled';
import { Colors } from '../../../Theme';
import { DigiiPopupHeader } from '../../NeedHelpWizard';
import { WhiteButton } from '../../StyledComponents';

const { snow } = Colors.colors;
const ReportMadeNotification = styled.div`
  background: transparent linear-gradient(252deg, #61bbf7 0%, #9a4bf5 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 3px 3px 6px #000000;
  border-radius: 42px;
  padding: 24px;
  color: ${snow};
`;

const Notification = styled.p`
  padding: 12px 0;
`;
const CenteredDiv = styled.div`
  text-align: center;
  button {
    border-radius: 40px !important;
  }
`;
const ReportNotifications = ({ hideNotification }) => (
  <ReportMadeNotification>
    <DigiiPopupHeader points="5" />
    <Notification>
      You’ve made a report – thank you. Being a good DiGiiTal Citizen sometimes
      means making difficult decisions to report bad or worrying behaviour
      online – and sometimes that includes the behaviour of your friends. Your
      report is being seen to right now by DiGii – and don’t worry, it’s
      completely anonymous. That means no one will know it was you who made the
      report.
    </Notification>
    <CenteredDiv>
      <WhiteButton className="rounded default" onClick={hideNotification}>
        Got it
      </WhiteButton>
    </CenteredDiv>
  </ReportMadeNotification>
);

export default ReportNotifications;
