import React, { Component } from 'react';
import styled from '@emotion/styled';
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

const WizardSteps = [
  {
    step: 1,
    title: 'DiGii Help',
    description: (
      <div>
        There are lots of places for you to get help online and in our school
        community.
        {' '}
        <span>What sort of help are you after?</span>
      </div>
    ),
    button1: 'Inside Our School',
    button1Action: 2,
    button2: 'Outside Our School',
    button2Action: 5,
    notice:
      'Well done for checking out the HELP option on DiGii. On social media you’re surrounded by lots of people. Those people might need help, or you might need help because of what they say or do. There’s lots of help on DiGii – so let’s HAVE A LOOK AROUND!'
  },
  {
    step: 2,
    title: 'Who do you need help for?',
    description: null,
    button1: 'For Me',
    button1Action: 3,
    button2: 'For Someone Else',
    button2Action: 3,
    notice:
      'Help us to help you by choosing which option is right for you. Asking for help for yourself or someone else is very brave. Well done!'
  },
  {
    step: 3,
    title: 'I need help',
    description: null,
    button1: 'Right Now',
    button1Action: 4,
    button2: 'Soon',
    button2Action: 4,
    notice:
      'Help us to help you by choosing which option is right for you. Asking for help for yourself or someone else is very brave. Well done!'
  },
  {
    step: 4,
    title: 'I\'d like to speak to:',
    description: null,

    notice:
      'Now that you’ve started asking for help – keep going! You’re nearly there.'
  },
  {
    step: 5,
    title: 'Help Outside School',
    description: (
      <div>
        Being safe online means knowing where to read up about your rights and
        responsibilities. The eSafety Commissioner website has lots of
        information and you can report cyberbullying there too.
        <span>
          If you or a friend need to talk to someone about what’s happening in
          your online or offline life, there are lots of people who can help
          outside our school.
        </span>
        <span>
          In your home or community: Your parent or carer can be a great place
          to start, maybe you have a grandparent, aunty or uncle who’s good at
          listening. There’s also your sport coach or a leader in an afterschool
          group.
        </span>
        <span>
          {' '}
          24 hours a day: Here are some great options that you can access around
          the clock by hopping online or picking up the phone:
        </span>
        <span>
          Kids Helpline
          {' '}
          <a href="https://kidshelpline.com.au/">
            https://kidshelpline.com.au/
          </a>
          {' '}
          or 1800 55 1800
        </span>
      </div>
    ),
    button1: 'eSafety Commissioner',
    button1Action: 4,
    button2: 'Kids Helpline',
    button2Action: 4,
    notice: null
  }
];

const CurrentWizardScreen = ({ screen, next }) => {
  const {
    step,
    title,
    description,
    button1,
    button2,
    notice,
    button1Action,
    button2Action
  } = screen;
  console.log('inside >>>', screen);
  const check = title.toLowerCase() === 'help outside school';
  return (
    <WizardContainer style={{ width: check && '585px' }}>
      <WizardDescription style={{ width: check && '100%' }}>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </WizardDescription>
      <div
        style={{
          display: check && 'flex',
          justifyContent: check && 'space-around'
        }}
      >
        {button1 && (
          <div>
            <Button
              className="roundedShadow default"
              onClick={() => {
                next(button1Action);
              }}
            >
              {button1}
            </Button>
          </div>
        )}
        {button2 && (
          <div>
            <Button
              className="roundedShadow default"
              onClick={() => {
                next(button2Action);
              }}
            >
              {button2}
            </Button>
          </div>
        )}
      </div>
      {notice && <NoticeContainer notice={notice} />}
    </WizardContainer>
  );
};
// const StepOne = ({ next }) => (
//   <WizardContainer>
//     <WizardDescription>
//       <Title>DiGii Help</Title>
//       <Description>
//         There are lots of places for you to get help online and in our school
//         community.
//         {' '}
//         <span>What sort of help are you after?</span>
//       </Description>
//     </WizardDescription>
//     <div>
//       <Button className="roundedShadow default" onClick={next}>
//         Inside Our School
//       </Button>
//     </div>
//     <div>
//       <Button className="roundedShadow default" onClick={next}>
//         Outside Our School
//       </Button>
//     </div>
//     <NoticeContainer notice="Well done for checking out the HELP option on DiGii. On social media you’re surrounded by lots of people. Those people might need help, or you might need help because of what they say or do. There’s lots of help on DiGii – so let’s HAVE A LOOK AROUND!" />
//   </WizardContainer>
// );
//
// const StepTwo = ({ next }) => (
//   <WizardContainer>
//     <Title>Who do you need help for?</Title>
//     <div>
//       <Button className="roundedShadow default" onClick={next}>
//         For Me
//       </Button>
//     </div>
//     <div>
//       <Button className="roundedShadow default" onClick={next}>
//         For Someone Else
//       </Button>
//     </div>
//     <NoticeContainer notice="Help us to help you by choosing which option is right for you. Asking for help for yourself or someone else is very brave. Well done!" />
//   </WizardContainer>
// );
//
// const StepThree = ({ next }) => (
//   <WizardContainer>
//     <Title>I need help</Title>
//     <div>
//       <Button className="roundedShadow default" onClick={next}>
//         Right Now
//       </Button>
//     </div>
//     <div>
//       <Button className="roundedShadow default" onClick={next}>
//         Soon
//       </Button>
//     </div>
//     <NoticeContainer notice="Help us to help you by choosing which option is right for you. Asking for help for yourself or someone else is very brave. Well done!" />
//   </WizardContainer>
// );
//
// const StepFour = ({ next }) => (
//   <WizardContainer>
//     <Title>I would like to speak to:</Title>
//     <div>
//       <Button className="roundedShadow default" onClick={next}>
//         Right Now
//       </Button>
//     </div>
//     <div>
//       <Button className="roundedShadow default" onClick={next}>
//         Soon
//       </Button>
//     </div>
//     <NoticeContainer notice="Help us to help you by choosing which option is right for you. Asking for help for yourself or someone else is very brave. Well done!" />
//   </WizardContainer>
// );

class Wizard extends Component {
  state = {
    step: this.props.step
  };

  // getComponent = step => {
  //   const props = { ...this.props };
  //   switch (step) {
  //     case 1:
  //       return <StepOne {...props} />;
  //     case 2:
  //       return <StepTwo {...props} />;
  //     case 3:
  //       return <StepThree {...props} />;
  //     case 4:
  //       return <StepFour {...props} />;
  //     default:
  //       return <StepOne {...props} />;
  //   }
  // };

  render() {
    const { step } = this.props;
    const screen = WizardSteps.find(item => item.step === step);
    console.log(step, screen);
    return (
      <WizardWrapper>
        <CurrentWizardScreen screen={screen} next={this.props.next} />
        {/*  {this.getComponent(this.props.step)} */}
        {/*  <button onClick={this.props.next}>NEXT</button> */}
      </WizardWrapper>
    );
  }
}

export default Wizard;
