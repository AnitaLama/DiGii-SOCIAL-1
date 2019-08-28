import React, { Component } from 'react';
import { Header, Wizard } from './index';
import history from '../../history';

class MainWizard extends Component {
  state = {
    step: 1,
    routeHistory: [1]
  };

  goBack = () => {
    const { routeHistory } = this.state;
    if (routeHistory.length > 1) {
      routeHistory.pop();
    } else {
      history.push('/messageboard');
    }

    this.setState({
      step: routeHistory[routeHistory.length - 1],
      routeHistory
    });
  };

  next = nextStep => {
    const { step, routeHistory } = this.state;
    if (step !== nextStep) {
      routeHistory.push(nextStep);
      this.setState({ step: step < 4 ? nextStep : 4, routeHistory });
    }
  };

  render() {
    const { step } = this.state;
    return (
      <div>
        <Header goBack={this.goBack} />
        <Wizard step={step} next={this.next} />
      </div>
    );
  }
}

export default MainWizard;
