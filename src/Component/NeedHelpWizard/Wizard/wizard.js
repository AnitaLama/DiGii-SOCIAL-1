import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from '../../StyledComponents';

import { NoticeContainer } from '../index';
import HelperActions from '../../../Redux/HelperRedux';
import history from '../../../utils/history';
import {
  WizardWrapper,
  WizardContainer,
  WizardDescription,
  Title,
  Description,
  InternalHelper,
  ReasonsWrapper
} from './style';

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
const StepOne = ({ user, handleButtonClick }) => {
  // //console.log('>>>>>>USER', user);
  // const { isFirstTimeAskingHelp } = user;
  const localData = JSON.parse(
    localStorage.getItem(`${user.username}isFirstTimeAskingHelp`)
  );
  const data = {
    username: user.username,
    isFirstTimeAskingHelp: false
  };
  let check;
  if (localData) {
    const { username } = localData;
    check = !(user.username === username);
  } else {
    // console.log('set localstorage', JSON.stringify(data));
    check = !localData;
    localStorage.setItem(
      `${user.username}isFirstTimeAskingHelp`,
      JSON.stringify(data)
    );
  }
  // check = true;
  return (
    <WizardContainer>
      <CurrentWizardScreen
        title="DiGii Help"
        description={`  <div>
    There are lots of places for you to get help online and in our school
    community.

    <span>What sort of help are you after?</span>
    </div>`}
        notice={
          check
          && 'Well done for checking out the HELP option on DiGii. On social media you’re surrounded by lots of people. Those people might need help, or you might need help because of what they say or do. There’s lots of help on DiGii – so let’s HAVE A LOOK AROUND!'
        }
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
          Outside Our School
        </Button>
      </div>
    </WizardContainer>
  );
};

const StepTwo = ({ user, handleButtonClick }) => {
  // const { isFirstTimeAskingHelpFor } = user;
  const localData = JSON.parse(
    localStorage.getItem(`${user.username}isFirstTimeAskingHelpFor`)
  );
  const data = {
    username: user.username,
    isFirstTimeAskingHelpFor: false
  };
  let check;
  if (localData) {
    const { username } = localData;
    check = !(user.username === username);
  }
  {
    // console.log('set localstorage', JSON.stringify(data));
    check = !localData;
    localStorage.setItem(
      `${user.username}isFirstTimeAskingHelpFor`,
      JSON.stringify(data)
    );
  }
  return (
    <WizardContainer>
      <CurrentWizardScreen
        title="Who do you need help for?"
        notice={
          check
          && 'Help us to help you by choosing which option is right for you. Asking for help for yourself or someone else is very brave. Well done!'
        }
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
};
const StepThree = ({ user, handleButtonClick }) => {
  // const { isFirstTimeAskingHelpWhen } = user;
  const localData = JSON.parse(
    localStorage.getItem(`${user.username}isFirstTimeAskingHelpWhen`)
  );
  const data = {
    username: user.username,
    isFirstTimeAskingHelpWhen: false
  };
  let check;
  if (localData) {
    const { username, isFirstTimeAskingHelpWhen } = localData;
    check = !(user.username === username);
  }
  {
    // console.log('set localstorage', JSON.stringify(data));
    check = !localData;
    localStorage.setItem(
      `${user.username}isFirstTimeAskingHelpWhen`,
      JSON.stringify(data)
    );
  }
  return (
    <WizardContainer>
      <CurrentWizardScreen
        title="I need help"
        notice={
          check
          && 'Now that you’ve started asking for help – keep going! You’re nearly there.'
        }
      />
      <div>
        <Button
          className="roundedShadow default"
          onClick={() => {
            handleButtonClick(0, 'when', 'Right Now');
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
};
const ReasonsDiv = (
  { user, selectReason } // const { isFirstTimeAskingHelpFrom } = user; // console.log('COMPONENT', user);
) => (
  <div>
    <div>I need help because of:</div>
    <ReasonsWrapper>
      <li>
        <input
          type="checkbox"
          onChange={() => {
            selectReason('being cyberbullied');
          }}
        />
        being cyberbullied
      </li>
      <li>
        <input
          type="checkbox"
          onChange={() => {
            selectReason('being asked for inappropriate images');
          }}
        />
        being asked for inappropriate images
      </li>
      <li>
        <input
          type="checkbox"
          onChange={() => {
            selectReason('feeling very down');
          }}
        />
        feeling very down
      </li>
      <li>
        <input
          type="checkbox"
          onChange={() => {
            selectReason('being purposefully excluded');
          }}
        />
        being purposefully excluded
      </li>
      <li>
        <input
          type="checkbox"
          onChange={() => {
            selectReason('hate speak or racism');
          }}
        />
        hate speak or racism
      </li>
      <li>
        <input
          type="checkbox"
          onChange={() => {
            selectReason('Something else');
          }}
        />
        Something else
      </li>
    </ReasonsWrapper>
  </div>
);
const StepFour = props => {
  const {
    helper, selectHelper, findHelpFromList, askForHelp, forWhom
  } = props;
  const { internalHelpersList } = helper;
  console.log('forWhom', forWhom);
  // console.log('stepfour inside >>>>>>>>>>>>', props);
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
        {forWhom === 'someone' && <input placeholder="Name" />}
        {internalHelpersList.map(help => {
          const { internalHelpFirstname, internalHelpLastname, role } = help;

          return (
            <InternalHelper key={internalHelpFirstname}>
              <input
                type="radio"
                name="internalHelper"
                value={internalHelpFirstname}
                onChange={e => {
                  selectHelper(e, help);
                }}
                checked={help === findHelpFromList}
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
      {findHelpFromList && <ReasonsDiv {...props} />}
      {findHelpFromList && (
        <Button onClick={askForHelp}>Send Help Request</Button>
      )}
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
          onClick={() => {
            history.push('/messageboard');
            window.open('https://www.esafety.gov.au/', '_blank');
            // handleButtonClick(4, 'when', 'Right Now');
          }}
        >
          eSafety Commissioner
        </Button>
      </div>
      <div>
        <Button
          className="roundedShadow default"
          onClick={() => {
            history.push('/messageboard');
            window.open('https://kidshelpline.com.au/ ', '_blank');
          }}
        >
          Kids Helpline
        </Button>
      </div>
    </div>
  </WizardContainer>
);

class Wizard extends Component {
  state = {
    findHelpFromList: null
  };

  next = step => {
    const { next } = this.props;
    next(step);
  };

  handleButtonClick = (nextStep, temp, values) => {
    // console.log('values', values, temp, nextStep);
    const { user } = this.props;
    // console.log(user);
    const { next } = this.props;
    this.setState({ [temp]: values });

    switch (temp) {
      case 'where':
        // console.log('disable from where');
        break;
      case 'forWhom':
        // console.log('disable for whom');
        break;
      case 'when':
        // console.log('disable when');
        break;
    }
    if (this.props.step === 3) {
      const { user, onGetAllInternalHelpers } = this.props;
      const group = user.groupId[0];
      // console.log('>>>>>', this.props.user);
      // this.props.onGetAllInternalHelpers(groupId)
      onGetAllInternalHelpers({ stGroupId: group });
    }
    if (nextStep === 0) {
      const { user } = this.props;
      const { firstname } = user;
      // console.log('show modal');
      this.setState({
        showModal: true,
        alertMessage: `${firstname}, your teacher has been messaged and knows that you're asking for help right now. Well done for being brave enough to ask for help`,
        points: '=5'
      });
    } else {
      next(nextStep);
    }
  };

  askForHelp = data => {
    const { user } = this.props;
    const { firstname } = user;
    // console.log(data, this.state);
    const { findHelpFromList } = this.state;
    const { internalHelpFirstname, role } = findHelpFromList;
    this.setState({
      showModal: true,
      alertMessage: `${firstname}, your help request has been sent to your ${
        role.roleName
      } ${internalHelpFirstname}. Well done on asking help! ${internalHelpFirstname} will message you soon `,
      points: '=5'
    });
  };

  selectHelper = (e, helper) => {
    const { checked } = e.target;
    const { findHelpFromList } = this.state;
    // let newArr;
    // if (checked) {
    //   newArr = findHelpFromList;
    //   newArr.push(helper);
    // } else {
    //   newArr = findHelpFromList.filter(item => item !== helper);
    // }

    this.setState({ findHelpFromList: checked ? helper : null });
  };

  hideModal = () => {
    this.setState({ showModal: false });
    history.push('/messageboard');
  };

  selectReason = e => {
    console.log('selectReason >>>>>>>>>>>>>>>>>>>>', e.target.checked);
  };

  render() {
    const { step, user } = this.props;
    const props = {
      ...this.props,
      ...this.state,
      handleButtonClick: this.handleButtonClick,
      selectHelper: this.selectHelper,
      askForHelp: this.askForHelp,
      selectReason: this.selectReason
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
    const { showModal, alertMessage } = this.state;

    return (
      <WizardWrapper>
        {screen.component}
        {/*  <CurrentWizardScreen screen={screen} next={this.next} /> */}
        {/*  {this.getComponent(this.props.step)} */}
        {/*  <button onClick={this.props.next}>NEXT</button> */}
        {showModal && (
          <Modal hideModal={this.hideModal} message={alertMessage} />
        )}
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
