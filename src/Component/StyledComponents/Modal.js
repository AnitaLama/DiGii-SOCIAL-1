import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { FaPlay, FaPause, FaCheck } from 'react-icons/fa';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { Colors, Images, flexCentering } from '../../Theme';
import { Button, Loader, WhiteButton } from './index';
import { Warnings } from '../Functions';
import TutorialActions from '../../Redux/TutorialRedux';
import history from '../../history';

const { snow, tint, peach } = Colors.colors;
const ModalContainer = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.32);
  height: 100%;
  width: 100%;
  z-index: 10000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${flexCentering()}
`;
const CenteredElementsModalWrapper = styled.div`
  display: flex;

  ${flexCentering('column')};
  justify-content: space-around;
`;
const ModalBox = styled.div`
  width: 45%;
  min-width: 45%;
  min-height: 200px;
  margin: auto;
  background: ${snow};

  vertical-align: center;
  border-radius: 44px;
  box-shadow: 4px 4px 8px #000000;
  padding: 20px;
  .close {
    cursor: pointer;
    margin-top: -10px;
    color: red;
    text-align: right;
  }
  &.centeredModal {
    display: flex;
  }
`;

const Icon = styled.img`
  height: 60px;
  &.small {
    height: 30px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  div:first-of-type {
    display: flex;
    align-items: center;
  }
`;
const Message = styled.div`
  margin: 20px 0;
  text-align: center;
  div {
    text-align: center;
    div {
      margin: 15px 0;
    }
  }
`;
const ButtonWrapper = styled.div`
  margin: auto;
  text-align: center;
  button {
    width: 30% !important;
  }
  display: flex;
  justify-content: space-around;
`;

const Points = styled.div`
  margin: auto 0;
  span {
    margin-right: 6px;
  }
`;

const TermsAndConditionBox = styled.div`
  ${flexCentering()};
  input {
    width: auto;
    margin: 0 10px;
  }
  margin: 4px;
  cursor: pointer;
`;

class BasicModal extends Component {
  constructor() {
    super();
    this.state = {
      checkboxSelected: false
    };
  }

  handleOK = () => {
    const { hideModal } = this.props;
    // const { hideModal, showVideo, strike } = this.props;
    // if ((strike + 1) % 3 === 0) {
    //   showVideo();
    // } else {
    //   hideModal();
    // }
    hideModal();
  };

  logout = () => {
    const { user } = this.props;
    if (user.isStudent) {
      history.push('/student/login');
    } else {
      history.push('/');
    }
  };

  render() {
    const {
      message,
      showCheckButton,
      strike,
      showVideo,
      index,
      text,
      points
    } = this.props;
    const { checkboxSelected } = this.state;
    // console.log(showCheckButton);
    const hasToShowTutorial = (strike + 1) % 3 === 0;
    const check = message && message === 'You have been excluded from the Message Board.';
    return (
      <ModalContainer>
        <ModalBox>
          <Header>
            <div>
              <Icon src={Images.digii5.icon} />
              DiGii
            </div>
            <Points>
              <span>{points || -5}</span>
              <Icon src={Images.digii5.DiGiitIconColored} className="small" />
            </Points>
          </Header>
          {message && <Message>{message}</Message>}
          {index !== -1 && !message && (
            <Message>
              <Warnings index={index} />
            </Message>
          )}
          <CenteredDiv>
            <WhiteButton
              className="roundedShadow short "
              onClick={check ? this.logout : this.handleOK}
            >
              {check ? 'Logout' : 'Back to Chat'}
            </WhiteButton>
          </CenteredDiv>
        </ModalBox>
      </ModalContainer>
    );
  }
}

BasicModal.propTypes = {
  message: PropTypes.string,
  hideModal: PropTypes.func
};

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  cursor: pointer;
  span {
    color: white;
  }
  svg {
    font-size: 65px;
    opacity: 0;
  }
  &:hover {
    svg {
      opacity: 1;
    }
  }
`;

const QuestionOptions = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 6px;
  margin: 6px;
  position: relative;
  svg {
    position: absolute;
    left: 0;
    color: #88cc00;
    font-size: 22px;
  }
`;
const CenteredDiv = styled.div`
  text-align: center;
  .nextButton {
    background: transparent;
    border: 0;
    outline: 0;
  }
`;
class VideoModalContainer extends Component {
  state = {
    playing: false,
    showQuestions: false,
    userAnswer: [],
    showVideo: true,
    showFinalMessage: false,
    gotAllQuestionsCorrect: false
  };

  componentWillMount() {
    const { onTutorialRequest, type } = this.props;
    onTutorialRequest(type);
  }

  componentDidUpdate(prevProps) {
    const { tutorial } = this.props;

    const player = this.fullscreenVideo;
    if (tutorial.tutorialList && tutorial.tutorialList.tutorialPath && player) {
      player.addEventListener('pause', () => {
        this.setState({ playing: false });
      });
      player.addEventListener('playing', () => {
        this.setState({ playing: true });
      });
      player.addEventListener('ended', () => {
        this.saveTutorialWatchersInfo();
        this.setState({ showQuestions: true, showVideo: false });
      });
    }
  }

  changeAnswer = (index, answer) => {
    const { userAnswer } = this.state;
    userAnswer[index] = {
      answer: answer.tutorialQuestionOptionOption,
      isCorrect: answer.tutorialQuestionOptionIsCorrect
    };
    this.setState({ userAnswer });
  };

  checkTheUserAnswers = () => {
    const { userAnswer } = this.state;
    const hasUnansweredQuestion = userAnswer.includes(undefined);
    if (hasUnansweredQuestion) {
      // alert('Please answer all the questions');
      this.setState({ notice: 'Please answer all the questions.' });
    }
    const hasWrongAnswer = userAnswer.find(
      item => item && item.isCorrect === 0
    );

    this.setState({
      showFinalMessage: true,
      userAnswer: [],
      gotAllQuestionsCorrect: !hasWrongAnswer,
      showQuestions: false
    });
  };

  saveTutorialWatchersInfo = () => {
    const { userInfoSaved } = this.state;
    this.setState({ userInfoSaved: true });
    const { user, tutorial, onSaveTutorialWatchersInfo } = this.props;
    const { id } = user;
    const { tutorialId } = tutorial.tutorialList;
    const watchersData = {
      tutorialWatcherTutorialId: tutorialId,
      tutorialWatcherStudentId: id
    };
    if (!userInfoSaved) {
      onSaveTutorialWatchersInfo(watchersData);
    }
  };

  slickNext = () => {
    this.slider.slickNext();
  };

  getQuestions = questions => {
    const settings = {
      dots: false,
      infinite: false,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,
      arrows: false,
      autoplaySpeed: 1000
    };
    const { userAnswer } = this.state;
    return (
      <Slider
        {...settings}
        ref={r => {
          this.slider = r;
        }}
      >
        {questions.map((item, index) => {
          const { tutorialQuestions, tutorials_questions_options } = item;
          const lastSlide = questions.length - 1 === index;
          const answerSelected = userAnswer[index];
          return (
            <div key={item.tutorialQuestions}>
              <CenteredDiv>{tutorialQuestions}</CenteredDiv>
              <div>
                {tutorials_questions_options.map(option => {
                  const check = userAnswer[index]
                    && userAnswer[index].answer
                      === option.tutorialQuestionOptionOption;

                  return (
                    <QuestionOptions
                      key={option.tutorialQuestionOptionOption}
                      onClick={() => {
                        if (!lastSlide) {
                          // this.slickNext();
                        }
                        this.changeAnswer(index, option);
                      }}
                      style={{
                        background: check ? 'rgba(52, 52, 52, 0.2)' : null
                      }}
                    >
                      <FaCheck
                        style={{
                          visibility: check ? 'visible' : 'hidden'
                        }}
                      />
                      {option.tutorialQuestionOptionOption}
                    </QuestionOptions>
                  );
                })}
              </div>
              <CenteredDiv
                style={{
                  textAlign: lastSlide ? 'center' : 'right'
                }}
              >
                {answerSelected && !lastSlide && (
                  <button
                    type="submit"
                    className="nextButton"
                    onClick={this.slickNext}
                  >
                    NEXT »
                  </button>
                )}
                {lastSlide && (
                  <Button
                    className="rounded short"
                    onClick={this.checkTheUserAnswers}
                  >
                    Check answers
                  </Button>
                )}
              </CenteredDiv>
            </div>
          );
        })}
      </Slider>
    );
  };

  showFinalMessage = () => {
    const { gotAllQuestionsCorrect } = this.state;
    if (gotAllQuestionsCorrect) {
      return (
        <div>
          {'You\'ve answered all the questions correctly. You can return now.'}
        </div>
      );
    }
  };

  watchVideoAgain = () => {
    this.setState({ showVideo: true });
  };

  render() {
    const { hideModal, tutorial } = this.props;
    console.log(tutorial);
    const {
      playing,
      showQuestions,
      showVideo,
      showFinalMessage,
      gotAllQuestionsCorrect
    } = this.state;
    const { tutorialPath, tutorials_questions } = tutorial.tutorialList;
    return (
      <ModalContainer>
        {!showQuestions && showVideo && (
          <div
            style={{
              marginTop: '0px',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                position: 'relative'
              }}
            >
              {!tutorialPath && <Loader size={20} />}
              {tutorialPath && (
                <video
                  src={tutorialPath}
                  autoPlay
                  controls
                  ref={r => {
                    this.fullscreenVideo = r;
                  }}
                  style={{
                    width: '100%'
                  }}
                  preload="auto"
                />
              )}
              <VideoOverlay
                onClick={() => {
                  const player = this.fullscreenVideo;
                  player.paused ? player.play() : player.pause();
                }}
              >
                <span>{playing ? <FaPause /> : <FaPlay />}</span>
              </VideoOverlay>
            </div>
          </div>
        )}
        {showQuestions && (
          <ModalBox>
            {' '}
            {this.getQuestions(tutorials_questions)}
          </ModalBox>
        )}
        {showFinalMessage && !showVideo && !showQuestions && (
          <ModalBox className="centeredModal">
            {!!gotAllQuestionsCorrect && (
              <CenteredElementsModalWrapper className="test">
                <span>
                  {`  You've answered all the questions correctly. You can return
                  now`}
                </span>
                <Button className="short" onClick={hideModal}>
                  OK
                </Button>
              </CenteredElementsModalWrapper>
            )}
            {!gotAllQuestionsCorrect && (
              <CenteredElementsModalWrapper className="test">
                <span>
                  {
                    'You didn\'t answer all the questions correctly. You\'ll have to watch the video again.'
                  }
                </span>
                <Button className="short" onClick={this.watchVideoAgain}>
                  Watch video again
                </Button>
              </CenteredElementsModalWrapper>
            )}
          </ModalBox>
        )}
      </ModalContainer>
    );
  }
}
const mapStateToProps = state => ({
  tutorial: state.tutorial,
  user: state.user.user,
  strike: state.strike.strikes
});
const mapDispatchToProps = dispatch => ({
  onTutorialRequest: value => dispatch(TutorialActions.onTutorialRequest(value)),
  onSaveTutorialWatchersInfo: value => dispatch(TutorialActions.onSaveTutorialWatchersInfo(value))
});

const Modal = connect(mapStateToProps)(BasicModal);

BasicModal.propTypes = {
  showVideo: PropTypes.func,
  strike: PropTypes.number,
  hideModal: PropTypes.func,
  showCheckButton: PropTypes.bool
};

VideoModalContainer.propTypes = {
  message: PropTypes.string,
  hideModal: PropTypes.func,
  showCheckButton: PropTypes.bool,
  type: PropTypes.string,
  tutorial: PropTypes.object,
  onSaveTutorialWatchersInfo: PropTypes.func,
  user: PropTypes.object,
  onTutorialRequest: PropTypes.func
};

const VideoModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoModalContainer);

export {
  Modal,
  ModalContainer,
  ModalBox,
  Header,
  Icon,
  Points,
  ButtonWrapper,
  Message,
  Warnings,
  TermsAndConditionBox,
  VideoModal,
  CenteredElementsModalWrapper
};
