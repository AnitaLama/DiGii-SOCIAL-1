import React, { Component } from 'react';
import { Header, Wizard } from './index';

class MainWizard extends Component {
  state = {
    step: 1,
    history: [1]
  };

  goBack = () => {
    const { history } = this.state;
    if (history.length > 1) {
      history.pop();
    }
    console.log('history prev', history);
    this.setState({ step: history[history.length - 1], history });
  };

  next = nextStep => {
    const { step, history } = this.state;
    history.push(nextStep);
    console.log('history next', history);
    this.setState({ step: step < 4 ? nextStep : 4, history });
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
