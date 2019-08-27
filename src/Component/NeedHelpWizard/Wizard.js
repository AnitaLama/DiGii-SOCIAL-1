import React, { Component } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { Button } from '../StyledComponents';
import {
  Colors,
  fontSize,
  fontFilson,
  fontWeight,
  boxShadow,
  Images
} from '../../Theme';
import { NoticeContainer } from './index';
import HelperActions from '../../Redux/HelperRedux';

const { black, snow } = Colors.colors;

const WizardWrapper = styled.div`
  min-height: calc(100vh - 100px);
  display: flex;
`;

const WizardContainer = styled.div`
  margin: auto;
  width: 365px;
  padding: 30px;
  text-align: center;
  div {
    padding: 10px 0;
  }
  ${boxShadow()};
  border-radius: 42px;
  position: relative;
  @media (max-width: 800px) {
    transform: translate(-35%, 0%);
  }
  // top: 200px;
`;

const WizardDescription = styled.div`
  width: 295px;
  margin: auto;
`;

const Title = styled.div`
  color: ${black};
  ${fontSize(28)};
  ${fontFilson()};
  line-height: 28px;
  ${fontWeight('bold')}
`;

const Description = styled.div`
  color: #777777;
  ${fontSize(16)};
  span {
    display: block;
    margin: 10px;
  }
`;
const InternalHelper = styled.div`
  padding: 10px;
`;
const CurrentWizardScreen = ({
  title,
  description,
  notice,
  next
  // extraInfo
}) => {
  const check = title.toLowerCase() === 'help outside school';
  return (
    <div>
      <WizardDescription style={{ width: check && '100%' }}>
        <Title>{title}</Title>
        {description && (
          <Description
            dangerouslySetInnerHTML={{
              __html: description
            }}
          />
        )}
      </WizardDescription>

      {notice && <NoticeContainer notice={notice} />}
    </div>
  );
};
const StepOne = ({ handleButtonClick }) => (
  <WizardContainer>
    <CurrentWizardScreen
      title="DiGii Help"
      description={`  <div>
    There are lots of places for you to get help online and in our school
    community.

    <span>What sort of help are you after?</span>
    </div>`}
      notice="Well done for checking out the HELP option on DiGii. On social media you’re surrounded by lots of people. Those people might need help, or you might need help because of what they say or do. There’s lots of help on DiGii – so let’s HAVE A LOOK AROUND!"
      next={handleButtonClick}
    />
    <div>
      <Button
        className="roundedShadow default"
        onClick={() => {
          handleButtonClick(2, 'where', 'inside');
        }}
      >
        Inside Our School
      </Button>
    </div>
    <div>
      <Button
        className="roundedShadow default"
        onClick={() => {
          handleButtonClick(5, 'where', 'outside');
        }}
      >
        Outside OurSchool
      </Button>
    </div>
  </WizardContainer>
);

const StepTwo = ({ handleButtonClick }) => (
  <WizardContainer>
    <CurrentWizardScreen
      title="Who do you need help for?"
      notice="Help us to help you by choosing which option is right for you. Asking for help for yourself or someone else is very brave. Well done!"
    />
    <div>
      <Button
        className="roundedShadow default"
        onClick={() => {
          handleButtonClick(3, 'forWhom', 'me');
        }}
      >
        For Me
      </Button>
    </div>
    <div>
      <Button
        className="roundedShadow default"
        onClick={() => {
          handleButtonClick(3, 'forWhom', 'someone');
        }}
      >
        For Someone Else
      </Button>
    </div>
  </WizardContainer>
);
const StepThree = ({ handleButtonClick }) => (
  <WizardContainer>
    <CurrentWizardScreen
      title="I need help"
      notice="Now that you’ve started asking for help – keep going! You’re nearly there."
    />
    <div>
      <Button
        className="roundedShadow default"
        onClick={() => {
          handleButtonClick(4, 'when', 'Right Now');
        }}
      >
        Right Now
      </Button>
    </div>
    <div>
      <Button
        className="roundedShadow default"
        onClick={() => {
          handleButtonClick(4, 'when', 'Soon');
        }}
      >
        Soon
      </Button>
    </div>
  </WizardContainer>
);
const ReasonsDiv = ({ selectReason }) => (
  <div>
    <div>I need help because of:</div>
    <ul>
      <li>
        <input type="checkbox" onChange={selectReason} />
        being cyberbullied
      </li>
      <li>
        <input type="checkbox" onChange={selectReason} />
        being asked for inappropriate images
      </li>
      <li>
        <input type="checkbox" onChange={selectReason} />
        feeling very down
      </li>
      <li>
        <input type="checkbox" onChange={selectReason} />
        being purposefully excluded
      </li>
      <li>
        <input type="checkbox" onChange={selectReason} />
        hate speak or racism
      </li>
      <li>
        <input type="checkbox" onChange={selectReason} />
        Something else
      </li>
    </ul>
  </div>
);
const StepFour = props => {
  const { helper, selectHelper, findHelpFromList } = props;
  const { internalHelpersList } = helper;
  console.log('stepfour inside >>>>>>>>>>>>', props);
  return (
    <WizardContainer
      style={{
        textAlign: 'left'
      }}
    >
      <CurrentWizardScreen title="I would like to speak to:" />
      <div
        style={{
          padding: '0 20px'
        }}
      >
        {internalHelpersList.map(help => {
          const { internalHelpFirstname, internalHelpLastname, role } = help;

          return (
            <InternalHelper>
              <input
                type="checkbox"
                onChange={e => {
                  selectHelper(e, help);
                }}
              />
              <span>
                {role && role.roleName}
                {' '}
-
                {internalHelpFirstname}
                {' '}
                {internalHelpLastname}
              </span>
            </InternalHelper>
          );
        })}
      </div>
      {findHelpFromList.length > 0 && <ReasonsDiv />}
    </WizardContainer>
  );
};
const StepFive = ({ handleButtonClick }) => (
  <WizardContainer
    style={{
      width: '585px'
    }}
  >
    <CurrentWizardScreen
      title="Help Outside School"
      description={`<div>
      Being safe online means knowing where to read up about your rights and responsibilities. The eSafety Commissioner website has lots of
      information and you can report cyberbullying there too.<span>  If you or a friend need to talk to someone about what’s happening  in your online or offline life, there are lots of people who can  help outside our school.</span><span>  In your home or community: Your parent or carer can be a great  place to start, maybe you have a grandparent, aunty or uncle who’s  good at listening. There’s also your sport coach or a leader in an  afterschool group.</span><span>    24 hours a day: Here are some great options that you can access  around the clock by hopping online or picking up the phone:</span><span>  Kids Helpline    <a href="https://kidshelpline.com.au/">    https://kidshelpline.com.au/  </a>    or 1800 55 1800</span>
      </div>`}
    />
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around'
      }}
    >
      <div>
        <Button
          className="roundedShadow default"
          // onClick={() => {
          //   handleButtonClick(4, 'when', 'Right Now');
          // }}
        >
          eSafety Commissioner
        </Button>
      </div>
      <div>
        <Button
          className="roundedShadow default"
          // onClick={() => {
          //   handleButtonClick(4, 'when', 'Soon');
          // }}
        >
          Kids Helpline
        </Button>
      </div>
    </div>
  </WizardContainer>
);

class Wizard extends Component {
  state = {
    findHelpFromList: []
  };

  next = step => {
    const { next } = this.props;
    next(step);
  };

  handleButtonClick = (nextStep, temp, values) => {
    console.log('values', values, nextStep);
    const { next } = this.props;
    this.setState({ [temp]: values });
    if (this.props.step === 3) {
      const { user, onGetAllInternalHelpers } = this.props;
      const group = user.groupId[0];
      console.log('>>>>>', this.props.user);
      // this.props.onGetAllInternalHelpers(groupId)
      onGetAllInternalHelpers({ stGroupId: group });
    }
    next(nextStep);
  };

  selectHelper = (e, helper) => {
    console.log('helper', e.target.checked, helper);
    const { checked } = e.target;
    const { findHelpFromList } = this.state;
    let newArr;
    if (checked) {
      newArr = findHelpFromList;
      newArr.push(helper);
    } else {
      newArr = findHelpFromList.filter(item => item !== helper);
    }

    this.setState({ findHelpFromList: newArr }, () => {
      console.log('newArr>>>>>>', this.state.findHelpFromList);
    });
  };

  render() {
    const { step } = this.props;
    const props = {
      ...this.props,
      ...this.state,
      handleButtonClick: this.handleButtonClick,
      selectHelper: this.selectHelper
    };
    const WizardStepsList = [
      {
        step: 1,
        component: <StepOne {...props} />,
        title: 'DiGii Help'
      },
      {
        step: 2,
        component: <StepTwo {...props} />,
        title: 'Who do you need help for?'
      },
      {
        step: 3,
        component: <StepThree {...props} />,
        title: 'I need help'
      },
      {
        step: 4,
        component: <StepFour {...props} />,
        title: 'I\'d like to speak to:'
      },
      {
        step: 5,
        component: <StepFive {...props} />,
        title: 'Help Outside School'
      }
    ];
    const screen = WizardStepsList.find(item => item.step === step);
    console.log(step, screen);
    console.log('helpers>>>>>>>>>>>>', this.props.helper);
    return (
      <WizardWrapper>
        {screen.component}
        {/*  <CurrentWizardScreen screen={screen} next={this.next} /> */}
        {/*  {this.getComponent(this.props.step)} */}
        {/*  <button onClick={this.props.next}>NEXT</button> */}
      </WizardWrapper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  helper: state.helper
});
const mapDispatchToProps = dispatch => ({
  onGetAllInternalHelpers: value => dispatch(HelperActions.onGetAllInternalHelpers(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wizard);
