import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TestActions from '../../Redux/TestRedux';

class TestComponent extends Component {
  onHandleButton = () => {
    const { onTestRequest } = this.props;
    onTestRequest();
  };

  render() {
    console.log(this.props);

    return (
      <div className="App">
        <header className="App-header">
          <p>HELLO</p>
          <button type="submit" onClick={this.onHandleButton}>
            OK
          </button>
        </header>
      </div>
    );
  }
}

TestComponent.propTypes = {
  onTestRequest: PropTypes.func
};
const mapStateToProps = state => ({
  test: state.test
});
const mapDispatchToProps = dispatch => ({
  onTestRequest: () => dispatch(TestActions.onTestRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent);
