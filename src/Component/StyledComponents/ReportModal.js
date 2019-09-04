import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { css } from 'emotion';

import {
  ModalContainer,
  ModalBox,
  Button,
  WhiteButton,
  ContentWrapper,
  FormTextArea
} from './index';
import { DigiiPopupHeader } from '../NeedHelpWizard';
import { Colors, boxShadow, fontSize } from '../../Theme';

const contentWrapper = css`
  display: flex;
`;
const reportModalStyle = css`
  position: relative;
  padding: 30px;
  min-width: 287px !important;
  width: 287px !important;
  @media (max-height: 900px) {
    margin-top: 100px !important;
  }
  @media (max-width: 800px) {
    transform: translate(-35%, 0%) !important;
  }
`;
const { primary, secondary, snow } = Colors.colors;
const reasonsForReporting = [
  'Bad language',
  'Inappropriate content',
  'Put down or meanness',
  'Worried for a friend',
  'Hate speech or racism',
  'Something else'
];

const CenteredDiv = styled.div`
  text-align: center;
  button {
    border-radius: 40px !important;
  }
`;

const Notice = styled.div`
  margin: 20px 0;
`;
const Popup = styled.div`
  position: absolute;
  background-image: linear-gradient(to right, ${primary}, ${secondary});
  ${boxShadow()};
  transform: translate(95%, -30%);
  padding: 20px;
  top: 0;
  left: 0;
  color: ${snow};
  border-radius: 42px;
  width: '287px';
`;

const Title = styled.div`
  text-align: left;
  font: Bold 28px/33px Filson Soft;
  letter-spacing: 0;
  color: #383746;
  opacity: 1;
`;

const ReportWrapper = styled.div`
  .question {
    ${fontSize(18)};
    padding: 6px 0;
  }
`;

const ReportReasonsWrapper = styled.div`
  padding: 10px;
`;

const ReportReason = styled.div`
  padding: 6px 0;
  ${fontSize(18)};
  input {
    margin-right: 4px;
  }
`;
class ReportModalContainer extends Component {
  constructor() {
    super();
    this.state = {
      showTextBox: false,
      reason: null
    };
  }

  handleSelectReason = e => {
    const { value } = e.target;
    const { selectReason } = this.props;
    if (value === 'Something else') {
      this.setState({ showTextBox: true, reason: value });
    } else {
      this.setState({ showTextBox: false, reason: value });
      selectReason(value);
    }
  };

  handleTextChange = e => {
    const { value } = e.target;
    const { selectReason } = this.props;

    selectReason(value);
  };

  reportThePost = () => {
    const { reportThePost, makeTheReport } = this.props;
    const { reason } = this.state;
    reason && makeTheReport();
  };

  render() {
    const { showTextBox, reason } = this.state;
    const { hideModal, user } = this.props;
    const { username } = user;
    const isFirstTimeReporting = localStorage.getItem(
      `${username}IsFirstTimeReporting`
    );
    if (!isFirstTimeReporting) {
      localStorage.setItem(`${username}IsFirstTimeReporting`, false);
    }
    // const check = !isFirstTimeReporting;
    const check = true;
    return (
      <ModalContainer>
        <ContentWrapper className={contentWrapper}>
          <ModalBox className={reportModalStyle}>
            {check && (
              <Popup>
                <DigiiPopupHeader />
                <Notice>
                  <p>
                    You're making a report - well done! It's a good way to look
                    after yourself and your friends online. Every time you make
                    a report, it\'s good to ask yourself...
                  </p>
                  <p>
                    Am I doing this to get someone into trouble or out of
                    trouble?
                  </p>
                </Notice>
                <CenteredDiv>
                  <WhiteButton className="rounded default" onClick={hideModal}>
                    Got it
                  </WhiteButton>
                </CenteredDiv>
              </Popup>
            )}
            <span className="close" onClick={hideModal}>
              x
            </span>
            <ReportWrapper>
              <Title>Report</Title>
              <div className="question">What's going on here?</div>
              <ReportReasonsWrapper>
                <div>
                  {reasonsForReporting.map(item => (
                    <ReportReason key={item}>
                      <input
                        type="radio"
                        value={item}
                        onChange={this.handleSelectReason}
                        checked={item === reason}
                      />
                      {item}
                    </ReportReason>
                  ))}
                  {showTextBox && (
                    <FormTextArea
                      onChange={this.handleTextChange}
                      style={{
                        boxShadow: '-3px 3px 6px rgba(0,0,0,0.25)',
                        height: '97px'
                      }}
                    />
                  )}
                </div>
              </ReportReasonsWrapper>
              <div
                style={{
                  textAlign: 'center'
                }}
              >
                <Button
                  className="rounded default"
                  onClick={this.reportThePost}
                >
                  Report
                </Button>
              </div>
            </ReportWrapper>
          </ModalBox>
        </ContentWrapper>
      </ModalContainer>
    );
  }
}

ReportModalContainer.propTypes = {
  hideModal: PropTypes.func,
  selectReason: PropTypes.func,
  reportThePost: PropTypes.func,
  makeTheReport: PropTypes.func
};

const mapStateToProps = state => ({
  tutorial: state.tutorial,
  user: state.user.user,
  strike: state.strike.strikes
});

const ReportModal = connect(mapStateToProps)(ReportModalContainer);

export default ReportModal;
